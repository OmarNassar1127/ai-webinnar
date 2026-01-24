// Quiz Questions for Lesson 3: The AI Tools Landscape
// 6 questions testing understanding of chatbots vs agents, MCPs, plugins, skills, and AI IDEs

export const quiz3Questions = [
  {
    id: 1,
    question: "What's the key difference between an AI chatbot and an AI agent?",
    options: [
      "Chatbots are faster than agents",
      "Agents can take actions, chatbots can only respond with text",
      "Chatbots use more advanced technology",
      "Agents are only for programmers",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! The key difference is that AI agents can actually DO things - browse the web, edit files, send emails - while chatbots can only respond with text.",
      incorrect: "The main distinction is action vs. conversation. Chatbots can only tell you things, but AI agents can actually DO things like browse the web, edit files, or send emails.",
    },
  },
  {
    id: 2,
    question: "What does MCP (Model Context Protocol) do?",
    options: [
      "Makes AI faster at processing",
      "Connects AI to external tools and data sources",
      "Creates better chat responses",
      "Stores AI memories permanently",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Correct! MCP is like a universal translator that lets AI connect to and communicate with external tools and data sources - like your email, calendar, or databases.",
      incorrect: "MCP (Model Context Protocol) is like a universal translator. It enables AI to connect with external tools and data sources, giving AI access to things like your email, calendar, or company databases.",
    },
  },
  {
    id: 3,
    question: "What's the best analogy for AI skills?",
    options: [
      "A phone with apps installed",
      "A waiter carrying orders",
      "Training manuals that teach AI specific expertise",
      "A bridge between two systems",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Right! AI skills are like training manuals - they teach AI specific expertise for particular tasks, like how to write legal documents or analyze financial reports.",
      incorrect: "Skills are like training manuals for AI. They give AI specific expertise in certain areas, just like an employee who's been trained in a particular specialty.",
    },
  },
  {
    id: 4,
    question: "What is Claude Code (an AI IDE)?",
    options: [
      "A chatbot for answering questions",
      "An AI that can build entire applications by writing and running code",
      "A tool for connecting databases",
      "A plugin for web browsers",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! AI IDEs like Claude Code are essentially a personal programmer - they can create, modify, and run code to build entire applications based on your descriptions.",
      incorrect: "AI IDEs like Claude Code are like having your own personal programmer. They can write, edit, and run code to build entire applications - you describe what you want, and they build it.",
    },
  },
  {
    id: 5,
    question: "In the AI tools workflow, what typically comes first?",
    options: [
      "The AI writes code immediately",
      "You describe what you want in plain language",
      "You need to learn programming basics",
      "The AI searches the internet",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Perfect! The workflow always starts with YOU describing what you want. Your clear description is the most important input - then AI tools work together to make it happen.",
      incorrect: "Every AI workflow starts with your description. You don't need to code or be technical - you describe what you want in plain language, and the AI tools work together to achieve it.",
    },
  },
  {
    id: 6,
    question: "What's your most important 'superpower' when working with AI tools?",
    options: [
      "Knowing how to code",
      "Understanding AI algorithms",
      "Domain knowledge and clear communication",
      "Having expensive hardware",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Exactly! Your domain knowledge (understanding your work and problems) combined with clear communication is your superpower. AI can execute, but YOU know what needs to be done and can judge the quality.",
      incorrect: "Your superpower is domain knowledge and clear communication. You understand your work, your problems, and what good looks like. AI can execute tasks, but it needs YOUR expertise to know what to build.",
    },
  },
];

// Export correct answers array for easy score calculation
export const correctAnswers = quiz3Questions.map(q => q.correctIndex);

// Export passing score threshold
export const passingScore = 5;
export const totalQuestions = quiz3Questions.length;

// Helper function to check if an answer is correct
export const isAnswerCorrect = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz3Questions.length) {
    return false;
  }
  return quiz3Questions[questionIndex].correctIndex === selectedAnswer;
};

// Helper function to get feedback for an answer
export const getFeedback = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz3Questions.length) {
    return null;
  }
  const question = quiz3Questions[questionIndex];
  return isAnswerCorrect(questionIndex, selectedAnswer)
    ? question.feedback.correct
    : question.feedback.incorrect;
};

// Helper function to calculate score
export const calculateQuizScore = (answers) => {
  let score = 0;
  answers.forEach((answer, index) => {
    if (isAnswerCorrect(index, answer)) {
      score++;
    }
  });
  return score;
};

// Helper function to check if quiz is passed
export const isQuizPassed = (score) => {
  return score >= passingScore;
};

export default quiz3Questions;
