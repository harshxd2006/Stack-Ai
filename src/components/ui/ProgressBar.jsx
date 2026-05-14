import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, height = 'h-1', color = 'bg-accent', className = '' }) => {
  return (
    <div className={`w-full bg-white/10 rounded-full overflow-hidden ${height} ${className}`}>
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};

export default ProgressBar;
