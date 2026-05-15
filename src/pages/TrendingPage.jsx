import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import TrendingDashboard from '../components/admin/TrendingDashboard';

const TrendingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24 min-h-screen"
    >
      <SEO title="Trending Tools - Stack AI" description="Discover what's trending right now on Stack AI." />
      
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4 text-white">
          Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#00D4AA]">Engine</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-dm-sans">
          Our intelligent anomaly detection engine tracks real-time traffic to surface the fastest-growing AI tools.
        </p>
      </div>

      <TrendingDashboard />

    </motion.div>
  );
};

export default TrendingPage;
