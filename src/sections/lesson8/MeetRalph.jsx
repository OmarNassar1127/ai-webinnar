import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, Code, CheckCircle, ArrowRight, ArrowDown, RefreshCw, Lightbulb } from 'lucide-react';
import { Button, Card } from '../../components/common';

const flowSteps = [
  {
    id: 'prd',
    title: 'Your PRD',
    description: 'A document describing what you want to build',
    icon: FileText,
    color: 'purple',
  },
  {
    id: 'json',
    title: 'prd.json',
    description: 'Structured user stories with acceptance criteria',
    icon: Code,
    color: 'cyan',
  },
  {
    id: 'ralph',
    title: 'Ralph Loop',
    description: 'AI picks a task, implements it, commits, repeats',
    icon: RefreshCw,
    color: 'emerald',
  },
  {
    id: 'complete',
    title: 'Complete Project',
    description: 'All user stories implemented and passing',
    icon: CheckCircle,
    color: 'green',
  },
];

const keyInsights = [
  {
    title: 'Context Solved',
    description: 'Each iteration starts fresh with the PRD, so context is never lost',
  },
  {
    title: 'Progress Tracked',
    description: 'The prd.json file tracks which stories pass, so Ralph knows what to work on',
  },
  {
    title: 'Quality Built In',
    description: 'Each story has acceptance criteria — Ralph only marks it done when tests pass',
  },
  {
    title: 'Human in Control',
    description: 'You write the PRD, you review the commits, you have final say',
  },
];

const FlowDiagram = ({ activeStep }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-8">
      {flowSteps.map((step, index) => (
        <motion.div
          key={step.id}
          className="flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <motion.div
            className={`p-4 rounded-xl border-2 transition-all ${
              activeStep === index
                ? `bg-${step.color}-500/20 border-${step.color}-500 shadow-lg shadow-${step.color}-500/20`
                : 'bg-slate-800/50 border-slate-700/50'
            }`}
            animate={activeStep === index ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <step.icon className={`w-8 h-8 ${
              step.color === 'purple' ? 'text-purple-400' :
              step.color === 'cyan' ? 'text-cyan-400' :
              step.color === 'emerald' ? 'text-emerald-400' :
              'text-green-400'
            }`} />
          </motion.div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-medium">{step.title}</h4>
            <p className="text-xs text-slate-400 max-w-[150px]">{step.description}</p>
          </div>

          {index < flowSteps.length - 1 && (
            <ArrowRight className="hidden md:block w-6 h-6 text-slate-600" />
          )}
          {index < flowSteps.length - 1 && (
            <ArrowDown className="md:hidden w-6 h-6 text-slate-600" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function MeetRalph({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate through steps
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-6"
        >
          <Bot className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Meet <span className="text-emerald-400">Ralph</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Ralph is a pattern for autonomous AI development. It turns your ideas into working code — one user story at a time.
        </p>
      </motion.div>

      {/* Flow Diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">How Ralph Works</h3>

          <FlowDiagram activeStep={activeStep} />

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isAnimating ? 'Pause animation' : 'Resume animation'}
            </button>
          </div>
        </Card>
      </motion.div>

      {/* The Ralph Loop Explained */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-emerald-400" />
          The Ralph Loop
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { step: '1', title: 'Read PRD', desc: 'Ralph reads the prd.json to understand all user stories' },
            { step: '2', title: 'Pick Task', desc: 'Finds the first story where passes: false' },
            { step: '3', title: 'Implement', desc: 'Writes code to meet the acceptance criteria' },
            { step: '4', title: 'Test', desc: 'Runs quality checks (typecheck, lint, test)' },
            { step: '5', title: 'Commit', desc: 'If tests pass, commits with story ID' },
            { step: '6', title: 'Update PRD', desc: 'Marks story as passes: true' },
            { step: '7', title: 'Repeat', desc: 'Picks next failing story and starts again' },
            { step: '8', title: 'Done', desc: 'When all stories pass, outputs COMPLETE' },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-400">{item.step}</span>
              </div>
              <div>
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Why This Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Card className="p-4 h-full">
                <h4 className="text-emerald-400 font-medium mb-2">{insight.title}</h4>
                <p className="text-sm text-slate-400">{insight.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Insight Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 via-slate-800/40 to-cyan-900/40 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bot className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <span className="text-emerald-300 font-medium">Key Insight</span>
          </div>
          <p className="text-lg text-white">
            Ralph doesn't replace your thinking — it <span className="text-cyan-400">amplifies</span> it. You design the solution in the PRD. Ralph executes it faithfully.
          </p>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          See the PRD Structure
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
