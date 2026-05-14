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

        const { data, error } = await query;

        if (error) throw error;
        setTools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [options.categoryId, options.categorySlug, options.slug, options.featured, options.limit]);

  return { tools, loading, error };
};
