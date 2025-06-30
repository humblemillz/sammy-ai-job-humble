
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface ApplicationSteps {
  steps: Array<{
    step: number;
    title: string;
    description: string;
    documents: string[];
    timeEstimate: string;
    tips: string[];
  }>;
  timeline: string;
  checklist: string[];
}

interface ApplicationChance {
  score: number;
  percentage: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  recommendations: string[];
  similarOpportunities: string[];
}

export const useApplicationAnalyzer = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<ApplicationSteps | null>(null);
  const [chanceAnalysis, setChanceAnalysis] = useState<ApplicationChance | null>(null);

  const generateApplicationSteps = async (opportunityId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('application-analyzer', {
        body: {
          userId: user.id,
          opportunityId,
          analysisType: 'steps'
        }
      });

      if (error) throw error;

      setSteps(data.analysis);
      toast({
        title: "Application Guide Generated",
        description: "Your personalized application steps are ready!",
      });
    } catch (error) {
      console.error('Error generating application steps:', error);
      toast({
        title: "Error",
        description: "Failed to generate application guide.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeApplicationChance = async (opportunityId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('application-analyzer', {
        body: {
          userId: user.id,
          opportunityId,
          analysisType: 'chance'
        }
      });

      if (error) throw error;

      setChanceAnalysis(data.analysis);
      toast({
        title: "Application Analysis Complete",
        description: "Your success probability has been calculated!",
      });
    } catch (error) {
      console.error('Error analyzing application chance:', error);
      toast({
        title: "Error",
        description: "Failed to analyze application chance.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    steps,
    chanceAnalysis,
    generateApplicationSteps,
    analyzeApplicationChance,
    clearAnalysis: () => {
      setSteps(null);
      setChanceAnalysis(null);
    }
  };
};
