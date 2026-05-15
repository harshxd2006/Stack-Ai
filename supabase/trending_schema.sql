-- Supabase Schema for Tool View Tracking & Trending
CREATE TABLE IF NOT EXISTS tool_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT NOT NULL
);

-- Index for faster aggregation by tool and date
CREATE INDEX IF NOT EXISTS tool_views_tool_id_idx ON tool_views (tool_id);
CREATE INDEX IF NOT EXISTS tool_views_viewed_at_idx ON tool_views (viewed_at);

-- Set up Row Level Security (RLS)
ALTER TABLE tool_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can view a tool)
CREATE POLICY "Allow public insert for tracking" ON tool_views FOR INSERT WITH CHECK (true);

-- Allow reading for the admin trending dashboard
CREATE POLICY "Allow public read for trending" ON tool_views FOR SELECT USING (true);
