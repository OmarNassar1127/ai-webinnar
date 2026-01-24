# LESSON 4: AI in Action
## PRD-004

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
- src/pages/Lesson4.jsx - main page
- src/sections/lesson4/*.jsx - section components
- src/data/lesson4Content.js - content data
- src/data/quiz4Questions.js - quiz questions

## Overview
A demonstration-focused lesson where they watch the instructor (Omar) build something real with Claude Code. This lesson includes placeholder areas for video/live demo content with explanatory annotations.

## Learning Objectives
1. See how Claude Code works in real-time
2. Understand the back-and-forth process of AI development
3. Learn what to pay attention to when AI builds
4. Demystify the "magic" - it's iterative, not instant

## Sections

### Section 1: Introduction (2 min)
**Content:**
- Heading: "Time to See the Magic"
- "You've learned the concepts. Now let's see it in action!"
- What to expect:
  1. "Watch a real tool get built from scratch"
  2. "See the conversation between human and AI"
  3. "Understand the iterative process"
- "Grab some coffee - this is going to be cool"

### Section 2: What We're Building (3 min)
**Content:**
- Heading: "Today's Project"
- Card showing the tool:
  - Name: "Quick Feedback Collector"
  - Purpose: "A simple form where customers can submit feedback"
  - Features: Name input, feedback text, star rating, submit button
  - Why this: "Simple enough to build in 30 minutes, useful enough to be real"

**Requirements Breakdown:**
Show how the requirements are structured:
- Frontend: Form with inputs, rating stars, submit button
- Backend: Process submission
- Database: Store feedback
- API: Submit feedback endpoint

"Notice how we're using what you learned in Lesson 2!"

### Section 3: Demo Placeholder (20 min)
**Content:**
- Large embedded area for:
  - Option A: Video embed (if pre-recorded)
  - Option B: "Live Demo" placeholder card for live sessions

**If video/live demo not available, show annotated screenshots:**

**Step 1: Starting Claude Code**
- Screenshot placeholder: Terminal with Claude Code starting
- Caption: "We start Claude Code in our project folder"
- Key observation: "Notice it knows about our existing files"

**Step 2: Describing What We Want**
- Screenshot placeholder: The initial prompt
- Show the prompt used: "I want to build a feedback form..."
- Caption: "See how we describe the 4 parts we learned about"

**Step 3: AI Starts Building**
- Screenshot placeholder: Code being generated
- Caption: "Claude immediately starts writing code"
- Key observation: "It creates multiple files - frontend, backend, database schema"

**Step 4: First Attempt - Not Perfect**
- Screenshot placeholder: Something doesn't work right
- Caption: "First version rarely works perfectly - this is normal!"
- Key observation: "We describe what's wrong, AI fixes it"

**Step 5: Iterating**
- Screenshot placeholder: Back and forth conversation
- Caption: "We go back and forth 3-4 times"
- Key observation: "Each iteration gets closer to what we want"

**Step 6: Final Result**
- Screenshot placeholder: Working feedback form
- Caption: "After about 20 minutes: a working tool!"
- Key observation: "From idea to working software in one session"

**Interactive Annotations:**
- Clickable points on screenshots explaining what's happening
- "Click to learn more" on technical terms

### Section 4: Key Observations (8 min)
**Content:**
- Heading: "What Did We Learn from Watching?"

**Observation Cards (animated reveal):**

Card 1: "It's a Conversation"
- Not one prompt -> perfect result
- It's back and forth dialogue
- You refine as you go

Card 2: "Mistakes are Normal"
- First attempt rarely works
- AI makes assumptions that might be wrong
- Your job: guide it to what you actually want

Card 3: "Clear Description = Better Results"
- The more specific you are, the closer first try is
- Using terms like "frontend", "database" helps
- Examples of what you want help a lot

Card 4: "You Don't Need to Understand the Code"
- AI writes the code
- You verify it WORKS
- Focus on the outcome, not the syntax

Card 5: "Speed is Incredible"
- What would take a developer days
- Can happen in hours or minutes
- But: still needs human oversight

**The Honest Truth Box:**
"Building with AI isn't magic - it's skilled collaboration. The AI is incredibly capable, but YOU are the director. You decide what to build, how it should work, and whether it's good enough."

### Section 5: What to Watch For (5 min)
**Content:**
- Heading: "When You Start Building..."

**Checklist of things to pay attention to:**

- Does it understand your request?
  - If not, rephrase with more context

- Is it building the right thing?
  - Stop early if going wrong direction

- Are there errors?
  - Copy error messages back to AI

- Does the result work?
  - Test it yourself, don't assume

- Is it what you wanted?
  - Be specific about what's wrong

**Warning Signs:**
- AI says it did something but you can't verify
- Same error keeps happening
- AI seems confused about your project

**What to do:** Ask AI to explain, or restart with clearer description

### Section 6: Quiz Time (5 min)
**5 Questions:**

Q1: "What's the typical process of building with AI?"
- A) One prompt -> Perfect result
- B) Write code yourself, AI checks it
- C) Iterative conversation with refinements (correct)
- D) AI builds everything automatically without input
Feedback: "It's a dialogue - you describe, AI builds, you refine, repeat!"

Q2: "When the first attempt isn't right, you should:"
- A) Give up and do it manually
- B) Describe what's wrong and let AI fix it (correct)
- C) Write the code yourself
- D) Start over from scratch
Feedback: "AI learns from your feedback - tell it what's wrong!"

Q3: "Do you need to understand the code AI writes?"
- A) Yes, completely
- B) No, just verify it works (correct)
- C) Only the frontend
- D) Only if there are bugs
Feedback: "Focus on outcomes. Does it do what you wanted?"

Q4: "What makes AI build better results?"
- A) Longer prompts
- B) More technical jargon
- C) Clear, specific descriptions of what you want (correct)
- D) Being polite
Feedback: "Clarity beats length. Specific beats vague."

Q5: "When AI keeps making the same mistake, you should:"
- A) Keep asking the same way
- B) Rephrase your request with more context or examples (correct)
- C) Type in all caps
- D) Wait a few hours
Feedback: "If something isn't working, change your approach!"

### Section 7: Completion
**Content:**
- Celebration animation
- "Lesson 4 Complete!"
- "You've seen AI in action!"

**Recap Cards:**
1. "AI building is iterative conversation"
2. "Mistakes and refinements are normal"
3. "Your job: direct and verify"
4. "Clear descriptions lead to better results"

**Key Takeaway Box:**
"Next week, it's YOUR turn. You'll describe something you want built, and we'll use AI to create it together. Start thinking about a simple tool that would help your work!"

**Next Lesson Preview:**
"Coming Next: Your First Build - You describe, AI builds"
