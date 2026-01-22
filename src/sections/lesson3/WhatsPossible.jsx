import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  Code2,
  BarChart3,
  FileText,
  ChevronRight,
  ChevronDown,
  Clock,
  Zap,
  Bot,
  Lightbulb,
  AlertTriangle,
  Check,
  X,
  ArrowRight
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 Section 5 - What's Possible Now
 * Shows real examples of what AI can accomplish today with expandable cards
 * and honest limitations discussion
 */

const examplesData = [
  {
    id: 'research',
    title: 'Automated Research',
    icon: Search,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20',
    borderColor: 'border-purple-500/40',
    description: 'AI can scan hundreds of sources, summarize findings, and compile reports on any topic.',
    whatAIDoes: [
      'Searches multiple databases and websites simultaneously',
      'Extracts key information from lengthy documents',
      'Synthesizes findings into coherent summaries',
      'Identifies patterns and trends across sources',
      'Creates citations and references automatically'
    ],
    timeSaved: 'Hours → Minutes',
    oldWay: '4-8 hours of manual research',
    newWay: '15-30 minutes with AI assistance',
    realExample: 'Researching competitor pricing takes 4 hours manually. With AI, get a comprehensive report in 20 minutes.',
    vlotoUseCase: 'Analyze customer feedback trends across all channels to identify top complaints'
  },
  {
    id: 'coding',
    title: 'Code Without Coding',
    icon: Code2,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    description: 'Describe what you want, and AI builds functional applications—no programming knowledge required.',
    whatAIDoes: [
      'Translates plain English descriptions into working code',
      'Creates complete applications from requirements',
      'Builds databases, APIs, and user interfaces',
      'Debugs and fixes issues when things go wrong',
      'Iterates based on your feedback until it\'s right'
    ],
    timeSaved: 'Weeks → Days',
    oldWay: 'Hire developer, wait weeks, pay thousands',
    newWay: 'Describe and iterate in days, minimal cost',
    realExample: 'Building a customer feedback form used to require a developer. Now describe it and have it working same-day.',
    vlotoUseCase: 'Build a simple tool to track car battery levels and alert when below threshold'
  },
  {
    id: 'data',
    title: 'Data Analysis',
    icon: BarChart3,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20',
    borderColor: 'border-emerald-500/40',
    description: 'Ask questions about your data in plain English and get instant insights with visualizations.',
    whatAIDoes: [
      'Processes spreadsheets and databases of any size',
      'Answers questions about your data naturally',
      'Creates charts, graphs, and visualizations',
      'Identifies anomalies and outliers automatically',
      'Generates reports and summaries on demand'
    ],
    timeSaved: 'Days → Minutes',
    oldWay: 'Learn Excel formulas, spend hours creating reports',
    newWay: 'Ask "What were our top 10 bookings last month?" and get instant answer',
    realExample: 'Monthly fleet utilization reports that took a day now take 10 minutes with AI analyzing the data.',
    vlotoUseCase: 'Analyze booking patterns to predict busy periods and optimize car availability'
  },
  {
    id: 'content',
    title: 'Content Creation',
    icon: FileText,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-amber-800/20',
    borderColor: 'border-orange-500/40',
    description: 'Generate drafts, emails, documentation, and marketing content tailored to your needs.',
    whatAIDoes: [
      'Writes first drafts of any document type',
      'Creates professional emails and responses',
      'Generates documentation and guides',
      'Adapts tone and style to your brand',
      'Translates and localizes content'
    ],
    timeSaved: 'Hours → Minutes',
    oldWay: 'Stare at blank page, struggle with writer\'s block',
    newWay: 'Get a solid first draft in seconds, then refine',
    realExample: 'Writing partner communication templates used to take hours. AI generates customizable drafts instantly.',
    vlotoUseCase: 'Create personalized response templates for common customer inquiries'
  }
];

const limitationsData = [
  {
    id: 'judgment',
    title: 'Complex Judgment Calls',
    description: 'AI can\'t make nuanced decisions that require human experience, ethics, or relationship context.'
  },
  {
    id: 'physical',
    title: 'Physical World Actions',
    description: 'AI can plan and organize, but can\'t physically pick up a car, fix a flat tire, or meet a customer.'
  },
  {
    id: 'realtime',
    title: 'Real-Time Emergencies',
    description: 'When split-second decisions matter with safety implications, humans need to be in the loop.'
  },
  {
    id: 'relationships',
    title: 'Genuine Relationships',
    description: 'Building trust with partners, calming an upset customer—these need the human touch.'
  }
];

const ExampleCard = ({ example, index, isExpanded, onToggle }) => {
  const Icon = example.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
    >
      <Card
        glowColor={example.color}
        className="cursor-pointer h-full"
        onClick={onToggle}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className={`p-3 rounded-xl bg-gradient-to-br ${example.gradient} shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">{example.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">{example.timeSaved}</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <p className="text-gray-300">{example.description}</p>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* What AI Does */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <p className="text-sm text-gray-400 uppercase tracking-wider">What AI Does</p>
                  </div>
                  <div className="space-y-2">
                    {example.whatAIDoes.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Time Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Old Way */}
                  <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
                    <p className="text-sm text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <X className="w-4 h-4" /> Old Way
                    </p>
                    <p className="text-gray-300 text-sm">{example.oldWay}</p>
                  </div>

                  {/* New Way */}
                  <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
                    <p className="text-sm text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> With AI
                    </p>
                    <p className="text-gray-300 text-sm">{example.newWay}</p>
                  </div>
                </div>

                {/* Real Example */}
                <div className={`p-4 rounded-xl bg-gradient-to-r ${example.bgGradient} border ${example.borderColor}`}>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Real Example</p>
                  <p className="text-white italic">{example.realExample}</p>
                </div>

                {/* Vloto Use Case */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30">
                  <p className="text-sm text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Vloto Use Case
                  </p>
                  <p className="text-gray-300">{example.vlotoUseCase}</p>
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

const LimitationsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-6"
    >
      <h2 className="text-lg font-semibold text-slate-400 text-center">
        Honest Talk: What AI Can&apos;t Do (Yet)
      </h2>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/40 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />

        <div className="relative space-y-6">
          <div className="flex items-center gap-4 justify-center">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg"
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-amber-400">
              AI Is Powerful, Not Magic
            </h3>
          </div>

          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            Understanding AI&apos;s limitations helps you use it effectively. Here&apos;s what still needs a human:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {limitationsData.map((limitation, index) => (
              <motion.div
                key={limitation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
              >
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{limitation.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{limitation.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">
                AI handles the routine so you can focus on what matters
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const KeyInsightBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-cyan-900/30 to-emerald-900/40 border border-purple-500/40 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-emerald-500/5" />

        <div className="relative space-y-4 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 uppercase tracking-wider">
            Key Insight
          </h3>

          <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
            AI isn&apos;t here to <span className="text-purple-400">replace</span> you—
            it&apos;s here to <span className="text-cyan-400">amplify</span> what you can do.
          </p>

          <p className="text-gray-400 text-lg">
            The best results come from humans and AI working together, each doing what they do best.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function WhatsPossible({ onComplete }) {
  const [showContent, setShowContent] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

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
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            What&apos;s{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Possible Now
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Forget science fiction—here&apos;s what AI can actually do for you today.
            These aren&apos;t future promises; they&apos;re available right now.
          </p>
        </motion.div>

        {/* Examples Gallery */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
                Real-World AI Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {examplesData.map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    index={index}
                    isExpanded={expandedCard === example.id}
                    onToggle={() => handleToggle(example.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Limitations Card */}
        <AnimatePresence>
          {showContent && <LimitationsCard />}
        </AnimatePresence>

        {/* Key Insight Box */}
        <AnimatePresence>
          {showContent && <KeyInsightBox />}
        </AnimatePresence>

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
                icon={<ChevronRight className="w-5 h-5" />}
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

export default WhatsPossible;
