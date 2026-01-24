import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorPlay, Play, MessageSquare, Code, RefreshCw, CheckCircle, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Button } from '../../components/common';

const demoSteps = [
  {
    id: 1,
    title: 'Starting Claude Code',
    icon: Play,
    color: 'purple',
    description: 'We open Claude Code and start a new project. The AI is ready to help us build.',
    screenshot: null,
    details: [
      'Open the terminal or Claude Code interface',
      'Create a new project folder',
      'The AI greets us and asks what we want to build'
    ]
  },
  {
    id: 2,
    title: 'Describing What We Want',
    icon: MessageSquare,
    color: 'cyan',
    description: 'We explain our feedback tool in plain English - no code required.',
    screenshot: null,
    prompt: `"I need a simple feedback collector tool. Customers should be able to submit feedback through a form with their name, email, and message. The tool should automatically categorize feedback as positive, negative, or suggestion. I want a dashboard where the team can see all feedback with filters."`,
    details: [
      'Use clear, specific language',
      'Mention who will use it (customers, team)',
      'Describe the key features you need'
    ]
  },
  {
    id: 3,
    title: 'AI Starts Building',
    icon: Code,
    color: 'emerald',
    description: 'The AI understands and begins creating the code. It works on all four components.',
    screenshot: null,
    details: [
      'Creates the feedback form (Frontend)',
      'Sets up the categorization logic (Backend)',
      'Creates the storage structure (Database)',
      'Connects everything together (API)'
    ]
  },
  {
    id: 4,
    title: 'First Attempt - Almost There',
    icon: RefreshCw,
    color: 'amber',
    description: 'The first version works but needs tweaks. This is normal and expected!',
    screenshot: null,
    feedback: `"This looks good! Can you make the form look more modern with rounded corners? Also, I'd like the dashboard to show feedback from newest to oldest."`,
    details: [
      'Test what was built',
      'Note what works and what needs adjustment',
      'Give clear, specific feedback'
    ]
  },
  {
    id: 5,
    title: 'Iterating and Refining',
    icon: RefreshCw,
    color: 'blue',
    description: 'We have a conversation with the AI, making small improvements each time.',
    screenshot: null,
    details: [
      'Each iteration takes just moments',
      'The AI remembers context from before',
      'Changes are immediate and visible',
      'We can keep refining until perfect'
    ]
  },
  {
    id: 6,
    title: 'Final Result - Done!',
    icon: CheckCircle,
    color: 'emerald',
    description: 'After a few iterations, we have a working feedback tool. Ready to use!',
    screenshot: null,
    details: [
      'Professional-looking feedback form',
      'AI-powered categorization working',
      'Dashboard with filters and sorting',
      'All in less than an hour!'
    ]
  }
];

function DemoPlaceholder({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = demoSteps[currentStep];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4"
        >
          <MonitorPlay className="w-8 h-8 text-purple-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Building with AI: Step by Step
        </h1>
        <p className="text-slate-400">
          Follow along as we build the Quick Feedback Collector
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {demoSteps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index === currentStep
                  ? 'bg-purple-500 text-white scale-110'
                  : index < currentStep
                  ? 'bg-emerald-500/30 text-emerald-400'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </button>
          ))}
        </div>
        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 mb-8">
            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-${step.color}-500/20`}>
                <step.icon className={`w-6 h-6 text-${step.color}-400`} />
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Step {step.id} of {demoSteps.length}</div>
                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-300 mb-6">{step.description}</p>

            {/* Prompt Example (if exists) */}
            {step.prompt && (
              <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  What we told the AI:
                </div>
                <p className="text-slate-200 italic">{step.prompt}</p>
              </div>
            )}

            {/* Feedback Example (if exists) */}
            {step.feedback && (
              <div className="mb-6 p-4 rounded-xl bg-amber-900/20 border border-amber-500/30">
                <div className="text-sm text-amber-400 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Our feedback to the AI:
                </div>
                <p className="text-slate-200 italic">{step.feedback}</p>
              </div>
            )}

            {/* Screenshot Placeholder */}
            <div className="mb-6 aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-500 text-sm mb-2">Demo Screenshot</p>
                <p className="text-slate-600 text-xs">
                  {step.title}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Key Points:</h3>
              {step.details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{detail}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </Button>

        {currentStep < demoSteps.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Next Step
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        ) : (
          <Button variant="primary" onClick={onComplete}>
            Continue
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default DemoPlaceholder;
