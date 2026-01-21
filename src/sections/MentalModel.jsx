import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Brain,
  Clock,
  MessageSquare,
  FileOutput,
  ArrowRight,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  User
} from 'lucide-react';
import { Card, Button } from '../components/common';

/**
 * MentalModel Section (8-10 min)
 * The "Brilliant Intern" mental model with comparison table and interactive scenarios
 */
const MentalModel = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [expandedScenario, setExpandedScenario] = useState(null);

  const headingText = "Think of AI as a Brilliant Intern";

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

  const comparisonData = [
    {
      aspect: "Knowledge",
      regular: "Limited, learning",
      ai: "Vast, everything public",
      icon: Brain,
      color: "purple"
    },
    {
      aspect: "Your context",
      regular: "Learns over time",
      ai: "Knows NOTHING until told",
      icon: User,
      color: "cyan"
    },
    {
      aspect: "Instructions",
      regular: "Can ask clarifying Qs",
      ai: "Takes instructions literally",
      icon: MessageSquare,
      color: "green"
    },
    {
      aspect: "Output",
      regular: "Might push back",
      ai: "Will attempt anything asked",
      icon: FileOutput,
      color: "orange"
    }
  ];

  const scenarios = [
    {
      id: 1,
      title: "You hire a brilliant intern on their first day",
      situation: 'You say: "Handle the customer emails"',
      internThinks: 'Intern thinks: "Which emails? What tone? What can I promise? What\'s urgent?"',
      badApproach: "Handle the customer emails",
      betterApproach: `"Handle today's customer support emails. Use a friendly but professional tone. For refund requests under $50, approve them. For anything complex, flag it for me. Sign off as 'The [Company] Team'."`,
      insight: "Just like a new intern, AI needs specific instructions to do great work!"
    },
    {
      id: 2,
      title: "You need a report",
      situation: 'You say: "Make me a report"',
      internThinks: 'Intern thinks: "About what? For whom? What format? How long? What\'s the goal?"',
      badApproach: "Make me a report",
      betterApproach: `"Create a 2-page summary report on Q4 fleet utilization for the leadership team. Include: key metrics, trends vs Q3, and 3 recommendations. Use bullet points and include one chart idea."`,
      insight: "The more context you provide, the less AI has to guess!"
    }
  ];

  const toggleScenario = (id) => {
    setExpandedScenario(expandedScenario === id ? null : id);
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 inline-block w-1 h-10 bg-purple-400 align-middle"
            />
          </h1>
        </motion.div>

        {/* Comparison Table */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {/* Table Header */}
                <div className="grid grid-cols-3 bg-slate-800/80 border-b border-white/10">
                  <div className="p-4 text-center font-semibold text-gray-400 uppercase text-sm tracking-wider">
                    Aspect
                  </div>
                  <div className="p-4 text-center font-semibold text-purple-400 uppercase text-sm tracking-wider border-x border-white/10">
                    Regular Intern
                  </div>
                  <div className="p-4 text-center font-semibold text-cyan-400 uppercase text-sm tracking-wider">
                    AI "Intern"
                  </div>
                </div>

                {/* Table Rows */}
                {comparisonData.map((row, index) => {
                  const IconComponent = row.icon;
                  const colorClasses = {
                    purple: 'from-purple-600 to-purple-800',
                    cyan: 'from-cyan-600 to-cyan-800',
                    green: 'from-emerald-600 to-emerald-800',
                    orange: 'from-orange-600 to-orange-800'
                  };

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className={`grid grid-cols-3 ${
                        index !== comparisonData.length - 1 ? 'border-b border-white/10' : ''
                      } bg-slate-900/50 hover:bg-slate-800/50 transition-colors duration-300`}
                    >
                      {/* Aspect */}
                      <div className="p-4 flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[row.color]}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-white">{row.aspect}</span>
                      </div>

                      {/* Regular Intern */}
                      <div className="p-4 flex items-center justify-center text-center border-x border-white/10">
                        <span className="text-gray-300">{row.regular}</span>
                      </div>

                      {/* AI Intern */}
                      <div className="p-4 flex items-center justify-center text-center">
                        <span className="text-cyan-300 font-medium">{row.ai}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Scenarios */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-center text-lg font-medium text-gray-400 uppercase tracking-wider">
                Interactive Scenarios
              </h2>

              <div className="space-y-4">
                {scenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                  >
                    <Card
                      glowColor={index === 0 ? 'purple' : 'cyan'}
                      onClick={() => toggleScenario(scenario.id)}
                      className="cursor-pointer"
                    >
                      <div className="space-y-4">
                        {/* Scenario Header */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">
                            Scenario {scenario.id}: {scenario.title}
                          </h3>
                          <motion.div
                            animate={{ rotate: expandedScenario === scenario.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </div>

                        {/* Situation */}
                        <div className="px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600">
                          <p className="text-blue-300 font-mono">{scenario.situation}</p>
                        </div>

                        {/* Intern Thinks */}
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 0 rgba(168, 85, 247, 0)',
                              '0 0 15px rgba(168, 85, 247, 0.2)',
                              '0 0 0 rgba(168, 85, 247, 0)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-4 py-3 rounded-lg bg-purple-900/30 border border-purple-500/30"
                        >
                          <p className="text-purple-200 italic">{scenario.internThinks}</p>
                        </motion.div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedScenario === scenario.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-4 overflow-hidden"
                            >
                              {/* Bad Approach */}
                              <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/30">
                                <p className="text-sm text-red-400 font-semibold uppercase tracking-wider mb-2">
                                  Bad Approach
                                </p>
                                <p className="text-red-200 font-mono">"{scenario.badApproach}"</p>
                              </div>

                              {/* Better Approach */}
                              <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30">
                                <p className="text-sm text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                                  Better Approach
                                </p>
                                <p className="text-emerald-200 font-mono text-sm leading-relaxed">
                                  {scenario.betterApproach}
                                </p>
                              </div>

                              {/* Insight */}
                              <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-amber-900/20 border border-amber-500/30"
                              >
                                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <p className="text-amber-200 text-sm">{scenario.insight}</p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Click hint */}
                        {expandedScenario !== scenario.id && (
                          <p className="text-center text-gray-500 text-sm">
                            Click to reveal the better approach
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Key Principle */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 border border-purple-500/40 p-8">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5" />

                <div className="relative space-y-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 uppercase tracking-wider">
                    The Brilliant Intern Rule
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    Always provide the context you would give a{' '}
                    <span className="text-purple-400">brilliant but brand-new team member</span>{' '}
                    who knows nothing about your specific situation
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
              transition={{ delay: 1 }}
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

export default MentalModel;
