// Quiz Questions for Lesson 5: Your First Build
// 5 questions testing understanding of the WHAT framework

export const quiz5Questions = [
  {
    id: 1,
    question: "What does the 'W' in the WHAT framework stand for?",
    options: [
      "Where users go",
      "What it does (the main purpose)",
      "Who builds it",
      "When to use it",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Correct! 'W' stands for 'What it does' - the core functionality and main purpose of the tool you're describing.",
      incorrect: "The 'W' in WHAT stands for 'What it does' - this is where you describe the main purpose and core functionality of your tool.",
    },
  },
  {
    id: 2,
    question: "Which part of the WHAT framework maps to the Frontend?",
    options: [
      "A - Actions behind scenes",
      "T - Things to remember",
      "W and H - What it does and How users interact",
      "Just T - Things to remember",
    ],
    correctIndex: 2,
    feedback: {
      correct: "That's right! 'W' (What it does) and 'H' (How users interact) together describe the Frontend - what users see and do.",
      incorrect: "The Frontend is described by 'W' (What it does) and 'H' (How users interact). These cover the user interface and user experience.",
    },
  },
  {
    id: 3,
    question: "What's a common mistake when describing tools to AI?",
    options: [
      "Being too specific about what you want",
      "Including information about who uses the tool",
      "Being too vague and lacking specific details",
      "Describing what happens behind the scenes",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Exactly! Being too vague is a top mistake. Vague requests get vague results. The more specific your description, the better AI can deliver.",
      incorrect: "Being too vague is one of the most common mistakes. Descriptions like 'a tool to manage stuff' leave AI guessing. Be specific about what, who, and how.",
    },
  },
  {
    id: 4,
    question: "What should you consider that many people forget?",
    options: [
      "The color scheme",
      "Edge cases and error handling",
      "The programming language",
      "The server location",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Right! Many people only describe the 'happy path' and forget to mention what happens when things go wrong - errors, missing data, user mistakes, etc.",
      incorrect: "Edge cases and error handling are often forgotten. Ask yourself: What if it fails? What if data is missing? What if users make mistakes?",
    },
  },
  {
    id: 5,
    question: "Why is the WHAT framework effective for non-technical people?",
    options: [
      "It requires coding knowledge",
      "It maps directly to how software is built (Frontend, Backend, Database)",
      "It only works for simple tools",
      "It avoids technical details entirely",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Perfect! The WHAT framework maps to software architecture: W+H = Frontend, A = Backend, T = Database. You're describing real technical requirements without needing to know code.",
      incorrect: "The WHAT framework is effective because it naturally maps to how software is built: W+H describe the Frontend, A describes the Backend logic, and T describes the Database.",
    },
  },
];

// Export correct answers array for easy score calculation
export const correctAnswers = quiz5Questions.map(q => q.correctIndex);

// Export passing score threshold
export const passingScore = 4;
export const totalQuestions = quiz5Questions.length;

// Helper function to check if an answer is correct
export const isAnswerCorrect = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz5Questions.length) {
    return false;
  }
  return quiz5Questions[questionIndex].correctIndex === selectedAnswer;
};

// Helper function to get feedback for an answer
export const getFeedback = (questionIndex, isCorrect) => {
  if (questionIndex < 0 || questionIndex >= quiz5Questions.length) {
    return null;
  }
  const question = quiz5Questions[questionIndex];
  return isCorrect ? question.feedback.correct : question.feedback.incorrect;
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

export default quiz5Questions;
