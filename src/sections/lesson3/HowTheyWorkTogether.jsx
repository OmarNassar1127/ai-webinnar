import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  ArrowRight,
  User,
  Languages,
  BookOpen,
  Plug,
  CheckCircle,
  Mail,
  MessageSquare,
  AlertTriangle,
  Bell,
  Lightbulb,
  Eye,
  ChevronRight,
  RefreshCw,
  Zap,
  Check,
  X
} from 'lucide-react';
import { Button, Card } from '../../components/common';

/**
 * Lesson 3 Section 4 - How They Work Together
 * Shows how AI tools connect in real workflows with an interactive exercise
 */

// Workflow step data for the animated visualization
const workflowSteps = [
  {
    id: 'user',
    label: 'Your Request',
    description: '"Monitor customer complaints and alert me about urgent ones"',
    icon: User,
    color: 'slate',
    gradient: 'from-slate-500 to-slate-600',
    bgGradient: 'from-slate-900/40 to-slate-800/20'
  },
  {
    id: 'mcp-in',
    label: 'MCP (Email)',
    description: 'Connects to Gmail inbox and reads new emails',
    icon: Languages,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20'
  },
  {
    id: 'skill',
    label: 'Skill',
    description: 'Analyzes complaint severity using trained patterns',
    icon: BookOpen,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20'
  },
  {
    id: 'plugin',
    label: 'Plugin',
    description: 'Formats urgent alerts with priority tags',
    icon: Plug,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20'
  },
  {
    id: 'mcp-out',
    label: 'MCP (Slack)',
    description: 'Sends alert to #urgent-complaints channel',
    icon: Languages,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20'
  },
  {
    id: 'result',
    label: 'Result',
    description: 'Urgent complaints flagged and team notified instantly',
    icon: CheckCircle,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20'
  }
];

// Animated Workflow Visualization
const WorkflowVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
        Watch How Tools Chain Together
      </h2>

      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 md:p-8 border border-slate-700/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Workflow Steps - Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop view - horizontal */}
          <div className="hidden md:flex items-center justify-between gap-2 mb-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`
                      relative flex flex-col items-center p-4 rounded-xl cursor-pointer
                      transition-all duration-300
                      ${isActive
                        ? `bg-gradient-to-br ${step.bgGradient} border-2 border-${step.color}-500/50 shadow-lg shadow-${step.color}-500/20`
                        : isPast
                          ? 'bg-slate-700/40 border border-emerald-500/30'
                          : 'bg-slate-800/40 border border-slate-700/50'
                      }
                    `}
                    animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPlaying(false);
                    }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                      animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className={`mt-2 text-xs font-medium text-center ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                    {isPast && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      className="px-1"
                      animate={{
                        opacity: activeStep >= index ? 1 : 0.3,
                        scale: activeStep === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowRight className={`w-4 h-4 ${activeStep >= index ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile view - vertical */}
          <div className="flex md:hidden flex-col gap-4 mb-6">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.div
                    className={`
                      relative w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer
                      transition-all duration-300
                      ${isActive
                        ? `bg-gradient-to-br ${step.bgGradient} border-2 border-${step.color}-500/50 shadow-lg`
                        : isPast
                          ? 'bg-slate-700/40 border border-emerald-500/30'
                          : 'bg-slate-800/40 border border-slate-700/50'
                      }
                    `}
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPlaying(false);
                    }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}
                      animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                      )}
                    </div>
                    {isPast && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      className="py-1"
                      animate={{
                        opacity: activeStep >= index ? 1 : 0.3
                      }}
                    >
                      <ArrowRight className={`w-4 h-4 rotate-90 ${activeStep >= index ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Description - Desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden md:block p-6 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center"
            >
              <p className="text-lg text-white font-medium">{workflowSteps[activeStep].label}</p>
              <p className="text-gray-400 mt-2">{workflowSteps[activeStep].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/60 border border-slate-600/50 text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Playing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Resume</span>
              </>
            )}
          </motion.button>
          <motion.button
            onClick={() => {
              setActiveStep(0);
              setIsPlaying(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/60 border border-slate-600/50 text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Restart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Interactive Build a Workflow Exercise
const workflowExercise = {
  task: 'Monitor customer complaints and alert about urgent ones',
  description: 'A customer emails a complaint. You want to be notified on Slack if it\'s urgent.',
  availableTools: [
    {
      id: 'mcp-email',
      name: 'MCP: Email',
      description: 'Reads incoming emails from Gmail',
      icon: Mail,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      id: 'mcp-slack',
      name: 'MCP: Slack',
      description: 'Sends messages to Slack channels',
      icon: MessageSquare,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      id: 'skill-complaint',
      name: 'Skill: Complaint Analysis',
      description: 'Analyzes text to determine urgency level',
      icon: AlertTriangle,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      id: 'plugin-notification',
      name: 'Plugin: Notification',
      description: 'Formats and prioritizes alert messages',
      icon: Bell,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ],
  correctOrder: ['mcp-email', 'skill-complaint', 'plugin-notification', 'mcp-slack']
};

const BuildWorkflowExercise = () => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleToolClick = (toolId) => {
    if (showResult) return;

    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else if (selectedTools.length < 4) {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(selectedTools) === JSON.stringify(workflowExercise.correctOrder);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const resetExercise = () => {
    setSelectedTools([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const getToolById = (id) => workflowExercise.availableTools.find(t => t.id === id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
        Build a Workflow: Interactive Exercise
      </h2>

      <Card glowColor="purple" className="space-y-6">
        {/* Task Description */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Your Task:</p>
              <p className="text-gray-300">{workflowExercise.task}</p>
              <p className="text-gray-400 text-sm mt-2">{workflowExercise.description}</p>
            </div>
          </div>
        </div>

        {/* Selected Tools (Workflow Chain) */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Your workflow (select tools in order):</p>
          <div className="flex flex-wrap items-center gap-2 min-h-[60px] p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
            {selectedTools.length === 0 ? (
              <p className="text-gray-500 text-sm">Click tools below to add them to your workflow...</p>
            ) : (
              selectedTools.map((toolId, index) => {
                const tool = getToolById(toolId);
                const Icon = tool.icon;
                return (
                  <div key={toolId} className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br ${tool.gradient} shadow-lg cursor-pointer`}
                      onClick={() => !showResult && handleToolClick(toolId)}
                    >
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">{tool.name}</span>
                    </motion.div>
                    {index < selectedTools.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Available Tools */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Available tools (click to add):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workflowExercise.availableTools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTools.includes(tool.id);

              return (
                <motion.button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  disabled={showResult}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl text-left
                    transition-all duration-300
                    ${isSelected
                      ? 'bg-slate-700/30 border border-slate-500/30 opacity-50'
                      : 'bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/50'
                    }
                    ${showResult ? 'cursor-default' : 'cursor-pointer'}
                  `}
                  whileHover={!showResult && !isSelected ? { scale: 1.02 } : {}}
                  whileTap={!showResult && !isSelected ? { scale: 0.98 } : {}}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${isSelected ? 'text-gray-500' : 'text-white'}`}>{tool.name}</p>
                    <p className={`text-xs ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>{tool.description}</p>
                  </div>
                  {isSelected && (
                    <div className="ml-auto text-xs text-gray-500">
                      #{selectedTools.indexOf(tool.id) + 1}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!showResult ? (
            <>
              <Button
                variant="secondary"
                size="md"
                onClick={resetExercise}
                disabled={selectedTools.length === 0}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={checkAnswer}
                disabled={selectedTools.length !== 4}
              >
                Check My Workflow
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              size="md"
              onClick={resetExercise}
            >
              Try Again
            </Button>
          )}
        </div>

        {/* Result Feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-6 rounded-xl ${isCorrect
                ? 'bg-emerald-900/30 border border-emerald-500/40'
                : 'bg-amber-900/30 border border-amber-500/40'
              }`}
            >
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold text-lg ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isCorrect ? 'Perfect! You nailed it!' : 'Close, but not quite right!'}
                  </p>
                  <p className="text-gray-300 mt-2">
                    {isCorrect
                      ? 'This is exactly how the tools would chain together. The email comes in, gets analyzed for urgency, formatted into an alert, and sent to Slack.'
                      : 'The correct order is: Email (read complaint) → Complaint Analysis (check urgency) → Notification (format alert) → Slack (send alert)'
                    }
                  </p>
                  {!isCorrect && (
                    <div className="mt-4 p-4 rounded-lg bg-slate-800/60 border border-slate-700/50">
                      <p className="text-sm text-gray-400 mb-2">Correct workflow:</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {workflowExercise.correctOrder.map((toolId, index) => {
                          const tool = getToolById(toolId);
                          const Icon = tool.icon;
                          return (
                            <div key={toolId} className="flex items-center gap-2">
                              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                                <Icon className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">{tool.name}</span>
                              </div>
                              {index < workflowExercise.correctOrder.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-cyan-400" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// Vision Card Component
const VisionCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-cyan-900/30 to-emerald-900/40 border border-purple-500/40 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-emerald-500/5" />

        <div className="relative space-y-4 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
          >
            <Eye className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 uppercase tracking-wider">
            The Vision
          </h3>

          <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
            You don&apos;t need to <span className="text-purple-400">code</span> these connections—
            you just need to <span className="text-cyan-400">describe</span> what you want to happen.
          </p>

          <p className="text-gray-400 text-lg">
            &quot;When a customer emails a complaint, analyze it for urgency, and if it&apos;s urgent, notify me on Slack.&quot;
          </p>

          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">
                AI understands the workflow from your description
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function HowTheyWorkTogether({ onComplete }) {
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
            <Workflow className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            How They{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The real power comes when tools chain together. Let&apos;s see how a simple request
            flows through multiple AI tools to create an automated workflow.
          </p>
        </motion.div>

        {/* Workflow Visualization */}
        <AnimatePresence>
          {showContent && <WorkflowVisualization />}
        </AnimatePresence>

        {/* Build Workflow Exercise */}
        <AnimatePresence>
          {showContent && <BuildWorkflowExercise />}
        </AnimatePresence>

        {/* Vision Card */}
        <AnimatePresence>
          {showContent && <VisionCard />}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
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

export default HowTheyWorkTogether;
