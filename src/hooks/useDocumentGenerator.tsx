
import { useState } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface GeneratedDocument {
  id: string;
  document_type: string;
  title: string;
  content: string;
  created_at: string;
  is_ats_optimized: boolean;
}

export const useDocumentGenerator = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<GeneratedDocument[]>([]);

  const generateDocument = async (
    documentType: 'cover_letter' | 'cv' | 'sop',
    opportunityId?: string,
    additionalInfo?: any
  ) => {
    if (!user) {
      toast.error('Please log in to generate documents');
      return null;
    }

    setLoading(true);
    try {
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let content = '';
      let title = '';
      
      switch (documentType) {
        case 'cover_letter':
          title = 'Professional Cover Letter';
          content = `Dear Hiring Manager,

I am writing to express my strong interest in the position at your company. With my extensive experience in software development and passion for creating innovative solutions, I am confident I would be a valuable addition to your team.

My key qualifications include:
• 5+ years of experience in React and TypeScript development
• Strong problem-solving skills and attention to detail
• Proven track record of delivering high-quality projects on time
• Excellent communication and teamwork abilities

I am particularly drawn to your company's mission and would welcome the opportunity to contribute to your continued success. I look forward to discussing how my skills and experience align with your needs.

Thank you for your consideration.

Sincerely,
${user.email}`;
          break;
          
        case 'cv':
          title = 'Professional CV/Resume';
          content = `${user.email}
Professional Developer

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of expertise in modern web technologies. Proven track record of building scalable applications and leading development teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3
• Backend: Node.js, Python, PostgreSQL
• Tools: Git, Docker, AWS, Supabase
• Methodologies: Agile, Test-Driven Development

EXPERIENCE
Senior Frontend Developer | TechCorp (2021 - Present)
• Led development of customer-facing applications serving 10k+ users
• Implemented modern React architecture reducing load times by 40%
• Mentored junior developers and established coding standards

Frontend Developer | StartupXYZ (2019 - 2021)
• Built responsive web applications using React and TypeScript
• Collaborated with design team to implement pixel-perfect UIs
• Optimized application performance and user experience

EDUCATION
Bachelor's Degree in Computer Science
University Name (2015 - 2019)

PROJECTS
• PrimeChances - Full-stack job portal with AI recommendations
• Personal Portfolio - Responsive website showcasing development skills`;
          break;
          
        case 'sop':
          title = 'Statement of Purpose';
          content = `STATEMENT OF PURPOSE

My journey in technology began with a simple curiosity about how digital products could solve real-world problems. Today, as an experienced software developer, I am eager to bring my skills and passion to your organization to create meaningful impact.

PROFESSIONAL BACKGROUND
Over the past 5+ years, I have developed expertise in modern web technologies, particularly React and TypeScript. My experience spans from building user-facing applications to architecting scalable backend systems. I have consistently delivered high-quality solutions that prioritize both functionality and user experience.

MOTIVATION AND GOALS
I am particularly drawn to your organization because of its commitment to innovation and positive impact. Your recent projects in [specific area] align perfectly with my interests and career aspirations. I am excited about the opportunity to contribute to meaningful work while continuing to grow as a professional.

UNIQUE VALUE PROPOSITION
What sets me apart is my combination of technical expertise and collaborative approach. I believe the best solutions emerge from diverse perspectives and open communication. I am committed to not only writing excellent code but also mentoring others and contributing to a positive team culture.

FUTURE VISION
I see this opportunity as a perfect next step in my career journey. I am excited to tackle new challenges, learn from experienced colleagues, and contribute to projects that make a real difference.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team's success.`;
          break;
      }

      const newDocument: GeneratedDocument = {
        id: crypto.randomUUID(),
        document_type: documentType,
        title,
        content,
        created_at: new Date().toISOString(),
        is_ats_optimized: true
      };

      setDocuments(prev => [newDocument, ...prev]);
      toast.success(`${documentType.replace('_', ' ')} generated successfully!`);
      return newDocument;
      
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to generate document');
    } finally {
      setLoading(false);
    }
    return null;
  };

  const fetchUserDocuments = async () => {
    if (!user) return;
    console.log('Fetching user documents for user:', user.id);
  };

  const deleteDocument = async (documentId: string) => {
    try {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      toast.success('Document deleted');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  return {
    generateDocument,
    fetchUserDocuments,
    deleteDocument,
    documents,
    loading
  };
};
