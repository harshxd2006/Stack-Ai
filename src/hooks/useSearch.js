import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useDebounce } from './useDebounce';

export const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchTools = async () => {
      try {
        setLoading(true);
        
        // Mock data fallback if Supabase isn't configured yet
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
          const mockTools = [
            { id: '1', name: 'ChatGPT', slug: 'chatgpt', description: 'Advanced language model by OpenAI capable of text generation and answering questions.', categories: { name: 'Copywriting', slug: 'copywriting' }, pricing_model: 'freemium', average_rating: 4.8 },
            { id: '2', name: 'Midjourney', slug: 'midjourney', description: 'AI art generator creating high-quality images from text.', categories: { name: 'Image Generation', slug: 'image-generation' }, pricing_model: 'paid', average_rating: 4.9 },
            { id: '3', name: 'GitHub Copilot', slug: 'github-copilot', description: 'AI pair programmer that suggests code completions.', categories: { name: 'Coding Assistants', slug: 'coding' }, pricing_model: 'paid', average_rating: 4.7 },
            { id: '4', name: 'Notion AI', slug: 'notion-ai', description: 'AI features integrated into Notion to summarize and generate content.', categories: { name: 'Copywriting', slug: 'copywriting' }, pricing_model: 'freemium', average_rating: 4.5 },
            { id: '5', name: 'Cursor', slug: 'cursor', description: 'The AI code editor built for modern developers.', categories: { name: 'Coding Assistants', slug: 'coding' }, pricing_model: 'freemium', average_rating: 4.8 },
            { id: '6', name: 'Claude', slug: 'claude', description: 'Next-generation AI assistant with large context.', categories: { name: 'Copywriting', slug: 'copywriting' }, pricing_model: 'freemium', average_rating: 4.8 },
            { id: '7', name: 'Runway', slug: 'runway', description: 'Next-generation video creation and editing.', categories: { name: 'Video Editing', slug: 'video-editing' }, pricing_model: 'freemium', average_rating: 4.6 },
            { id: '8', name: 'Synthesia', slug: 'synthesia', description: 'Create professional videos with AI avatars and text-to-speech.', categories: { name: 'Video Editing', slug: 'video-editing' }, pricing_model: 'paid', average_rating: 4.6 },
            { id: '9', name: 'Jasper', slug: 'jasper', description: 'AI copywriter and content creator for marketing.', categories: { name: 'Copywriting', slug: 'copywriting' }, pricing_model: 'paid', average_rating: 4.4 },
            { id: '10', name: 'DALL-E 3', slug: 'dall-e-3', description: 'OpenAI image generation model built into ChatGPT.', categories: { name: 'Image Generation', slug: 'image-generation' }, pricing_model: 'freemium', average_rating: 4.7 },
            { id: '11', name: 'Suno AI', slug: 'suno-ai', description: 'Groundbreaking music and audio generation platform.', categories: { name: 'Audio & Voice', slug: 'audio' }, pricing_model: 'freemium', average_rating: 4.9 }
          ];
          
          // Simulate network delay
          await new Promise(r => setTimeout(r, 250));
          
          const q = debouncedQuery ? debouncedQuery.toLowerCase() : '';
          const filtered = q ? mockTools.filter(t => 
            t.name.toLowerCase().includes(q) || 
            t.description.toLowerCase().includes(q) ||
            t.categories.name.toLowerCase().includes(q)
          ) : mockTools;
          setResults(filtered);
          setLoading(false);
          return;
        }

        let queryBuilder = supabase
          .from('tools')
          .select('*, categories(*)')
          .limit(20);

        if (debouncedQuery) {
          queryBuilder = queryBuilder.or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%`);
        }

        const { data, error } = await queryBuilder;

        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchTools();
  }, [debouncedQuery]);

  return { results, loading };
};
