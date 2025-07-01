import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Globe, Users, Trophy, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '@/components/ui/hero-section-1';
import LandingOpportunities from '@/components/LandingOpportunities';
import { Testimonials } from '@/components/ui/testimonials-columns-1';
import { FooterDemo } from '@/components/ui/footer-section';
import SubscriptionPricing from '@/components/ui/subscription-pricing';
import { useAuth } from '@/hooks/useAuth';

const LandingPage = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access thousands of verified opportunities from top organizations worldwide."
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Get personalized recommendations based on your skills and preferences."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded professionals and get guidance from experts."
    },
    {
      icon: Trophy,
      title: "Success Tracking",
      description: "Monitor your applications and track your success rate with detailed analytics."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Opportunities" },
    { number: "50,000+", label: "Registered Users" },
    { number: "95%", label: "Success Rate" },
    { number: "200+", label: "Partner Organizations" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-white via-[#e6f5ec]/20 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#17cfcf] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#e6f5ec] rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bg-white/80 backdrop-blur-md border-b border-[#e6f5ec]/30 sticky top-0"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#17cfcf] to-[#17cfcf]/80 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#384040]">OpportunityHub</span>
              </motion.div>
              
              <nav className="hidden md:flex space-x-8">
                {['Features', 'Pricing', 'About', 'Testimonials', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-[#384040] hover:text-[#17cfcf] transition-colors font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                {user ? (
                  <Link to="/dashboard">
                    <Button className="bg-[#17cfcf] hover:bg-[#17cfcf]/90 text-white rounded-xl px-6 shadow-lg hover:shadow-[#17cfcf]/30 transition-all duration-300">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="ghost" className="text-[#384040] hover:text-[#17cfcf] hover:bg-[#e6f5ec]/30">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="bg-[#17cfcf] hover:bg-[#17cfcf]/90 text-white rounded-xl px-6 shadow-lg hover:shadow-[#17cfcf]/30 transition-all duration-300">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center space-x-2 bg-[#e6f5ec]/50 text-[#384040] px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Star className="w-4 h-4 text-[#17cfcf]" />
                <span>Trusted by 50,000+ professionals</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-[#384040] mb-6 leading-tight"
            >
              Discover Your Next
              <span className="block bg-gradient-to-r from-[#17cfcf] to-[#17cfcf]/80 bg-clip-text text-transparent">
                Big Opportunity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Access thousands of verified opportunities from top organizations worldwide. 
              Jobs, scholarships, fellowships, grants, and more - all in one place with AI-powered matching.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              {user ? (
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-[#17cfcf] hover:bg-[#17cfcf]/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-[#17cfcf]/30 transform hover:scale-105 transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-[#17cfcf] hover:bg-[#17cfcf]/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-[#17cfcf]/30 transform hover:scale-105 transition-all duration-300"
                  >
                    Start Exploring
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 rounded-2xl text-lg border-2 border-[#e6f5ec] text-[#384040] hover:bg-[#e6f5ec]/30 hover:border-[#17cfcf] transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#17cfcf] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-[#e6f5ec]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#384040] mb-6">
              Why Choose OpportunityHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform connects you with global opportunities through intelligent matching, 
              personalized recommendations, and seamless application tracking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl border border-[#e6f5ec]/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#17cfcf]/20 to-[#e6f5ec]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-[#17cfcf]" />
                </div>
                <h3 className="text-xl font-bold text-[#384040] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <LandingOpportunities />

      {/* Pricing Section */}
      <section id="pricing">
        <SubscriptionPricing />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-[#e6f5ec]/10">
        <Testimonials />
      </section>

      {/* Footer Section */}
      <FooterDemo />
    </div>
  );
};

export default LandingPage;
