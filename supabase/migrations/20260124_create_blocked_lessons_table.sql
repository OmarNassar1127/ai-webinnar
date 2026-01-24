-- Create blocked_lessons table for admin lesson blocking functionality
-- This table stores which lessons are globally blocked from all users

CREATE TABLE IF NOT EXISTS blocked_lessons (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_id integer UNIQUE NOT NULL,
    blocked_at timestamp with time zone DEFAULT now(),
    blocked_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE blocked_lessons ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blocked lessons (to check if a lesson is blocked)
CREATE POLICY "Anyone can view blocked lessons"
    ON blocked_lessons
    FOR SELECT
    USING (true);

-- Policy: Allow all operations (admin check handled in application logic)
-- This allows authenticated users to insert/update/delete
-- The application will check isAdmin before calling these operations
CREATE POLICY "Authenticated users can manage blocked lessons"
    ON blocked_lessons
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create index for faster lesson lookups
CREATE INDEX IF NOT EXISTS idx_blocked_lessons_lesson_id ON blocked_lessons(lesson_id);

-- Comment on table and columns
COMMENT ON TABLE blocked_lessons IS 'Stores globally blocked lessons that no user can access';
COMMENT ON COLUMN blocked_lessons.lesson_id IS 'The ID of the blocked lesson (1-9)';
COMMENT ON COLUMN blocked_lessons.blocked_at IS 'When the lesson was blocked';
COMMENT ON COLUMN blocked_lessons.blocked_by IS 'The admin user who blocked the lesson';
