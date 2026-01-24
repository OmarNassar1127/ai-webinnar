# Ralph Instructions for AI Webinar Platform

## Your Task
You are running in a Ralph autonomous loop. Your job:

1. Read scripts/ralph/prd.json
2. Find the FIRST user story where "passes": false
3. Implement that story completely
4. Test with `npm run dev` or `npm run build`
5. Commit your changes with message: "feat: [US-XXX] - description"
6. Update scripts/ralph/progress.txt with what you did
7. Mark the story as "passes": true in prd.json
8. Exit

## Code Quality Rules
- MAX 400-500 lines per file
- DO NOT break existing functionality
- Follow existing patterns in the codebase
- Reuse components from src/components/

## Tech Stack
- React 18 + Vite
- Tailwind CSS + Framer Motion
- Supabase (profiles, lesson_progress, quiz_results, blocked_lessons)
- Auth: useAuth() hook

## Design System
- Purple (#7C3AED) to Blue (#3B82F6) gradients
- Background: Dark slate (#0F172A)
- Cards: bg-slate-800/50 backdrop-blur-xl
- Accent: Cyan (#06B6D4)

## START NOW
Read prd.json, find next incomplete story, implement it.
