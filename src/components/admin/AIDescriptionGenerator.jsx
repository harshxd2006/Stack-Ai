import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Fast & Free)' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Advanced)' }
];

import { useCategories } from '../../hooks/useCategories';

const PRICING_MODELS = ['Free', 'Freemium', 'Paid', 'Free Trial', 'Open Source'];

export default function AIDescriptionGenerator() {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [url, setUrl] = useState('');
  const [model, setModel] = useState(GEMINI_MODELS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    pricing: '',
    tags: '',
    website_url: ''
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setFormData({ ...formData, website_url: url });

    try {
      // Step 1: Fetch HTML via CORS proxy
      setStatus('Fetching website content...');
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${url}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error('Failed to fetch website');
      
      const html = await response.text();
      
      // Step 2: Extract text
      setStatus('Extracting data...');
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const title = doc.querySelector('title')?.innerText || doc.querySelector('meta[property="og:title"]')?.content || '';
      const metaDescription = doc.querySelector('meta[name="description"]')?.content || doc.querySelector('meta[property="og:description"]')?.content || '';
      
      // Basic text extraction, removing scripts/styles
      const bodyClone = doc.body.cloneNode(true);
      const scripts = bodyClone.querySelectorAll('script, style, noscript, nav, footer, iframe');
      scripts.forEach(s => s.remove());
      const bodyText = bodyClone.innerText.replace(/\s+/g, ' ').trim().slice(0, 3000); // Limit to ~3000 chars

      // Step 3: Gemini API Call
      setStatus('Generating with AI...');
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env file.');

      const categoryNames = categories && categories.length > 0 ? categories.map(c => c.name).join(', ') : 'Text Generation, Image Generation, Video & Audio, Coding & Development, Productivity';
      const prompt = `
Extract information about this AI tool from the following webpage content.
Return ONLY a valid JSON object with the exact keys: "name", "description", "category", "pricing", and "tags".
- name: The name of the AI tool.
- description: A short, engaging 2-3 sentence description of what the tool does.
- category: Pick one from: ${categoryNames}. If none fit perfectly, pick the closest one.
- pricing: Pick one from: ${PRICING_MODELS.join(', ')}.
- tags: A comma-separated list of up to 5 relevant keywords.

Website Title: ${title}
Website Description: ${metaDescription}
Website Content snippet: ${bodyText}
      `.trim();

      const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: {
            parts: [{ text: 'You are a precise data extractor that outputs strictly valid JSON.' }]
          },
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      });

      if (!aiResponse.ok) {
        const errData = await aiResponse.json().catch(() => ({}));
        throw new Error(errData?.error?.message || 'Failed to generate response from Gemini');
      }

      const aiData = await aiResponse.json();
      const content = aiData.candidates[0].content.parts[0].text;
      
      // Since responseMimeType is application/json, it should be pure JSON
      const parsed = JSON.parse(content.trim());

      setFormData(prev => ({
        ...prev,
        name: parsed.name || '',
        description: parsed.description || '',
        category: parsed.category || '',
        pricing: parsed.pricing || '',
        tags: Array.isArray(parsed.tags) ? parsed.tags.join(', ') : parsed.tags || '',
        website_url: url
      }));
      
      setStatus('Generation complete!');
      setTimeout(() => setStatus(''), 3000);

    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    alert('JSON copied to clipboard!');
  };

  const handleSaveToSupabase = async () => {
    if (!formData.name || !formData.category) {
      setError('Name and Category are required to save.');
      return;
    }

    try {
      setLoading(true);
      setStatus('Saving to database...');
      setError(null);

      // 1. Get the category ID locally
      const selectedCategory = categories.find(c => c.name === formData.category);

      if (!selectedCategory) {
        throw new Error('Failed to find matching category. Please select a valid category from the dropdown.');
      }
      
      const categoryId = selectedCategory.id;
      const categorySlug = selectedCategory.slug;

      // 2. Generate tool slug
      const toolSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // 3. Format tags
      const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

      // 4. Map pricing type
      let pricingType = 'free';
      const pricingLower = formData.pricing.toLowerCase();
      if (pricingLower.includes('freemium')) pricingType = 'freemium';
      else if (pricingLower.includes('paid')) pricingType = 'paid';

      // 5. Insert tool
      const { error: insertError } = await supabase
        .from('tools')
        .insert([{
          name: formData.name,
          slug: toolSlug,
          description: formData.description,
          website_url: formData.website_url,
          pricing_type: pricingType,
          category_id: categoryId,
          tags: tagsArray
        }]);

      if (insertError) {
        if (insertError.code === '23505') {
            throw new Error('A tool with this name/slug already exists.');
        }
        throw insertError;
      }

      setStatus('Successfully saved!');
      
      // Navigate to the category to show it
      setTimeout(() => {
        navigate(`/category/${categorySlug}`);
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save to Supabase');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 glass-card border border-[#262626] rounded-2xl bg-[#09090B]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#7C3AED]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#7C3AED]/20 blur-[100px] pointer-events-none" />

      <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 text-white tracking-tight">
        AI Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]">Generator</span>
      </h2>

      {/* Input Section */}
      <form onSubmit={handleGenerate} className="mb-8 space-y-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#737373] mb-2 font-dm-sans">Tool Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example-ai-tool.com"
              required
              className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-dm-sans"
            />
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-[#737373] mb-2 font-dm-sans">AI Model (Google Gemini)</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-dm-sans appearance-none"
            >
              {GEMINI_MODELS.map(m => (
                <option key={m.id} value={m.id} className="bg-[#09090B] text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !url}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-bold font-syne text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(108,99,255,0.3)]"
        >
          {loading ? 'Processing...' : 'Generate Description'}
        </button>
      </form>

      {/* Status & Error */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-[#7C3AED] mb-6 p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 font-dm-sans z-10 relative"
          >
            <div className="w-5 h-5 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
            <span className="font-medium">{status}</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/20 font-dm-sans z-10 relative"
          >
            <span className="font-medium">Error: </span> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Results */}
      <div className="space-y-6 relative z-10 font-dm-sans">
        <div>
          <label className="block text-sm font-medium text-[#737373] mb-2">Tool Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#737373] mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#737373] mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none"
            >
              <option value="" className="bg-[#09090B] text-[#737373]">Select Category</option>
              {categories && categories.map(cat => (
                <option key={cat.id || cat.slug || cat.name} value={cat.name} className="bg-[#09090B] text-white">{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#737373] mb-2">Pricing Model</label>
            <select
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none"
            >
              <option value="" className="bg-[#09090B] text-[#737373]">Select Pricing</option>
              {PRICING_MODELS.map(price => (
                <option key={price} value={price} className="bg-[#09090B] text-white">{price}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#737373] mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="AI, writing, productivity"
            className="w-full px-4 py-3 bg-white/5 border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-[#262626]">
          <button
            onClick={handleCopyJSON}
            className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy JSON
          </button>
          <button
            onClick={handleSaveToSupabase}
            className="flex-1 px-6 py-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#7C3AED] font-medium hover:bg-[#7C3AED]/30 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Save to Supabase
          </button>
        </div>
      </div>
    </div>
  );
}
