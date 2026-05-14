import React from 'react';
import { Link } from 'react-router-dom';
import PricingBadge from './PricingBadge';
import StarRating from '../ui/StarRating';
import { formatCurrency } from '../../utils/formatters';

const ToolCard = ({ tool }) => {
  if (!tool) return null;

  return (
    <Link to={`/tool/${tool.slug}`} className="block h-full">
      <div className="glass-card p-5 h-full flex flex-col group">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
            {tool.logo_url ? (
              <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold">{tool.name?.charAt(0)}</span>
            )}
          </div>
          <PricingBadge pricing={tool.pricing_model} price={tool.starting_price} />
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{tool.name}</h3>
        <p className="text-sm text-text-muted mb-4 flex-grow line-clamp-2">{tool.description}</p>
        
        {tool.website_url && (
          <div className="text-xs text-accent mb-4 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
              <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
            </svg>
            <span className="truncate">{tool.website_url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <StarRating rating={tool.average_rating || 0} count={tool.review_count || 0} size="sm" />
          <div className="text-xs font-medium text-white/50 px-2 py-1 rounded-md bg-white/5">
            {tool.categories?.name || 'AI Tool'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
