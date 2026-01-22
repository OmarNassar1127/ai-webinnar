// Quiz Questions for Lesson 4: AI in Action
// 5 questions testing understanding of iterative AI building process

export const quiz4Questions = [
  {
    id: 1,
    question: "What's the best way to describe building with AI?",
    options: [
      "Writing code line by line",
      "A one-shot request that works perfectly the first time",
      "An iterative conversation where you refine results together",
      "Letting AI make all decisions without input",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Exactly! Building with AI is a conversation. You describe what you want, see the results, provide feedback, and iterate until it's right.",
      incorrect: "AI building is best described as an iterative conversation. You describe, the AI builds, you give feedback, and together you refine until the tool is exactly what you need.",
    },
  },
  {
    id: 2,
    question: "When the AI's first attempt isn't perfect, what should you do?",
    options: [
      "Start completely over from scratch",
      "Give up - AI clearly can't help",
      "Provide specific feedback about what needs to change",
      "Accept whatever the AI produces",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Right! Imperfect first attempts are normal. The key is giving clear, specific feedback so the AI can adjust. Each iteration gets you closer to what you want.",
      incorrect: "When the first attempt isn't perfect, that's completely normal! The best approach is to provide specific feedback about what needs to change. AI learns from your corrections.",
    },
  },
  {
    id: 3,
    question: "What leads to better results when working with AI?",
    options: [
      "Keeping descriptions vague so AI has creative freedom",
      "Using technical coding terms",
      "Clear, specific descriptions of what you want",
      "Making requests as short as possible",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Perfect! Clear, specific descriptions lead to better results. The more detail you provide about who uses it, what it should do, and how it should work, the better the AI can deliver.",
      incorrect: "Clear, specific descriptions are the key to great AI results. Vague requests get vague results. Be specific about who will use the tool, what features you need, and how it should work.",
    },
  },
  {
    id: 4,
    question: "Do you need to understand the code AI generates?",
    options: [
      "Yes, you must review every line of code",
      "No, you focus on what the tool does while AI handles the technical details",
      "Yes, you should learn to code first before using AI",
      "No, and you shouldn't even look at the results",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Correct! You don't need to understand the code. Your job is to describe what you want, test the results, and provide feedback. The AI handles all the technical implementation.",
      incorrect: "You don't need to understand the code at all! Your role is to describe what you want, test whether it works, and give feedback. AI handles all the technical details.",
    },
  },
  {
    id: 5,
    question: "What's a 'red flag' that suggests you need to adjust your approach?",
    options: [
      "The AI asks clarifying questions",
      "The first version needs some tweaks",
      "The same errors keep repeating despite feedback",
      "The AI generates code quickly",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Right! Repeated errors despite feedback is a red flag. It means you should try a different approach, rephrase your request, or break the problem into smaller pieces.",
      incorrect: "When the same errors keep happening despite your feedback, that's a red flag. It's time to try a different approach - rephrase your request or break the problem into smaller parts.",
    },
  },
];

// Export correct answers array for easy score calculation
export const correctAnswers = quiz4Questions.map(q => q.correctIndex);

// Export passing score threshold
export const passingScore = 4;
export const totalQuestions = quiz4Questions.length;

// Helper function to check if an answer is correct
export const isAnswerCorrect = (questionIndex, selectedAnswer) => {
  if (questionIndex < 0 || questionIndex >= quiz4Questions.length) {
    return false;
  }
  return quiz4Questions[questionIndex].correctIndex === selectedAnswer;
};

// Helper function to get feedback for an answer
export const getFeedback = (questionIndex, isCorrect) => {
  if (questionIndex < 0 || questionIndex >= quiz4Questions.length) {
    return null;
  }
  const question = quiz4Questions[questionIndex];
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

export default quiz4Questions;
