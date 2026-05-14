-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools Table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  website_url VARCHAR(255),
  logo_url VARCHAR(255),
  pricing_type VARCHAR(50) DEFAULT 'free', -- free, freemium, paid
  pricing_details JSONB,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  trending BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  monthly_users VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Computed fields that might be updated via triggers/functions
  average_rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  bookmarks_count INTEGER DEFAULT 0
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);

-- Bookmarks Table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);

-- Profiles Table (Extension of auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  bio TEXT,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)

-- Categories: Anyone can read, only admins can write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are readable by everyone." ON categories FOR SELECT USING (true);

-- Tools: Anyone can read, only admins can write
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tools are readable by everyone." ON tools FOR SELECT USING (true);

-- Reviews: Anyone can read, authenticated users can create/update their own
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are readable by everyone." ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews." ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews." ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews." ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks: Users can read/write only their own
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookmarks." ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks." ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks." ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Profiles: Anyone can read, users can update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are readable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Indexes for performance
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_reviews_tool ON reviews(tool_id);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
