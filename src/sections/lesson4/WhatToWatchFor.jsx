import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import { Card, Button } from '../../components/common';

const greenFlags = [
  {
    title: 'AI asks clarifying questions',
    description: 'Good sign! It means the AI wants to understand your needs better.'
  },
  {
    title: 'Results appear quickly',
    description: 'AI should generate code in seconds to minutes, not hours.'
  },
  {
    title: 'Changes are incremental',
    description: "Each iteration should build on the last, not start over."
  },
  {
    title: 'You understand what it built',
    description: 'Even without coding knowledge, the tool should make sense to you.'
  },
  {
    title: 'It handles edge cases when asked',
    description: 'When you mention special scenarios, the AI should address them.'
  }
];

const redFlags = [
  {
    title: "AI seems confused by simple requests",
    description: 'Try rephrasing. If it still struggles, break into smaller parts.'
  },
  {
    title: 'Same errors keep repeating',
    description: "Stop and try a different approach. Don't keep asking the same thing."
  },
  {
    title: 'The tool does something completely unexpected',
    description: 'Your description might have been ambiguous. Clarify and try again.'
  },
  {
    title: "You can't explain what the tool does",
    description: "If you don't understand it, you won't be able to maintain or improve it."
  },
  {
    title: 'AI claims to do something but it doesn\'t work',
    description: 'Always test! AI can be confidently wrong. Verify everything works.'
  }
];

const bestPractices = [
  {
    icon: '1',
    title: 'Start Simple',
    description: 'Build a basic version first, then add features one at a time.'
  },
  {
    icon: '2',
    title: 'Test Often',
    description: 'After each change, verify it works before moving on.'
  },
  {
    icon: '3',
    title: 'Save Your Progress',
    description: 'Keep working versions. If something breaks, you can go back.'
  },
  {
    icon: '4',
    title: 'Be Specific',
    description: 'Vague requests get vague results. Details matter.'
  },
  {
    icon: '5',
    title: 'Know When to Stop',
    description: 'Perfect is the enemy of good. Ship when it solves the problem.'
  }
];

function WhatToWatchFor({ onComplete }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4"
        >
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          What to Watch For
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          When you start building with AI, here's how to know if things are going well - or if you need to adjust.
        </p>
      </motion.div>

      {/* Green Flags */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-emerald-300">Green Flags - Things Are Going Well</h2>
          </div>
          <div className="space-y-4">
            {greenFlags.map((flag, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-emerald-900/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">{flag.title}</h3>
                  <p className="text-slate-400 text-sm">{flag.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Red Flags */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/20">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-300">Red Flags - Time to Adjust</h2>
          </div>
          <div className="space-y-4">
            {redFlags.map((flag, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-900/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">{flag.title}</h3>
                  <p className="text-slate-400 text-sm">{flag.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Best Practices */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Best Practices Checklist</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestPractices.map((practice, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">{practice.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{practice.title}</h3>
                  <p className="text-slate-400 text-sm">{practice.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Lightbulb className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Remember This
              </h3>
              <p className="text-slate-300">
                The goal isn't perfect code - it's a <strong className="text-white">working solution</strong> that
                solves your problem. AI helps you build faster, but you're still the one who knows what
                "good" looks like for your team. Trust your judgment, iterate often, and don't be afraid
                to start over if something isn't working.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Continue to Quiz
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default WhatToWatchFor;
