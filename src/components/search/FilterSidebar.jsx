import React from 'react';
import { CATEGORIES } from '../../utils/constants';

const FilterSidebar = ({ filters, setFilters }) => {
  const handlePricingChange = (model) => {
    const newModels = filters.pricing.includes(model)
      ? filters.pricing.filter(m => m !== model)
      : [...filters.pricing, model];
    setFilters({ ...filters, pricing: newModels });
  };

  const handleCategoryChange = (slug) => {
    const newCats = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug];
    setFilters({ ...filters, categories: newCats });
  };

  return (
    <div className="w-full space-y-8 pr-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pricing</h3>
        <div className="space-y-3">
          {['free', 'freemium', 'paid'].map((model) => (
            <label key={model} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.pricing.includes(model) ? 'bg-accent border-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                {filters.pricing.includes(model) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="capitalize text-sm text-text-muted group-hover:text-white transition-colors">{model}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.categories.includes(cat.slug) ? 'bg-accent border-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                {filters.categories.includes(cat.slug) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text-muted group-hover:text-white transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
