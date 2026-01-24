import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, XCircle, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, Button } from '../../components/common';

const mistakes = [
  {
    id: 1,
    title: 'Too Vague',
    icon: '🌫️',
    description: 'Descriptions that lack specific details leave AI guessing.',
    before: '"I need a tool to manage stuff."',
    after: '"I need a tool to track customer support tickets from submission to resolution, with status updates and assignment to team members."',
    fix: 'Add specifics: What kind of stuff? Who uses it? What do they do with it?'
  },
  {
    id: 2,
    title: 'Missing User Perspective',
    icon: '👤',
    description: 'Forgetting to describe who uses the tool and how.',
    before: '"Create a scheduling system."',
    after: '"Create a scheduling system where managers can create shift slots and team members can view available slots and sign up for shifts they want."',
    fix: 'Always mention who the users are and what they do step-by-step.'
  },
  {
    id: 3,
    title: 'Forgetting Edge Cases',
    icon: '⚠️',
    description: "Only describing the happy path, not what happens when things go wrong.",
    before: '"Users submit forms and see a confirmation."',
    after: '"Users submit forms and see a confirmation. If required fields are missing, show specific error messages. If submission fails, save a draft and allow retry."',
    fix: 'Think about: What if it fails? What if data is missing? What if users make mistakes?'
  },
  {
    id: 4,
    title: 'No Success Criteria',
    icon: '🎯',
    description: "Not defining what 'done' looks like.",
    before: '"Make a report generator."',
    after: '"Make a report generator that creates weekly PDF summaries showing: total complaints, resolution rate, average resolution time, and top 3 complaint categories. Reports should be emailable."',
    fix: 'Describe what the output should look like and what data it should include.'
  }
];

const quickCheck = [
  { id: 1, question: 'Did I specify who will use this tool?', tip: 'Name the roles (manager, driver, customer, etc.)' },
  { id: 2, question: 'Did I describe what users see and do?', tip: 'Walk through the screens and actions step by step' },
  { id: 3, question: "Did I explain what happens behind the scenes?", tip: 'What calculations, validations, or notifications occur?' },
  { id: 4, question: 'Did I list what data needs to be stored?', tip: 'Think about what you need to remember between sessions' },
  { id: 5, question: 'Did I consider error cases?', tip: "What happens when things don't go as planned?" }
];

function MistakeCard({ mistake, isExpanded, onClick }) {
  return (
    <motion.div layout className="mb-4">
      <Card className={`transition-all ${isExpanded ? 'border-amber-500/50' : ''}`}>
        <button
          className="w-full p-6 text-left"
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{mistake.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{mistake.title}</h3>
                <p className="text-slate-400 text-sm">{mistake.description}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              <div className="space-y-4 pt-4 border-t border-slate-700">
                {/* Before */}
                <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-red-300">Before (Vague)</span>
                  </div>
                  <p className="text-slate-300 italic">{mistake.before}</p>
                </div>

                {/* After */}
                <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-300">After (Specific)</span>
                  </div>
                  <p className="text-slate-300 italic">{mistake.after}</p>
                </div>

                {/* Fix */}
                <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-purple-300">How to Fix</span>
                  </div>
                  <p className="text-slate-300">{mistake.fix}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function CommonMistakes({ onComplete }) {
  const [expandedMistake, setExpandedMistake] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
          Common Mistakes to Avoid
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Learn from these common pitfalls so you can write better descriptions from the start.
        </p>
      </motion.div>

      {/* Mistake Cards */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {mistakes.map((mistake) => (
          <MistakeCard
            key={mistake.id}
            mistake={mistake}
            isExpanded={expandedMistake === mistake.id}
            onClick={() => setExpandedMistake(expandedMistake === mistake.id ? null : mistake.id)}
          />
        ))}
      </motion.div>

      {/* Quick Check Questionnaire */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            Quick Check Before You Build
          </h2>
          <p className="text-slate-400 mb-6">
            Before giving your description to AI, run through this checklist:
          </p>
          <div className="space-y-3">
            {quickCheck.map((item, index) => (
              <motion.button
                key={item.id}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  checkedItems[item.id]
                    ? 'bg-emerald-900/20 border-2 border-emerald-500'
                    : 'bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => toggleCheck(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    checkedItems[item.id] ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}>
                    {checkedItems[item.id] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <p className={`font-medium ${checkedItems[item.id] ? 'text-emerald-300' : 'text-white'}`}>
                      {item.question}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">{item.tip}</p>
                  </div>
                </div>
              </motion.button>
            ))}
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
          Plan Your Real Tool
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default CommonMistakes;
