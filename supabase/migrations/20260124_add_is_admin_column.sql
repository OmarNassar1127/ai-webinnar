-- Add is_admin column to profiles table
-- This column allows certain users to access admin features

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;

-- Comment on the column
COMMENT ON COLUMN profiles.is_admin IS 'Whether the user has admin privileges';
