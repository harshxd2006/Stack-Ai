import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsFocused(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      <form onSubmit={handleSubmit} className="relative z-20">
        <div className={`flex items-center bg-card border ${isFocused ? 'border-accent' : 'border-white/10'} rounded-full px-4 py-2 transition-colors`}>
          <svg className="w-5 h-5 text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none px-3 py-1 text-white placeholder-text-muted"
            placeholder="Search for AI tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-text-muted hover:text-white">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {isFocused && query && (
        <SearchDropdown query={query} onClose={() => setIsFocused(false)} />
      )}
    </div>
  );
};

export default SearchBar;
