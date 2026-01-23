import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Code, TestTube, Rocket, Users, MessageSquare, ArrowRight, CheckCircle2, Lightbulb, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../../components/common';

const timelineSteps = [
  {
    id: 'prep',
    title: 'Preparation',
    duration: '30 mins - 1 hour',
    icon: Clock,
    color: 'purple',
    description: 'Get your specification ready and set up your environment',
    tasks: [
      'Finalize your specification document',
      'Set up Claude Code or your AI IDE',
      'Gather any sample data you\'ll need',
      'Clear your calendar for focused work'
    ]
  },
  {
    id: 'build',
    title: 'Initial Build',
    duration: '1-3 hours',
    icon: Code,
    color: 'cyan',
    description: 'Work with AI to build the first version',
    tasks: [
      'Share your specification with AI',
      'Build core functionality first',
      'Don\'t worry about perfect styling yet',
      'Get something working, even if basic'
    ]
  },
  {
    id: 'test',
    title: 'Test & Iterate',
    duration: '1-2 hours',
    icon: TestTube,
    color: 'emerald',
    description: 'Try it out and fix what doesn\'t work',
    tasks: [
      'Test with real (or realistic) data',
      'Note what\'s confusing or broken',
      'Ask AI to fix specific issues',
      'Test again after each fix'
    ]
  },
  {
    id: 'refine',
    title: 'Polish & Refine',
    duration: '1-2 hours',
    icon: Rocket,
    color: 'orange',
    description: 'Make it look good and add finishing touches',
    tasks: [
      'Improve the visual design',
      'Add helpful error messages',
      'Add any "nice to have" features',
      'Make it feel professional'
    ]
  },
  {
    id: 'share',
    title: 'Share & Get Feedback',
    duration: '30 mins',
    icon: Users,
    color: 'pink',
    description: 'Show it to colleagues and gather feedback',
    tasks: [
      'Demo to a trusted colleague',
      'Watch where they get confused',
      'Note their suggestions',
      'Plan improvements for v2'
    ]
  }
];

const expectations = {
  realistic: [
    'First version won\'t be perfect - that\'s normal',
    'Expect 3-5 rounds of back-and-forth with AI',
    'Some features may need simplification',
    'You\'ll discover requirements you forgot',
    'Total time: 4-8 hours spread across 1-2 days'
  ],
  unrealistic: [
    '"AI will build it perfectly the first time"',
    '"I can do this in 30 minutes"',
    '"It will work exactly like my mental picture"',
    '"I won\'t need to explain anything twice"',
    '"Complex features will just work"'
  ]
};

function TimelineStep({ step, index, isActive, onClick }) {
  const IconComponent = step.icon;
  const colorClasses = {
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/50' }
  };
  const colors = colorClasses[step.color];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Connection Line */}
      {index < timelineSteps.length - 1 && (
        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-slate-600 to-transparent hidden md:block" />
      )}

      <Card
        className={`p-5 cursor-pointer transition-all ${
          isActive ? `${colors.border} ${colors.bg}` : 'hover:border-slate-600'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-semibold ${isActive ? colors.text : 'text-white'}`}>
                {step.title}
              </h4>
              <span className="text-slate-500 text-sm">{step.duration}</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{step.description}</p>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                {step.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 shrink-0`} />
                    {task}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ImplementationPath({ onComplete }) {
  const [activeStep, setActiveStep] = useState('prep');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your <span className="text-orange-400">Implementation Path</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Here's what building your tool actually looks like. This realistic timeline
          will help you plan and set expectations.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">The Building Timeline</h2>
        </div>

        <div className="space-y-4">
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === step.id}
              onClick={() => setActiveStep(step.id)}
            />
          ))}
        </div>

        <Card className="mt-6 p-5 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Estimated Total Time</p>
              <p className="text-slate-400 text-sm">For a first-time builder</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                4-8 hours
              </p>
              <p className="text-slate-500 text-sm">over 1-2 days</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Expectations */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Realistic */}
        <Card className="p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-300">Realistic Expectations</h3>
          </div>
          <ul className="space-y-2">
            {expectations.realistic.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* Unrealistic */}
        <Card className="p-6 bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-red-300">Unrealistic Expectations</h3>
          </div>
          <ul className="space-y-2">
            {expectations.unrealistic.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Communication Tips */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Communicating with AI</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h4 className="text-emerald-400 font-medium mb-3">Good Prompts</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "The status badge isn't changing color when battery is below 30%. Can you fix that?"
              </p>
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "Add a filter dropdown that lets me show only vehicles with low battery."
              </p>
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "The table should sort by last check-in time by default, newest first."
              </p>
            </div>
          </Card>

          <Card className="p-5">
            <h4 className="text-red-400 font-medium mb-3">Avoid These</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "This doesn't work." (What doesn't work?)
              </p>
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "Make it better." (Better how?)
              </p>
              <p className="text-slate-300 p-2 bg-slate-800/50 rounded">
                "It looks wrong." (What looks wrong?)
              </p>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                The Secret to Success
              </h3>
              <p className="text-slate-300">
                Start small, ship fast, iterate often. Your first version should be the
                simplest thing that's still useful. You can always add features later,
                but you can't use a tool that's never finished. Done is better than perfect.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
        >
          Continue to Quiz
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default ImplementationPath;
