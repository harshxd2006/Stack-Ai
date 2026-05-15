import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { slideUp, staggerContainer } from '../../utils/animations';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={slideUp} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-[#262626]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium text-text-muted">Over 2,000+ AI Tools Indexed</span>
          </motion.div>
          
          <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Supercharge Your Workflow with <span className="text-gradient">Stack AI</span>
          </motion.h1>
          
          <motion.p variants={slideUp} className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            Discover, review, and organize the best artificial intelligence tools in one premium platform. Build your ultimate AI tech stack today.
          </motion.p>
          
          <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8">
                Explore Tools
              </Button>
            </Link>
            <Link to="/#categories">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 glass hover:bg-white/5">
                Browse Categories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
