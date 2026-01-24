// Quiz Questions for Lesson 2: How Software Works
// 6 questions testing understanding of software components using the restaurant analogy

export const quiz2Questions = [
  {
    id: 1,
    question: "In the restaurant analogy, what does the kitchen represent?",
    options: [
      "Frontend - what customers see",
      "Backend - where the real work happens",
      "Database - where ingredients are stored",
      "API - the waiters carrying orders",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! The kitchen is like the backend - it's where all the real processing and work happens, hidden from customers.",
      incorrect: "Not quite. The kitchen represents the backend, where all the processing happens behind the scenes - just like a chef prepares food out of sight.",
    },
  },
  {
    id: 2,
    question: "When you tap a button in the Vloto app, what component are you directly interacting with?",
    options: [
      "The database storing your information",
      "The backend processing your request",
      "The frontend - the visual interface",
      "The API carrying your message",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Correct! The frontend is everything you see and tap - the visual interface that you interact with directly.",
      incorrect: "Remember: The frontend is what users see and interact with. When you tap a button, you're touching the frontend - it then communicates with other components.",
    },
  },
  {
    id: 3,
    question: "Where is your booking history stored in the Vloto app?",
    options: [
      "Frontend - displayed on your screen",
      "Backend - processed by the server",
      "Database - permanently saved for retrieval",
      "API - passed between systems",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Right! The database is like the pantry - it permanently stores all your information so it can be retrieved later.",
      incorrect: "Your booking history is stored in the database. Think of it like the pantry in a restaurant - it's where all the ingredients (data) are stored for later use.",
    },
  },
  {
    id: 4,
    question: "What is the main role of an API in software?",
    options: [
      "Display information to users",
      "Store data permanently",
      "Process complex calculations",
      "Carry messages between different parts of the system",
    ],
    correctIndex: 3,
    feedback: {
      correct: "Exactly! APIs are like waiters in a restaurant - they carry messages (orders) between the frontend (dining room) and backend (kitchen).",
      incorrect: "APIs are the messengers of software. Like waiters carrying orders between diners and the kitchen, APIs carry requests and responses between system components.",
    },
  },
  {
    id: 5,
    question: "If Vloto wanted to add a 'car battery percentage' feature, which components would need changes?",
    options: [
      "Only the frontend to show the battery icon",
      "Only the database to store battery levels",
      "Frontend, backend, and database - all three",
      "Only the API to fetch battery data",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Perfect! New features typically touch multiple parts: the frontend needs to display it, the backend needs to process it, and the database needs to store it.",
      incorrect: "Most new features require all three components: Frontend (to display battery %), Backend (to process/calculate), and Database (to store battery readings).",
    },
  },
  {
    id: 6,
    question: "Why is understanding software components important for using AI tools?",
    options: [
      "So you can write code yourself",
      "So you can describe what you want clearly and specifically",
      "So you can debug technical problems",
      "So you can choose the right programming language",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! When you understand the parts of software, you can describe your ideas clearly to AI tools - and clear descriptions lead to better results.",
      incorrect: "Understanding software components helps you describe your ideas clearly to AI. You don't need to code - but you do need to explain what you want in specific terms.",
    },
  },
];

// Export correct answers array for easy score calculation
export const correctAnswers = quiz2Questions.map(q => q.correctIndex);

// Export passing score threshold
export const passingScore = 5;
export const totalQuestions = quiz2Questions.length;

// Helper function to check if an answer is correct
export const isAnswerCorrect = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz2Questions.length) {
    return false;
  }
  return quiz2Questions[questionIndex].correctIndex === selectedAnswer;
};

// Helper function to get feedback for an answer
export const getFeedback = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz2Questions.length) {
    return null;
  }
  const question = quiz2Questions[questionIndex];
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

export default quiz2Questions;
