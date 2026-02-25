import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  Zap,
  Sparkles,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  FileSpreadsheet,
  FolderOpen,
  Layers,
  Clock,
  Puzzle,
  Wrench
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 - Meet Claude & Cowork
 * Teaches what Claude is, what Cowork is, and how they differ.
 * Audience: Non-technical operations staff at Vloto.
 */

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const evolutionData = [
  {
    year: '2022',
    label: 'ChatGPT Era',
    description: 'Chat-based AI arrives. Ask questions, get instant text answers.',
    icon: MessageSquare,
    color: 'gray'
  },
  {
    year: '2024',
    label: 'Claude Assistants',
    description: 'Smarter reasoning, longer context, more nuanced responses.',
    icon: Sparkles,
    color: 'purple'
  },
  {
    year: 'Jan 2026',
    label: 'Claude Cowork Launches',
    description: 'AI that takes action — reads files, creates documents, works autonomously.',
    icon: Zap,
    color: 'cyan'
  },
  {
    year: 'Feb 2026',
    label: 'Enterprise Plugins',
    description: 'Connected to Google Workspace, DocuSign, FactSet and more.',
    icon: Puzzle,
    color: 'blue'
  }
];

const comparisonCards = [
  {
    id: 'chat',
    title: 'Regular Claude Chat',
    icon: MessageSquare,
    color: 'gray',
    gradient: 'from-gray-500 to-slate-600',
    bgGradient: 'from-gray-900/40 to-slate-800/20',
    borderColor: 'border-gray-500/40',
    glowColor: 'purple',
    badge: 'Conversational',
    description: 'Conversational AI. Great for questions, brainstorming, and text generation.',
    canDo: [
      'Answer questions clearly',
      'Write and refine text',
      'Explain complex concepts',
      'Brainstorm ideas with you'
    ],
    cantDo: [
      'Access your local files',
      'Create real spreadsheets or slides',
      'Send emails on your behalf',
      'Work while you are away'
    ],
    example: '"How should I structure this vendor proposal?" → You receive a well-organized text outline in the chat window.'
  },
  {
    id: 'cowork',
    title: 'Claude Cowork',
    icon: Zap,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    glowColor: 'cyan',
    badge: 'Autonomous Agent',
    description: "Autonomous AI agent. Doesn't just talk — actually DOES the work on your files.",
    canDo: [
      'Read and write your local files directly',
      'Create real .xlsx, .pptx, and .pdf files',
      'Work for hours without supervision',
      'Connect to Gmail, Drive, DocuSign via plugins'
    ],
    cantDo: [
      'Access the internet without plugins',
      'Make decisions requiring human judgment',
      'Perform physical tasks',
      'Replace relationship building'
    ],
    example: '"Analyse these 3 vendor proposals and create a comparison matrix" → Actual .xlsx file with formulas appears on your desktop.'
  },
  {
    id: 'traditional',
    title: 'Traditional Software',
    icon: Wrench,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-amber-800/20',
    borderColor: 'border-orange-500/40',
    glowColor: 'purple',
    badge: 'Rigid Tools',
    description: 'Rigid tools that do one thing. Need IT for any customisation.',
    canDo: [
      'Specific predefined tasks',
      'Consistent, repeatable output',
      'Integrate with fixed data sources'
    ],
    cantDo: [
      'Adapt to new or unusual requests',
      'Understand context or intent',
      'Handle ambiguity gracefully',
      'Learn your working preferences'
    ],
    example: 'Need a new report? Submit an IT ticket and wait two weeks.'
  }
];

const coworkFeatures = [
  {
    icon: FolderOpen,
    title: 'Direct File Access',
    description: 'Claude reads and writes your local files. No upload/download cycle — it works where your files already live.',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-500/30'
  },
  {
    icon: Layers,
    title: 'Sub-Agent Coordination',
    description: 'Complex tasks are broken into smaller pieces and run in parallel, dramatically cutting the time to completion.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-500/30'
  },
  {
    icon: FileSpreadsheet,
    title: 'Professional Outputs',
    description: 'Real .xlsx files with formulas, .pptx presentations, and formatted PDFs — not just text you have to copy-paste.',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-900/20',
    borderColor: 'border-emerald-500/30'
  },
  {
    icon: Clock,
    title: 'Async Work Style',
    description: 'Queue up tasks, step away, come back to finished work. Cowork operates on your schedule, not the other way around.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-500/30'
  }
];

const spotCoworkScenarios = [
  {
    id: 1,
    scenario: "You ask 'What's the best way to negotiate parking contracts?' and get a detailed strategy written out in the chat.",
    answer: 'chat',
    explanation: "This is Claude Chat — it gave you useful text advice, but didn't touch any files or take any action outside the conversation."
  },
  {
    id: 2,
    scenario: "You say 'Read these 3 contracts from my folder and create a comparison table' and find a new Excel file on your desktop.",
    answer: 'cowork',
    explanation: 'This is Claude Cowork — it accessed your local folder, read the files, and created a real .xlsx document autonomously.'
  },
  {
    id: 3,
    scenario: "You ask 'Help me write an email to the municipality about parking permits' and receive the draft text inside the chat window.",
    answer: 'chat',
    explanation: 'This is Claude Chat — the draft lives only in the chat. You still need to copy it into your email client and send it yourself.'
  },
  {
    id: 4,
    scenario: "You say 'Monitor my inbox for vendor invoices, extract the amounts, and create a spreadsheet tracking all payments this quarter' and come back to a finished .xlsx file.",
    answer: 'cowork',
    explanation: 'This is Claude Cowork — it worked autonomously across email and file creation, delivering a finished deliverable without you lifting a finger.'
  }
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const EvolutionTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % evolutionData.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const dotColor = (color, isActive) => {
    const map = {
      gray:   isActive ? 'bg-gray-400 border-gray-300'     : 'bg-gray-700 border-gray-600',
      purple: isActive ? 'bg-purple-500 border-purple-400' : 'bg-purple-800 border-purple-700',
      cyan:   isActive ? 'bg-cyan-500 border-cyan-400'     : 'bg-cyan-800 border-cyan-700',
      blue:   isActive ? 'bg-blue-500 border-blue-400'     : 'bg-blue-800 border-blue-700'
    };
    return map[color] ?? map.gray;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-8 text-center uppercase tracking-wider">
        The Evolution of Claude
      </h2>

      <div className="relative">
        {/* Track line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-slate-700 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-500 via-purple-500 via-cyan-500 to-blue-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((activeIndex + 1) / evolutionData.length) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        {/* Milestone dots */}
        <div className="relative flex justify-between">
          {evolutionData.map((item, index) => {
            const Icon = item.icon;
            const isActive = index <= activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => { setActiveIndex(index); setIsPlaying(false); }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    border-2 transition-colors duration-300
                    ${dotColor(item.color, isActive)}
                    ${isCurrent ? 'ring-4 ring-white/20 shadow-xl' : ''}
                  `}
                  animate={{ scale: isCurrent ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: isCurrent ? Infinity : 0 }}
                >
                  <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </motion.div>

                <motion.div
                  className="mt-3 text-center"
                  animate={{ opacity: isCurrent ? 1 : 0.5 }}
                >
                  <p className={`text-xs font-bold uppercase tracking-wide ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {item.year}
                  </p>
                  <p className={`text-sm mt-0.5 ${isCurrent ? 'text-cyan-400' : 'text-gray-600'}`}>
                    {item.label}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Active description pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-10 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-base text-white">{evolutionData[activeIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------

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
        glowColor={data.glowColor}
        onClick={() => setIsExpanded(prev => !prev)}
        className="cursor-pointer h-full"
      >
        <div className="space-y-4">
          {/* Card header */}
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: isExpanded ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${data.gradient} shadow-lg flex-shrink-0`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{data.title}</h3>
                <span className={`
                  text-xs font-semibold px-2 py-0.5 rounded-full
                  bg-gradient-to-r ${data.gradient} text-white
                `}>
                  {data.badge}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{data.description}</p>

          {/* Expandable detail */}
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
                  <p className="text-xs text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4" /> Can Do
                  </p>
                  <div className="space-y-2">
                    {data.canDo.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Can't Do */}
                <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30">
                  <p className="text-xs text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
                    <X className="w-4 h-4" /> Can't Do
                  </p>
                  <div className="space-y-2">
                    {data.cantDo.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${data.bgGradient} border ${data.borderColor}`}>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Real Example</p>
                  <p className="text-white italic text-sm leading-relaxed">{data.example}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <p className="text-center text-gray-500 text-xs pt-1">
              Tap to see details
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className={`
        p-5 rounded-2xl border ${feature.bgColor} ${feature.borderColor}
        flex items-start gap-4
      `}
    >
      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-md flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{feature.title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------

const SpotTheCowork = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (id, value) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const allAnswered = Object.keys(answers).length === spotCoworkScenarios.length;

  const score = showResults
    ? spotCoworkScenarios.filter(s => answers[s.id] === s.answer).length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-6"
    >
      {/* Quiz heading */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          Spot the Cowork
        </h3>
        <p className="text-gray-400 text-sm">
          Is each scenario Claude Chat or Claude Cowork? Select your answer for all four before checking.
        </p>
      </div>

      {/* Scenarios */}
      <div className="space-y-4">
        {spotCoworkScenarios.map((scenario, index) => {
          const userAnswer  = answers[scenario.id];
          const isCorrect   = userAnswer === scenario.answer;
          const hasAnswered  = userAnswer !== undefined;

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-5 rounded-2xl border transition-all
                ${showResults
                  ? isCorrect
                    ? 'bg-emerald-900/30 border-emerald-500/50'
                    : 'bg-red-900/30 border-red-500/50'
                  : 'bg-slate-800/60 border-slate-700/50'
                }
              `}
            >
              {/* Scenario number badge + text */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 text-gray-300 text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-white text-sm leading-relaxed">{scenario.scenario}</p>
              </div>

              {/* Answer buttons */}
              {!showResults ? (
                <div className="flex gap-3 ml-10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(scenario.id, 'chat')}
                    className={`
                      flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all
                      ${userAnswer === 'chat'
                        ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    Claude Chat
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(scenario.id, 'cowork')}
                    className={`
                      flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all
                      ${userAnswer === 'cowork'
                        ? 'bg-cyan-600 text-white ring-2 ring-cyan-400'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    Claude Cowork
                  </motion.button>
                </div>
              ) : (
                <div className="ml-10 space-y-1">
                  <div className="flex items-center gap-2">
                    {isCorrect
                      ? <Check className="w-4 h-4 text-emerald-400" />
                      : <X className="w-4 h-4 text-red-400" />
                    }
                    <span className={`text-sm font-semibold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : `Not quite — it's ${scenario.answer === 'chat' ? 'Claude Chat' : 'Claude Cowork'}`}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{scenario.explanation}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Score / action buttons */}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: allAnswered ? 1.03 : 1 }}
              whileTap={{ scale: allAnswered ? 0.97 : 1 }}
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`
                px-8 py-3 rounded-xl font-semibold transition-all
                ${allAnswered
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                  : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Check Answers
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-3"
          >
            <p className="text-2xl font-bold text-white">
              {score === spotCoworkScenarios.length
                ? 'Perfect score!'
                : `${score} / ${spotCoworkScenarios.length} correct`}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setAnswers({}); setShowResults(false); }}
              className="px-6 py-2.5 rounded-xl font-semibold bg-slate-700 text-white hover:bg-slate-600 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function MeetClaude({ onComplete }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-14">

        {/* ── 1. Header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/30"
          >
            {/* Animated pulse ring */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-cyan-500/20"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <Bot className="w-10 h-10 text-white relative" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Meet{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Claude
            </span>
            {' '}&amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cowork
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Claude is the AI brain. Cowork is the engine that lets it{' '}
            <span className="text-purple-400 font-medium">take action</span>. Together they go from{' '}
            <span className="text-cyan-400 font-medium">conversation to finished work</span>.
          </p>
        </motion.div>

        {/* ── 2. Evolution Timeline ────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && <EvolutionTimeline />}
        </AnimatePresence>

        {/* ── 3. Comparison Cards ──────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center uppercase tracking-wider">
                Know Your Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparisonCards.map((card, index) => (
                  <ComparisonCard key={card.id} data={card} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4. What Makes Cowork Special ─────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center uppercase tracking-wider">
                What Makes Cowork Special
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coworkFeatures.map((feature, index) => (
                  <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. Spot the Cowork Quiz ───────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
              <SpotTheCowork />
            </div>
          )}
        </AnimatePresence>

        {/* ── 6. Key Insight Box ───────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-cyan-900/40 border border-purple-500/40 p-8">
                {/* Subtle shimmer layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 uppercase tracking-widest">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    The difference between Claude Chat and Cowork?{' '}
                    <span className="text-purple-400">Chat gives you text.</span>{' '}
                    <span className="text-cyan-400">Cowork gives you finished work</span>{' '}
                    — spreadsheets, presentations, organised files — ready to use.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 7. Continue Button ───────────────────────────────────────── */}
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

export default MeetClaude;
