import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import ToolGrid from '../components/tools/ToolGrid';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/search/SearchBar';
import { CATEGORIES } from '../utils/constants';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading } = useSearch(query);
  const [pricingFilter, setPricingFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredResults = useMemo(() => {
    return results.filter(tool => {
      const toolPricing = (tool.pricing_model || tool.pricing_type || 'free').toLowerCase();
      const matchPricing = pricingFilter === 'all' || toolPricing.includes(pricingFilter.toLowerCase());
      const matchCategory = categoryFilter === 'all' || tool.categories?.slug === categoryFilter;
      return matchPricing && matchCategory;
    });
  }, [results, pricingFilter, categoryFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <SEO title={query ? `Search: ${query} - StackAi` : 'Search AI Tools - StackAi'} />
      
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-white/5 shadow-lg relative z-20">
        <div className="w-full md:flex-grow">
          <SearchBar className="w-full" />
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <div className="relative">
            <select 
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value)}
              className="w-full sm:w-40 bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-white focus:outline-none focus:border-accent appearance-none cursor-pointer"
            >
              <option className="bg-[#0B0F19] text-white" value="all">All Pricing</option>
              <option className="bg-[#0B0F19] text-white" value="free">Free</option>
              <option className="bg-[#0B0F19] text-white" value="freemium">Freemium</option>
              <option className="bg-[#0B0F19] text-white" value="paid">Paid</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <ToolGrid tools={filteredResults} loading={loading} />
      </div>
    </motion.div>
  );
};

export default SearchResultsPage;
