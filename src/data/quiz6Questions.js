export const quiz6Questions = [
  {
    id: 1,
    question: 'What\'s the best way to choose your first tool to build?',
    options: [
      'Pick the most complex tool to show off your skills',
      'Choose one that addresses your biggest pain point that you\'ll use regularly',
      'Build whatever is trending in the industry',
      'Let AI decide what would be most impressive'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'A tool you\'ll actually use regularly is worth 10 tools you won\'t. Start with your biggest pain point for maximum impact.',
      incorrect: 'The best first project addresses your biggest pain point and is something you\'ll use regularly. Complex or trendy tools often go unused.'
    }
  },
  {
    id: 2,
    question: 'In a good specification, how should you describe the frontend?',
    options: [
      '"Make it look nice and professional"',
      '"Use modern design principles"',
      'Describe specific layout, elements, and what appears where',
      '"Similar to other good apps I\'ve seen"'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'Specific descriptions like "a scrollable table with columns for ID, status, and date" give AI exactly what it needs to build your interface.',
      incorrect: 'Vague descriptions like "nice" or "modern" don\'t tell AI what you actually want. Be specific: describe layout, elements, and what appears where.'
    }
  },
  {
    id: 3,
    question: 'What should you do when describing backend logic and calculations?',
    options: [
      'Let AI figure out the best approach',
      'Just say "calculate the important stuff"',
      'Provide specific formulas and thresholds like "alert when battery < 30%"',
      'Only describe what the user sees'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'AI can\'t guess your business rules. Specific thresholds and formulas like "alert when battery < 30%" ensure the tool works exactly as you need.',
      incorrect: 'AI needs specific rules to implement your logic correctly. Instead of vague descriptions, provide exact formulas and thresholds.'
    }
  },
  {
    id: 4,
    question: 'How long should you expect the first build session to take?',
    options: [
      '15-30 minutes - AI is fast',
      '1-3 hours for initial build, with iteration time after',
      'A full week of work',
      'It depends entirely on AI\'s mood'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'A realistic first build takes 1-3 hours, followed by 1-2 hours of testing and iteration. Total time is usually 4-8 hours over 1-2 days.',
      incorrect: 'Building a useful tool takes 1-3 hours for the initial build, plus time for testing and refinement. Expect 4-8 total hours over 1-2 days.'
    }
  },
  {
    id: 5,
    question: 'What\'s the most important mindset for building with AI?',
    options: [
      'Get it perfect on the first try',
      'Start small, ship fast, iterate often',
      'Build every possible feature before launching',
      'Never show anyone until it\'s completely finished'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Done is better than perfect! Start with the simplest useful version, get feedback, and improve from there. Iteration is the key to success.',
      incorrect: 'Trying to be perfect first leads to never finishing. The best approach is: start small, get something working, then iterate based on feedback.'
    }
  }
];

export const isAnswerCorrect = (questionIndex, answerIndex) => {
  return quiz6Questions[questionIndex]?.correctIndex === answerIndex;
};

export const getFeedback = (questionIndex, isCorrect) => {
  const question = quiz6Questions[questionIndex];
  return isCorrect ? question.feedback.correct : question.feedback.incorrect;
};

export const calculateQuizScore = (answers) => {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (isAnswerCorrect(index, answer)) {
      correct++;
    }
  });
  return correct;
};

export const isQuizPassed = (score) => {
  return score >= passingScore;
};

export const correctAnswers = quiz6Questions.map(q => q.correctIndex);
export const passingScore = 4;
export const totalQuestions = quiz6Questions.length;

export default quiz6Questions;
