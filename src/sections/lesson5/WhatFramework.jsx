import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Eye, Cog, Database, Link, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '../../components/common';

const frameworkParts = [
  {
    id: 'what',
    letter: 'W',
    title: 'What it does',
    question: 'What is the main purpose of this tool?',
    description: 'The core functionality - what problem does it solve?',
    icon: Eye,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    example: 'Tracks which team members are available for shifts each week'
  },
  {
    id: 'how',
    letter: 'H',
    title: 'How users interact',
    question: 'How do people use this tool?',
    description: 'The user interface - what do they see and do?',
    icon: Cog,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    example: 'Team members open a calendar view and click to mark days as available or unavailable'
  },
  {
    id: 'actions',
    letter: 'A',
    title: 'Actions behind scenes',
    question: 'What happens when users do things?',
    description: 'The backend logic - what processing occurs?',
    icon: Database,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500',
    example: 'System saves availability, calculates coverage gaps, and notifies managers of shortages'
  },
  {
    id: 'things',
    letter: 'T',
    title: 'Things to remember',
    question: 'What data needs to be stored?',
    description: 'The database - what information persists?',
    icon: Link,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500',
    example: 'Team member profiles, weekly availability entries, notification preferences, historical data'
  }
];

const exampleWalkthrough = {
  tool: 'Team Availability Checker',
  what: 'A tool that helps managers see which team members are available for shifts each week, so they can plan schedules without back-and-forth messages.',
  how: 'Team members log in and see a weekly calendar. They click on days to mark themselves as available (green) or unavailable (red). Managers see a dashboard showing all team availability at a glance with color-coded coverage indicators.',
  actions: 'When a team member updates their availability, the system saves the change and recalculates coverage for that week. If coverage drops below the required level, managers get an automatic notification. The system also tracks patterns over time.',
  things: 'User accounts with names and roles, weekly availability entries for each person, minimum coverage requirements per day, notification settings, and 12 weeks of historical data for trend analysis.'
};

function WhatFramework({ onComplete }) {
  const [expandedPart, setExpandedPart] = useState(null);
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4"
        >
          <Layout className="w-8 h-8 text-purple-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          The WHAT Framework
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          A simple system for describing any tool. Answer these four questions and you'll have
          everything AI needs to build exactly what you want.
        </p>
      </motion.div>

      {/* Framework Visual */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {frameworkParts.map((part, index) => (
              <motion.button
                key={part.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  expandedPart === part.id
                    ? `bg-${part.color}-500/20 border-2 border-${part.color}-500`
                    : 'bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setExpandedPart(expandedPart === part.id ? null : part.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${part.gradient} mb-2`}>
                  <span className="text-2xl font-bold text-white">{part.letter}</span>
                </div>
                <h3 className="text-white font-medium text-sm">{part.title}</h3>
              </motion.button>
            ))}
          </div>

          {/* Expanded Part Details */}
          {expandedPart && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {(() => {
                const part = frameworkParts.find(p => p.id === expandedPart);
                return (
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${part.gradient}`}>
                      <part.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{part.question}</h3>
                      <p className="text-slate-400 text-sm mb-3">{part.description}</p>
                      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                        <span className="text-xs text-slate-500 block mb-1">Example answer:</span>
                        <p className="text-slate-300 text-sm italic">"{part.example}"</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Example Walkthrough */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Example: {exampleWalkthrough.tool}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowExample(!showExample)}
            >
              {showExample ? 'Hide' : 'Show'} Full Example
            </Button>
          </div>

          {showExample && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[
                { letter: 'W', title: 'What it does', content: exampleWalkthrough.what, color: 'purple' },
                { letter: 'H', title: 'How users interact', content: exampleWalkthrough.how, color: 'cyan' },
                { letter: 'A', title: 'Actions behind scenes', content: exampleWalkthrough.actions, color: 'emerald' },
                { letter: 'T', title: 'Things to remember', content: exampleWalkthrough.things, color: 'orange' }
              ].map((item, index) => (
                <motion.div
                  key={item.letter}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-lg font-bold text-${item.color}-400`}>{item.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <CheckCircle2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Why This Works</h3>
              <p className="text-slate-300">
                The WHAT framework maps directly to how software is built. When you answer these four questions,
                you're telling AI about the <strong className="text-white">Frontend</strong> (W + H),
                <strong className="text-white"> Backend</strong> (A), and <strong className="text-white">Database</strong> (T).
                No coding knowledge needed - just clear thinking about what you want.
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
        transition={{ delay: 0.5 }}
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Practice Writing Requirements
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default WhatFramework;
