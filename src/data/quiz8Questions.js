export const quiz8Questions = [
  {
    id: 1,
    question: "What is the main problem that Ralph solves?",
    options: [
      "Making AI responses faster",
      "The context window limitation and manual iteration",
      "Writing better code than humans",
      "Replacing developers entirely"
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! Ralph solves the problem of losing context and needing constant manual input by using structured PRDs and autonomous loops.",
      incorrect: "Not quite. Ralph's main innovation is solving the context window problem and eliminating manual back-and-forth through structured autonomous loops."
    }
  },
  {
    id: 2,
    question: "What does the 'passes: false' field in a user story tell Ralph?",
    options: [
      "The story has a bug",
      "The story should be skipped",
      "This is the next story to implement",
      "The story is optional"
    ],
    correctIndex: 2,
    feedback: {
      correct: "Correct! Ralph looks for the first story with 'passes: false' and works on implementing it.",
      incorrect: "Not quite. 'passes: false' means the story hasn't been implemented yet, so it's the next one Ralph should work on."
    }
  },
  {
    id: 3,
    question: "What makes a PRD effective for Ralph?",
    options: [
      "Long, detailed paragraphs about the vision",
      "Clear acceptance criteria that can be tested",
      "Lots of placeholder text to fill in later",
      "Ambiguous requirements for creative freedom"
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! Clear, testable acceptance criteria are the key to effective PRDs. Ralph knows when it's done when all criteria pass.",
      incorrect: "Not quite. Ralph needs clear, specific acceptance criteria to know when a story is complete. Vague requirements lead to poor results."
    }
  },
  {
    id: 4,
    question: "When is Ralph NOT a good choice?",
    options: [
      "Building a dashboard with 10 user stories",
      "Overnight builds of well-defined features",
      "Exploring vague ideas you're still figuring out",
      "Creating UI component libraries"
    ],
    correctIndex: 2,
    feedback: {
      correct: "Correct! Ralph excels with clear requirements. Vague, exploratory work is better suited for interactive AI sessions where you can iterate in real-time.",
      incorrect: "Not quite. Ralph struggles with vague requirements. It needs clear acceptance criteria to know when it's done."
    }
  },
  {
    id: 5,
    question: "What happens after Ralph completes a story?",
    options: [
      "It waits for human approval before continuing",
      "It commits, updates the PRD, and moves to the next failing story",
      "It sends an email notification",
      "It stops and outputs COMPLETE"
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! Ralph commits the changes, marks the story as 'passes: true' in the PRD, then finds the next story with 'passes: false' to work on.",
      incorrect: "Not quite. After completing a story, Ralph commits the changes, updates the PRD to mark it complete, and automatically moves to the next failing story."
    }
  }
];

// Helper functions
export const isAnswerCorrect = (questionIndex, selectedIndex) => {
  return quiz8Questions[questionIndex].correctIndex === selectedIndex;
};

export const getFeedback = (questionIndex, selectedIndex) => {
  const question = quiz8Questions[questionIndex];
  return isAnswerCorrect(questionIndex, selectedIndex)
    ? question.feedback.correct
    : question.feedback.incorrect;
};

export const calculateQuizScore = (answers) => {
  return answers.reduce((score, answer, index) => {
    return score + (isAnswerCorrect(index, answer) ? 1 : 0);
  }, 0);
};

export const isQuizPassed = (score) => {
  return score >= passingScore;
};

export const correctAnswers = quiz8Questions.map(q => q.correctIndex);
export const passingScore = 4;
export const totalQuestions = quiz8Questions.length;

export default quiz8Questions;
