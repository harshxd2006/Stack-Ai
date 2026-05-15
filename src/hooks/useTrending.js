import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { detectTrendingTools } from '../lib/trendingEngine';

/**
 * Hook to fetch all view data, run the anomaly detection engine, and return sorted results.
 */
export function useTrending() {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchTrendingData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real production app, limit to last 30 days to save bandwidth.
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error: fetchError } = await supabase
        .from('tool_views')
        .select('tool_id, viewed_at')
        .gte('viewed_at', thirtyDaysAgo.toISOString());

      if (fetchError) {
        throw fetchError;
      }

      // Group views by tool_id
      const viewsByTool = (data || []).reduce((acc, view) => {
        if (!acc[view.tool_id]) acc[view.tool_id] = [];
        acc[view.tool_id].push(view);
        return acc;
      }, {});

      // Pass raw data into the pure JS Z-score anomaly detector
      const processedData = detectTrendingTools(viewsByTool);
      
      setTrendingData(processedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch trending data:', err);
      // If table doesn't exist yet, just fail gracefully with empty data
      if (err.message?.includes('does not exist')) {
        setTrendingData([]);
        setLastUpdated(new Date());
      } else {
        setError(err.message || 'An error occurred fetching trending data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingData();
  }, [fetchTrendingData]);

  return { trendingData, loading, error, refetch: fetchTrendingData, lastUpdated };
}
