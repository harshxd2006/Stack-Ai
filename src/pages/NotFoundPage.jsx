import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
    >
      <SEO title="404: Page Not Found - StackAi" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-400 leading-none mb-4"
      >
        404
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl font-bold font-syne text-white mb-6">
        Oops! You've drifted into empty space.
      </h1>
      
      <p className="text-gray-400 max-w-lg mb-8 text-lg">
        The page you are looking for doesn't exist or has been moved. Let's get you back to familiar territory.
      </p>
      
      <Link to="/">
        <Button size="lg" className="px-8">
          Return to Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
