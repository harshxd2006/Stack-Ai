import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import StarPicker from './StarPicker';

const ReviewForm = ({ toolId, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a review.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const newReview = {
        id: Date.now().toString(),
        tool_id: toolId,
        user_id: user?.id || 'anonymous',
        rating,
        comment,
        created_at: new Date().toISOString(),
        profiles: {
          username: reviewerName.trim(),
          avatar_url: null
        }
      };

      // Get existing reviews
      const existingReviews = JSON.parse(localStorage.getItem(`reviews_${toolId}`) || '[]');
      
      // Save new review
      const updatedReviews = [newReview, ...existingReviews];
      localStorage.setItem(`reviews_${toolId}`, JSON.stringify(updatedReviews));

      // Dispatch a custom event to notify ReviewList
      window.dispatchEvent(new Event(`reviews_updated_${toolId}`));
      
      setRating(0);
      setComment('');
      // Keep reviewerName as is so they don't have to retype it if they review another tool
      if (onReviewSubmitted) onReviewSubmitted(newReview);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
      
      {error && <div className="text-red-400 text-sm mb-4 p-3 bg-red-400/10 rounded-lg">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-muted mb-2">Your Name</label>
        <input
          type="text"
          className="w-full bg-card border border-[#262626] rounded-xl p-3 text-white outline-none focus:border-accent"
          placeholder="Enter your name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-muted mb-2">Your Rating</label>
        <StarPicker rating={rating} setRating={setRating} />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-muted mb-2">Your Review</label>
        <textarea
          className="w-full bg-card border border-[#262626] rounded-xl p-3 text-white outline-none focus:border-accent min-h-[100px] resize-y"
          placeholder="What do you think about this tool?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      
      <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
