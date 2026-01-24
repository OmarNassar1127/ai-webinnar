import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Scale, Clock, Users, Zap, ArrowRight, HelpCircle, Lightbulb, Car, MessageSquare, Wrench, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../../components/common';

const selectionCriteria = [
  {
    id: 'frequency',
    question: 'How often do you do this task?',
    icon: Clock,
    options: [
      { value: 'daily', label: 'Daily', score: 3 },
      { value: 'weekly', label: 'Weekly', score: 2 },
      { value: 'monthly', label: 'Monthly or less', score: 1 }
    ]
  },
  {
    id: 'time',
    question: 'How much time does it take each time?',
    icon: Clock,
    options: [
      { value: 'hours', label: '1+ hours', score: 3 },
      { value: 'moderate', label: '15-60 minutes', score: 2 },
      { value: 'quick', label: 'Under 15 minutes', score: 1 }
    ]
  },
  {
    id: 'frustration',
    question: 'How frustrating is this task?',
    icon: AlertTriangle,
    options: [
      { value: 'high', label: 'Very frustrating', score: 3 },
      { value: 'medium', label: 'Somewhat frustrating', score: 2 },
      { value: 'low', label: 'Not very frustrating', score: 1 }
    ]
  },
  {
    id: 'others',
    question: 'Would this help your teammates too?',
    icon: Users,
    options: [
      { value: 'team', label: 'Yes, the whole team', score: 3 },
      { value: 'some', label: 'A few people', score: 2 },
      { value: 'just-me', label: 'Just me', score: 1 }
    ]
  }
];

const goodForFirstBuild = [
  'Has a clear, single purpose',
  'Takes data in and shows data out',
  'Doesn\'t need complex integrations',
  'You understand the problem deeply',
  'You\'ll use it regularly'
];

const notGreatForFirstBuild = [
  'Requires real-time data from many sources',
  'Needs to integrate with external APIs',
  'Involves money/payments',
  'Has complex security requirements',
  'You\'re not sure what you want'
];

const toolOptions = [
  {
    id: 'fleet-dashboard',
    title: 'Fleet Health Dashboard',
    description: 'See all vehicle status at a glance with alerts',
    icon: Car,
    complexity: 'medium',
    timeValue: 'high'
  },
  {
    id: 'response-helper',
    title: 'Customer Response Helper',
    description: 'Quick templates and suggestions for common questions',
    icon: MessageSquare,
    complexity: 'low',
    timeValue: 'high'
  },
  {
    id: 'maintenance-scheduler',
    title: 'Maintenance Tracker',
    description: 'Track and schedule maintenance by vehicle',
    icon: Wrench,
    complexity: 'medium',
    timeValue: 'medium'
  },
  {
    id: 'report-generator',
    title: 'Weekly Report Builder',
    description: 'Auto-compile data into formatted reports',
    icon: FileSpreadsheet,
    complexity: 'medium',
    timeValue: 'high'
  },
  {
    id: 'damage-processor',
    title: 'Damage Report Form',
    description: 'Structured form for documenting damage',
    icon: AlertTriangle,
    complexity: 'low',
    timeValue: 'medium'
  },
  {
    id: 'custom',
    title: 'Your Own Idea',
    description: 'Something specific to your needs',
    icon: Lightbulb,
    complexity: 'varies',
    timeValue: 'varies'
  }
];

function CriteriaQuestion({ criterion, value, onChange }) {
  const IconComponent = criterion.icon;

  return (
    <Card className="p-5 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <IconComponent className="w-5 h-5 text-purple-400" />
        </div>
        <h4 className="text-white font-medium">{criterion.question}</h4>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {criterion.options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 rounded-xl text-center transition-all ${
              value === option.value
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function ToolOptionCard({ tool, isSelected, onClick }) {
  const IconComponent = tool.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-5 cursor-pointer transition-all ${
          isSelected
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50'
            : 'hover:border-slate-600'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            isSelected ? 'bg-purple-500/30' : 'bg-slate-700/50'
          }`}>
            <IconComponent className={`w-6 h-6 ${isSelected ? 'text-purple-300' : 'text-slate-400'}`} />
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold mb-1 ${isSelected ? 'text-purple-300' : 'text-white'}`}>
              {tool.title}
            </h4>
            <p className="text-slate-400 text-sm">{tool.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                tool.complexity === 'low'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : tool.complexity === 'medium'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-slate-500/20 text-slate-400'
              }`}>
                {tool.complexity === 'varies' ? 'Complexity varies' : `${tool.complexity} complexity`}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                tool.timeValue === 'high'
                  ? 'bg-purple-500/20 text-purple-400'
                  : tool.timeValue === 'medium'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-slate-500/20 text-slate-400'
              }`}>
                {tool.timeValue === 'varies' ? 'Value varies' : `${tool.timeValue} time savings`}
              </span>
            </div>
          </div>
          {isSelected && (
            <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function ChoosingYourTool({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedTool, setSelectedTool] = useState(null);
  const [showDecision, setShowDecision] = useState(false);

  const handleAnswerChange = (criterionId, value) => {
    setAnswers(prev => ({ ...prev, [criterionId]: value }));
  };

  const allQuestionsAnswered = selectionCriteria.every(c => answers[c.id]);

  const getScore = () => {
    let total = 0;
    selectionCriteria.forEach(criterion => {
      const answer = answers[criterion.id];
      const option = criterion.options.find(o => o.value === answer);
      if (option) total += option.score;
    });
    return total;
  };

  const getRecommendation = () => {
    const score = getScore();
    if (score >= 10) return { text: 'This looks like a great first project!', color: 'emerald' };
    if (score >= 7) return { text: 'This could work well for a first project.', color: 'cyan' };
    return { text: 'Consider starting with something simpler.', color: 'amber' };
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Choose <span className="text-cyan-400">Your Tool</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Let's evaluate your options and pick the best tool for your first build.
        </p>
      </motion.div>

      {/* Good vs Not Great */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-emerald-300">Good for First Build</h3>
          </div>
          <ul className="space-y-2">
            {goodForFirstBuild.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-red-300">Save for Later</h3>
          </div>
          <ul className="space-y-2">
            {notGreatForFirstBuild.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Decision Helper */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Scale className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Decision Helper</h2>
        </div>

        <p className="text-slate-400 mb-6">
          Think about the task you want to automate and answer these questions:
        </p>

        {selectionCriteria.map(criterion => (
          <CriteriaQuestion
            key={criterion.id}
            criterion={criterion}
            value={answers[criterion.id]}
            onChange={(value) => handleAnswerChange(criterion.id, value)}
          />
        ))}

        {allQuestionsAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-5 bg-gradient-to-r ${
              getRecommendation().color === 'emerald'
                ? 'from-emerald-900/30 to-green-900/30 border-emerald-500/30'
                : getRecommendation().color === 'cyan'
                ? 'from-cyan-900/30 to-blue-900/30 border-cyan-500/30'
                : 'from-amber-900/30 to-orange-900/30 border-amber-500/30'
            }`}>
              <div className="flex items-center gap-3">
                <Zap className={`w-6 h-6 ${
                  getRecommendation().color === 'emerald'
                    ? 'text-emerald-400'
                    : getRecommendation().color === 'cyan'
                    ? 'text-cyan-400'
                    : 'text-amber-400'
                }`} />
                <div>
                  <p className="text-white font-medium">{getRecommendation().text}</p>
                  <p className="text-slate-400 text-sm">Score: {getScore()}/12</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Tool Selection */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Select Your Tool</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolOptions.map(tool => (
            <ToolOptionCard
              key={tool.id}
              tool={tool}
              isSelected={selectedTool === tool.id}
              onClick={() => setSelectedTool(tool.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Key Insight */}
      {selectedTool && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Great Choice!
                </h3>
                <p className="text-slate-300">
                  Now let's turn this idea into a complete specification. In the next section,
                  you'll fill out a detailed template that covers everything AI needs to know
                  to build your tool. Take your time - this document is the blueprint.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Continue Button */}
      {selectedTool && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
          >
            Continue to Specification Workshop
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default ChoosingYourTool;
