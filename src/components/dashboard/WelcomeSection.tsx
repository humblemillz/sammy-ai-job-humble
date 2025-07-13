import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeSectionProps {
  user: any;
}

const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex-1">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#384040] mb-2"
        >
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-[#90EE90] to-[#32CD32] bg-clip-text text-transparent">
            {user?.user_metadata?.full_name || 'User'}!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-sm sm:text-base lg:text-lg"
        >
          Ready to discover your next big opportunity? Let's find something amazing for you.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          onClick={() => navigate('/ai-assistant')}
          className="flex items-center gap-2 bg-[#008000] hover:bg-[#218c1b] text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300 font-semibold text-base"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">AI Recommendations</span>
          <span className="sm:hidden">AI Assistant</span>
        </Button>

        <Button
          onClick={() => navigate('/create-opportunity')}
          className="flex items-center gap-2 bg-[#008000] hover:bg-[#218c1b] text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300 font-semibold text-base"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Create Opportunity</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;
