import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  CheckCircle,
  XCircle,
  LogIn,
  Newspaper,
  CalendarCheck,
  Monitor,
  Server,
  HardDrive,
  ArrowLeftRight,
  RefreshCw,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Label the Parts Section
 * Interactive labeling exercises where users identify software components in screenshots
 */

const componentOptions = [
  { id: 'frontend', label: 'Frontend', icon: Monitor, color: 'purple', gradient: 'from-purple-500 to-violet-600' },
  { id: 'backend', label: 'Backend', icon: Server, color: 'cyan', gradient: 'from-cyan-500 to-blue-600' },
  { id: 'database', label: 'Database', icon: HardDrive, color: 'emerald', gradient: 'from-emerald-500 to-green-600' },
  { id: 'api', label: 'API', icon: ArrowLeftRight, color: 'orange', gradient: 'from-orange-500 to-amber-600' }
];

const labelingExercises = [
  {
    id: 'login',
    title: 'Login Form',
    icon: LogIn,
    description: 'A typical login page with username and password',
    mockup: {
      type: 'login',
      elements: [
        { id: 'username-field', label: 'Username/email input field', x: 20, y: 35, width: 60, height: 12 },
        { id: 'password-field', label: 'Password input field', x: 20, y: 50, width: 60, height: 12 },
        { id: 'login-button', label: 'Login button', x: 30, y: 68, width: 40, height: 12 }
      ]
    },
    questions: [
      {
        id: 'login-q1',
        question: 'The username and password input fields that users type into',
        correctAnswer: 'frontend',
        explanation: 'Input fields are part of the visual interface - what users SEE and interact with.'
      },
      {
        id: 'login-q2',
        question: 'Checking if the password is correct',
        correctAnswer: 'backend',
        explanation: 'Verifying credentials is logic that happens behind the scenes - security must be handled server-side.'
      },
      {
        id: 'login-q3',
        question: 'Where user accounts and passwords are stored',
        correctAnswer: 'database',
        explanation: 'User accounts persist over time - they need to be stored in a database.'
      },
      {
        id: 'login-q4',
        question: 'Sending the login request from the form to the server',
        correctAnswer: 'api',
        explanation: 'The API carries the username/password from frontend to backend for verification.'
      }
    ]
  },
  {
    id: 'newsfeed',
    title: 'Social Media Feed',
    icon: Newspaper,
    description: 'A newsfeed showing posts from friends',
    mockup: {
      type: 'newsfeed',
      elements: [
        { id: 'post-1', label: 'Post card 1', x: 10, y: 15, width: 80, height: 25 },
        { id: 'post-2', label: 'Post card 2', x: 10, y: 45, width: 80, height: 25 },
        { id: 'refresh', label: 'Refresh button', x: 75, y: 5, width: 15, height: 8 }
      ]
    },
    questions: [
      {
        id: 'feed-q1',
        question: 'The post cards showing photos, text, and like buttons',
        correctAnswer: 'frontend',
        explanation: 'Post cards are visual elements - buttons, images, and text that users see and click.'
      },
      {
        id: 'feed-q2',
        question: 'Deciding which posts to show first (sorting by relevance)',
        correctAnswer: 'backend',
        explanation: 'The algorithm that decides post order runs on the server - it\'s business logic.'
      },
      {
        id: 'feed-q3',
        question: 'All the posts ever created by users',
        correctAnswer: 'database',
        explanation: 'Posts are stored permanently - they need a database to persist across sessions.'
      },
      {
        id: 'feed-q4',
        question: 'Fetching your personalized feed when you open the app',
        correctAnswer: 'api',
        explanation: 'The API requests your feed from the server and brings back the posts to display.'
      }
    ]
  },
  {
    id: 'booking',
    title: 'Booking Confirmation',
    icon: CalendarCheck,
    description: 'A confirmation page after booking a car',
    mockup: {
      type: 'booking',
      elements: [
        { id: 'confirmation', label: 'Confirmation message', x: 15, y: 20, width: 70, height: 15 },
        { id: 'details', label: 'Booking details', x: 15, y: 40, width: 70, height: 30 },
        { id: 'email-note', label: 'Email sent notification', x: 15, y: 75, width: 70, height: 10 }
      ]
    },
    questions: [
      {
        id: 'book-q1',
        question: 'The confirmation page showing "Booking Successful!" with details',
        correctAnswer: 'frontend',
        explanation: 'The confirmation page is what users see - visual feedback that their action worked.'
      },
      {
        id: 'book-q2',
        question: 'Processing the booking request and checking availability',
        correctAnswer: 'backend',
        explanation: 'Creating a booking involves logic: checking dates, calculating prices, ensuring no conflicts.'
      },
      {
        id: 'book-q3',
        question: 'Where all booking records are permanently saved',
        correctAnswer: 'database',
        explanation: 'Booking records must persist - stored in a database so you can view them later.'
      },
      {
        id: 'book-q4',
        question: 'Sending the confirmation email to the customer',
        correctAnswer: 'api',
        explanation: 'The API connects to an email service to send the confirmation - it\'s a messenger between systems.'
      }
    ]
  }
];

// Mock UI Components for Screenshots
const LoginMockup = () => (
  <div className="bg-slate-800 rounded-xl p-6 space-y-4">
    <div className="text-center mb-6">
      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
        <LogIn className="w-6 h-6 text-white" />
      </div>
      <p className="text-white font-semibold">Welcome Back</p>
    </div>
    <div className="space-y-3">
      <div className="bg-slate-700 rounded-lg px-4 py-3 text-gray-400 text-sm border border-slate-600">
        Username or email
      </div>
      <div className="bg-slate-700 rounded-lg px-4 py-3 text-gray-400 text-sm border border-slate-600">
        ••••••••
      </div>
    </div>
    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium mt-4">
      Sign In
    </button>
  </div>
);

const NewsfeedMockup = () => (
  <div className="bg-slate-800 rounded-xl p-4 space-y-3">
    <div className="flex items-center justify-between mb-2">
      <p className="text-white font-semibold">Your Feed</p>
      <RefreshCw className="w-4 h-4 text-gray-400" />
    </div>
    {[1, 2].map((i) => (
      <div key={i} className="bg-slate-700/50 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
          <div>
            <p className="text-white text-sm font-medium">User {i}</p>
            <p className="text-gray-500 text-xs">2h ago</p>
          </div>
        </div>
        <div className="h-20 bg-slate-600 rounded-lg" />
        <div className="flex gap-4 text-gray-400 text-xs">
          <span>❤️ 42</span>
          <span>💬 12</span>
        </div>
      </div>
    ))}
  </div>
);

const BookingMockup = () => (
  <div className="bg-slate-800 rounded-xl p-6 space-y-4">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <p className="text-green-400 font-bold text-lg">Booking Confirmed!</p>
    </div>
    <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Vehicle:</span>
        <span className="text-white">Tesla Model 3</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Date:</span>
        <span className="text-white">Jan 25, 2026</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Booking #:</span>
        <span className="text-white">VLT-2842</span>
      </div>
    </div>
    <p className="text-gray-400 text-xs text-center">
      📧 Confirmation sent to your email
    </p>
  </div>
);

const MockupDisplay = ({ type }) => {
  switch (type) {
    case 'login':
      return <LoginMockup />;
    case 'newsfeed':
      return <NewsfeedMockup />;
    case 'booking':
      return <BookingMockup />;
    default:
      return null;
  }
};

const ComponentButton = ({ option, isSelected, isCorrect, isWrong, onClick, disabled }) => {
  const IconComponent = option.icon;

  let bgClass = 'bg-slate-700/50 hover:bg-slate-700 border-slate-600';
  let textClass = 'text-gray-300';

  if (isSelected && isCorrect) {
    bgClass = 'bg-green-900/50 border-green-500 ring-2 ring-green-500/50';
    textClass = 'text-green-400';
  } else if (isSelected && isWrong) {
    bgClass = 'bg-red-900/50 border-red-500 ring-2 ring-red-500/50';
    textClass = 'text-red-400';
  } else if (isSelected) {
    bgClass = `bg-gradient-to-r ${option.gradient} border-transparent`;
    textClass = 'text-white';
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${bgClass} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <IconComponent className={`w-4 h-4 ${textClass}`} />
      <span className={`text-sm font-medium ${textClass}`}>{option.label}</span>
    </motion.button>
  );
};

const QuestionCard = ({ question, index, answer, onAnswer, isRevealed }) => {
  const isCorrect = answer === question.correctAnswer;
  const correctOption = componentOptions.find(o => o.id === question.correctAnswer);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800/50 rounded-xl p-4 space-y-4"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-sm text-gray-400 font-medium">
          {index + 1}
        </span>
        <p className="text-white text-sm leading-relaxed">{question.question}</p>
      </div>

      <div className="flex flex-wrap gap-2 pl-10">
        {componentOptions.map((option) => (
          <ComponentButton
            key={option.id}
            option={option}
            isSelected={answer === option.id}
            isCorrect={isRevealed && answer === option.id && isCorrect}
            isWrong={isRevealed && answer === option.id && !isCorrect}
            onClick={() => !isRevealed && onAnswer(question.id, option.id)}
            disabled={isRevealed}
          />
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-10"
          >
            {isCorrect ? (
              <div className="flex items-start gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Correct! {question.explanation}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-red-400 text-sm">
                  <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Not quite. The correct answer is <span className={`font-semibold text-${correctOption.color}-400`}>{correctOption.label}</span>.</span>
                </div>
                <p className="text-gray-400 text-sm">{question.explanation}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ExerciseSection = ({ exercise, exerciseIndex, isActive, onActivate, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(null);

  const IconComponent = exercise.icon;
  const allAnswered = exercise.questions.every(q => answers[q.id]);

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleCheck = () => {
    const correctCount = exercise.questions.filter(
      q => answers[q.id] === q.correctAnswer
    ).length;
    setScore(correctCount);
    setIsRevealed(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsRevealed(false);
    setScore(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + exerciseIndex * 0.15 }}
    >
      <Card
        className={`overflow-hidden transition-all ${isActive ? 'ring-2 ring-green-500/50' : ''}`}
        onClick={!isActive ? onActivate : undefined}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                  exerciseIndex === 0 ? 'from-purple-500 to-pink-600' :
                  exerciseIndex === 1 ? 'from-cyan-500 to-blue-600' :
                  'from-green-500 to-emerald-600'
                } flex items-center justify-center shadow-lg`}
              >
                <IconComponent className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">{exercise.title}</h3>
                <p className="text-gray-400 text-sm">{exercise.description}</p>
              </div>
            </div>
            {!isActive && (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
            {isActive && score !== null && (
              <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                score === exercise.questions.length
                  ? 'bg-green-900/50 text-green-400'
                  : score >= exercise.questions.length / 2
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-red-900/50 text-red-400'
              }`}>
                {score}/{exercise.questions.length}
              </div>
            )}
          </div>

          {/* Exercise Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Mockup and Questions in Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Mock Screenshot */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Screenshot Preview:</p>
                    <MockupDisplay type={exercise.mockup.type} />
                  </div>

                  {/* Questions */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Label each part:</p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {exercise.questions.map((question, qIndex) => (
                        <QuestionCard
                          key={question.id}
                          question={question}
                          index={qIndex}
                          answer={answers[question.id]}
                          onAnswer={handleAnswer}
                          isRevealed={isRevealed}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  {!isRevealed ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCheck}
                      disabled={!allAnswered}
                      className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                        allAnswered
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                          : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check Answers
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-slate-700 text-white hover:bg-slate-600 transition-all"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                      </motion.button>
                      {score === exercise.questions.length && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onComplete}
                          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                          <Sparkles className="w-4 h-4" />
                          Perfect! Continue
                        </motion.button>
                      )}
                    </>
                  )}
                </div>

                {/* Perfect Score Celebration */}
                <AnimatePresence>
                  {isRevealed && score === exercise.questions.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 text-center"
                    >
                      <p className="text-green-300">
                        🎉 Perfect score! You've mastered identifying components in this scenario!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed hint */}
          {!isActive && (
            <p className="text-center text-gray-500 text-sm">
              Click to start this labeling exercise
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const LabelTheParts = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);

  const headingText = "Test Your Eyes";

  // Typewriter effect for heading
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < headingText.length) {
        setDisplayedText(headingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 400);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const handleExerciseComplete = (exerciseId) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
    // Auto-advance to next exercise if available
    const currentIndex = labelingExercises.findIndex(e => e.id === exerciseId);
    if (currentIndex < labelingExercises.length - 1) {
      setActiveExercise(labelingExercises[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
          >
            <Eye className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-green-400 align-middle"
            />
          </h1>

          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Now let's practice identifying <span className="text-green-400 font-medium">Frontend</span>,{' '}
                  <span className="text-cyan-400 font-medium">Backend</span>,{' '}
                  <span className="text-emerald-400 font-medium">Database</span>, and{' '}
                  <span className="text-orange-400 font-medium">API</span> in real scenarios.
                </p>
                <p className="text-gray-400 text-sm">
                  Look at each screenshot and label the parts!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Component Legend */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {componentOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${option.gradient} shadow-lg`}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{option.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exercises */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Label the Components
                </h3>
                <p className="text-gray-400 text-sm">
                  Complete {labelingExercises.length} exercises to test your understanding
                </p>
                {completedExercises.length > 0 && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ {completedExercises.length}/{labelingExercises.length} completed
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {labelingExercises.map((exercise, index) => (
                  <ExerciseSection
                    key={exercise.id}
                    exercise={exercise}
                    exerciseIndex={index}
                    isActive={activeExercise === exercise.id}
                    onActivate={() => setActiveExercise(exercise.id)}
                    onComplete={() => handleExerciseComplete(exercise.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onComplete}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="min-w-[200px]"
              >
                Continue to Quiz
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LabelTheParts;
