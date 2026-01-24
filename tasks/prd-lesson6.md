# LESSON 6: Building for Operations
## PRD-006

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
- src/pages/Lesson6.jsx - main page
- src/sections/lesson6/*.jsx - section components
- src/data/lesson6Content.js - content data
- src/data/quiz6Questions.js - quiz questions

## Overview
Apply everything learned to create a real, useful tool for their actual Vloto work. Focus on operations-relevant use cases.

## Learning Objectives
1. Identify high-impact tools for their daily work
2. Create complete specifications for a Vloto tool
3. Understand how to scope appropriately
4. Plan for real-world implementation

## Sections

### Section 1: Introduction (2 min)
**Content:**
- Heading: "From Learning to Building"
- "Time to create something REAL for Vloto"
- This lesson: Apply everything to YOUR work
- Goal: Leave with a tool plan you could actually implement

### Section 2: Operations Pain Points (10 min)
**Content:**
- Heading: "What Wastes Your Time?"

**Interactive Pain Point Identifier:**
Rate each task (1-5 for time wasted):
- Checking car statuses
- Responding to customer complaints
- Scheduling maintenance
- Creating reports
- Communicating with partners
- Processing new registrations
- Handling damaged car reports
- Managing the fleet calendar

Based on ratings, suggest tool ideas for top pain points.

**Pre-built Tool Ideas Gallery:**
Cards showing potential Vloto tools:

Tool 1: "Fleet Health Dashboard"
- At-a-glance view of all cars
- Battery levels, locations, status
- Alerts for issues

Tool 2: "Customer Response Helper"
- Paste complaint -> Get draft response
- Follows Vloto tone and policies
- Suggests appropriate compensation

Tool 3: "Maintenance Scheduler"
- Shows upcoming APK dates
- Suggests optimal scheduling
- Minimizes fleet downtime

Tool 4: "Weekly Report Generator"
- Auto-compiles key metrics
- Booking stats, revenue, issues
- Ready for management

Tool 5: "Damage Report Processor"
- Upload damage photos
- AI describes damage
- Creates standardized report

Tool 6: "Partner Communication Templates"
- Templates for common partner emails
- Customizable with specific details
- Professional, consistent tone

"Click any card to see full specification example"

### Section 3: Choosing Your Tool (5 min)
**Content:**
- Heading: "Pick Your Project"

**Selection Criteria Checklist:**
When choosing what to build, consider:
- Would I use this daily/weekly?
- Is it simple enough to describe clearly?
- Would it save significant time?
- Can I verify if it works correctly?

**Decision Helper:**
Interactive questions:
1. "What task do you do most often?" [dropdown]
2. "What takes the most time?" [dropdown]
3. "What's most frustrating?" [dropdown]

Based on answers -> Recommended tool type

**Your Choice:**
- Select from gallery OR describe your own
- Commitment: "I will create specifications for: [tool name]"

### Section 4: Complete Specification Workshop (20 min)
**Content:**
- Heading: "Build Your Complete Spec"

**Full Specification Template for Vloto:**
(Pre-filled with Vloto context where relevant)

**1. Overview**
- Tool name: [input]
- One-line description: [input]
- Primary user: [dropdown: Iskander, Pieter, Both, Customer]
- Usage frequency: [dropdown: Daily, Weekly, As needed]

**2. Problem Statement**
- What's the current pain? [textarea]
- How is it handled now? [textarea]
- Time spent currently: [input] minutes/hours per [dropdown: day/week/month]

**3. Solution - Frontend**
Main screen:
- What appears on first load? [textarea]
- Key data displayed: [checkboxes + custom]
  - Car information
  - Customer data
  - Booking data
  - Financial data
  - Dates/times
  - Other: [input]

User interactions:
- Buttons/actions available: [textarea]
- What happens after each action: [textarea]
- Search/filter needed? [yes/no + details]

**4. Solution - Backend**
On page load:
- What data is fetched? [textarea]
- From where? [checkboxes]
  - Vloto database
  - External API
  - User input
  - Other: [input]

On user actions:
- What processing happens? [textarea]
- Any calculations needed? [textarea]
- Any external connections? [textarea]

**5. Solution - Database**
Data to store:
- What needs to be saved? [textarea]
- How long to keep it? [dropdown]
- Who can access it? [dropdown]

**6. Edge Cases**
- What if data is missing? [textarea]
- What if user makes error? [textarea]
- What if external service is down? [textarea]

**7. Success Criteria**
- How do you know it works? [textarea]
- What would make this "done"? [textarea]

**Save Specification Button**
- Saves to their profile
- Option to export as document

### Section 5: Review & Refine (8 min)
**Content:**
- Heading: "Make It Better"

**Specification Checklist:**
Review your spec against:
- Clear purpose stated
- User interactions described
- Data requirements specified
- Edge cases considered
- Success criteria defined

**Common Improvements:**
Show examples of weak vs. strong for each section.

**Peer Review Prompt:**
"Imagine someone unfamiliar with Vloto reads this. Would they understand what to build?"

### Section 6: Implementation Path (5 min)
**Content:**
- Heading: "From Spec to Reality"

**What Happens Next:**
Timeline visual:
1. You've created the spec (today)
2. Spec becomes AI prompt
3. AI builds first version
4. You test and give feedback
5. Iterate until it works
6. Deploy for actual use

**Realistic Expectations:**
- Simple tool: 1-2 hours of AI building
- Medium tool: Half a day
- Complex tool: Multiple sessions

**The Secret:**
"A good spec is 80% of the work. AI handles the coding - you handled the thinking."

### Section 7: Quiz Time (5 min)
**5 Questions:**

Q1: "When choosing what tool to build, you should prioritize:"
- A) The most complex thing possible
- B) Something you'd actually use and saves time (correct)
- C) What sounds impressive
- D) The cheapest option
Feedback: "Build what helps you. Useful beats impressive."

Q2: "A good specification includes:"
- A) Just the main happy path
- B) Only the frontend design
- C) Frontend, backend, database, and edge cases (correct)
- D) Code samples
Feedback: "Complete specs cover all parts of the system."

Q3: "Edge cases in a specification are:"
- A) Optional nice-to-haves
- B) Scenarios where things go wrong or data is missing (correct)
- C) Advanced features for later
- D) Technical implementation details
Feedback: "Real tools need to handle real problems!"

Q4: "Success criteria help you:"
- A) Make the AI work faster
- B) Know when the tool is actually done and working (correct)
- C) Impress your manager
- D) Reduce the budget
Feedback: "Without success criteria, you don't know if you've succeeded."

Q5: "The most important part of building with AI is:"
- A) The coding phase
- B) The planning and specification phase (correct)
- C) The testing phase
- D) The deployment phase
Feedback: "Garbage in, garbage out. Great specs lead to great tools."

### Section 8: Completion
**Content:**
- Celebration
- "Lesson 6 Complete!"
- "You've created a real tool specification!"

**Your Spec Summary:**
Display their saved specification summary

**What's Next:**
"Your specification is ready. With this, AI can build your tool. In the next lesson, we'll explore how AI can help with data and spreadsheets."

**Next Lesson Preview:**
"Coming Next: Data & AI - Spreadsheets, analysis, and insights"
