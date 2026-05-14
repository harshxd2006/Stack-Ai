import React from 'react';
import StarRating from '../ui/StarRating';
import { formatDate } from '../../utils/formatters';
import Avatar from '../ui/Avatar';

const ReviewCard = ({ review }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar url={review.users?.avatar_url || review.profiles?.avatar_url} name={review.profiles?.username || review.users?.full_name || 'User'} />
          <div>
            <div className="font-medium">{review.profiles?.username || review.users?.full_name || 'Anonymous User'}</div>
            <div className="text-xs text-text-muted">{formatDate(review.created_at)}</div>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-white/80 leading-relaxed text-sm">{review.comment}</p>
      
      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
        <button className="flex items-center gap-1 hover:text-white transition-colors">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
          Helpful ({review.helpful_votes || 0})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
