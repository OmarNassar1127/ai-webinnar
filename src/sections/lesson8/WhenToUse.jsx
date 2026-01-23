import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle, ArrowRight, Lightbulb, Target, Zap, AlertTriangle } from 'lucide-react';
import { Button, Card } from '../../components/common';

const goodUseCases = [
  {
    title: 'Multi-Feature Projects',
    description: 'Building apps with many user stories (dashboards, admin panels, etc.)',
    example: 'A customer feedback dashboard with filtering, search, export, and analytics',
    why: 'Multiple clear stories that can be implemented independently',
  },
  {
    title: 'Well-Defined Requirements',
    description: 'Projects where you know exactly what you want',
    example: 'Recreating an existing tool or following a clear specification',
    why: 'Clear acceptance criteria lead to better autonomous results',
  },
  {
    title: 'Overnight Builds',
    description: 'Tasks you can start before bed and review in the morning',
    example: 'Building out lesson content, data migrations, UI component libraries',
    why: "Ralph works while you sleep — you review what's done",
  },
  {
    title: 'Prototype Iterations',
    description: 'Quickly iterating through versions of an idea',
    example: 'Testing 3 different UI approaches for a feature',
    why: 'Fast iteration cycles with clear feedback loops',
  },
];

const notGreatUseCases = [
  {
    title: 'Vague Requirements',
    description: "When you're still figuring out what you want",
    example: '"Make a cool AI thing" or "improve the UX"',
    why: 'Ralph needs specific criteria to know when it\'s done',
  },
  {
    title: 'Deep Research Tasks',
    description: 'Open-ended exploration without clear deliverables',
    example: 'Investigating why performance is slow, or exploring new libraries',
    why: 'Better suited for interactive back-and-forth',
  },
  {
    title: 'Highly Creative Work',
    description: 'Tasks requiring subjective judgment',
    example: 'Designing a brand identity or writing marketing copy',
    why: 'Ralph follows specs literally — creativity needs human guidance',
  },
  {
    title: 'Critical Systems',
    description: 'High-stakes code that needs careful review',
    example: 'Payment processing, security-critical features',
    why: 'Always have human review for mission-critical code',
  },
];

const UseCaseCard = ({ useCase, isGood, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`p-4 cursor-pointer transition-all ${
          isGood ? 'hover:border-emerald-500/50' : 'hover:border-amber-500/50'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          {isGood ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="text-white font-medium mb-1">{useCase.title}</h4>
            <p className="text-sm text-slate-400">{useCase.description}</p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-slate-700/50"
                >
                  <div className="mb-2">
                    <span className="text-xs text-slate-500">Example:</span>
                    <p className="text-sm text-slate-300">{useCase.example}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Why:</span>
                    <p className={`text-sm ${isGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {useCase.why}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const DecisionHelper = () => {
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: 'clear', question: 'Do you have clear, specific requirements?' },
    { id: 'stories', question: 'Can you break it into discrete user stories?' },
    { id: 'criteria', question: 'Can you define testable acceptance criteria?' },
    { id: 'time', question: 'Do you have time to let it run and review later?' },
  ];

  const yesCount = Object.values(answers).filter(Boolean).length;
  const allAnswered = Object.keys(answers).length === questions.length;

  const getRecommendation = () => {
    if (yesCount >= 4) return { text: 'Perfect for Ralph!', color: 'emerald' };
    if (yesCount >= 3) return { text: 'Good candidate for Ralph', color: 'cyan' };
    if (yesCount >= 2) return { text: 'Consider refining requirements first', color: 'amber' };
    return { text: 'Better suited for interactive AI sessions', color: 'red' };
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-purple-400" />
        Should You Use Ralph?
      </h3>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center justify-between">
            <span className="text-slate-300">{q.question}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setAnswers({ ...answers, [q.id]: true })}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  answers[q.id] === true
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setAnswers({ ...answers, [q.id]: false })}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  answers[q.id] === false
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl border ${
            getRecommendation().color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' :
            getRecommendation().color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' :
            getRecommendation().color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
            'bg-red-500/10 border-red-500/30'
          }`}
        >
          <p className={`text-center font-medium ${
            getRecommendation().color === 'emerald' ? 'text-emerald-400' :
            getRecommendation().color === 'cyan' ? 'text-cyan-400' :
            getRecommendation().color === 'amber' ? 'text-amber-400' :
            'text-red-400'
          }`}>
            {getRecommendation().text}
          </p>
        </motion.div>
      )}
    </Card>
  );
};

export default function WhenToUse({ onComplete }) {
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
          className="inline-flex p-4 rounded-full bg-amber-500/20 border border-amber-500/40 mb-6"
        >
          <Target className="w-10 h-10 text-amber-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          When to <span className="text-amber-400">Use</span> Ralph
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Like any tool, Ralph excels in certain situations and is less suited for others. Let's understand when to reach for autonomous AI.
        </p>
      </motion.div>

      {/* Good Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Great For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goodUseCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} isGood={true} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Not Great Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-amber-400" />
          Less Ideal For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notGreatUseCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} isGood={false} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Decision Helper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <DecisionHelper />
      </motion.div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 via-slate-800/40 to-red-900/40 border border-amber-500/30">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span className="text-amber-300 font-medium">Important</span>
          </div>
          <p className="text-slate-300">
            Ralph is a <span className="text-white font-medium">tool</span>, not a replacement for thinking. You still need to:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2 text-slate-300">
              <span className="text-amber-400">•</span>
              Design the solution (write the PRD)
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <span className="text-amber-400">•</span>
              Review the output (check the commits)
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <span className="text-amber-400">•</span>
              Make judgment calls (is this what you wanted?)
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mb-12"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-800/40 to-cyan-900/40 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="w-6 h-6 text-purple-400" />
            </motion.div>
            <span className="text-purple-300 font-medium">Key Insight</span>
          </div>
          <p className="text-lg text-white">
            The best use of Ralph is for <span className="text-cyan-400">well-understood problems</span> that would take you hours of repetitive work. Let Ralph handle the implementation while you focus on design and strategy.
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
          Test Your Knowledge
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
