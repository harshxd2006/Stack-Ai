import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import ToolCard from '../components/tools/ToolCard';
import Skeleton from '../components/ui/Skeleton';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = () => {
      setLoading(true);
      try {
        const stored = JSON.parse(localStorage.getItem('bookmarked_tools') || '[]');
        setBookmarks(stored);
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-[80vh]"
    >
      <SEO title="Your Bookmarks - StackAi" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-syne text-white mb-2">Your Bookmarks</h1>
        <p className="text-gray-400">Tools you've saved for later</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map((tool, index) => (
            <ToolCard key={tool.id || index} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card/30 border border-white/5 rounded-2xl">
          <h3 className="text-xl text-white font-medium mb-2">No bookmarks yet</h3>
          <p className="text-gray-400">Start exploring and save your favorite tools!</p>
        </div>
      )}
    </motion.div>
  );
};

export default BookmarksPage;
