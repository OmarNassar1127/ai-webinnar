import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, Repeat, FileSpreadsheet, Users, MessageSquare, Car, Wrench, Lightbulb, ArrowRight, Star, Zap } from 'lucide-react';
import { Card, Button } from '../../components/common';

const painPointTasks = [
  {
    id: 'manual-reports',
    task: 'Creating weekly reports from multiple spreadsheets',
    icon: FileSpreadsheet,
    category: 'Data Work'
  },
  {
    id: 'customer-responses',
    task: 'Responding to similar customer questions repeatedly',
    icon: MessageSquare,
    category: 'Communication'
  },
  {
    id: 'fleet-tracking',
    task: 'Manually checking car availability and status',
    icon: Car,
    category: 'Fleet Management'
  },
  {
    id: 'maintenance-scheduling',
    task: 'Scheduling and tracking maintenance tasks',
    icon: Wrench,
    category: 'Maintenance'
  },
  {
    id: 'data-cleanup',
    task: 'Cleaning up and organizing messy data',
    icon: FileSpreadsheet,
    category: 'Data Work'
  },
  {
    id: 'partner-comms',
    task: 'Sending status updates to partners',
    icon: Users,
    category: 'Communication'
  },
  {
    id: 'damage-processing',
    task: 'Processing damage reports and documentation',
    icon: AlertTriangle,
    category: 'Fleet Management'
  },
  {
    id: 'time-tracking',
    task: 'Tracking time spent on various tasks',
    icon: Clock,
    category: 'Admin'
  }
];

const toolIdeas = [
  {
    id: 'fleet-dashboard',
    title: 'Fleet Health Dashboard',
    description: 'Real-time view of all vehicles with alerts for issues',
    forPainPoints: ['fleet-tracking', 'maintenance-scheduling'],
    icon: Car,
    color: 'purple'
  },
  {
    id: 'response-helper',
    title: 'Customer Response Helper',
    description: 'AI-powered suggestions for common customer questions',
    forPainPoints: ['customer-responses'],
    icon: MessageSquare,
    color: 'cyan'
  },
  {
    id: 'maintenance-scheduler',
    title: 'Smart Maintenance Scheduler',
    description: 'Automated scheduling based on mileage and time',
    forPainPoints: ['maintenance-scheduling', 'fleet-tracking'],
    icon: Wrench,
    color: 'emerald'
  },
  {
    id: 'report-generator',
    title: 'Weekly Report Generator',
    description: 'Automatically compile data into formatted reports',
    forPainPoints: ['manual-reports', 'data-cleanup'],
    icon: FileSpreadsheet,
    color: 'orange'
  },
  {
    id: 'damage-processor',
    title: 'Damage Report Processor',
    description: 'Streamlined damage documentation and tracking',
    forPainPoints: ['damage-processing'],
    icon: AlertTriangle,
    color: 'pink'
  },
  {
    id: 'partner-templates',
    title: 'Partner Communication Templates',
    description: 'Quick status updates with auto-filled data',
    forPainPoints: ['partner-comms'],
    icon: Users,
    color: 'blue'
  }
];

function RatingSlider({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-400 text-sm w-24 shrink-0">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              value >= rating
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
      <span className="text-slate-500 text-xs w-16 text-right">
        {value === 1 && 'Not painful'}
        {value === 2 && 'Minor'}
        {value === 3 && 'Moderate'}
        {value === 4 && 'Painful'}
        {value === 5 && 'Very painful'}
      </span>
    </div>
  );
}

function PainPointCard({ task, rating, onRatingChange, index }) {
  const IconComponent = task.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-4 mb-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-700/50">
              <IconComponent className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{task.task}</p>
              <p className="text-slate-500 text-xs">{task.category}</p>
            </div>
          </div>
          <RatingSlider
            value={rating}
            onChange={onRatingChange}
            label="Pain level:"
          />
        </div>
      </Card>
    </motion.div>
  );
}

function ToolIdeaCard({ idea, isRecommended, onClick }) {
  const IconComponent = idea.icon;
  const colorClasses = {
    purple: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
    cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
    emerald: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    pink: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
    blue: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-5 cursor-pointer relative overflow-hidden transition-all ${
          isRecommended ? `bg-gradient-to-br ${colorClasses[idea.color]}` : ''
        }`}
        onClick={onClick}
      >
        {isRecommended && (
          <div className="absolute top-2 right-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </motion.div>
          </div>
        )}

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[idea.color].split(' ')[0]} ${colorClasses[idea.color].split(' ')[1]}`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-white mb-1">{idea.title}</h4>
            <p className="text-slate-400 text-sm">{idea.description}</p>
            {isRecommended && (
              <p className="text-amber-400 text-xs mt-2 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Recommended based on your ratings
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function OperationsPainPoints({ onComplete }) {
  const [ratings, setRatings] = useState({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleRatingChange = (taskId, rating) => {
    setRatings(prev => ({ ...prev, [taskId]: rating }));
  };

  const getRecommendedTools = () => {
    // Find the highest-rated pain points
    const sortedPainPoints = Object.entries(ratings)
      .filter(([, rating]) => rating >= 4)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    // Find tools that address those pain points
    return toolIdeas.filter(tool =>
      tool.forPainPoints.some(painPoint => sortedPainPoints.includes(painPoint))
    );
  };

  const recommendedTools = getRecommendedTools();
  const hasEnoughRatings = Object.keys(ratings).length >= 4;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Find Your <span className="text-purple-400">Biggest Pain Points</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Rate how painful each task is in your daily work. We'll use this to suggest
          the best tool for you to build.
        </p>
      </motion.div>

      {/* Pain Point Rating Section */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <AlertTriangle className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Rate Your Pain Points</h2>
        </div>

        <Card className="p-6">
          <p className="text-slate-400 mb-6 text-sm">
            Rate each task from 1 (not painful) to 5 (very painful). Think about time
            spent, frustration level, and repetitiveness.
          </p>

          {painPointTasks.map((task, index) => (
            <PainPointCard
              key={task.id}
              task={task}
              rating={ratings[task.id] || 0}
              onRatingChange={(rating) => handleRatingChange(task.id, rating)}
              index={index}
            />
          ))}

          {hasEnoughRatings && !showRecommendations && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="primary"
                onClick={() => setShowRecommendations(true)}
              >
                See Tool Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Tool Recommendations */}
      <AnimatePresence>
        {showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Lightbulb className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Tool Ideas for You</h2>
            </div>

            {recommendedTools.length > 0 && (
              <div className="mb-4">
                <p className="text-amber-400 text-sm mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400" />
                  Based on your ratings, these tools would help the most:
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {toolIdeas.map(idea => (
                <ToolIdeaCard
                  key={idea.id}
                  idea={idea}
                  isRecommended={recommendedTools.some(r => r.id === idea.id)}
                  onClick={() => setSelectedTool(idea.id)}
                />
              ))}
            </div>

            {/* Key Insight */}
            <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-8 h-8 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    The Best Tool to Build
                  </h3>
                  <p className="text-slate-300">
                    Start with the tool that addresses your biggest pain point. A tool
                    you'll actually use is worth 10 tools you won't. In the next section,
                    we'll help you choose the right one for your first build.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {showRecommendations && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
          >
            Continue to Choose Your Tool
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default OperationsPainPoints;
