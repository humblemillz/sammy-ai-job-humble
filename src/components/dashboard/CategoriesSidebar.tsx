
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Crown, Lock } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: any;
  count: number;
}

interface CategoriesSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryClick: (categoryName: string) => void;
  userTier?: string;
  categoryRestrictionEnabled?: boolean;
}

const CategoriesSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryClick,
  userTier = 'free',
  categoryRestrictionEnabled = false
}: CategoriesSidebarProps) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const allowedCategories = ['Jobs', 'Internships']; // First two categories for free users
  const isRestricted = (categoryName: string) => {
    return categoryRestrictionEnabled && userTier === 'free' && !allowedCategories.includes(categoryName);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white/80 backdrop-blur-sm border-[#e6f5ec]/30 shadow-lg rounded-2xl overflow-hidden">
        {/* Header with gradient background */}
        <CardHeader className="bg-gradient-to-r from-[#e6f5ec]/50 to-white/50 border-b border-[#e6f5ec]/30">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="flex items-center gap-3 text-[#384040]">
              <div className="p-2 bg-[#17cfcf]/10 rounded-lg">
                <Filter className="w-5 h-5 text-[#17cfcf]" />
              </div>
              Categories
              {userTier === 'pro' && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Explore opportunities by category
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-3">
          {/* All Categories Button */}
          <motion.div variants={itemVariants}>
            <Button
              variant={selectedCategory === '' ? 'default' : 'ghost'}
              className={`w-full justify-start rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === '' 
                  ? 'bg-[#17cfcf] text-white shadow-lg hover:bg-[#17cfcf]/90 hover:shadow-xl' 
                  : 'text-[#384040] hover:bg-[#e6f5ec]/50 hover:text-[#17cfcf]'
              }`}
              onClick={() => onCategoryClick('')}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                All Categories
              </motion.span>
            </Button>
          </motion.div>

          {/* Upgrade prompt for free users */}
          {categoryRestrictionEnabled && userTier === 'free' && (
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-800">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-yellow-700 mb-3">
                  Access all categories and unlimited opportunities
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  onClick={() => onCategoryClick('upgrade')}
                >
                  Upgrade Now
                </Button>
              </div>
            </motion.div>
          )}

          {/* Category List */}
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.name;
            const restricted = isRestricted(category.name);
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: restricted ? 1 : 1.02 }}
                whileTap={{ scale: restricted ? 1 : 0.98 }}
              >
                <Button
                  variant={isSelected ? 'default' : 'ghost'}
                  className={`w-full justify-start rounded-xl font-medium transition-all duration-300 group relative ${
                    isSelected 
                      ? 'bg-[#17cfcf] text-white shadow-lg hover:bg-[#17cfcf]/90 hover:shadow-xl' 
                      : restricted
                      ? 'text-gray-400 hover:bg-gray-50 cursor-not-allowed opacity-60'
                      : 'text-[#384040] hover:bg-[#e6f5ec]/50 hover:text-[#17cfcf]'
                  }`}
                  onClick={() => onCategoryClick(category.name)}
                  disabled={restricted}
                >
                  <motion.div 
                    className="flex items-center justify-between w-full"
                    whileHover={{ x: restricted ? 0 : 2 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: restricted ? 0 : 5 }}
                        className={`transition-colors duration-300 ${
                          isSelected ? 'text-white' : restricted ? 'text-gray-400' : 'text-[#17cfcf] group-hover:text-[#17cfcf]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.div>
                      <span className="text-left font-medium">{category.name}</span>
                      {restricted && (
                        <Lock className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-semibold transition-all duration-300 ${
                          isSelected 
                            ? 'border-white/30 text-white bg-white/10' 
                            : restricted
                            ? 'border-gray-300 text-gray-400 bg-gray-50'
                            : 'border-[#17cfcf]/30 text-[#17cfcf] bg-[#17cfcf]/5 group-hover:border-[#17cfcf] group-hover:bg-[#17cfcf]/10'
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </motion.div>
                  </motion.div>
                </Button>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoriesSidebar;
