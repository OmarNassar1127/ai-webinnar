import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageSquare, BarChart3, Clock, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '../../components/common';

const projectFeatures = [
  {
    icon: MessageSquare,
    title: 'Quick Feedback Form',
    description: 'A simple form where customers can share their thoughts'
  },
  {
    icon: BarChart3,
    title: 'Instant Summary',
    description: 'AI automatically categorizes and summarizes feedback'
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'See new feedback appear immediately as it comes in'
  },
  {
    icon: Users,
    title: 'Team Dashboard',
    description: 'A clean interface for the team to review and respond'
  }
];

const whyThisProject = [
  'It solves a real operations problem',
  'It uses all four software components you learned',
  'It can be built in under an hour with AI',
  'You could actually use this at Vloto'
];

function WhatWereBuilding({ onComplete }) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-6"
          animate={{
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Wrench className="w-8 h-8 text-cyan-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Project:{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Quick Feedback Collector
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          We're going to watch an AI build a simple but powerful tool that collects
          and organizes customer feedback. This is exactly the kind of tool operations
          teams use every day.
        </p>
      </motion.div>

      {/* Project Card */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/30">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Quick Feedback Collector</h2>
              <p className="text-slate-400">A tool to gather, categorize, and summarize customer feedback</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">
              Operations Tool
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Software Components Used */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/30">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Components Used:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                Frontend (Form + Dashboard)
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                Backend (AI Categorization)
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                Database (Feedback Storage)
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm">
                API (Connects Everything)
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Why This Project */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Why We Chose This Project
          </h2>
          <div className="space-y-3">
            {whyThisProject.map((reason, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">{reason}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* What to Pay Attention To */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-3">
            What to Pay Attention To
          </h2>
          <p className="text-slate-300 mb-4">
            As you watch the demo, notice these key things:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">1.</span>
              <span>How we describe what we want in plain English</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">2.</span>
              <span>How the AI asks clarifying questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">3.</span>
              <span>How we handle mistakes and make corrections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">4.</span>
              <span>How quickly the tool comes together</span>
            </li>
          </ul>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
        >
          Watch the Demo
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default WhatWereBuilding;
