// Quiz Questions for Lesson 1: Introduction to AI
// 6 questions testing key concepts from the lesson

export const quizQuestions = [
  {
    id: 1,
    question: "What is AI fundamentally doing when it generates a response?",
    options: [
      "Thinking through the problem like a human would",
      "Searching the internet for the best answer",
      "Predicting statistically likely helpful responses based on patterns",
      "Running complex calculations to find the correct answer",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Exactly! AI is a pattern recognition system that predicts what helpful responses look like based on its training data.",
      incorrect: "Not quite. AI doesn't think like humans or search the internet - it predicts likely responses based on patterns it learned during training.",
    },
  },
  {
    id: 2,
    question: "Why is context so important when using AI?",
    options: [
      "AI has limited memory and needs reminders",
      "Context helps AI predict more relevant and accurate responses",
      "AI charges more for responses without context",
      "Context makes AI work faster",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Correct! Context helps AI understand your specific situation, leading to more relevant and useful responses.",
      incorrect: "Remember: AI predicts responses based on patterns. The more context you provide, the better it can match patterns relevant to your situation.",
    },
  },
  {
    id: 3,
    question: "Which mental model is most helpful for working with AI?",
    options: [
      "Magic Oracle - AI knows everything and gives perfect answers",
      "Simple Tool - AI is just a faster search engine",
      "Capable Colleague - AI is knowledgeable but needs clear direction",
      "Robot Assistant - AI follows commands without judgment",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Perfect! Thinking of AI as a capable colleague sets appropriate expectations and encourages clear communication.",
      incorrect: "The 'Capable Colleague' model works best - it acknowledges AI's capabilities while recognizing it needs clear direction and context from you.",
    },
  },
  {
    id: 4,
    question: "Which is the better prompt?",
    options: [
      "Write an email",
      "Help me with customer service",
      "Write a professional, apologetic email to a customer whose booking was cancelled due to vehicle breakdown, offering a full refund and 20% off their next booking",
      "Make this email good",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Excellent! This prompt includes context (customer situation), specifics (what happened), and clear instructions (what to offer).",
      incorrect: "The detailed prompt is best because it provides context, specifies the situation, and gives clear instructions about what the email should include.",
    },
  },
  {
    id: 5,
    question: "What does 'Garbage In, Garbage Out' mean for AI?",
    options: [
      "AI can only process text, not images",
      "You need to clean your data before using AI",
      "Vague, low-quality inputs produce vague, low-quality outputs",
      "AI will delete unnecessary information automatically",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Right! The quality of your input directly determines the quality of AI's output. Better prompts = better results.",
      incorrect: "'Garbage In, Garbage Out' means that if you give AI vague or poor-quality prompts, you'll get vague or poor-quality responses.",
    },
  },
  {
    id: 6,
    question: "Before giving AI a task, you should ask yourself:",
    options: [
      "Is this task too complex for AI?",
      "What context does AI need to help me effectively?",
      "How can I make this task as simple as possible?",
      "Should I use a different AI model?",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! Always consider what context - situation, goals, constraints, audience - AI needs to give you a useful response.",
      incorrect: "The key question is: 'What context does AI need?' Think about the situation, your goals, constraints, and who the output is for.",
    },
  },
];

// Export correct answers array for easy score calculation
export const correctAnswers = quizQuestions.map(q => q.correctIndex);

// Export passing score threshold
export const passingScore = 5;
export const totalQuestions = quizQuestions.length;

// Helper function to check if an answer is correct
export const isAnswerCorrect = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quizQuestions.length) {
    return false;
  }
  return quizQuestions[questionIndex].correctIndex === selectedAnswer;
};

// Helper function to get feedback for an answer
export const getFeedback = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quizQuestions.length) {
    return null;
  }
  const question = quizQuestions[questionIndex];
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

export default quizQuestions;
