import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import Skeleton from '../ui/Skeleton';

const ReviewList = ({ reviews: propReviews, loading: propLoading, toolId }) => {
  const [localReviews, setLocalReviews] = useState([]);
  const [loading, setLoading] = useState(propLoading || false);

  useEffect(() => {
    if (toolId && !propReviews) {
      const loadReviews = () => {
        setLoading(true);
        const stored = localStorage.getItem(`reviews_${toolId}`);
        if (stored) {
          setLocalReviews(JSON.parse(stored));
        } else {
          setLocalReviews([]);
        }
        setLoading(false);
      };

      loadReviews();

      // Listen for new reviews
      const handleUpdate = () => loadReviews();
      window.addEventListener(`reviews_updated_${toolId}`, handleUpdate);
      return () => window.removeEventListener(`reviews_updated_${toolId}`, handleUpdate);
    }
  }, [toolId, propReviews]);

  const displayReviews = propReviews || localReviews;

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-24 h-4 mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!displayReviews || displayReviews.length === 0) {
    return (
      <div className="text-center py-12 glass-card border-dashed">
        <div className="text-text-muted mb-2">No reviews yet.</div>
        <p className="text-sm">Be the first to share your experience with this tool!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayReviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
