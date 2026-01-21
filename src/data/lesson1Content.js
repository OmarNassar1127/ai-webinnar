// Lesson 1: Introduction to AI - Full Content Data
// Contains all content for the 8 sections of Lesson 1

export const lesson1Content = {
  title: "Introduction to AI",
  subtitle: "Your First Steps into Practical AI",
  duration: "45 minutes",
  totalSections: 8,

  sections: [
    // Section 1: Introduction
    {
      id: 1,
      title: "Introduction",
      shortTitle: "Intro",
      description: "Welcome to your AI journey",
      icon: "BookOpen",
      content: {
        heading: "Welcome to AI Academy",
        subheading: "Your journey to becoming an AI-powered professional starts here",
        mainText: `Artificial Intelligence is no longer a futuristic concept - it's a practical tool that's already transforming how we work. In this lesson, you'll learn the fundamentals of working with AI effectively.

By the end of this lesson, you won't just understand what AI is - you'll know how to use it as a powerful thinking partner in your daily work.`,

        learningObjectives: [
          {
            title: "Understand what AI really is",
            description: "Move beyond the hype to understand how AI actually works and what it can do for you",
            icon: "Brain",
          },
          {
            title: "Develop the right mental model",
            description: "Learn to think of AI as a capable colleague rather than a magic solution or simple tool",
            icon: "Lightbulb",
          },
          {
            title: "Master the basics of prompting",
            description: "Discover why context is everything and how to communicate effectively with AI",
            icon: "MessageSquare",
          },
        ],

        quote: {
          text: "The question isn't whether AI will change your job - it's whether you'll be the one directing that change.",
          author: "AI Academy",
        },

        callToAction: "Let's begin your transformation into an AI-empowered professional.",
      },
    },

    // Section 2: What is AI?
    {
      id: 2,
      title: "What is AI?",
      shortTitle: "What is AI",
      description: "Understanding AI beyond the hype",
      icon: "Cpu",
      content: {
        heading: "What is AI, Really?",
        subheading: "Cutting through the hype to understand what AI actually does",

        mainDefinition: {
          title: "AI: A Pattern Recognition Engine",
          description: "At its core, AI is a sophisticated pattern recognition system. It learns from vast amounts of text and data to predict what should come next in any given context.",
          icon: "Sparkles",
        },

        keyPoints: [
          {
            title: "Trained on Human Knowledge",
            description: "AI has been trained on billions of documents, conversations, and examples of human communication and reasoning.",
            icon: "Database",
          },
          {
            title: "Predicts Helpful Responses",
            description: "When you give AI a prompt, it predicts what a helpful, knowledgeable response would look like based on patterns it has learned.",
            icon: "Zap",
          },
          {
            title: "No True Understanding",
            description: "AI doesn't 'understand' in the human sense - it recognizes patterns and generates statistically likely helpful responses.",
            icon: "AlertCircle",
          },
        ],

        mythsVsReality: [
          {
            myth: "AI thinks like a human",
            reality: "AI recognizes patterns and generates likely responses based on training data",
            mythIcon: "XCircle",
            realityIcon: "CheckCircle",
          },
          {
            myth: "AI knows everything",
            reality: "AI has knowledge cutoffs and can make confident-sounding errors",
            mythIcon: "XCircle",
            realityIcon: "CheckCircle",
          },
          {
            myth: "AI will replace all jobs",
            reality: "AI augments human capabilities - the best results come from human-AI collaboration",
            mythIcon: "XCircle",
            realityIcon: "CheckCircle",
          },
          {
            myth: "AI is always right",
            reality: "AI can 'hallucinate' - generating plausible but incorrect information",
            mythIcon: "XCircle",
            realityIcon: "CheckCircle",
          },
          {
            myth: "AI understands context automatically",
            reality: "AI needs explicit context to provide relevant responses",
            mythIcon: "XCircle",
            realityIcon: "CheckCircle",
          },
        ],

        analogy: {
          title: "Think of it like this...",
          description: "Imagine an incredibly well-read assistant who has read millions of books, articles, and conversations. They can draw on all this knowledge to help you, but they need clear direction about what you're trying to accomplish.",
          icon: "BookOpen",
        },

        importantNote: {
          title: "Why This Matters",
          description: "Understanding AI's true nature helps you use it effectively. You wouldn't expect a brilliant researcher to read your mind - you'd give them clear instructions. The same applies to AI.",
        },
      },
    },

    // Section 3: The Right Mental Model
    {
      id: 3,
      title: "The Right Mental Model",
      shortTitle: "Mental Model",
      description: "How to think about AI correctly",
      icon: "Brain",
      content: {
        heading: "The Right Mental Model",
        subheading: "How you think about AI determines how effectively you use it",

        introduction: "Many people approach AI with the wrong mental model, leading to frustration or missed opportunities. Let's explore the most effective way to think about AI.",

        mentalModels: [
          {
            name: "Magic Oracle",
            description: "AI knows everything and gives perfect answers",
            effectiveness: "poor",
            icon: "Wand2",
            problems: [
              "Leads to blind trust in AI outputs",
              "No verification of accuracy",
              "Disappointment when AI makes errors",
            ],
          },
          {
            name: "Simple Tool",
            description: "AI is just a faster search engine or calculator",
            effectiveness: "limited",
            icon: "Wrench",
            problems: [
              "Underutilizes AI capabilities",
              "Misses creative and analytical potential",
              "Limited to basic queries",
            ],
          },
          {
            name: "Capable Colleague",
            description: "AI is a knowledgeable partner that needs clear direction",
            effectiveness: "optimal",
            icon: "Users",
            benefits: [
              "Sets appropriate expectations",
              "Encourages clear communication",
              "Enables productive collaboration",
              "Maintains human oversight",
            ],
          },
        ],

        comparisonTable: {
          headers: ["Aspect", "Magic Oracle", "Simple Tool", "Capable Colleague"],
          rows: [
            {
              aspect: "Trust Level",
              magicOracle: "Blind trust",
              simpleTool: "Minimal trust",
              capableColleague: "Verified trust",
            },
            {
              aspect: "Communication",
              magicOracle: "Vague requests",
              simpleTool: "Basic commands",
              capableColleague: "Clear context + goals",
            },
            {
              aspect: "Output Handling",
              magicOracle: "Accept as-is",
              simpleTool: "Use directly",
              capableColleague: "Review and refine",
            },
            {
              aspect: "Best For",
              magicOracle: "Nothing (risky)",
              simpleTool: "Simple lookups",
              capableColleague: "Complex work",
            },
          ],
        },

        recommendedApproach: {
          title: "The Capable Colleague Approach",
          description: "Think of AI as a brilliant new team member. They're incredibly knowledgeable and eager to help, but they:",
          points: [
            "Don't know your specific situation without being told",
            "Need clear instructions about what you want",
            "Work best when you provide context and examples",
            "May occasionally make mistakes that need correction",
            "Improve dramatically when given feedback",
          ],
          icon: "UserCheck",
        },

        practicalTip: {
          title: "Practical Tip",
          description: "Before asking AI anything, imagine you're briefing a smart colleague who just joined your team. What would they need to know to help you effectively?",
        },
      },
    },

    // Section 4: Context is King
    {
      id: 4,
      title: "Context is King",
      shortTitle: "Context",
      description: "Why context determines AI output quality",
      icon: "Crown",
      content: {
        heading: "Context is King",
        subheading: "The quality of your input directly determines the quality of AI's output",

        introduction: "The single most important factor in getting good results from AI is providing adequate context. This isn't just helpful - it's essential.",

        formula: {
          title: "The AI Quality Formula",
          equation: "Quality Output = Good Context + Clear Goal + Specific Format",
          description: "Each element multiplies the effectiveness of the others",
          elements: [
            {
              name: "Good Context",
              description: "Background information, situation details, relevant constraints",
              icon: "FileText",
            },
            {
              name: "Clear Goal",
              description: "What you want to achieve, the purpose of the output",
              icon: "Target",
            },
            {
              name: "Specific Format",
              description: "How you want the response structured, length, style",
              icon: "Layout",
            },
          ],
        },

        principle: {
          title: "Garbage In, Garbage Out",
          description: "This classic computing principle applies perfectly to AI. Vague inputs produce vague outputs. Specific, well-contextualized inputs produce useful, targeted outputs.",
          icon: "RefreshCw",
        },

        contextTypes: [
          {
            type: "Situational Context",
            description: "Who are you? What's the situation?",
            example: "I'm a customer service manager at a car-sharing company...",
            icon: "User",
          },
          {
            type: "Task Context",
            description: "What are you trying to accomplish?",
            example: "I need to respond to an angry customer who was charged incorrectly...",
            icon: "ClipboardList",
          },
          {
            type: "Audience Context",
            description: "Who is this for?",
            example: "The customer is frustrated and threatening to leave a bad review...",
            icon: "Users",
          },
          {
            type: "Constraint Context",
            description: "What limitations or requirements exist?",
            example: "Keep it under 200 words, professional but warm tone, include refund policy...",
            icon: "Lock",
          },
        ],

        realWorldExample: {
          title: "Real-World Example: Customer Email",
          scenario: "A customer is angry about being charged for damage they didn't cause",
          withoutContext: {
            prompt: "Write a response to an angry customer",
            result: "A generic, template-like response that could apply to any situation",
            quality: "poor",
          },
          withContext: {
            prompt: `I'm a customer service representative at Vloto, a car-sharing company.

A customer named Sarah has emailed us angry because she was charged $150 for interior damage (coffee stains) that she claims was already there when she picked up the car.

Looking at our records, the previous renter did report returning the car clean, but we don't have photos from the handover.

I need to write a response that:
- Acknowledges her frustration
- Explains our damage assessment process
- Offers a fair resolution (I can offer a 50% reduction as goodwill)
- Maintains a professional but empathetic tone
- Is under 200 words`,
            result: "A specific, empathetic response that addresses Sarah's exact situation with a concrete solution",
            quality: "excellent",
          },
        },

        keyInsight: {
          title: "Key Insight",
          description: "You're not just asking AI a question - you're setting up a scenario for it to respond to. The more complete the scenario, the better the response.",
        },
      },
    },

    // Section 5: Good vs Bad Prompts
    {
      id: 5,
      title: "Good vs Bad Prompts",
      shortTitle: "Prompts",
      description: "See the difference context makes",
      icon: "GitCompare",
      content: {
        heading: "Good vs Bad Prompts",
        subheading: "See the dramatic difference that good prompting makes",

        introduction: "Let's look at real examples that demonstrate how the same task can yield vastly different results based on how you prompt AI.",

        promptComparisons: [
          {
            id: 1,
            scenario: "Writing a Professional Email",
            badPrompt: {
              text: "Write an email to a customer",
              issues: ["No context about the situation", "No tone guidance", "No specific goal"],
            },
            goodPrompt: {
              text: "Write a professional email to a customer who requested a refund for a booking they couldn't use due to a car breakdown. Acknowledge the inconvenience, confirm the full refund, and offer a 20% discount on their next booking. Keep it warm but professional, under 150 words.",
              strengths: ["Clear situation", "Specific action items", "Tone and length specified"],
            },
          },
          {
            id: 2,
            scenario: "Explaining a Technical Concept",
            badPrompt: {
              text: "Explain how our app works",
              issues: ["Which app?", "To whom?", "What level of detail?"],
            },
            goodPrompt: {
              text: "Explain how Vloto's car-sharing app works to a new user who has never used car-sharing before. Cover: finding a car, making a reservation, unlocking the car, and ending the trip. Use simple language, no technical jargon, and format as 4 numbered steps.",
              strengths: ["Target audience clear", "Specific topics listed", "Format specified"],
            },
          },
          {
            id: 3,
            scenario: "Analyzing Data",
            badPrompt: {
              text: "Analyze this data",
              issues: ["What data?", "What kind of analysis?", "What decisions will this inform?"],
            },
            goodPrompt: {
              text: "Analyze these customer satisfaction scores from the past quarter. Identify: (1) overall trends, (2) top 3 complaint categories, (3) any correlation with time of day or location. I need to present this to leadership to justify improving our vehicle cleaning schedule.",
              strengths: ["Clear data source", "Specific analysis types", "Business context provided"],
            },
          },
          {
            id: 4,
            scenario: "Creating Marketing Copy",
            badPrompt: {
              text: "Write marketing copy",
              issues: ["For what product?", "What platform?", "What's the call to action?"],
            },
            goodPrompt: {
              text: "Write Instagram ad copy for Vloto's weekend getaway promotion (30% off weekend rentals). Target: urban millennials looking for spontaneous trips. Tone: fun, adventurous. Include a clear CTA. Max 125 characters for primary text.",
              strengths: ["Specific promotion", "Target audience", "Platform constraints"],
            },
          },
          {
            id: 5,
            scenario: "Problem Solving",
            badPrompt: {
              text: "How do I fix this problem?",
              issues: ["What problem?", "What have you tried?", "What's the impact?"],
            },
            goodPrompt: {
              text: "Our car-sharing customers frequently forget to take their belongings from vehicles. This causes support tickets and bad reviews. Currently we send one reminder email when the trip ends. Suggest 3-5 practical solutions we could implement, considering we have a mobile app and can send push notifications.",
              strengths: ["Problem clearly defined", "Current situation stated", "Available resources mentioned"],
            },
          },
          {
            id: 6,
            scenario: "Translation/Adaptation",
            badPrompt: {
              text: "Translate this to Dutch",
              issues: ["Direct translation may lose nuance", "No context about formality", "No adaptation guidance"],
            },
            goodPrompt: {
              text: "Translate this customer support message to Dutch. Our brand voice is friendly and informal (we use 'je' not 'u'). Adapt any idioms to feel natural in Dutch rather than literal translation. The customer is in the Netherlands.",
              strengths: ["Brand voice specified", "Cultural adaptation requested", "Regional context given"],
            },
          },
        ],

        promptFormula: {
          title: "The CLEAR Prompt Formula",
          description: "A simple framework for crafting effective prompts",
          steps: [
            {
              letter: "C",
              word: "Context",
              description: "Set the scene - who are you, what's the situation?",
            },
            {
              letter: "L",
              word: "Limits",
              description: "Define constraints - length, tone, format",
            },
            {
              letter: "E",
              word: "Examples",
              description: "Provide samples of what you want (when helpful)",
            },
            {
              letter: "A",
              word: "Action",
              description: "State clearly what you want AI to do",
            },
            {
              letter: "R",
              word: "Reason",
              description: "Explain why - the purpose or goal",
            },
          ],
        },

        practiceChallenge: {
          title: "Try It Yourself",
          description: "Transform this bad prompt into a good one:",
          badPrompt: "Help me write a message",
          hints: [
            "What kind of message?",
            "Who is it for?",
            "What do you want to achieve?",
            "What tone is appropriate?",
          ],
        },
      },
    },

    // Section 6: Practical Exercise
    {
      id: 6,
      title: "Practical Exercise",
      shortTitle: "Exercise",
      description: "Apply what you've learned",
      icon: "Dumbbell",
      content: {
        heading: "Practical Exercise",
        subheading: "Apply what you've learned with a real scenario",

        introduction: "Now it's time to practice. You'll be presented with a workplace scenario and asked to craft an effective prompt.",

        scenario: {
          title: "The Scenario",
          description: "You work in customer support at a car-sharing company. You've received the following complaint:",
          customerMessage: `Subject: TERRIBLE EXPERIENCE - WANT REFUND

I booked a car for my anniversary weekend and it was DISGUSTING. There was trash from the previous user, the car smelled bad, and the fuel tank was almost empty even though I paid for a full tank.

I had to spend 30 minutes cleaning before I could even use it, and another 20 minutes at a gas station. My wife was furious and our romantic trip started horribly.

I want a full refund and compensation for my time. If I don't hear back with a solution, I'm posting this everywhere.

- angry customer Mark`,
          context: [
            "Your company policy allows refunds for cleanliness issues",
            "You can offer up to 50% refund + future credit for severe cases",
            "The previous user has been flagged for leaving cars dirty before",
            "Your manager wants you to save this customer relationship",
          ],
        },

        task: {
          title: "Your Task",
          description: "Write a prompt that would help AI generate an appropriate response to Mark. Apply the CLEAR framework and include all relevant context.",
        },

        evaluationCriteria: [
          {
            criterion: "Context Provided",
            description: "Did you explain the situation fully?",
          },
          {
            criterion: "Goal Specified",
            description: "Is it clear what response you want?",
          },
          {
            criterion: "Constraints Included",
            description: "Did you specify tone, length, or format?",
          },
          {
            criterion: "Actionable Elements",
            description: "Did you include what you can actually offer?",
          },
        ],

        exampleSolution: {
          title: "Example Solution",
          prompt: `I'm a customer support representative at Vloto (car-sharing company). I need to respond to an angry customer named Mark who had a terrible experience.

The situation:
- He booked for his anniversary weekend
- The car was left dirty by the previous user (who has a history of this)
- There was trash, bad smell, and near-empty tank
- He had to spend 50 minutes cleaning and refueling
- He's threatening negative reviews if we don't resolve this

What I can offer:
- Full refund is possible for cleanliness issues (policy allows it)
- Can offer up to 50% refund + future credit for severe cases
- My manager wants to save this relationship

Please write a response that:
1. Sincerely apologizes for ruining their special occasion
2. Acknowledges each specific issue they mentioned
3. Takes full responsibility (no excuses)
4. Offers concrete compensation: full refund + 30% credit for next booking
5. Assures them we've addressed this with the previous user
6. Invites them to give us another chance

Tone: Genuinely apologetic, professional, warm
Length: 200-250 words
Format: Professional email`,
        },

        reflection: {
          title: "Notice the Difference",
          points: [
            "The example prompt gives AI everything it needs to write an appropriate response",
            "The context explains the emotional stakes (anniversary) and business stakes (negative reviews)",
            "Specific offers and constraints prevent AI from making promises you can't keep",
            "The format guidance ensures a usable output",
          ],
        },
      },
    },

    // Section 7: Quiz
    {
      id: 7,
      title: "Knowledge Check",
      shortTitle: "Quiz",
      description: "Test your understanding",
      icon: "HelpCircle",
      content: {
        heading: "Knowledge Check",
        subheading: "Test what you've learned in this lesson",

        introduction: "Complete this quiz to test your understanding of the key concepts. You need to score at least 5 out of 6 to pass.",

        passingScore: 5,
        totalQuestions: 6,
      },
    },

    // Section 8: Conclusion
    {
      id: 8,
      title: "Conclusion",
      shortTitle: "Conclusion",
      description: "Summary and next steps",
      icon: "Award",
      content: {
        heading: "Lesson Complete!",
        subheading: "You've taken your first steps toward AI mastery",

        summary: {
          title: "What You've Learned",
          points: [
            {
              title: "AI is a Pattern Engine",
              description: "It predicts helpful responses based on patterns learned from vast amounts of text",
              icon: "Cpu",
            },
            {
              title: "Think 'Capable Colleague'",
              description: "AI works best when you treat it as a knowledgeable team member who needs clear direction",
              icon: "Users",
            },
            {
              title: "Context Determines Quality",
              description: "The more relevant context you provide, the better the output you'll receive",
              icon: "Crown",
            },
            {
              title: "Structure Your Prompts",
              description: "Use the CLEAR framework: Context, Limits, Examples, Action, Reason",
              icon: "Layout",
            },
          ],
        },

        nextSteps: {
          title: "Your Next Steps",
          items: [
            {
              step: 1,
              title: "Practice Daily",
              description: "Try using AI for one real work task this week, applying what you've learned",
              icon: "Calendar",
            },
            {
              step: 2,
              title: "Iterate and Improve",
              description: "When AI outputs aren't quite right, add more context rather than starting over",
              icon: "RefreshCw",
            },
            {
              step: 3,
              title: "Continue Learning",
              description: "Move on to Lesson 2 where you'll learn advanced prompting techniques",
              icon: "ArrowRight",
            },
          ],
        },

        certificate: {
          title: "Lesson 1 Complete",
          description: "Introduction to AI",
          badge: "AI Foundations",
        },

        motivationalQuote: {
          text: "Every expert was once a beginner. You've just completed the most important step - starting.",
          author: "AI Academy",
        },

        upNext: {
          title: "Coming in Lesson 2",
          preview: "Advanced Prompting Techniques",
          topics: [
            "Chain of thought prompting",
            "Role-based prompting",
            "Few-shot learning",
            "Iterative refinement",
          ],
        },
      },
    },
  ],
};

// Export individual sections for easy access
export const sections = lesson1Content.sections;

// Export section by ID helper
export const getSectionById = (id) => {
  return lesson1Content.sections.find(section => section.id === id);
};

// Export section titles for navigation
export const sectionTitles = lesson1Content.sections.map(section => ({
  id: section.id,
  title: section.title,
  shortTitle: section.shortTitle,
  icon: section.icon,
}));

export default lesson1Content;
