-- Functions for StackAi

-- 1. Update Tool Rating Trigger
-- This function runs whenever a review is added, updated, or deleted
CREATE OR REPLACE FUNCTION update_tool_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Update the tool's average rating and count based on the new/updated review
    UPDATE tools
    SET 
      average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)
        FROM reviews
        WHERE tool_id = NEW.tool_id
      ),
      reviews_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE tool_id = NEW.tool_id
      )
    WHERE id = NEW.tool_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update the tool's average rating and count after a review is deleted
    UPDATE tools
    SET 
      average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)
        FROM reviews
        WHERE tool_id = OLD.tool_id
      ),
      reviews_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE tool_id = OLD.tool_id
      )
    WHERE id = OLD.tool_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER review_changes
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_tool_rating();


-- 2. Update Tool Bookmarks Count Trigger
CREATE OR REPLACE FUNCTION update_bookmarks_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tools SET bookmarks_count = bookmarks_count + 1 WHERE id = NEW.tool_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tools SET bookmarks_count = bookmarks_count - 1 WHERE id = OLD.tool_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookmark_changes
AFTER INSERT OR DELETE ON bookmarks
FOR EACH ROW
EXECUTE FUNCTION update_bookmarks_count();


-- 3. Create Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Search Tools RPC function for fast text search
CREATE OR REPLACE FUNCTION search_tools(search_query TEXT)
RETURNS SETOF tools AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM tools
  WHERE 
    name ILIKE '%' || search_query || '%' OR
    description ILIKE '%' || search_query || '%' OR
    search_query = ANY(tags)
  ORDER BY 
    CASE WHEN name ILIKE search_query || '%' THEN 0 ELSE 1 END,
    average_rating DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
