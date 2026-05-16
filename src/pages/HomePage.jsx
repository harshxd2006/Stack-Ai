import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedTools from '../components/home/FeaturedTools';
import TrendingSection from '../components/home/TrendingSection';
import StatsBar from '../components/home/StatsBar';
import SEO from '../components/ui/SEO';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <SEO title="StackAi - Home | Discover Best AI Tools" />
      <HeroSection />
      <StatsBar />
      <div className="container mx-auto px-4 py-16 space-y-24">
        <CategoryGrid />
        <FeaturedTools />
        <TrendingSection />
      </div>
    </motion.div>
  );
};

export default HomePage;
