import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Lightbulb, ArrowRight, Zap, BarChart3 } from 'lucide-react';
import { Card, Button } from '../../components/common';

const aiCapabilities = [
  {
    title: 'Pattern Recognition',
    description: 'Find patterns humans might miss: seasonal trends, day-of-week effects, correlations between variables',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    title: 'Anomaly Detection',
    description: 'Spot unusual data points: unexpected spikes, missing patterns, outliers that need investigation',
    icon: Search,
    color: 'cyan'
  },
  {
    title: 'Predictive Insights',
    description: 'Forecast trends: what might happen next based on historical patterns',
    icon: BarChart3,
    color: 'emerald'
  }
];

const vlotoPrompts = [
  {
    goal: 'Understand booking patterns',
    prompt: 'Analyze booking data and identify: peak booking hours, busiest days of the week, and any seasonal patterns over the last 3 months.',
    expectedInsight: 'Weekday mornings (8-10am) have 40% more bookings than afternoons. Fridays see 25% higher demand than Mondays.'
  },
  {
    goal: 'Improve fleet utilization',
    prompt: 'Compare vehicle utilization rates and identify which vehicles are underperforming. Include any patterns in why some vehicles get booked more than others.',
    expectedInsight: 'Vehicles in Zone A average 85% utilization vs 62% in Zone B. Vehicles with battery above 80% get 30% more bookings.'
  },
  {
    goal: 'Reduce customer complaints',
    prompt: 'Analyze customer feedback and ratings. What are the main drivers of low ratings? Are there patterns in which vehicles or times get more complaints?',
    expectedInsight: 'Low ratings correlate strongly with vehicles showing <50% battery at pickup. Most complaints occur during evening rush hour (5-7pm).'
  },
  {
    goal: 'Optimize pricing',
    prompt: 'Look at revenue per booking across different times, locations, and vehicle types. Where are we leaving money on the table? Where might demand be price-sensitive?',
    expectedInsight: 'Weekend premium pricing could increase 15% with minimal demand impact. Longer bookings (4+ hours) have lower per-hour revenue.'
  }
];

function CapabilityCard({ capability, index }) {
  const Icon = capability.icon;
  const colorClasses = {
    purple: 'bg-purple-500/20 text-purple-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    emerald: 'bg-emerald-500/20 text-emerald-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5 h-full">
        <div className={`inline-flex p-3 rounded-xl ${colorClasses[capability.color]} mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-white mb-2">{capability.title}</h4>
        <p className="text-slate-400 text-sm">{capability.description}</p>
      </Card>
    </motion.div>
  );
}

function InsightPromptCard({ prompt, index }) {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
            Goal: {prompt.goal}
          </span>
        </div>
        <div className="mb-4">
          <label className="text-slate-400 text-xs mb-1 block">Your prompt:</label>
          <div className="p-3 rounded-lg bg-slate-800/50 text-sm text-slate-300">
            "{prompt.prompt}"
          </div>
        </div>
        {!showInsight ? (
          <button
            onClick={() => setShowInsight(true)}
            className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"
          >
            <Search className="w-4 h-4" /> Show example insight
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-500/30"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-emerald-300 font-medium text-sm mb-1">AI Insight:</p>
                <p className="text-slate-300 text-sm">{prompt.expectedInsight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

function FindingInsights({ onComplete }) {
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
          Finding <span className="text-purple-400">Hidden Insights</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Your data tells a story. AI can help you discover patterns and insights
          that would take hours (or never be found) with traditional analysis.
        </p>
      </motion.div>

      {/* AI Capabilities */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">AI as Your Data Analyst</h2>
        </div>
        <p className="text-slate-400 mb-6">
          AI can analyze your data in ways that would take a human analyst hours:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiCapabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Vloto-Specific Prompts */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Search className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Vloto Insight Prompts</h2>
        </div>
        <p className="text-slate-400 mb-6">
          Here are prompts you could use with your actual Vloto data:
        </p>
        <div className="space-y-4">
          {vlotoPrompts.map((prompt, index) => (
            <InsightPromptCard key={prompt.goal} prompt={prompt} index={index} />
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
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Your Turn: Write an Insight Prompt</h2>
        </div>
        <Card className="p-6">
          <p className="text-slate-300 mb-4">
            Think about a question you have about your work data. What pattern or
            insight would help you make better decisions? Write a prompt to find it.
          </p>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Example: Analyze customer complaints over the last quarter and identify the root causes. Are there patterns by vehicle type, time of day, or location?"
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none mb-4"
          />
          {userPrompt.length > 30 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30"
            >
              <p className="text-purple-300 text-sm">
                Great prompt! Remember: the more specific your question, the more
                actionable your insights will be. Include time periods, specific
                metrics, and what decisions the insights will inform.
              </p>
            </motion.div>
          )}
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
            <Lightbulb className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                The Insight Loop
              </h3>
              <p className="text-slate-300">
                The best insights come from iteration: <strong className="text-white">Ask → Discover → Follow Up</strong>.
                When AI reveals a pattern, dig deeper. "Why is this happening?"
                "What else correlates with this?" "How has this changed over time?"
                Each answer leads to better questions.
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

export default FindingInsights;
