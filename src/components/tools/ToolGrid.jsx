import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolCard from './ToolCard';
import Skeleton from '../ui/Skeleton';

const ToolGrid = ({ tools = [], loading = false }) => {
  if (loading) {
    return (
      <div className="relative pb-32 w-full max-w-3xl mx-auto flex flex-col items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <figure key={`skeleton-${i}`} className="sticky top-40 h-[60vh] w-full grid place-content-center">
            <div className="w-full max-w-xl mx-auto glass-card p-5 h-[240px] flex flex-col rounded-3xl">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4 flex-grow" />
              <div className="mt-auto pt-4 border-t border-[#262626] flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
            </div>
          </figure>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-white mb-2">No tools found</h3>
        <p className="text-text-muted">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="relative pb-32 w-full max-w-3xl mx-auto flex flex-col">
      <AnimatePresence mode="popLayout">
        {tools.map((tool, idx) => {
          // Slight alternating rotations to make the stack look dynamic and organic
          const rotation = ['rotate-0', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'][idx % 5];
          
          return (
            <motion.figure 
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={tool.id} 
              className="sticky top-32 sm:top-40 h-[50vh] sm:h-[60vh] w-full grid place-content-center"
              style={{ zIndex: idx }}
            >
              <div className={`w-full max-w-xl mx-auto transition-all duration-300 hover:scale-[1.02] ${rotation} shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-[24px]`}>
                <ToolCard tool={tool} />
              </div>
            </motion.figure>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToolGrid;
