import React from 'react';

const ActiveFilters = ({ filters, setFilters }) => {
  const hasActiveFilters = filters.pricing.length > 0 || filters.categories.length > 0;

  if (!hasActiveFilters) return null;

  const removePricing = (model) => {
    setFilters({ ...filters, pricing: filters.pricing.filter(m => m !== model) });
  };

  const removeCategory = (slug) => {
    setFilters({ ...filters, categories: filters.categories.filter(c => c !== slug) });
  };

  const clearAll = () => {
    setFilters({ pricing: [], categories: [] });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-text-muted mr-2">Active Filters:</span>
      
      {filters.pricing.map(model => (
        <span key={model} className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-[#262626] rounded-full text-xs font-medium">
          <span className="capitalize">{model}</span>
          <button onClick={() => removePricing(model)} className="hover:text-accent ml-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </span>
      ))}
      
      {filters.categories.map(slug => (
        <span key={slug} className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-[#262626] rounded-full text-xs font-medium">
          <span className="capitalize">{slug.replace('-', ' ')}</span>
          <button onClick={() => removeCategory(slug)} className="hover:text-accent ml-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </span>
      ))}
      
      <button onClick={clearAll} className="text-xs text-text-muted hover:text-white underline ml-2">
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
