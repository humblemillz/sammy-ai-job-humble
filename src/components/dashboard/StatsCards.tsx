
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen,
  Briefcase,
  Trophy
} from 'lucide-react';

interface UserStats {
  savedOpportunities: number;
  applications: number;
  successRate: number;
}

interface StatsCardsProps {
  userStats: UserStats;
}

const StatsCards = ({ userStats }: StatsCardsProps) => {
  const stats = [
    {
      title: 'Saved Opportunities',
      value: userStats.savedOpportunities,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Applications',
      value: userStats.applications,
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Success Rate',
      value: `${userStats.successRate}%`,
      icon: Trophy,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-[#e6f5ec]/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e6f5ec]/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl`}
              />
              
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-sm font-medium text-gray-600 mb-2"
                    >
                      {stat.title}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-3xl font-bold text-[#384040]"
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1 + 0.5,
                      duration: 0.6
                    }}
                    className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} origin-left`}
                  style={{ width: '100%' }}
                />
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsCards;
