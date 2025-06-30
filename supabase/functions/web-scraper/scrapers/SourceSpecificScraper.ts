
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SourceConfig } from '../sources/source-configs.ts';

export interface ScrapedOpportunity {
  title: string;
  description: string;
  deadline?: string;
  location?: string;
  application_url?: string;
  organization: string;
  source_url: string;
  category?: string;
}

export class SourceSpecificScraper {
  private config: SourceConfig;

  constructor(config: SourceConfig) {
    this.config = config;
  }

  async scrapeOpportunities(): Promise<ScrapedOpportunity[]> {
    console.log(`Starting specialized scrape for ${this.config.name}`);
    
    const opportunities: ScrapedOpportunity[] = [];
    let currentPage = 1;

    try {
      while (currentPage <= (this.config.pagination.maxPages || 5)) {
        console.log(`Scraping page ${currentPage} for ${this.config.name}`);
        
        const pageUrl = this.buildPageUrl(currentPage);
        const pageOpportunities = await this.scrapePage(pageUrl);
        
        if (pageOpportunities.length === 0) {
          console.log(`No opportunities found on page ${currentPage}, stopping`);
          break;
        }

        opportunities.push(...pageOpportunities);
        
        // Respect rate limiting
        await this.delay(this.config.requestConfig.delay);
        currentPage++;
      }

      console.log(`Completed scraping ${this.config.name}: ${opportunities.length} opportunities found`);
      return this.filterOpportunities(opportunities);

    } catch (error) {
      console.error(`Error scraping ${this.config.name}:`, error);
      throw error;
    }
  }

  private buildPageUrl(page: number): string {
    if (this.config.pagination.type === 'url') {
      return `${this.config.baseUrl}${this.config.listingPath}?page=${page}`;
    }
    return `${this.config.baseUrl}${this.config.listingPath}`;
  }

  private async scrapePage(url: string): Promise<ScrapedOpportunity[]> {
    const opportunities: ScrapedOpportunity[] = [];

    for (let attempt = 1; attempt <= this.config.requestConfig.retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: this.config.requestConfig.headers,
          signal: AbortSignal.timeout(30000) // 30 second timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        
        if (!doc) {
          throw new Error('Failed to parse HTML');
        }

        const containers = doc.querySelectorAll(this.config.selectors.container);
        
        containers.forEach(container => {
          try {
            const opportunity = this.extractOpportunityFromContainer(container);
            if (opportunity && this.isValidOpportunity(opportunity)) {
              opportunities.push(opportunity);
            }
          } catch (error) {
            console.warn(`Error extracting opportunity:`, error);
          }
        });

        return opportunities;

      } catch (error) {
        console.warn(`Attempt ${attempt} failed for ${url}:`, error);
        if (attempt === this.config.requestConfig.retries) {
          throw error;
        }
        await this.delay(1000 * attempt); // Exponential backoff
      }
    }

    return opportunities;
  }

  private extractOpportunityFromContainer(container: any): ScrapedOpportunity | null {
    try {
      const titleEl = container.querySelector(this.config.selectors.title);
      const descEl = container.querySelector(this.config.selectors.description);
      const linkEl = container.querySelector(this.config.selectors.link);

      if (!titleEl || !descEl) {
        return null;
      }

      const title = titleEl.textContent?.trim();
      const description = descEl.textContent?.trim();
      
      if (!title || !description || title.length < 10 || description.length < 30) {
        return null;
      }

      const opportunity: ScrapedOpportunity = {
        title,
        description,
        organization: this.config.name,
        source_url: this.config.baseUrl + this.config.listingPath
      };

      // Extract deadline if selector exists
      if (this.config.selectors.deadline) {
        const deadlineEl = container.querySelector(this.config.selectors.deadline);
        if (deadlineEl) {
          opportunity.deadline = deadlineEl.textContent?.trim();
        }
      }

      // Extract location if selector exists
      if (this.config.selectors.location) {
        const locationEl = container.querySelector(this.config.selectors.location);
        if (locationEl) {
          opportunity.location = locationEl.textContent?.trim();
        }
      }

      // Extract application URL
      if (linkEl) {
        const href = linkEl.getAttribute('href');
        if (href) {
          opportunity.application_url = href.startsWith('http') 
            ? href 
            : `${this.config.baseUrl}${href}`;
        }
      }

      return opportunity;

    } catch (error) {
      console.warn('Error extracting opportunity from container:', error);
      return null;
    }
  }

  private isValidOpportunity(opportunity: ScrapedOpportunity): boolean {
    const text = `${opportunity.title} ${opportunity.description}`.toLowerCase();

    // Check exclude keywords
    if (this.config.filters.excludeKeywords) {
      for (const keyword of this.config.filters.excludeKeywords) {
        if (text.includes(keyword.toLowerCase())) {
          return false;
        }
      }
    }

    // Check include keywords (if specified)
    if (this.config.filters.keywords && this.config.filters.keywords.length > 0) {
      const hasMatchingKeyword = this.config.filters.keywords.some(keyword => 
        text.includes(keyword.toLowerCase())
      );
      if (!hasMatchingKeyword) {
        return false;
      }
    }

    return true;
  }

  private filterOpportunities(opportunities: ScrapedOpportunity[]): ScrapedOpportunity[] {
    return opportunities.filter(opp => this.isValidOpportunity(opp));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
