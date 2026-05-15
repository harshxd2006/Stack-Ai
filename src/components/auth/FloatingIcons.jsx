import React from 'react';
import { motion } from 'framer-motion';

const FloatingIcons = () => {
  const icons = [
    { icon: '🤖', size: 'text-4xl', top: '10%', left: '10%', delay: 0 },
    { icon: '✨', size: 'text-3xl', top: '20%', left: '80%', delay: 0.5 },
    { icon: '🚀', size: 'text-5xl', top: '70%', left: '15%', delay: 1 },
    { icon: '🧠', size: 'text-4xl', top: '80%', left: '85%', delay: 1.5 },
    { icon: '⚡', size: 'text-3xl', top: '40%', left: '90%', delay: 0.8 },
    { icon: '🔍', size: 'text-4xl', top: '50%', left: '5%', delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} opacity-20`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full" />
    </div>
  );
};

export default FloatingIcons;
