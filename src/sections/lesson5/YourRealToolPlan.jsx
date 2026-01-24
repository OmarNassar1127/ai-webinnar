import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, Save, ArrowRight } from 'lucide-react';
import { Card, Button } from '../../components/common';

const ideaPrompters = [
  { icon: '📋', text: 'What task do you repeat every day that could be automated?' },
  { icon: '⏰', text: 'Where do you waste the most time waiting for information?' },
  { icon: '📊', text: 'What reports do you wish you had at your fingertips?' },
  { icon: '🤝', text: 'What communication bottlenecks frustrate your team?' },
  { icon: '📱', text: 'What would make your mobile work easier?' },
  { icon: '🔍', text: 'What information do you constantly have to look up?' }
];

const STORAGE_KEY = 'vloto-ai-academy-tool-plan';

function YourRealToolPlan({ onComplete }) {
  const [toolPlan, setToolPlan] = useState({
    name: '',
    problem: '',
    what: '',
    how: '',
    actions: '',
    things: ''
  });
  const [saved, setSaved] = useState(false);

  // Load saved plan on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(STORAGE_KEY);
      if (savedPlan) {
        setToolPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error('Error loading tool plan:', error);
    }
  }, []);

  const handleChange = (field, value) => {
    setToolPlan(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toolPlan));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving tool plan:', error);
    }
  };

  const isComplete = Object.values(toolPlan).every(v => v.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 mb-4"
        >
          <Lightbulb className="w-8 h-8 text-emerald-400" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your Real Tool Plan
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Time to plan a real tool you could actually build for Vloto.
          This will be saved and used in Lesson 6 when we create a full specification.
        </p>
      </motion.div>

      {/* Idea Prompters */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Need Inspiration?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ideaPrompters.map((prompt, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <span className="text-xl">{prompt.icon}</span>
                <span className="text-slate-300 text-sm">{prompt.text}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Tool Plan Form */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Your Tool Plan</h2>

          <div className="space-y-6">
            {/* Tool Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tool Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                placeholder="e.g., Fleet Health Dashboard, Complaint Tracker, etc."
                value={toolPlan.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                What problem does this solve?
              </label>
              <textarea
                className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                rows={2}
                placeholder="Describe the pain point this tool addresses..."
                value={toolPlan.problem}
                onChange={(e) => handleChange('problem', e.target.value)}
              />
            </div>

            {/* WHAT Framework Fields */}
            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">WHAT Framework</h3>

              {/* W - What */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-400 mb-2">
                  W - What does this tool do?
                </label>
                <textarea
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  rows={3}
                  placeholder="Describe the main purpose and functionality..."
                  value={toolPlan.what}
                  onChange={(e) => handleChange('what', e.target.value)}
                />
              </div>

              {/* H - How */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  H - How do users interact with it?
                </label>
                <textarea
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  rows={3}
                  placeholder="Describe what users see and do step by step..."
                  value={toolPlan.how}
                  onChange={(e) => handleChange('how', e.target.value)}
                />
              </div>

              {/* A - Actions */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-emerald-400 mb-2">
                  A - What actions happen behind the scenes?
                </label>
                <textarea
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  rows={3}
                  placeholder="Describe calculations, validations, notifications..."
                  value={toolPlan.actions}
                  onChange={(e) => handleChange('actions', e.target.value)}
                />
              </div>

              {/* T - Things */}
              <div>
                <label className="block text-sm font-medium text-orange-400 mb-2">
                  T - What things need to be remembered?
                </label>
                <textarea
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                  rows={3}
                  placeholder="List all the data that needs to be stored..."
                  value={toolPlan.things}
                  onChange={(e) => handleChange('things', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={handleSave}
              disabled={!isComplete}
            >
              <Save className="w-4 h-4 mr-2" />
              {saved ? 'Saved!' : 'Save Plan'}
            </Button>
            {!isComplete && (
              <span className="text-slate-400 text-sm">
                Fill in all fields to save
              </span>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Homework Note */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Before Lesson 6
              </h3>
              <p className="text-slate-300">
                Between now and Lesson 6, refine your tool plan. Talk to colleagues about the problem.
                The more thought you put into it now, the better your specification will be later.
                Your plan will be automatically saved and available in Lesson 6.
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
        transition={{ delay: 0.4 }}
      >
        <Button variant="primary" size="lg" onClick={onComplete}>
          Continue to Quiz
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default YourRealToolPlan;
