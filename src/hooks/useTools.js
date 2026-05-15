import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useTools = (options = {}) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        let query;
        
        if (options.categorySlug) {
          query = supabase.from('tools').select('*, categories!inner(*)');
          query = query.eq('categories.slug', options.categorySlug);
        } else {
          query = supabase.from('tools').select('*, categories(*)');
        }

        if (options.categoryId) {
          query = query.eq('category_id', options.categoryId);
        }
        if (options.slug) {
          query = query.eq('slug', options.slug);
        }
        if (options.featured) {
          query = query.eq('featured', true);
        }
        if (options.limit) {
          query = query.limit(options.limit);
        }

        // Use Promise.race to enforce a 15 second timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase request timed out after 15 seconds')), 15000)
        );

        const { data, error } = await Promise.race([query, timeoutPromise]);

        if (error) throw error;
        setTools(data || []);
      } catch (err) {
        console.error('Tools fetch error:', err);
        setError(err.message);
        setTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [options.categoryId, options.categorySlug, options.slug, options.featured, options.limit]);

  return { tools, loading, error };
};
