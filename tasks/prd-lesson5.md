# LESSON 5: Your First Build
## PRD-005

## Project Context
- This is part of the AI Webinar Platform for Vloto
- React + Vite + Tailwind + Framer Motion + Supabase
- Follow the exact structure of Lesson 1 (already complete)
- Reuse existing components from src/components/

## Design System (MUST FOLLOW)
- Primary: Purple (#7C3AED) to Blue (#3B82F6) gradients
- Background: Dark slate (#0F172A)
- Cards: Semi-transparent (#1E293B, 80% opacity) with backdrop-blur
- Accent: Cyan (#06B6D4)
- Success: Green (#10B981)
- All animations via Framer Motion
- Icons via Lucide React

## File Structure to Create
- src/pages/Lesson5.jsx - main page
- src/sections/lesson5/*.jsx - section components
- src/data/lesson5Content.js - content data
- src/data/quiz5Questions.js - quiz questions

## Overview
Guided hands-on experience where learners practice describing what they want and see how requirements translate to AI instructions. Focus on the "describing" skill, not technical execution.

## Learning Objectives
1. Practice structuring requirements clearly
2. Learn the "technical describing" framework
3. Create a complete tool description
4. Understand how to iterate on requirements

## Sections

### Section 1: Introduction (2 min)
**Content:**
- Heading: "Your Turn to Direct"
- "Today you'll practice the most important skill: describing what you want to build"
- Note: "We won't actually run Claude Code today - we'll focus on the describing skill that makes it work"
- Objectives:
  1. "Use a framework for describing tools"
  2. "Write clear requirements"
  3. "Create something real for YOUR work"

### Section 2: The WHAT Framework (10 min)
**Content:**
- Heading: "The WHAT Framework for Technical Describing"

**Framework Visual:**
```
W - What does it do? (purpose)
H - How does the user interact? (frontend)
A - Actions behind the scenes? (backend)
T - Things to remember? (database)
```

**Example Walkthrough - "Team Availability Checker":**

W - What: "Shows which team members are available today"
H - How (Frontend):
- Calendar view with team names
- Green = available, Red = busy
- Click person to see their schedule

A - Actions (Backend):
- Checks each person's calendar
- Determines availability status
- Updates every 30 minutes

T - Things to Remember (Database):
- Team member list
- Their calendar connections
- Availability rules (e.g., meetings = busy)

**Interactive Exercise:**
Fill in the WHAT framework for: "A tool to track which cars need maintenance"
- Text inputs for each letter
- Show example answers

### Section 3: Requirements Practice (15 min)
**Content:**
- Heading: "Let's Practice with Real Scenarios"

**Scenario 1: Customer Complaint Tracker**
Brief: "You get customer complaints via email. You want to track them better."

Interactive exercise - fill in each part:
- Purpose: [text area]
- What users see: [text area]
- What happens behind the scenes: [text area]
- What needs to be stored: [text area]

"Show good example" button reveals:
```
Purpose: Track and manage customer complaints from submission to resolution

Frontend (What users see):
- Dashboard showing all complaints
- Status labels: New, In Progress, Resolved
- Filter by date, status, customer
- Click to see full complaint details
- Add notes and change status

Backend (What happens):
- When complaint received, create new entry
- Send notification to team
- Track time since submission
- Allow status updates
- Generate weekly summary

Database (What's stored):
- Complaint text and date
- Customer info
- Status and history of changes
- Staff notes
- Resolution details
```

**Scenario 2: Car Checklist App**
Brief: "Before a car goes out, someone needs to verify everything is okay"

Same exercise format with reveal

**Scenario 3: Custom Scenario Builder**
- Text input: "What tool would help YOUR daily work?"
- Then fill in the WHAT framework for their own idea
- Save this for next lesson

### Section 4: Common Mistakes (8 min)
**Content:**
- Heading: "Avoid These Description Pitfalls"

**Mistake Cards with Before/After:**

Mistake 1: "Too Vague"
- Bad: "I want a tool for cars"
- Good: "I want a dashboard showing all fleet cars, their current location, battery level, and next scheduled maintenance"

Mistake 2: "Missing the User Perspective"
- Bad: "Store customer feedback in a database"
- Good: "A form where customers enter their name and feedback, rate 1-5 stars, and submit. Show them a 'Thank you' message after."

Mistake 3: "Forgetting Edge Cases"
- Bad: "Show available cars"
- Good: "Show available cars. If no cars available, show message 'No cars currently available' and suggest best next available time."

Mistake 4: "No Success Criteria"
- Bad: "Make a report"
- Good: "Generate a weekly report showing: total bookings, revenue, top 3 busiest cars, any cars with issues. Format as PDF. Email to managers every Monday."

**Quick Check Questionnaire:**
Before finalizing requirements, ask yourself:
- Can someone unfamiliar build this from my description?
- Did I describe what users SEE?
- Did I describe what happens BEHIND the scenes?
- Did I specify what gets SAVED?
- Did I handle what happens when things go wrong?

### Section 5: Your Real Tool Plan (10 min)
**Content:**
- Heading: "Design Your Own Tool"
- "Think about your daily work. What simple tool would make life easier?"

**Idea Prompters:**
- "I wish I had something that..."
- "I always waste time on..."
- "It would be great to see..."
- "I want to automate..."

**Full Requirements Template:**
Structured form they fill out:

1. Tool Name: [text input]
2. Purpose (1 sentence): [text input]
3. Who uses it: [text input]
4. Frontend - What users see:
   - Main screen: [text area]
   - Interactions: [text area]
   - What happens after actions: [text area]
5. Backend - What happens behind the scenes:
   - On load: [text area]
   - On user actions: [text area]
   - Automatic processes: [text area]
6. Database - What's stored:
   - Data to save: [text area]
   - Data to retrieve: [text area]
7. Edge cases - What if something goes wrong:
   [text area]

**Save & Continue:**
- Save button stores their requirements
- "We'll use this in next lesson!"

### Section 6: Quiz Time (5 min)
**5 Questions:**

Q1: "In the WHAT framework, what does 'H' stand for?"
- A) Help functions
- B) How the user interacts (frontend) (correct)
- C) Hidden features
- D) Hardware requirements
Feedback: "H = How does the user interact with it? This is your frontend!"

Q2: "Which is a better tool description?"
- A) "Make an app for tracking stuff"
- B) "A dashboard showing all pending tasks with due dates, assignees, and priority levels" (correct)
Feedback: "Specific descriptions lead to specific results!"

Q3: "What's missing from this description: 'A form to collect customer feedback'?"
- A) Nothing, it's perfect
- B) What happens after submission, where data is stored (correct)
- C) The color scheme
- D) The programming language
Feedback: "Always describe the complete flow - what happens before, during, and after."

Q4: "When describing edge cases, you should:"
- A) Ignore them - AI will figure it out
- B) Describe what happens when things go wrong or data is missing (correct)
- C) Only mention happy paths
- D) Let users discover problems
Feedback: "Good descriptions include 'what if' scenarios!"

Q5: "The most important skill for working with AI builders is:"
- A) Knowing code syntax
- B) Having expensive tools
- C) Describing clearly what you want (correct)
- D) Understanding machine learning
Feedback: "You're learning the real superpower - clear communication!"

### Section 7: Completion
**Content:**
- Celebration
- "Lesson 5 Complete!"
- "You've created your first tool plan!"

**Recap:**
1. "WHAT framework: What, How, Actions, Things to remember"
2. "Good descriptions are specific and complete"
3. "Always consider edge cases"
4. "Your description becomes the AI's blueprint"

**Homework:**
"Review your tool plan. Refine it. Think about edge cases. Next week, we might actually build it!"

**Next Lesson Preview:**
"Coming Next: Building for Operations - Create a real tool for Vloto"
