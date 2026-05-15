import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import Spinner from '../ui/Spinner';

const SearchDropdown = ({ query, onClose }) => {
  const { results, loading } = useSearch(query);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-full left-0 right-0 mt-2 glass-card border border-[#262626] overflow-hidden z-50 max-h-96 overflow-y-auto"
      >
        {loading ? (
          <div className="p-8 flex justify-center">
            <Spinner />
          </div>
        ) : results.length > 0 ? (
          <div className="py-2">
            {results.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-card border border-[#262626] flex items-center justify-center flex-shrink-0">
                  {tool.logo_url ? (
                    <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-xs font-bold">{tool.name?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{tool.name}</div>
                  <div className="text-xs text-text-muted line-clamp-1">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-text-muted">
            No tools found matching "{query}"
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDropdown;
