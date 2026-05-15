import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { useCategories } from '../../hooks/useCategories';

const MobileMenu = ({ isOpen, onClose, user, onSignOut }) => {
  const [mounted, setMounted] = useState(false);
  const { categories } = useCategories();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-[#09090B] flex flex-col pt-24 px-6 pb-6"
        >
          <button 
            className="absolute top-6 right-6 p-2 text-white"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="flex flex-col gap-6 text-lg">
            <Link to="/search" onClick={onClose} className="text-white font-medium">Search</Link>
            <Link to="/trending" onClick={onClose} className="text-[#7C3AED] font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              Trending Engine
            </Link>
            
            {user?.email === import.meta.env.VITE_ADMIN_EMAIL && (
              <Link to="/admin" onClick={onClose} className="text-[#7C3AED] font-bold">Admin Tools</Link>
            )}
            
            <div className="flex flex-col gap-3">
              <span className="text-white/60 font-medium text-sm uppercase tracking-wider">Categories</span>
              <div className="flex flex-col gap-3 pl-4 border-l border-[#262626]">
                {(categories || []).map(cat => (
                  <Link 
                    key={cat.slug} 
                    to={`/category/${cat.slug}`} 
                    onClick={onClose} 
                    className="text-white/90 hover:text-white font-medium text-base"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {user ? (
              <>
                <Link to="/profile" onClick={onClose} className="text-white font-medium">Profile</Link>
                <Link to="/bookmarks" onClick={onClose} className="text-white font-medium">Bookmarks</Link>
                <Button variant="outline" className="mt-4" onClick={() => { onSignOut(); onClose(); }}>Sign Out</Button>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Link to="/login" onClick={onClose}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/signup" onClick={onClose}>
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(menuContent, document.body);
};

export default MobileMenu;
