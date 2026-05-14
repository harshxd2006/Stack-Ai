import React from 'react';
import StarRating from '../ui/StarRating';
import RatingBreakdown from './RatingBreakdown';

const RatingOverview = ({ rating, count, breakdown }) => {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="flex flex-col items-center text-center md:w-1/3 shrink-0">
        <h3 className="text-lg font-medium text-text-muted mb-2">Average Rating</h3>
        <div className="text-5xl font-bold font-display text-white mb-3">
          {rating ? rating.toFixed(1) : '0.0'}
        </div>
        <StarRating rating={rating || 0} size="lg" />
        <p className="mt-2 text-sm text-text-muted">Based on {count || 0} reviews</p>
      </div>
      
      <div className="w-px h-32 bg-white/10 hidden md:block"></div>
      
      <div className="flex-grow w-full">
        <RatingBreakdown breakdown={breakdown} />
      </div>
    </div>
  );
};

export default RatingOverview;
