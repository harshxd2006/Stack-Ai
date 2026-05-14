import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import PricingBadge from './PricingBadge';
import StarRating from '../ui/StarRating';

const ToolDetailHero = ({ tool }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (tool) {
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked_tools') || '[]');
      const isSaved = storedBookmarks.some(b => b.id === tool.id || b.slug === tool.slug);
      setIsBookmarked(isSaved);
    }
  }, [tool]);

  const toggleBookmark = () => {
    if (!tool) return;
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked_tools') || '[]');
    let updated;
    
    if (isBookmarked) {
      updated = storedBookmarks.filter(b => b.id !== tool.id && b.slug !== tool.slug);
    } else {
      updated = [...storedBookmarks, tool];
    }
    
    localStorage.setItem('bookmarked_tools', JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  if (!tool) return null;

  return (
    <div className="relative pt-32 pb-16 overflow-hidden glass border-b border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-card border border-white/10 flex items-center justify-center p-4 shadow-xl flex-shrink-0">
            {tool.logo_url ? (
              <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-4xl font-bold">{tool.name?.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-5xl font-bold font-display">{tool.name}</h1>
              {tool.is_verified && (
                <svg className="text-teal w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              )}
            </div>
            
            <p className="text-xl text-text-muted mb-6 max-w-3xl">{tool.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <StarRating rating={tool.average_rating || 0} count={tool.review_count || 0} />
              <div className="w-px h-6 bg-white/10"></div>
              <PricingBadge pricing={tool.pricing_model} price={tool.starting_price} />
              <div className="w-px h-6 bg-white/10"></div>
              <span className="text-white/60 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5">
                {tool.categories?.name || 'Category'}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="px-8">Visit Website</Button>
              </a>
              <Button onClick={toggleBookmark} variant={isBookmarked ? "primary" : "outline"} size="lg" className="px-8">
                {isBookmarked ? "Remove Bookmark" : "Save to Bookmarks"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolDetailHero;
