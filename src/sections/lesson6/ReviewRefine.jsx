import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Eye, ArrowRight, Lightbulb, FileText, RefreshCw } from 'lucide-react';
import { Card, Button } from '../../components/common';

const SPEC_STORAGE_KEY = 'vloto-ai-academy-tool-specification';

const checklistItems = [
  {
    id: 'clear-purpose',
    category: 'Clarity',
    question: 'Is the tool\'s purpose immediately clear from the overview?',
    tip: 'Someone unfamiliar with your work should understand what this tool does in one sentence.'
  },
  {
    id: 'specific-users',
    category: 'Users',
    question: 'Have you named specific roles who will use this?',
    tip: '"Operations staff" is okay, but "fleet coordinators who check vehicle status daily" is better.'
  },
  {
    id: 'pain-described',
    category: 'Problem',
    question: 'Does the problem statement explain WHY this task is painful?',
    tip: 'Don\'t just say what you do - explain the frustration, time wasted, or errors caused.'
  },
  {
    id: 'frontend-visual',
    category: 'Frontend',
    question: 'Can you picture what the screen looks like from your description?',
    tip: 'Include layout (sidebar? cards? table?), colors, and what appears where.'
  },
  {
    id: 'interactions-complete',
    category: 'Frontend',
    question: 'Have you listed every button, form, and filter?',
    tip: 'Think through the user journey: what do they click? What can they type or select?'
  },
  {
    id: 'logic-explained',
    category: 'Backend',
    question: 'Are your calculations and rules specific enough?',
    tip: 'Instead of "calculate health score", say "health score = (battery % + last check-in days) / 2".'
  },
  {
    id: 'data-complete',
    category: 'Database',
    question: 'Have you listed ALL the data fields you need?',
    tip: 'Go through your frontend - every piece of data shown needs to be stored somewhere.'
  },
  {
    id: 'edge-cases',
    category: 'Edge Cases',
    question: 'What happens when things go wrong?',
    tip: 'Missing data, duplicate entries, invalid inputs - how should the tool handle these?'
  },
  {
    id: 'success-measurable',
    category: 'Success',
    question: 'Can you measure whether the tool is successful?',
    tip: '"Saves time" is vague. "Reduces report creation from 2 hours to 15 minutes" is measurable.'
  }
];

const weakVsStrong = [
  {
    section: 'Tool Overview',
    weak: 'A dashboard for fleet stuff',
    strong: 'A real-time dashboard showing battery levels, maintenance status, and location for all 50 Vloto vehicles, with alerts for vehicles needing attention',
    problem: 'Too vague - doesn\'t explain what "fleet stuff" means'
  },
  {
    section: 'Frontend Description',
    weak: 'Shows vehicle information in a list',
    strong: 'A scrollable table with columns for: Vehicle ID, Make/Model, Battery %, Last Check-in (relative time like "2 hours ago"), and Status Badge (green/yellow/red). Clicking a row opens a detail panel on the right side.',
    problem: 'No visual details - what information? What layout?'
  },
  {
    section: 'Backend Logic',
    weak: 'Calculate which vehicles need attention',
    strong: 'Vehicle needs attention (yellow status) if: battery < 30% OR last check-in > 24 hours. Vehicle is critical (red status) if: battery < 15% OR last check-in > 48 hours.',
    problem: 'No specific rules - AI can\'t guess your thresholds'
  },
  {
    section: 'Success Criteria',
    weak: 'Tool should be easy to use and helpful',
    strong: 'Must-have: View all vehicles at a glance, filter by status, see vehicle details. Success = team checks dashboard instead of calling each other for vehicle status (save ~30 mins/day per person).',
    problem: 'Subjective terms like "easy" and "helpful" aren\'t testable'
  }
];

function ChecklistItem({ item, isChecked, onToggle }) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isChecked
          ? 'bg-emerald-900/20 border-emerald-500/30'
          : 'hover:border-slate-600'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className={`p-1 rounded-lg ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
          {isChecked ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <div className="w-6 h-6 rounded-lg border-2 border-slate-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-white font-medium mb-1">{item.question}</p>
          <p className="text-slate-500 text-sm">{item.tip}</p>
          <span className="inline-block mt-2 px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
            {item.category}
          </span>
        </div>
      </div>
    </Card>
  );
}

function WeakVsStrongExample({ example, index }) {
  const [showStrong, setShowStrong] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">
            {example.section}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weak Example */}
          <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">Weak</span>
            </div>
            <p className="text-slate-300 text-sm italic">"{example.weak}"</p>
            <p className="text-red-400/80 text-xs mt-2">{example.problem}</p>
          </div>

          {/* Strong Example */}
          <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Strong</span>
            </div>
            {showStrong ? (
              <p className="text-slate-300 text-sm italic">"{example.strong}"</p>
            ) : (
              <button
                onClick={() => setShowStrong(true)}
                className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> Click to reveal
              </button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ReviewRefine({ onComplete }) {
  const [checklist, setChecklist] = useState({});
  const [specData, setSpecData] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SPEC_STORAGE_KEY);
      if (saved) {
        setSpecData(JSON.parse(saved));
      }
    } catch {
      console.error('Error loading specification');
    }
  }, []);

  const handleToggle = (itemId) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalItems = checklistItems.length;
  const allChecked = checkedCount === totalItems;

  const hasSpec = specData.overview?.name || specData.overview?.purpose;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Review & <span className="text-purple-400">Refine</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Before we move on, let's make sure your specification is as clear and complete
          as possible. Use this checklist to review your work.
        </p>
      </motion.div>

      {/* Spec Summary */}
      {hasSpec && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {specData.overview?.name || 'Your Tool'}
                </h3>
                <p className="text-slate-400 text-sm">
                  {specData.overview?.purpose || 'No purpose defined yet'}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.history.back()}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                Edit Spec
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Weak vs Strong Examples */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Weak vs Strong Examples</h2>
        </div>

        <p className="text-slate-400 mb-6">
          See the difference between vague descriptions and ones that give AI exactly
          what it needs. Compare your specification to these examples.
        </p>

        {weakVsStrong.map((example, index) => (
          <WeakVsStrongExample key={example.section} example={example} index={index} />
        ))}
      </motion.div>

      {/* Quality Checklist */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Quality Checklist</h2>
          </div>
          <span className="text-slate-400">
            {checkedCount}/{totalItems} checked
          </span>
        </div>

        <p className="text-slate-400 mb-6">
          Review your specification against each criterion. Check the box when you're
          confident your spec addresses this point.
        </p>

        <div className="space-y-3">
          {checklistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <ChecklistItem
                item={item}
                isChecked={checklist[item.id] || false}
                onToggle={() => handleToggle(item.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Completion Message */}
      {allChecked && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-6 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-500/30 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-300 mb-2">
              Your Specification Looks Great!
            </h3>
            <p className="text-slate-300">
              You've reviewed all the key quality criteria. Your specification is ready
              for the next step: understanding the implementation path.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Key Insight */}
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
                Remember: You Can Always Iterate
              </h3>
              <p className="text-slate-300">
                Your specification doesn't need to be perfect. The best approach is to
                start building, see what works, and refine based on what you learn.
                A good-enough spec that gets built is better than a perfect spec that never
                gets started.
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
          Continue to Implementation Path
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default ReviewRefine;
