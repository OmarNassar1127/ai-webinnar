export const quiz7Questions = [
  {
    id: 1,
    question: 'What is the main advantage of using AI for spreadsheet analysis?',
    options: [
      'AI can create more colorful charts',
      'You can ask questions in plain English instead of writing formulas',
      'AI makes your spreadsheets run faster',
      'You don\'t need to save your work anymore'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Natural language queries let you analyze data without knowing Excel formulas or SQL. Just describe what you want to know!',
      incorrect: 'The biggest advantage is asking questions in plain English. No need for complex formulas or queries - just describe what you want to know.'
    }
  },
  {
    id: 2,
    question: 'When asking AI to generate a report, what makes a good prompt?',
    options: [
      'Just say "make a report" and let AI figure it out',
      'Include specific sections, metrics, and formatting preferences',
      'Use technical jargon to sound professional',
      'Keep it as short as possible'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Specific prompts like "Include a table for vehicle stats, bullet points for action items" give AI clear instructions for useful output.',
      incorrect: 'Good report prompts specify what sections you need, which metrics to include, and how you want it formatted.'
    }
  },
  {
    id: 3,
    question: 'What is the best approach before applying AI data cleaning to your entire dataset?',
    options: [
      'Trust AI and apply changes immediately',
      'Ask AI to show examples of cleaned data first',
      'Only clean data on weekends',
      'Avoid data cleaning altogether'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Previewing examples catches misunderstandings before they affect all your data. Always verify before applying bulk changes.',
      incorrect: 'Always preview changes first! Ask AI to "show me 5 examples of what the cleaned data will look like" before applying to everything.'
    }
  },
  {
    id: 4,
    question: 'Which of these is NOT a common data problem AI can help fix?',
    options: [
      'Inconsistent date formats',
      'Duplicate entries',
      'Data stored on paper documents',
      'Missing values'
    ],
    correctIndex: 2,
    feedback: {
      correct: 'AI works with digital data. Paper documents need to be digitized first before AI can help clean or analyze them.',
      incorrect: 'AI can fix digital data issues like dates, duplicates, and missing values. But it can\'t directly clean paper documents - those need to be digitized first.'
    }
  },
  {
    id: 5,
    question: 'What is the "Insight Loop" for finding patterns in data?',
    options: [
      'A special AI algorithm',
      'Ask → Discover → Follow Up with deeper questions',
      'Loop through data 3 times',
      'Only analyze data in circular charts'
    ],
    correctIndex: 1,
    feedback: {
      correct: 'Each insight leads to better questions. When AI reveals a pattern, dig deeper: "Why is this happening?" "What else correlates with this?"',
      incorrect: 'The Insight Loop is: Ask → Discover → Follow Up. When AI reveals a pattern, ask follow-up questions to go deeper and understand the "why."'
    }
  }
];

export const isAnswerCorrect = (questionIndex, answerIndex) => {
  return quiz7Questions[questionIndex]?.correctIndex === answerIndex;
};

export const getFeedback = (questionIndex, isCorrect) => {
  const question = quiz7Questions[questionIndex];
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

export const correctAnswers = quiz7Questions.map(q => q.correctIndex);
export const passingScore = 4;
export const totalQuestions = quiz7Questions.length;

export default quiz7Questions;
