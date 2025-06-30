
import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeSectionProps {
  user: any;
}

const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-[#17cfcf]/10 to-[#e6f5ec]/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#e6f5ec]/30 shadow-lg">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold bg-gradient-to-r from-[#384040] to-[#1b1c1c] bg-clip-text text-transparent mb-3"
        >
          Welcome back, {user?.user_metadata?.full_name || 'there'}!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Discover new opportunities and take the next step in your career journey.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-[#17cfcf] to-[#e6f5ec] rounded-full mt-4 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
