import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  Zap,
  Sparkles,
  ChevronRight,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 Section 2 - Chatbots vs Agents
 * Teaches the evolution from simple chatbots to powerful AI agents
 */

const evolutionData = [
  {
    year: '2020',
    label: 'Basic Chatbots',
    description: 'Simple Q&A, scripted responses',
    icon: MessageSquare,
    color: 'gray'
  },
  {
    year: '2022',
    label: 'ChatGPT Era',
    description: 'Natural conversation, knowledge',
    icon: Bot,
    color: 'blue'
  },
  {
    year: '2024',
    label: 'AI Assistants',
    description: 'Context-aware, helpful suggestions',
    icon: Sparkles,
    color: 'purple'
  },
  {
    year: '2025',
    label: 'AI Agents',
    description: 'Take action, complete tasks autonomously',
    icon: Zap,
    color: 'cyan'
  }
];

const comparisonCards = [
  {
    id: 'chatbot',
    title: 'Basic Chatbot',
    icon: MessageSquare,
    color: 'gray',
    gradient: 'from-gray-500 to-slate-600',
    bgGradient: 'from-gray-900/40 to-slate-800/20',
    borderColor: 'border-gray-500/40',
    description: 'Follows pre-written scripts. Like an FAQ page that can talk.',
    canDo: [
      'Answer common questions',
      'Follow decision trees',
      'Provide static information',
      'Route to human support'
    ],
    cantDo: [
      'Understand context',
      'Handle unexpected questions',
      'Learn from conversations',
      'Take any actions'
    ],
    example: '"What are your hours?" → "We\'re open 9-5, Monday to Friday."'
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    icon: Sparkles,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20',
    borderColor: 'border-purple-500/40',
    description: 'Understands natural language. Can have real conversations and provide helpful responses.',
    canDo: [
      'Understand complex questions',
      'Remember conversation context',
      'Explain concepts clearly',
      'Generate text and ideas'
    ],
    cantDo: [
      'Send emails for you',
      'Book appointments',
      'Update spreadsheets',
      'Actually DO things'
    ],
    example: '"How should I structure this report?" → Provides detailed outline and suggestions.'
  },
  {
    id: 'agent',
    title: 'AI Agent',
    icon: Zap,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    description: 'Can take action in the real world. Doesn\'t just talk—actually DOES things.',
    canDo: [
      'Send emails and messages',
      'Update documents & spreadsheets',
      'Book meetings and manage calendar',
      'Build software and run code'
    ],
    cantDo: [
      'Physical tasks (yet!)',
      'Make decisions requiring human judgment',
      'Access systems without permission',
      'Work without clear instructions'
    ],
    example: '"Schedule a meeting with the team" → Actually sends calendar invites to everyone.'
  }
];

const spotTheAgentScenarios = [
  {
    id: 1,
    scenario: 'You ask: "What\'s the weather in Amsterdam?" and get a detailed forecast.',
    isAgent: false,
    explanation: 'This is an AI Assistant - it\'s providing information but not taking action.'
  },
  {
    id: 2,
    scenario: 'You say: "Send a follow-up email to the client about the proposal" and the email actually gets sent.',
    isAgent: true,
    explanation: 'This is an AI Agent - it actually performed the action of sending an email.'
  },
  {
    id: 3,
    scenario: 'You ask: "Can you analyze this spreadsheet and add a summary column?" and the spreadsheet updates automatically.',
    isAgent: true,
    explanation: 'This is an AI Agent - it modified the spreadsheet directly.'
  },
  {
    id: 4,
    scenario: 'You ask: "How do I write a Python function?" and receive a code example with explanation.',
    isAgent: false,
    explanation: 'This is an AI Assistant - it provided information but didn\'t run or create anything.'
  }
];

const EvolutionTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % evolutionData.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const getColorClasses = (color, isActive) => {
    const colors = {
      gray: isActive ? 'bg-gray-500 border-gray-400' : 'bg-gray-700 border-gray-600',
      blue: isActive ? 'bg-blue-500 border-blue-400' : 'bg-blue-700 border-blue-600',
      purple: isActive ? 'bg-purple-500 border-purple-400' : 'bg-purple-700 border-purple-600',
      cyan: isActive ? 'bg-cyan-500 border-cyan-400' : 'bg-cyan-700 border-cyan-600'
    };
    return colors[color];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
        The Evolution of AI
      </h2>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-slate-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-500 via-purple-500 to-cyan-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / evolutionData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Timeline Points */}
        <div className="relative flex justify-between">
          {evolutionData.map((item, index) => {
            const Icon = item.icon;
            const isActive = index <= activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlaying(false);
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${getColorClasses(item.color, isActive)}
                    ${isCurrent ? 'ring-4 ring-white/20 shadow-lg' : ''}
                  `}
                  animate={{
                    scale: isCurrent ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                >
                  <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </motion.div>

                <motion.div
                  className="mt-3 text-center"
                  animate={{ opacity: isCurrent ? 1 : 0.6 }}
                >
                  <p className={`font-bold ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                    {item.year}
                  </p>
                  <p className={`text-sm ${isCurrent ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {item.label}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Current Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-lg text-white">{evolutionData[activeIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ComparisonCard = ({ data, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.15 }}
    >
      <Card
        glowColor={data.color}
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer h-full"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: isExpanded ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${data.gradient} shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">{data.title}</h3>
            </div>
          </div>

          <p className="text-gray-300">{data.description}</p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Can Do */}
                <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30">
                  <p className="text-sm text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4" /> Can Do
                  </p>
                  <div className="space-y-2">
                    {data.canDo.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Can't Do */}
                <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30">
                  <p className="text-sm text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <X className="w-4 h-4" /> Can&apos;t Do
                  </p>
                  <div className="space-y-2">
                    {data.cantDo.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${data.bgGradient} border ${data.borderColor}`}>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Example</p>
                  <p className="text-white italic">{data.example}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-center text-gray-500 text-sm pt-2">
              Click to see details
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const SpotTheAgent = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (scenarioId, isAgent) => {
    setAnswers(prev => ({
      ...prev,
      [scenarioId]: isAgent
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  const allAnswered = Object.keys(answers).length === spotTheAgentScenarios.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          Spot the Agent
        </h3>
        <p className="text-gray-400">Which of these is an AI Agent vs just an Assistant?</p>
      </div>

      <div className="space-y-4">
        {spotTheAgentScenarios.map((scenario, index) => {
          const userAnswer = answers[scenario.id];
          const isCorrect = userAnswer === scenario.isAgent;
          const hasAnswered = userAnswer !== undefined;

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border transition-all
                ${showResults
                  ? isCorrect
                    ? 'bg-emerald-900/30 border-emerald-500/50'
                    : 'bg-red-900/30 border-red-500/50'
                  : 'bg-slate-800/60 border-slate-700/50'
                }
              `}
            >
              <p className="text-white mb-4">{scenario.scenario}</p>

              {!showResults ? (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(scenario.id, false)}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all
                      ${userAnswer === false
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    AI Assistant
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(scenario.id, true)}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all
                      ${userAnswer === true
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    AI Agent
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                    <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                      {isCorrect ? 'Correct!' : 'Not quite'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{scenario.explanation}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4">
        {!showResults ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkAnswers}
            disabled={!allAnswered}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all
              ${allAnswered
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg'
                : 'bg-slate-700 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Check Answers
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetQuiz}
            className="px-6 py-3 rounded-xl font-medium bg-slate-700 text-white hover:bg-slate-600"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

function ChatbotsVsAgents({ onComplete }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/30"
          >
            <Bot className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Chatbots vs{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Not all AI is created equal. Let&apos;s understand the difference between AI that{' '}
            <span className="text-purple-400 font-medium">talks</span> and AI that{' '}
            <span className="text-cyan-400 font-medium">does</span>.
          </p>
        </motion.div>

        {/* Evolution Timeline */}
        <AnimatePresence>
          {showContent && <EvolutionTimeline />}
        </AnimatePresence>

        {/* Comparison Cards */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
                Compare the Three Types
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparisonCards.map((card, index) => (
                  <ComparisonCard key={card.id} data={card} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spot the Agent Quiz */}
        <AnimatePresence>
          {showContent && (
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
              <SpotTheAgent />
            </div>
          )}
        </AnimatePresence>

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-cyan-900/40 border border-purple-500/40 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 uppercase tracking-wider">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    The difference between an AI Assistant and an AI Agent?{' '}
                    <span className="text-purple-400">Assistants tell you what to do.</span>{' '}
                    <span className="text-cyan-400">Agents actually do it.</span>
                  </p>

                  <p className="text-gray-400 text-lg">
                    When you can harness AI Agents, you unlock the ability to automate real work.
                  </p>
                </div>
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
              transition={{ delay: 1.2 }}
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
}

export default ChatbotsVsAgents;
