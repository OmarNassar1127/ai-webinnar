import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, RefreshCw, AlertTriangle, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button, Card } from '../../components/common';

const currentApproachSteps = [
  { id: 1, text: 'You write a prompt', icon: MessageSquare },
  { id: 2, text: 'AI responds', icon: Zap },
  { id: 3, text: 'You review and refine', icon: RefreshCw },
  { id: 4, text: 'Repeat 50+ times...', icon: AlertTriangle },
];

const limitationCards = [
  {
    title: 'Context Window',
    description: 'AI forgets earlier conversation parts as context fills up',
    impact: 'You lose progress and repeat yourself',
    color: 'red',
  },
  {
    title: 'Manual Iteration',
    description: 'Every step requires your input and review',
    impact: 'Hours of back-and-forth for complex projects',
    color: 'orange',
  },
  {
    title: 'No Persistence',
    description: "AI doesn't remember what worked before",
    impact: 'Same mistakes repeated, lessons lost',
    color: 'amber',
  },
];

const solutionFeatures = [
  { text: 'Structured task breakdown', icon: CheckCircle },
  { text: 'Persistent progress tracking', icon: CheckCircle },
  { text: 'Automated iteration', icon: CheckCircle },
  { text: 'Context preserved between runs', icon: CheckCircle },
];

// Animated loop visualization
const LoopVisualization = ({ isPlaying }) => {
  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      <div className="relative h-48">
        {/* Central loop */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-cyan-500/50" />
        </motion.div>

        {/* Orbiting elements */}
        {['Read PRD', 'Pick Task', 'Implement', 'Test', 'Commit'].map((step, index) => {
          const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={step}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x, y }}
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.6,
              }}
            >
              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                <span className="text-xs text-cyan-300 whitespace-nowrap">{step}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Center icon */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/50">
            <RefreshCw className={`w-8 h-8 text-cyan-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
          </div>
        </motion.div>
      </div>

      <p className="text-center text-slate-400 mt-4">
        {isPlaying ? 'The autonomous loop runs continuously...' : 'Click to see the loop in action'}
      </p>
    </div>
  );
};

export default function BeyondSinglePrompts({ onComplete }) {
  const [expandedLimitation, setExpandedLimitation] = useState(null);
  const [isLoopPlaying, setIsLoopPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Beyond Single Prompts
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          The current approach to AI development has limitations. Let's understand them — and then see the solution.
        </p>
      </motion.div>

      {/* Current Approach */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          The Current Approach
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {currentApproachSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`p-3 rounded-xl ${step.id === 4 ? 'bg-red-500/20 border border-red-500/30' : 'bg-slate-800/50 border border-slate-700/50'}`}>
                <step.icon className={`w-5 h-5 ${step.id === 4 ? 'text-red-400' : 'text-slate-400'}`} />
              </div>
              <span className={`text-sm ${step.id === 4 ? 'text-red-300' : 'text-slate-300'}`}>{step.text}</span>
              {index < currentApproachSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Limitations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          The Limitations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {limitationCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => setExpandedLimitation(expandedLimitation === card.title ? null : card.title)}
              className="cursor-pointer"
            >
              <Card className={`p-4 border-l-4 ${
                card.color === 'red' ? 'border-l-red-500' :
                card.color === 'orange' ? 'border-l-orange-500' :
                'border-l-amber-500'
              } transition-all hover:bg-slate-700/50`}>
                <h3 className="text-white font-medium mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400 mb-2">{card.description}</p>
                <AnimatePresence>
                  {expandedLimitation === card.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-2 border-t border-slate-700 mt-2"
                    >
                      <p className={`text-sm ${
                        card.color === 'red' ? 'text-red-400' :
                        card.color === 'orange' ? 'text-orange-400' :
                        'text-amber-400'
                      }`}>
                        Impact: {card.impact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* The Solution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          The Solution: Autonomous Loops
        </h2>

        <Card className="p-6 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30">
          <p className="text-slate-300 mb-6 text-center">
            What if AI could take a list of tasks and work through them <span className="text-cyan-400 font-medium">one by one</span>, without needing your input at every step?
          </p>

          {/* Loop visualization */}
          <div
            className="cursor-pointer"
            onClick={() => setIsLoopPlaying(!isLoopPlaying)}
          >
            <LoopVisualization isPlaying={isLoopPlaying} />
          </div>

          {/* Solution features */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {solutionFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <feature.icon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-800/40 to-cyan-900/40 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-purple-400" />
            </motion.div>
            <span className="text-purple-300 font-medium">Key Insight</span>
          </div>
          <p className="text-lg text-white">
            The magic isn't in a single prompt — it's in <span className="text-cyan-400">structured iteration</span>. Give AI a plan, let it work, check the results.
          </p>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Meet the Solution: Ralph
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
