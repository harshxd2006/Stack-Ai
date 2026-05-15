import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Hook to silently track tool views.
 * Call this in your ToolDetailPage.
 * Generates an anonymous session ID to prevent tracking a single user's repeated page refreshes as massive spikes.
 */
export function useTracking(toolId) {
  useEffect(() => {
    if (!toolId) return;

    let sessionId = sessionStorage.getItem('stack_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('stack_session_id', sessionId);
    }

    const logView = async () => {
      try {
        const { error } = await supabase
          .from('tool_views')
          .insert([{ tool_id: toolId, session_id: sessionId }]);
        
        if (error) {
          // It's possible the table doesn't exist yet in the database.
          // Silently fail to not interrupt UX.
          console.debug('Tracking insert failed or table missing:', error.message);
        }
      } catch (err) {
        console.debug('Tracking error:', err);
      }
    };

    logView();

  }, [toolId]);
}
