// Quiz Questions for Lesson 3: Claude & Cowork
// 6 questions testing understanding of Claude Cowork, MCP, Vloto use cases, and prompting

export const quiz3Questions = [
  {
    id: 1,
    question: "What is Claude Cowork?",
    options: [
      "A new programming language from Anthropic",
      "An autonomous AI agent that works on your local files and produces finished deliverables",
      "A chatbot that only answers questions",
      "A project management tool",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! Cowork is an autonomous AI agent in Claude Desktop that can read/write your files, create spreadsheets, presentations, and more — not just chat.",
      incorrect: "Cowork is more than a chatbot — it's an autonomous agent that actually creates files and does work on your behalf, producing real deliverables like Excel and PowerPoint files.",
    },
  },
  {
    id: 2,
    question: "How does Cowork keep your data safe?",
    options: [
      "It uploads everything to the cloud",
      "It runs in a sandboxed virtual machine and only accesses the folder you share",
      "It doesn't — there's no security",
      "It requires an IT administrator present at all times",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Right! Cowork runs in an isolated virtual machine (sandbox) on your computer. It can only access the specific folder you share with it — your other files, passwords, and data stay completely protected.",
      incorrect: "Cowork uses a sandboxed virtual machine — an isolated mini-computer inside your computer. It can only access the folder you explicitly share, keeping everything else safe.",
    },
  },
  {
    id: 3,
    question: "Which of these is a real Vloto use case for Cowork?",
    options: [
      "Physically driving the cars to charge them",
      "Comparing 3 vendor contracts and creating a scoring matrix with recommendations",
      "Repairing broken vehicles",
      "Attending partner meetings in person",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Yes! Cowork excels at document analysis. It can read multiple contracts, extract key terms, compare them across dimensions, and create formatted comparison matrices — all in minutes.",
      incorrect: "Cowork can't do physical tasks, but it's incredible at document work. Comparing vendor contracts, creating scoring matrices, and generating recommendations are perfect Cowork tasks.",
    },
  },
  {
    id: 4,
    question: "What does MCP (Model Context Protocol) enable in Cowork?",
    options: [
      "It makes the AI think faster",
      "It connects Cowork to external tools like Gmail, Google Drive, and DocuSign",
      "It creates better passwords",
      "It compresses files on your computer",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Exactly! MCP is like a universal adapter that lets Cowork talk to external services — Gmail for emails, Google Drive for documents, DocuSign for contracts, and more.",
      incorrect: "MCP (Model Context Protocol) is Cowork's connection system. It's what lets Cowork interact with external tools like Gmail, Google Drive, DocuSign, and other services your team uses.",
    },
  },
  {
    id: 5,
    question: "What's the best way to get great results from Cowork?",
    options: [
      "Keep your prompts as short as possible",
      "Give specific instructions with business context and desired output format",
      "Use technical programming terms",
      "Let Cowork decide everything without guidance",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Perfect! The best results come from specific instructions that include business context and your desired output format. Your domain knowledge combined with clear communication is the superpower.",
      incorrect: "Great Cowork results come from specificity. Tell it what you need, give business context, and specify the output format. Think: 'Create an Excel file comparing these 3 contracts with pricing, terms, and a recommendation tab.'",
    },
  },
  {
    id: 6,
    question: "What was the market reaction when Claude Cowork launched?",
    options: [
      "Nobody noticed",
      "Software stocks rose sharply",
      "It triggered a $285 billion software stocks selloff — companies saw it as a game-changer",
      "Only Anthropic stock moved",
    ],
    correctIndex: 2,
    feedback: {
      correct: "Correct! Cowork's launch triggered a massive $285 billion selloff in software stocks. Companies like ServiceNow (-23%), Salesforce (-22%), and Snowflake (-20%) dropped because the market recognized Cowork could automate work these tools support.",
      incorrect: "Cowork's launch caused a $285 billion software stocks selloff! ServiceNow, Salesforce, Snowflake, and others dropped significantly because investors recognized that an AI agent doing real office work could disrupt traditional enterprise software.",
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
