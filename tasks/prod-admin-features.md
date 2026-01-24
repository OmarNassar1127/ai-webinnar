# Admin Dashboard & Progress Tracking - PRD
## For Ralph Autonomous AI Agent

## ⚠️ CRITICAL INSTRUCTIONS FOR RALPH ⚠️

### Code Quality Rules (MUST FOLLOW)
1. **MAX 400-500 lines per file** - Split into smaller components if needed
2. **DO NOT break existing functionality** - Test `npm run dev` after every change
3. **Follow existing patterns EXACTLY** - Look at how Lesson2.jsx, Dashboard.jsx work
4. **Reuse existing components** - Card, Button, ProgressBar, etc. from src/components/
5. **Small, incremental commits** - One feature at a time
6. **No crazy experimental stuff** - Keep it simple and working

### Existing Codebase Patterns (FOLLOW THESE)
- Navigation: App.jsx uses `currentPage` state, not React Router
- Styling: Tailwind + glassmorphism (bg-slate-800/50 backdrop-blur-xl)
- Animations: Framer Motion
- Auth: useAuth() hook from AuthContext
- Database: Supabase with existing tables (profiles, lesson_progress, quiz_results)
- Colors: Purple (#7C3AED), Blue (#3B82F6), Cyan (#06B6D4), Dark (#0F172A)

---

## Project Overview
Add admin dashboard for tracking user progress and controlling lesson access, plus enhance the "My Progress" page for all users.

## Database Changes Required

### 1. Add `is_admin` column to profiles table
```sql
ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;

-- Set Omar as admin
UPDATE profiles SET is_admin = true WHERE email = 'omar@vloto.nl';
```

### 2. Add `blocked_lessons` table (global lesson blocking)
```sql
CREATE TABLE blocked_lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id integer NOT NULL UNIQUE,
  blocked_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  blocked_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE blocked_lessons ENABLE ROW LEVEL SECURITY;

-- Anyone can read (to check if lesson is blocked)
CREATE POLICY "Anyone can view blocked lessons" ON blocked_lessons
  FOR SELECT USING (true);

-- Only admins can insert/delete (handled in app logic)
CREATE POLICY "Admins can manage blocked lessons" ON blocked_lessons
  FOR ALL USING (true);
```

### 3. Ensure quiz_results table is being used
- Already exists, just need to make sure lessons save to it
- Admin dashboard will read from it

---

## Feature 1: Admin Dashboard Page

### User Story: US-ADMIN-001
**As an admin, I want to access an admin dashboard from the user menu**

**Acceptance Criteria:**
- [ ] "Admin Dashboard" menu item appears in UserMenu dropdown (only for admins)
- [ ] useAuth hook returns `isAdmin` boolean
- [ ] Clicking navigates to admin page via setCurrentPage('admin')
- [ ] Non-admins cannot see or access admin page

**Files to modify:**
- src/context/AuthContext.jsx - Add isAdmin to user state
- src/components/auth/UserMenu.jsx - Add Admin Dashboard link (conditional)
- src/App.jsx - Add admin page route

**Max lines:** Keep changes minimal, ~20-30 lines per file

---

### User Story: US-ADMIN-002
**As an admin, I want to see a list of all users with their progress**

**Acceptance Criteria:**
- [ ] Admin dashboard shows table/cards of all users
- [ ] Each user shows: name, email, lessons completed, last active
- [ ] Data fetched from Supabase profiles + lesson_progress
- [ ] Loading state while fetching
- [ ] Responsive design (works on desktop)

**Files to create:**
- src/pages/AdminDashboard.jsx (main page, max 300 lines)
- src/components/admin/UserList.jsx (user list component, max 200 lines)
- src/hooks/useAdminData.js (data fetching hook, max 150 lines)

---

### User Story: US-ADMIN-003
**As an admin, I want to see detailed progress for each user**

**Acceptance Criteria:**
- [ ] Click on user to expand/see details
- [ ] Shows: each lesson status, quiz scores, time spent (if available)
- [ ] Visual progress bar per lesson
- [ ] Quiz results displayed clearly

**Files to create:**
- src/components/admin/UserProgressDetail.jsx (max 250 lines)

---

### User Story: US-ADMIN-004
**As an admin, I want to block/unblock lessons globally**

**Acceptance Criteria:**
- [ ] Section showing all 9 lessons with toggle switches
- [ ] Toggle to block/unblock each lesson
- [ ] Blocked lessons show lock icon
- [ ] Changes saved to Supabase blocked_lessons table
- [ ] Confirmation before blocking (optional)

**Files to create:**
- src/components/admin/LessonBlockManager.jsx (max 200 lines)

---

### User Story: US-ADMIN-005
**As a user, I cannot access blocked lessons even if I completed previous ones**

**Acceptance Criteria:**
- [ ] Dashboard checks blocked_lessons table
- [ ] Blocked lessons show as locked regardless of user progress
- [ ] Clicking blocked lesson shows message "This lesson is not yet available"
- [ ] Works alongside existing unlock logic (lesson must be unblocked AND previous completed)

**Files to modify:**
- src/pages/Dashboard.jsx - Update isLessonUnlocked to check blocked_lessons
- src/hooks/useBlockedLessons.js (new hook, max 50 lines)

---

## Feature 2: My Progress Page

### User Story: US-PROGRESS-001
**As a user, I want to see my learning progress on a dedicated page**

**Acceptance Criteria:**
- [ ] "My Progress" in UserMenu navigates to progress page
- [ ] Shows overview stats: lessons completed, total progress %, quiz average
- [ ] Visual journey map showing completed lessons with checkmarks
- [ ] Accessible for all users (not just admin)

**Files to create:**
- src/pages/MyProgress.jsx (max 350 lines)

**Files to modify:**
- src/components/auth/UserMenu.jsx - Wire up My Progress link
- src/App.jsx - Add progress page route

---

### User Story: US-PROGRESS-002
**As a user, I want to see what I learned in each lesson**

**Acceptance Criteria:**
- [ ] Each completed lesson shows key takeaways
- [ ] Quiz score displayed per lesson
- [ ] "Review Lesson" button to go back
- [ ] Locked/incomplete lessons shown differently

**Files to create:**
- src/components/progress/LessonProgressCard.jsx (max 150 lines)
- src/components/progress/ProgressStats.jsx (max 100 lines)

---

### User Story: US-PROGRESS-003
**As a user, I want to see my quiz results history**

**Acceptance Criteria:**
- [ ] Section showing all quiz attempts
- [ ] Score, date, pass/fail status per quiz
- [ ] Data from quiz_results Supabase table

**Files to create:**
- src/components/progress/QuizHistory.jsx (max 150 lines)

---

## Feature 3: Quiz Results Integration

### User Story: US-QUIZ-001
**Ensure all lesson quizzes save results to Supabase**

**Acceptance Criteria:**
- [ ] When user completes a quiz, result saved to quiz_results table
- [ ] Saves: user_id, lesson_id, score, total_questions, answers (JSON), completed_at
- [ ] Check existing Quiz components and ensure they call saveQuizResult

**Files to check/modify:**
- src/components/lesson/Quiz.jsx - Ensure it saves to Supabase
- src/hooks/useQuizResults.js - Ensure saveQuizResult function exists and works

---

## File Structure Summary
```
src/
  pages/
    AdminDashboard.jsx (new)
    MyProgress.jsx (new)
  components/
    admin/
      UserList.jsx (new)
      UserProgressDetail.jsx (new)
      LessonBlockManager.jsx (new)
    progress/
      LessonProgressCard.jsx (new)
      ProgressStats.jsx (new)
      QuizHistory.jsx (new)
  hooks/
    useAdminData.js (new)
    useBlockedLessons.js (new)
```

---

## Implementation Order (Ralph should follow this)

1. **US-ADMIN-001** - Admin access setup (auth changes, menu item)
2. **US-QUIZ-001** - Ensure quiz results are saved
3. **US-ADMIN-002** - Basic admin dashboard with user list
4. **US-ADMIN-003** - User detail view
5. **US-ADMIN-004** - Lesson blocking UI
6. **US-ADMIN-005** - Blocked lessons enforcement
7. **US-PROGRESS-001** - My Progress page basic
8. **US-PROGRESS-002** - Lesson progress cards
9. **US-PROGRESS-003** - Quiz history

---

## Testing Checklist
After each user story, verify:
- [ ] `npm run dev` works without errors
- [ ] No console errors in browser
- [ ] Feature works as expected
- [ ] Existing features still work
- [ ] Styling matches existing design

---

## Design Reference
Follow existing design patterns:
- Cards: `bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl`
- Buttons: Use existing Button component or similar styling
- Tables: Use cards/grid instead of traditional tables for modern look
- Animations: Framer Motion for enter/exit animations
- Icons: Lucide React (Users, Lock, Unlock, BarChart3, CheckCircle, etc.)