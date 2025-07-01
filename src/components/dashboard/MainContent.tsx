import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Briefcase } from 'lucide-react';
import OpportunitiesList from '@/components/OpportunitiesList';

interface MainContentProps {
  selectedCategory: string;
  searchQuery: string;
}

const MainContent = ({ selectedCategory, searchQuery }: MainContentProps) => {
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Tabs defaultValue="discover" className="w-full">
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-[#e6f5ec]/30 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg">
            <TabsTrigger 
              value="discover" 
              className="rounded-lg sm:rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#90EE90] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50 text-xs sm:text-sm"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks"
              className="rounded-lg sm:rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#90EE90] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50 text-xs sm:text-sm"
            >
              Bookmarks
            </TabsTrigger>
            <TabsTrigger 
              value="applications"
              className="rounded-lg sm:rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#90EE90] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50 text-xs sm:text-sm"
            >
              Applications
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="discover" className="mt-6 sm:mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-4 sm:mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#90EE90]/10 to-[#e6f5ec]/10 rounded-xl sm:rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-bold text-[#384040] mb-2"
                >
                  {selectedCategory ? `${selectedCategory} Opportunities` : 'All Opportunities'}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm sm:text-base text-gray-600"
                >
                  Discover opportunities that match your interests and goals.
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OpportunitiesList 
                categoryFilter={selectedCategory}
                searchQuery={searchQuery}
                limit={10}
              />
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="bookmarks" className="mt-6 sm:mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-4 sm:mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#90EE90]/10 to-[#e6f5ec]/10 rounded-xl sm:rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-bold text-[#384040] mb-2"
                >
                  Bookmarked Opportunities
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm sm:text-base text-gray-600"
                >
                  Your saved opportunities for easy access.
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OpportunitiesList 
                categoryFilter={selectedCategory}
                searchQuery={searchQuery}
                limit={10}
                showBookmarksOnly={true}
              />
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6 sm:mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-4 sm:mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#90EE90]/10 to-[#e6f5ec]/10 rounded-xl sm:rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-bold text-[#384040] mb-2"
                >
                  My Applications
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm sm:text-base text-gray-600"
                >
                  Track your application progress and status.
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OpportunitiesList 
                categoryFilter={selectedCategory}
                searchQuery={searchQuery}
                limit={10}
                showApplicationsOnly={true}
              />
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MainContent;
