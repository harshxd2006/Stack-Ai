import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
