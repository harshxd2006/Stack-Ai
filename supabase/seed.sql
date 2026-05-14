-- Seed data for StackAi

-- Insert Categories
INSERT INTO categories (id, name, slug, description, icon_name) VALUES
('cat-1111-1111-1111-111111111111', 'Text Generation', 'text-generation', 'AI tools for writing, editing, and generating text content.', 'text'),
('cat-2222-2222-2222-222222222222', 'Image Generation', 'image-generation', 'Create stunning images from text descriptions.', 'image'),
('cat-3333-3333-3333-333333333333', 'Video & Audio', 'video-audio', 'AI generated videos, voiceovers, and music.', 'video'),
('cat-4444-4444-4444-444444444444', 'Coding & Development', 'coding', 'Tools to assist developers with writing and debugging code.', 'code'),
('cat-5555-5555-5555-555555555555', 'Productivity', 'productivity', 'AI assistants for workflow, scheduling, and task management.', 'productivity')
ON CONFLICT (slug) DO NOTHING;

-- Insert Tools
INSERT INTO tools (id, name, slug, description, website_url, category_id, pricing_type, tags, featured, trending, average_rating, reviews_count) VALUES
('tool-1111-1111-1111-111111111111', 'ChatGPT', 'chatgpt', 'Advanced language model by OpenAI capable of text generation, translation, and answering complex questions.', 'https://chat.openai.com', 'cat-1111-1111-1111-111111111111', 'freemium', ARRAY['chat', 'writing', 'assistant'], true, true, 4.8, 1250),
('tool-2222-2222-2222-222222222222', 'Midjourney', 'midjourney', 'AI art generator creating high-quality, complex images from textual descriptions via Discord.', 'https://midjourney.com', 'cat-2222-2222-2222-222222222222', 'paid', ARRAY['art', 'design', 'images'], true, true, 4.9, 850),
('tool-3333-3333-3333-333333333333', 'GitHub Copilot', 'github-copilot', 'AI pair programmer that suggests code completions directly within your IDE.', 'https://github.com/features/copilot', 'cat-4444-4444-4444-444444444444', 'paid', ARRAY['coding', 'development', 'programming'], true, false, 4.7, 600),
('tool-4444-4444-4444-444444444444', 'Notion AI', 'notion-ai', 'AI features integrated into Notion to summarize, translate, and generate content.', 'https://notion.so/product/ai', 'cat-5555-5555-5555-555555555555', 'freemium', ARRAY['productivity', 'notes', 'workspace'], false, true, 4.5, 420),
('tool-5555-5555-5555-555555555555', 'Synthesia', 'synthesia', 'Create professional videos with AI avatars and text-to-speech in multiple languages.', 'https://synthesia.io', 'cat-3333-3333-3333-333333333333', 'paid', ARRAY['video', 'avatars', 'presentation'], false, false, 4.6, 310)
ON CONFLICT (slug) DO NOTHING;

-- Note: We skip inserting auth.users and reviews here as those require secure password hashing
-- and are better created via the Supabase Auth API or UI.
