import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  PenTool,
  Monitor,
  Server,
  HardDrive,
  ArrowLeftRight,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  Eye,
  Cog,
  Database as DatabaseIcon,
  Link
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 2 Technical Describing Practice Section
 * Interactive exercises using the 4-part framework to describe tools
 */

const frameworkParts = [
  {
    id: 'frontend',
    label: 'What users SEE',
    component: 'Frontend',
    icon: Eye,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-purple-800/20',
    description: 'The visual interface - buttons, forms, displays, layout',
    placeholder: 'Describe what the user sees and clicks...'
  },
  {
    id: 'backend',
    label: 'What system DOES',
    component: 'Backend',
    icon: Cog,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-cyan-800/20',
    description: 'The logic - calculations, decisions, processing',
    placeholder: 'Describe what happens behind the scenes...'
  },
  {
    id: 'database',
    label: "What's REMEMBERED",
    component: 'Database',
    icon: DatabaseIcon,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-emerald-800/20',
    description: 'The storage - saved data, history, settings',
    placeholder: 'Describe what needs to be stored...'
  },
  {
    id: 'api',
    label: 'What CONNECTS',
    component: 'API',
    icon: Link,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-orange-800/20',
    description: 'The messengers - requests, updates, syncs',
    placeholder: 'Describe how parts communicate...'
  }
];

const exercises = [
  {
    id: 'todo',
    title: 'A Todo App',
    description: 'A simple app to track tasks that need to be done',
    icon: '✅',
    goodAnswers: {
      frontend: 'A list showing all tasks with checkboxes. An input field to add new tasks. A button to mark tasks complete. Maybe filters for "All", "Active", "Completed".',
      backend: 'Adds new tasks to the list. Marks tasks as complete/incomplete when clicked. Filters the list based on selected view. Counts remaining tasks.',
      database: 'All the tasks (text, completion status, creation date). User preferences like default filter. Maybe different task lists or categories.',
      api: 'Sends new task to be saved. Requests task list on page load. Updates task status when checkbox clicked. Deletes completed tasks if requested.'
    }
  },
  {
    id: 'calendar',
    title: 'A Booking Calendar',
    description: 'An app to book meeting rooms or appointments',
    icon: '📅',
    goodAnswers: {
      frontend: 'A calendar grid showing days/weeks. Available time slots in green, booked in red. A form to enter booking details. Confirmation message after booking.',
      backend: 'Checks if requested time slot is available. Creates new bookings if slot is free. Sends confirmation emails. Calculates conflicts or overlaps.',
      database: 'All bookings (date, time, room, person). Room details and capacities. User accounts and permissions. Booking history.',
      api: 'Fetches available slots for selected date. Sends booking request with details. Gets confirmation response. Updates calendar view with new booking.'
    }
  },
  {
    id: 'feedback',
    title: 'A Customer Feedback Tool',
    description: 'A tool to collect and analyze customer feedback',
    icon: '💬',
    goodAnswers: {
      frontend: 'A feedback form with rating stars and text box. A dashboard showing feedback trends. List of recent feedback with filters. Charts showing satisfaction scores.',
      backend: 'Validates feedback before saving. Calculates average ratings. Categorizes feedback by topic. Flags negative feedback for review. Generates reports.',
      database: 'All feedback entries (rating, text, date, customer). Customer information. Category tags. Report templates. Historical trends data.',
      api: 'Submits new feedback from form. Fetches dashboard data and charts. Requests filtered feedback list. Exports report data. Sends alerts for urgent feedback.'
    }
  }
];

const FrameworkVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">The 4-Part Framework</h3>
        <p className="text-gray-400 text-sm">Use these questions to describe any software tool</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frameworkParts.map((part, index) => {
          const IconComponent = part.icon;
          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${part.bgGradient} border border-white/10 p-4`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${part.gradient} shadow-lg flex-shrink-0`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{part.label}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{part.component}</p>
                  <p className="text-gray-300 text-sm mt-2">{part.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ExerciseCard = ({ exercise, index, isActive, onActivate }) => {
  const [userAnswers, setUserAnswers] = useState({
    frontend: '',
    backend: '',
    database: '',
    api: ''
  });
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('frontend');

  const handleAnswerChange = (partId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [partId]: value
    }));
  };

  const handleCheck = () => {
    setShowComparison(true);
  };

  const hasAnyAnswer = Object.values(userAnswers).some(a => a.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
    >
      <Card
        className={`overflow-hidden transition-all ${isActive ? 'ring-2 ring-purple-500/50' : ''}`}
        onClick={!isActive ? onActivate : undefined}
      >
        <div className="space-y-6">
          {/* Exercise Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl shadow-lg"
              >
                {exercise.icon}
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">{exercise.title}</h3>
                <p className="text-gray-400 text-sm">{exercise.description}</p>
              </div>
            </div>
            {!isActive && (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </div>

          {/* Exercise Content - Only shown when active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2">
                  {frameworkParts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => setActiveTab(part.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === part.id
                          ? `bg-gradient-to-r ${part.gradient} text-white shadow-lg`
                          : 'bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {part.component}
                    </button>
                  ))}
                </div>

                {/* Active Part Input */}
                {frameworkParts.map((part) => (
                  <AnimatePresence key={part.id}>
                    {activeTab === part.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <part.icon className={`w-4 h-4 text-${part.color}-400`} />
                          <span className="text-white font-medium">{part.label}</span>
                        </div>
                        <textarea
                          value={userAnswers[part.id]}
                          onChange={(e) => handleAnswerChange(part.id, e.target.value)}
                          placeholder={part.placeholder}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

                {/* Check Button */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheck}
                    disabled={!hasAnyAnswer}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                      hasAnyAnswer
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                        : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Check My Answer
                  </motion.button>
                </div>

                {/* Comparison View */}
                <AnimatePresence>
                  {showComparison && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

                      <h4 className="text-lg font-semibold text-white text-center">Compare Your Answers</h4>

                      <div className="space-y-4">
                        {frameworkParts.map((part) => (
                          <div key={part.id} className={`rounded-xl bg-gradient-to-r ${part.bgGradient} border border-white/10 p-4`}>
                            <div className="flex items-center gap-2 mb-3">
                              <part.icon className="w-4 h-4 text-white" />
                              <span className="text-white font-medium">{part.component}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Your Answer</p>
                                <p className="text-gray-300 text-sm">
                                  {userAnswers[part.id] || <span className="text-gray-500 italic">No answer provided</span>}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-green-400 uppercase tracking-wider mb-2">Good Example</p>
                                <p className="text-gray-300 text-sm">{exercise.goodAnswers[part.id]}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-green-900/20 border border-green-500/30 text-center">
                        <p className="text-green-300 text-sm">
                          <CheckCircle className="w-4 h-4 inline-block mr-2" />
                          Great practice! Your descriptions don't need to match exactly - the goal is to think about each component clearly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed hint */}
          {!isActive && (
            <p className="text-center text-gray-500 text-sm">
              Click to practice describing this tool
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const ProTipBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/40 p-6 md:p-8">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.1) 10px, rgba(251, 191, 36, 0.1) 20px)'
          }} />
        </div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg"
            >
              <Lightbulb className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-amber-400">Pro Tip</h3>
          </div>

          <p className="text-lg text-gray-300">
            When describing a tool to AI, <span className="text-amber-400 font-semibold">start with the user's perspective</span>.
            Ask yourself: "What does the user want to accomplish?"
          </p>

          <div className="space-y-3">
            <p className="text-gray-400">Then work through each component:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 text-xs flex-shrink-0 mt-0.5">1</span>
                <span><span className="text-purple-400">Frontend:</span> What do they see and click?</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs flex-shrink-0 mt-0.5">2</span>
                <span><span className="text-cyan-400">Backend:</span> What calculations or decisions happen?</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs flex-shrink-0 mt-0.5">3</span>
                <span><span className="text-emerald-400">Database:</span> What needs to be remembered?</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center text-orange-400 text-xs flex-shrink-0 mt-0.5">4</span>
                <span><span className="text-orange-400">API:</span> What messages travel between parts?</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-400 text-sm italic pt-2">
            The more specific you are, the better AI can help you build it!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicalDescribing = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  const headingText = "Practice: Describe Like a Pro";

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
    }, 50);

    return () => clearInterval(timer);
  }, []);

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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
          >
            <PenTool className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-pink-400 align-middle"
            />
          </h1>

          <AnimatePresence>
            {showContent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Now it's your turn! Use the <span className="text-purple-400 font-medium">4-part framework</span> to describe these common tools.
                Don't worry about being perfect - this is practice.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Framework Visual */}
        <AnimatePresence>
          {showContent && <FrameworkVisual />}
        </AnimatePresence>

        {/* Exercises */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Your Turn: Describe These Tools</h3>
                <p className="text-gray-400 text-sm">Click on an exercise to start practicing</p>
              </div>

              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    isActive={activeExercise === exercise.id}
                    onActivate={() => setActiveExercise(exercise.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pro Tip Box */}
        {showContent && <ProTipBox />}

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
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
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechnicalDescribing;
