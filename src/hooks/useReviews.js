import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useReviews = (toolId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!toolId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*, users(full_name, avatar_url)')
          .eq('tool_id', toolId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [toolId]);

  return { reviews, loading, error };
};
