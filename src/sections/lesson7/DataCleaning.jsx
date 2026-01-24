import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eraser, AlertTriangle, CheckCircle2, ArrowRight, Lightbulb, Zap } from 'lucide-react';
import { Card, Button } from '../../components/common';

const commonProblems = [
  {
    problem: 'Inconsistent Formatting',
    example: 'Dates like "Jan 15", "2024-01-15", "15/01/24"',
    solution: 'AI can standardize all dates to your preferred format',
    icon: '📅'
  },
  {
    problem: 'Missing Values',
    example: 'Empty cells, "N/A", "null", blank spaces',
    solution: 'AI can fill with defaults, average, or flag for review',
    icon: '❓'
  },
  {
    problem: 'Duplicates',
    example: 'Same booking entered twice, name variations (John vs JOHN)',
    solution: 'AI can identify and merge or remove duplicates',
    icon: '👥'
  },
  {
    problem: 'Typos & Errors',
    example: '"Amstermdam" instead of "Amsterdam", "$1,00" instead of "$100"',
    solution: 'AI can detect and correct common errors',
    icon: '✏️'
  },
  {
    problem: 'Mixed Data Types',
    example: 'Numbers stored as text, text in number columns',
    solution: 'AI can convert and standardize data types',
    icon: '🔤'
  }
];

const cleaningPrompts = [
  {
    scenario: 'Date Standardization',
    prompt: 'Standardize all dates in column B to YYYY-MM-DD format. The dates are currently in various formats including "Jan 15, 2024", "15/01/24", and "2024.01.15".',
    result: 'All dates converted to 2024-01-15 format'
  },
  {
    scenario: 'Remove Duplicates',
    prompt: 'Find duplicate entries based on booking ID and customer email. For duplicates, keep the most recent entry.',
    result: 'Found and removed 23 duplicate entries'
  },
  {
    scenario: 'Fix Missing Values',
    prompt: 'For missing ratings, use the average rating for that vehicle. For missing locations, mark as "Unknown - Needs Review".',
    result: 'Filled 12 missing ratings, flagged 5 missing locations'
  }
];

function ProblemCard({ problem, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{problem.icon}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-1">{problem.problem}</h4>
            <p className="text-red-400 text-sm mb-2">
              Example: <span className="font-mono">{problem.example}</span>
            </p>
            <p className="text-emerald-400 text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              {problem.solution}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CleaningPrompt({ prompt, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
            {prompt.scenario}
          </span>
        </div>
        <div className="mb-3">
          <label className="text-slate-400 text-xs mb-1 block">Your prompt:</label>
          <div className="p-3 rounded-lg bg-slate-800/50 text-sm text-slate-300 font-mono">
            "{prompt.prompt}"
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>{prompt.result}</span>
        </div>
      </Card>
    </motion.div>
  );
}

function DataCleaning({ onComplete }) {
  const [userPrompt, setUserPrompt] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Data <span className="text-amber-400">Cleaning</span> with AI
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Messy data is the enemy of good analysis. AI can help clean and
          standardize your data faster than you ever could manually.
        </p>
      </motion.div>

      {/* Common Problems */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Common Data Problems</h2>
        </div>
        <p className="text-slate-400 mb-6">
          These issues plague every spreadsheet. AI can fix them in seconds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonProblems.map((problem, index) => (
            <ProblemCard key={problem.problem} problem={problem} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Cleaning Prompts */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Eraser className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Example Cleanup Prompts</h2>
        </div>
        <p className="text-slate-400 mb-6">
          See how to describe data cleaning tasks to AI:
        </p>
        <div className="space-y-4">
          {cleaningPrompts.map((prompt, index) => (
            <CleaningPrompt key={prompt.scenario} prompt={prompt} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Practice Exercise */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Practice: Write a Cleanup Prompt</h2>
        </div>
        <Card className="p-6">
          <p className="text-slate-300 mb-4">
            Scenario: You have a spreadsheet with vehicle IDs where some are "V001",
            some are "v-001", and some are just "1". Write a prompt to standardize them all.
          </p>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Write your cleanup prompt here..."
            rows={3}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none mb-4"
          />
          {userPrompt.length > 20 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-emerald-300 font-medium">Good start!</p>
                  <p className="text-slate-300 text-sm mt-1">
                    A great cleanup prompt would include: the current formats you see,
                    your desired format (e.g., "V001"), and what to do with edge cases.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Pro Tip */}
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
                Pro Tip: Always Preview Before Applying
              </h3>
              <p className="text-slate-300">
                Ask AI to "show me 5 examples of what the cleaned data will look like"
                before applying changes to your entire dataset. This catches any
                misunderstandings before they affect all your data.
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
          Continue to Finding Insights
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default DataCleaning;
