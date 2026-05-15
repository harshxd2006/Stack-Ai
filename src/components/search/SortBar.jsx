import React from 'react';
import { SORT_OPTIONS } from '../../utils/constants';

const SortBar = ({ sort, setSort, totalResults }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-[#262626] mb-6">
      <div className="text-text-muted text-sm">
        Showing <span className="font-semibold text-white">{totalResults}</span> results
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-muted">Sort by:</span>
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-card border border-[#262626] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-accent"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortBar;
