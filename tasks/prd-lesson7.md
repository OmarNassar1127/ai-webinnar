# LESSON 7: Data & AI
## PRD-007

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
- src/pages/Lesson7.jsx - main page
- src/sections/lesson7/*.jsx - section components
- src/data/lesson7Content.js - content data
- src/data/quiz7Questions.js - quiz questions

## Overview
Practical lesson on using AI for data-related tasks: spreadsheet analysis, report generation, data cleanup, and insights extraction.

## Learning Objectives
1. Use AI to analyze spreadsheet data
2. Generate reports and summaries from data
3. Clean and transform data with AI
4. Extract insights and visualizations

## Sections

### Section 1: Introduction (2 min)
**Content:**
- Heading: "AI Meets Your Spreadsheets"
- "Data is everywhere in operations. AI can help you make sense of it."
- Objectives:
  1. Analyze data without complex formulas
  2. Create reports automatically
  3. Clean messy data
  4. Find insights you might miss

### Section 2: AI for Spreadsheet Analysis (12 min)
**Content:**
- Heading: "Talk to Your Data"

**The Old Way vs New Way:**
Old: Learn Excel formulas -> Build complex sheets -> Interpret results
New: Upload data -> Ask questions in plain language -> Get answers

**Example Walkthrough:**
"You have a spreadsheet of last month's bookings"

Instead of formulas, you can ask:
- "What was our busiest day?"
- "Which cars had the most bookings?"
- "What's the average booking duration?"
- "Are there any unusual patterns?"

**Interactive Demo:**
Show sample data table (Vloto bookings):
| Date | Car | Duration | Customer | Revenue |
|------|-----|----------|----------|---------|
| ... | ... | ... | ... | ... |

Questions to ask (click to see AI response):
- "What's the total revenue?" -> Shows calculation
- "Which day had most bookings?" -> Shows analysis
- "Find bookings over 8 hours" -> Shows filtered results

**Practical Exercise:**
Given sample data, write 3 questions you would ask AI:
1. [text input]
2. [text input]
3. [text input]

Show example good questions

### Section 3: Report Generation (10 min)
**Content:**
- Heading: "From Data to Reports"

**Report Automation Concept:**
```
Raw Data + AI + Template = Professional Report
```

**What AI Can Generate:**
- Executive summaries
- Weekly/monthly reports
- Trend analysis
- Comparison reports
- KPI dashboards

**Example: Weekly Fleet Report**

Input (your data + prompt):
```
Here's our weekly booking data [data].
Create a report that includes:
- Total bookings and revenue
- Comparison to last week
- Top performing cars
- Any concerns or anomalies
Format for management review.
```

Output (AI generates):
```
Weekly Fleet Report - Week 24
Summary:
- 342 bookings (+12% vs last week)
- 4,521 EUR revenue (+8%)
...
```

**Template Builder Exercise:**
Create your own report template:
- Report name: [input]
- Data needed: [checkboxes]
- Sections to include: [textarea]
- Audience: [dropdown]

### Section 4: Data Cleaning (8 min)
**Content:**
- Heading: "Fix Messy Data Fast"

**Common Data Problems:**
Visual examples of:
- Inconsistent formats ("Amsterdam" vs "amsterdam" vs "AMSTERDAM")
- Missing values
- Duplicates
- Wrong data types
- Typos

**AI to the Rescue:**
Examples of cleanup prompts:
- "Standardize all city names to proper case"
- "Find and flag duplicate customer entries"
- "Convert all dates to DD-MM-YYYY format"
- "Fill missing phone country codes with +31"

**Interactive Exercise:**
Given messy data snippet, write the cleanup instruction:
Problem shown -> User writes solution prompt

### Section 5: Finding Insights (10 min)
**Content:**
- Heading: "See What You're Missing"

**AI as Your Analyst:**
AI can find patterns humans might miss:
- Correlations between variables
- Unusual trends
- Outliers and anomalies
- Seasonal patterns

**Vloto-Specific Insight Questions:**
Example prompts for their data:
- "Is there a pattern in when cars get damaged?"
- "Which customers are at risk of churning?"
- "What time of day are bookings most profitable?"
- "Are certain cars consistently problematic?"

**Visualization Prompts:**
AI can also suggest or create visuals:
- "Create a chart showing bookings by day of week"
- "Visualize the trend of new sign-ups"
- "Show revenue by car type as a pie chart"

**Practice Exercise:**
Given a scenario, write an insight-finding prompt:
Scenario: "You suspect some cars are much more popular than others"
Write your prompt: [textarea]
Good example: "Analyze bookings per car and identify the top 10% most booked and bottom 10% least booked. Are there patterns in why some are more popular?"

### Section 6: Quiz Time (5 min)
**5 Questions:**

Q1: "Instead of learning complex Excel formulas, with AI you can:"
- A) Only use simple formulas
- B) Ask questions about your data in plain language (correct)
- C) Avoid using data entirely
- D) Use only Google Sheets
Feedback: "AI lets you talk to your data naturally!"

Q2: "What can AI generate from your data?"
- A) Only numbers
- B) Reports, summaries, insights, and visualizations (correct)
- C) Only raw exports
- D) Only charts
Feedback: "AI can transform raw data into actionable insights and reports."

Q3: "When asking AI to clean data, you should:"
- A) Give vague instructions
- B) Specify exactly what format you want (correct)
- C) Let AI decide everything
- D) Only fix one thing at a time
Feedback: "Clear instructions: 'Convert all dates to DD-MM-YYYY format'"

Q4: "AI can find insights in your data such as:"
- A) Only sums and averages
- B) Patterns, trends, and anomalies humans might miss (correct)
- C) Only what you explicitly ask for
- D) Nothing useful for business
Feedback: "AI excels at spotting patterns across large datasets."

Q5: "A good data analysis prompt includes:"
- A) Just 'analyze this'"
- B) The context, specific questions, and desired output format (correct)
- C) Only technical terms
- D) A request to do everything
Feedback: "Context + specific questions = better analysis!"

### Section 7: Completion
**Content:**
- Celebration
- "Lesson 7 Complete!"
- "You can now use AI with your data!"

**Recap:**
1. "Ask data questions in plain language"
2. "Generate reports automatically"
3. "Clean messy data with simple instructions"
4. "Find insights and patterns you'd miss"

**Practical Challenge:**
"This week, take a real spreadsheet from your work and ask AI 5 questions about it. See what you discover!"

**Next Lesson Preview:**
"Coming Next: The Magic Lesson - Autonomous AI that builds while you sleep"
