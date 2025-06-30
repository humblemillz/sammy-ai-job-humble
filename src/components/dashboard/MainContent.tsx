
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
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-[#e6f5ec]/30 rounded-2xl p-2 shadow-lg">
            <TabsTrigger 
              value="discover" 
              className="rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#17cfcf] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks"
              className="rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#17cfcf] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50"
            >
              Bookmarks
            </TabsTrigger>
            <TabsTrigger 
              value="applications"
              className="rounded-xl font-medium text-[#384040] data-[state=active]:bg-[#17cfcf] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#e6f5ec]/50"
            >
              Applications
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="discover" className="mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#17cfcf]/10 to-[#e6f5ec]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-[#384040] mb-2"
                >
                  {selectedCategory ? `${selectedCategory} Opportunities` : 'All Opportunities'}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-600"
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
        
        <TabsContent value="bookmarks" className="mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#17cfcf]/10 to-[#e6f5ec]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-[#384040] mb-2"
                >
                  Saved Opportunities
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-600"
                >
                  Your bookmarked opportunities for later review.
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
        
        <TabsContent value="applications" className="mt-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#17cfcf]/10 to-[#e6f5ec]/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#e6f5ec]/30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-[#384040] mb-2"
                >
                  My Applications
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-600"
                >
                  Track your application status and follow-ups.
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-[#e6f5ec]/30 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#17cfcf]/10 to-[#e6f5ec]/10 rounded-full blur-2xl"></div>
                    <div className="relative p-8 bg-[#e6f5ec]/20 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-[#17cfcf]" />
                    </div>
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl font-semibold text-[#384040] mb-3"
                  >
                    No applications yet
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-600"
                  >
                    Your submitted applications will appear here.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MainContent;
