
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobListing {
  title: string;
  company: string;
  location?: string;
  tags: string[];
  postedDate?: string;
  jobUrl: string;
  description?: string;
  source: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { config_id } = await req.json();

    if (!config_id) {
      return new Response(
        JSON.stringify({ error: 'config_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get scraping configuration
    const { data: config, error: configError } = await supabase
      .from('bulk_scraping_configs')
      .select('*')
      .eq('id', config_id)
      .single();

    if (configError || !config) {
      return new Response(
        JSON.stringify({ error: 'Configuration not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('bulk_scraping_jobs')
      .insert({
        config_id,
        status: 'running',
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Failed to create job record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Start background scraping
    EdgeRuntime.waitUntil(performBulkScraping(supabase, job.id, config));

    return new Response(
      JSON.stringify({ 
        message: 'Bulk scraping job started',
        job_id: job.id,
        status: 'running'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Bulk scraping error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function performBulkScraping(supabase: any, jobId: string, config: any) {
  let totalFound = 0;
  let totalPublished = 0;
  let totalErrors = 0;
  const results: any = {};

  try {
    console.log(`Starting bulk scraping for config: ${config.name}`);

    for (const website of config.websites) {
      console.log(`Scraping ${website.name} at ${website.url}`);
      
      try {
        const jobs = await scrapeWebsite(website);
        const published = await publishJobs(supabase, jobs, website.name);
        
        totalFound += jobs.length;
        totalPublished += published;
        
        results[website.name] = {
          found: jobs.length,
          published: published,
          status: 'completed'
        };
        
        console.log(`${website.name}: Found ${jobs.length}, Published ${published}`);
        
      } catch (error) {
        console.error(`Error scraping ${website.name}:`, error);
        totalErrors++;
        results[website.name] = {
          found: 0,
          published: 0,
          status: 'failed',
          error: error.message
        };
      }
    }

    // Update job completion
    await supabase
      .from('bulk_scraping_jobs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        total_jobs_found: totalFound,
        total_jobs_published: totalPublished,
        errors_count: totalErrors,
        results: results
      })
      .eq('id', jobId);

    console.log(`Bulk scraping completed: ${totalFound} found, ${totalPublished} published`);

  } catch (error) {
    console.error('Bulk scraping failed:', error);
    
    await supabase
      .from('bulk_scraping_jobs')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: error.message,
        results: results
      })
      .eq('id', jobId);
  }
}

async function scrapeWebsite(website: any): Promise<JobListing[]> {
  const response = await fetch(website.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  
  if (!doc) {
    throw new Error('Failed to parse HTML');
  }

  const jobs: JobListing[] = [];
  const containers = doc.querySelectorAll(website.selectors.container);

  containers.forEach(container => {
    try {
      const job = extractJobFromContainer(container, website);
      if (job && job.title && job.company) {
        jobs.push(job);
      }
    } catch (error) {
      console.warn('Error extracting job:', error);
    }
  });

  return jobs;
}

function extractJobFromContainer(container: any, website: any): JobListing | null {
  const selectors = website.selectors;
  
  const titleEl = container.querySelector(selectors.title);
  const companyEl = container.querySelector(selectors.company);
  const locationEl = container.querySelector(selectors.location);
  const dateEl = container.querySelector(selectors.date);
  const urlEl = container.querySelector(selectors.url);
  const descEl = container.querySelector(selectors.description);
  
  if (!titleEl || !companyEl) {
    return null;
  }

  const title = titleEl.textContent?.trim();
  const company = companyEl.textContent?.trim();
  
  if (!title || !company) {
    return null;
  }

  // Extract tags
  const tags: string[] = [];
  const tagElements = container.querySelectorAll(selectors.tags);
  tagElements.forEach((tagEl: any) => {
    const tag = tagEl.textContent?.trim();
    if (tag) tags.push(tag);
  });

  // Build job URL
  let jobUrl = '';
  if (urlEl) {
    const href = urlEl.getAttribute('href');
    if (href) {
      jobUrl = href.startsWith('http') ? href : `${new URL(website.url).origin}${href}`;
    }
  }

  return {
    title,
    company,
    location: locationEl?.textContent?.trim(),
    tags,
    postedDate: dateEl?.textContent?.trim() || 'Just posted',
    jobUrl: jobUrl || website.url,
    description: descEl?.textContent?.trim()?.substring(0, 500),
    source: website.name
  };
}

async function publishJobs(supabase: any, jobs: JobListing[], source: string): Promise<number> {
  let published = 0;
  
  console.log(`Starting to publish ${jobs.length} jobs from ${source}`);
  
  // Get or create default category for jobs
  let { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('name', 'jobs')
    .single();

  // If no 'jobs' category exists, try to get any active category
  if (!category) {
    const { data: categories } = await supabase
      .from('categories')
      .select('id')
      .eq('is_active', true)
      .limit(1);
    
    category = categories?.[0];
  }

  // If still no category, create one
  if (!category) {
    console.log('No categories found, creating default category');
    const { data: newCategory, error: categoryError } = await supabase
      .from('categories')
      .insert({
        name: 'jobs',
        description: 'Job opportunities',
        is_active: true
      })
      .select('id')
      .single();
    
    if (categoryError) {
      console.error('Failed to create category:', categoryError);
      return 0;
    }
    
    category = newCategory;
  }

  const categoryId = category.id;
  console.log(`Using category ID: ${categoryId}`);

  for (const job of jobs) {
    try {
      console.log(`Processing job: ${job.title} at ${job.company}`);
      
      // Check for duplicates with a more lenient approach
      const { data: existing } = await supabase
        .from('opportunities')
        .select('id')
        .ilike('title', `%${job.title.substring(0, 50)}%`)
        .ilike('organization', `%${job.company.substring(0, 30)}%`)
        .limit(1);

      if (existing && existing.length > 0) {
        console.log(`Duplicate found: ${job.title} at ${job.company}`);
        continue;
      }

      // Create a more comprehensive description
      const description = job.description || 
        `${job.title} position at ${job.company}. ` +
        `Location: ${job.location || 'Remote/Not specified'}. ` +
        `Tags: ${job.tags.join(', ') || 'None specified'}.`;

      // Insert new opportunity
      const { data: insertedJob, error } = await supabase
        .from('opportunities')
        .insert({
          title: job.title,
          description: description,
          organization: job.company,
          location: job.location || 'Remote',
          application_url: job.jobUrl,
          source_url: job.jobUrl,
          category_id: categoryId,
          source: 'bulk_scraped',
          is_published: true,
          published_at: new Date().toISOString(),
          tags: job.tags.length > 0 ? job.tags : null,
          status: 'approved',
          metadata: {
            source_website: source,
            posted_date: job.postedDate,
            scraped_at: new Date().toISOString()
          }
        })
        .select('id');

      if (error) {
        console.error(`Error publishing job ${job.title}:`, error);
      } else {
        published++;
        console.log(`Successfully published: ${job.title} at ${job.company} (ID: ${insertedJob?.[0]?.id})`);
      }
    } catch (error) {
      console.error(`Error processing job ${job.title}:`, error);
    }
  }

  console.log(`Finished publishing: ${published} out of ${jobs.length} jobs from ${source}`);
  return published;
}
