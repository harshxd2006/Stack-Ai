import React from 'react';

const RatingBreakdown = ({ breakdown }) => {
  if (!breakdown) return null;
  
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map(stars => {
        const count = breakdown[stars] || 0;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-12 shrink-0 text-text-muted">
              <span>{stars}</span>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            
            <div className="flex-grow h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <div className="w-8 text-right text-text-muted shrink-0">{count}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
