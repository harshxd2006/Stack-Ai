import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Use Promise.race to enforce a 15 second timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase request timed out after 15 seconds')), 15000)
        );
        
        const fetchPromise = supabase.from('categories').select('*').order('name');
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error('Category fetch error:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
