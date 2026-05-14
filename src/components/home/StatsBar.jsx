import React from 'react';
import { motion } from 'framer-motion';

const StatsBar = () => {
  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'AI Tools', value: '2,000+' },
    { label: 'Categories', value: '45+' },
    { label: 'Reviews', value: '100K+' },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-text-muted uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
