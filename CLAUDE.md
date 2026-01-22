# AI Webinar Platform - Claude Instructions

## Project Overview
This is an AI learning platform for non-technical operations staff at Vloto.
Built with React + Vite + Tailwind CSS + Framer Motion + Supabase.

## Tech Stack
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Supabase for auth and database

## Design System (MUST FOLLOW)
- Primary: Purple (#7C3AED) to Blue (#3B82F6) gradients
- Background: Dark slate (#0F172A)
- Cards: Semi-transparent (#1E293B, 80% opacity) with backdrop-blur
- Accent: Cyan (#06B6D4)
- Success: Green (#10B981)
- All animations via Framer Motion
- Glassmorphism effects on cards
- Rounded corners (xl to 2xl)

## Existing Structure
- Lesson 1 is complete (AI Thinking Foundations)
- Supabase auth is working
- Progress tracking exists
- Base components exist in src/components/

## File Patterns
- Lesson pages: src/pages/Lesson{N}.jsx
- Lesson sections: src/sections/lesson{N}/*.jsx
- Content data: src/data/lesson{N}Content.js
- Quiz data: src/data/quiz{N}Questions.js
- Shared components: src/components/common/ and src/components/lesson/

## When Building Lessons
1. Follow the exact structure of Lesson 1
2. Reuse existing components where possible
3. Save progress to Supabase using existing hooks
4. All sections should be completable individually
5. Quiz at end of each lesson
6. Celebration screen on completion
7. Maintain design consistency

## Important
- Never break existing functionality
- Test that the dev server runs after changes
- Commit working code frequently
- Follow the PRD specifications exactly
