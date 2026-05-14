import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-screen"
    >
      <SEO title="About Us - Stack AI" />
      
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-2xl border border-white/10 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-8 text-white">
          About <span className="text-gradient">Stack AI</span>
        </h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>
            Welcome to Stack AI, your premium destination for discovering, reviewing, and organizing the absolute best artificial intelligence tools on the web.
          </p>
          <p>
            In an era where new AI technologies are launching daily, it can be overwhelming to find the right tools for your specific workflow. That is why we built Stack AI—a curated platform designed to help creators, developers, marketers, and businesses build their ultimate AI tech stack.
          </p>
          <p>
            Our mission is simple: to cut through the noise and provide a beautifully designed, meticulously organized directory of AI tools. We index tools across various categories including Audio, Copywriting, Coding, Image Generation, and more, ensuring you always have access to cutting-edge technology.
          </p>
          <div className="pt-6 mt-6 border-t border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
            <p>
              We believe that AI is fundamentally changing the way humans work and create. By providing a centralized, premium platform for AI tool discovery, we hope to empower individuals and teams to supercharge their productivity and unlock new creative possibilities.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
