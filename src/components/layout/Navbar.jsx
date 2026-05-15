import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { useCategories } from '../../hooks/useCategories';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { categories: dbCategories } = useCategories();

  const isHome = location.pathname === '/';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] glass border-b border-[#262626] h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {!isHome && (
            <button 
              onClick={() => navigate(-1)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-[#262626] text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <Link to="/" className="text-2xl font-display font-bold text-gradient shrink-0">
            Stack AI
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-text-muted hover:text-white transition-colors">Search</Link>
            <Link to="/trending" className="text-text-muted hover:text-white transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C3AED]"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              Trending
            </Link>
            <div className="relative group">
              <button 
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                className="text-text-muted hover:text-white transition-colors cursor-pointer py-2 font-medium flex items-center gap-1"
              >
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 group-hover:rotate-180 ${categoryDropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className={`absolute top-[100%] left-0 pt-2 w-56 transition-all duration-200 z-[100] ${categoryDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}>
                <div className="glass-card rounded-xl py-2 shadow-2xl border border-[#262626] bg-[#09090B]/95 backdrop-blur-xl">
                  {(dbCategories || []).length > 0 ? (
                    dbCategories.map(cat => (
                      <Link 
                        key={cat.slug} 
                        to={`/category/${cat.slug}`} 
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-white/50 text-center">
                      {dbCategories ? "Loading categories..." : "Categories unavailable"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user?.email === import.meta.env.VITE_ADMIN_EMAIL && (
            <Link to="/admin" className="text-[#7C3AED] hover:text-white transition-colors font-medium mr-2">Admin Tools</Link>
          )}
          {user ? (
            <>
              <Link to="/bookmarks" className="text-text-muted hover:text-white">Bookmarks</Link>
              <Link to="/profile" className="text-text-muted hover:text-white">Profile</Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-text-muted hover:text-white">Log in</Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        user={user}
        onSignOut={handleSignOut}
      />
    </nav>
  );
};

export default Navbar;
