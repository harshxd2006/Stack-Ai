import React from 'react';
import { Link } from 'react-router-dom';
import PricingBadge from './PricingBadge';
import StarRating from '../ui/StarRating';
import Skeleton from '../ui/Skeleton';

const ToolList = ({ tools = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass-card p-4 flex gap-4 items-center">
            <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="hidden md:block w-32 space-y-2">
              <Skeleton className="h-6 w-full rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {tools.map(tool => (
        <Link key={tool.id} to={`/tool/${tool.slug}`} className="block">
          <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center group hover:border-accent/30 transition-all">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
              {tool.logo_url ? (
                <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-xl font-bold">{tool.name?.charAt(0)}</span>
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{tool.name}</h3>
                <div className="text-xs font-medium text-white/50 px-2 py-0.5 rounded bg-white/5 hidden sm:block">
                  {tool.categories?.name || 'AI Tool'}
                </div>
              </div>
              <p className="text-sm text-text-muted line-clamp-2 sm:line-clamp-1">{tool.description}</p>
            </div>
            
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-2 sm:gap-1 flex-shrink-0">
              <PricingBadge pricing={tool.pricing_model} price={tool.starting_price} />
              <StarRating rating={tool.average_rating || 0} count={tool.review_count || 0} size="sm" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ToolList;
