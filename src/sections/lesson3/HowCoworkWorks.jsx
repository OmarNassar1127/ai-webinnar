import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  User,
  Brain,
  FileCheck,
  Shield,
  Plug,
  Users,
  Building,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  FolderOpen,
  GitBranch,
  FileSpreadsheet,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { Button, Card } from '../../components/common';

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const THREE_STEPS = [
  {
    id: 1,
    icon: User,
    label: 'You Describe',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    description: 'Tell Cowork what you need in plain language',
  },
  {
    id: 2,
    icon: Brain,
    label: 'Cowork Plans & Executes',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Breaks task into steps, runs them in a sandboxed VM',
  },
  {
    id: 3,
    icon: FileCheck,
    label: 'You Get Results',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    description: 'Finished files appear on your computer',
  },
];

const ARCH_CARDS = [
  {
    id: 'sandbox',
    icon: Shield,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-900/40 to-violet-800/20',
    borderColor: 'border-purple-500/40',
    title: 'The Sandbox',
    subtitle: 'Security',
    analogy: 'A Safe Workshop',
    simple:
      'Cowork runs in a virtual computer inside your computer. It can only access the folder you share with it — nothing else.',
    whyItMatters:
      'Your personal files, passwords, and other data are completely isolated.',
  },
  {
    id: 'mcp',
    icon: Plug,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-900/40 to-blue-800/20',
    borderColor: 'border-cyan-500/40',
    title: 'MCP Connections',
    subtitle: 'Integrations',
    analogy: 'Universal Adapters',
    simple:
      'MCP lets Cowork talk to other tools — Gmail, Google Drive, DocuSign, and more. Each connection is like plugging in a new adapter.',
    whyItMatters:
      'You can pull data from email, update documents on Drive, or send contracts via DocuSign — all from one conversation.',
  },
  {
    id: 'subagents',
    icon: Users,
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-900/40 to-green-800/20',
    borderColor: 'border-emerald-500/40',
    title: 'Sub-Agents',
    subtitle: 'Parallel Work',
    analogy: 'A Team of Assistants',
    simple:
      'For complex tasks, Cowork splits the work and runs multiple mini-agents simultaneously — like having a team working in parallel.',
    whyItMatters:
      'A task that would take you 4 hours of sequential work gets done in minutes because Cowork processes everything at once.',
  },
  {
    id: 'plugins',
    icon: Building,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-900/40 to-amber-800/20',
    borderColor: 'border-orange-500/40',
    title: 'Enterprise Plugins',
    subtitle: 'Feb 2026',
    analogy: 'Company App Store',
    simple:
      "Organizations can create their own plugins — custom connections to company-specific tools, templates, and workflows.",
    whyItMatters:
      'Vloto could build custom Cowork plugins for fleet management, partner communications, and operational reporting.',
  },
];

const WORKFLOW_STEPS = [
  {
    id: 1,
    actor: 'You',
    actorColor: 'purple',
    icon: MessageSquare,
    text: 'Compare these 3 vendor proposals and recommend the best one',
    detail: 'A single plain-language instruction kicks everything off',
  },
  {
    id: 2,
    actor: 'Cowork',
    actorColor: 'cyan',
    icon: FolderOpen,
    text: 'Reads all 3 PDF files from your shared folder',
    detail: 'Sandbox access — only files you explicitly shared',
  },
  {
    id: 3,
    actor: 'Sub-Agents',
    actorColor: 'emerald',
    icon: GitBranch,
    text: 'Analyzes each proposal in parallel (price, terms, SLA)',
    detail: 'Three mini-agents run simultaneously, cutting time by 3x',
  },
  {
    id: 4,
    actor: 'Cowork',
    actorColor: 'cyan',
    icon: FileSpreadsheet,
    text: 'Creates comparison matrix in Excel with formulas',
    detail: 'File written directly into your shared folder',
  },
  {
    id: 5,
    actor: 'Cowork',
    actorColor: 'cyan',
    icon: FileText,
    text: 'Writes executive summary as a separate document',
    detail: 'Formatted, professional, ready to paste into an email',
  },
  {
    id: 6,
    actor: 'Result',
    actorColor: 'green',
    icon: CheckCircle,
    text: 'Two new files on your desktop — ready to present',
    detail: 'Total time: minutes, not hours',
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Animated 3-step visual with a connecting progress line */
const SimpleExplanation = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % THREE_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const progressPct = ((activeStep + 1) / THREE_STEPS.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="text-lg font-semibold text-slate-400 mb-8 text-center">
        The Simple Explanation
      </h2>

      {/* Progress connector */}
      <div className="relative">
        <div className="absolute top-10 left-[12%] right-[12%] h-1 bg-slate-700 rounded-full hidden md:block">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-4">
          {THREE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <motion.div
                key={step.id}
                className="flex-1 flex flex-col items-center text-center cursor-pointer"
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.04 }}
              >
                {/* Icon circle */}
                <motion.div
                  className={`
                    relative z-10 w-20 h-20 rounded-full flex items-center justify-center
                    border-2 transition-all duration-400
                    ${isActive || isPast
                      ? `bg-gradient-to-br ${step.gradient} border-transparent shadow-lg`
                      : 'bg-slate-800 border-slate-600'
                    }
                  `}
                  animate={{ scale: isActive ? [1, 1.12, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                >
                  <Icon className={`w-9 h-9 ${isActive || isPast ? 'text-white' : 'text-slate-500'}`} />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step number badge */}
                <div className={`
                  mt-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                  ${isActive ? `bg-gradient-to-r ${step.gradient} text-white` : 'bg-slate-700 text-slate-400'}
                `}>
                  Step {step.id}
                </div>

                <h3 className={`mt-2 font-semibold text-base ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {step.label}
                </h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      key={step.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2 text-sm text-slate-300 max-w-[200px]"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/** Single expandable architecture card */
const ArchCard = ({ data, index }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = data.icon;

  const glowMap = { purple: 'purple', cyan: 'cyan', emerald: 'green', orange: 'purple' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.12 }}
    >
      <Card
        glowColor={glowMap[data.color]}
        className="cursor-pointer h-full"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="space-y-3">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: expanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className={`p-3 rounded-xl bg-gradient-to-br ${data.gradient} shadow-lg flex-shrink-0`}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{data.title}</h3>
                <span className="text-xs text-slate-400 uppercase tracking-wider">{data.subtitle}</span>
              </div>
            </div>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </div>

          {/* Analogy badge */}
          <div className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
            bg-gradient-to-r ${data.bgGradient} border ${data.borderColor}
          `}>
            <span className="text-slate-300">Like:</span>
            <span className={`bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent font-semibold`}>
              {data.analogy}
            </span>
          </div>

          {/* Always-visible simple text */}
          <p className="text-sm text-slate-300 leading-relaxed">{data.simple}</p>

          {/* Expandable: why it matters */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`mt-2 p-4 rounded-xl bg-gradient-to-r ${data.bgGradient} border ${data.borderColor}`}>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 font-semibold">
                    Why it matters
                  </p>
                  <p className="text-sm text-white leading-relaxed">{data.whyItMatters}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-center text-slate-500 text-xs pt-1">Click to see why it matters</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

/** Auto-playing 6-step workflow visualization */
const WorkflowVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= WORKFLOW_STEPS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const restart = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  const actorColors = {
    purple: { dot: 'bg-purple-500', badge: 'bg-purple-900/60 border-purple-500/50 text-purple-300' },
    cyan: { dot: 'bg-cyan-500', badge: 'bg-cyan-900/60 border-cyan-500/50 text-cyan-300' },
    emerald: { dot: 'bg-emerald-500', badge: 'bg-emerald-900/60 border-emerald-500/50 text-emerald-300' },
    green: { dot: 'bg-green-500', badge: 'bg-green-900/60 border-green-500/50 text-green-300' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-slate-400">
          A Real Task, Step by Step
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restart}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-700/70 text-slate-300 hover:bg-slate-600/70 border border-slate-600/50 transition-colors"
        >
          Replay
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700 rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-full"
          animate={{ width: `${((activeStep + 1) / WORKFLOW_STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Step list */}
      <div className="space-y-3">
        {WORKFLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          const colors = actorColors[step.actorColor];

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{
                opacity: isPast || isActive ? 1 : 0.35,
                x: 0,
                scale: isActive ? 1.015 : 1,
              }}
              transition={{ duration: 0.4 }}
              onClick={() => { setActiveStep(index); setIsPlaying(false); }}
              className={`
                flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                ${isActive
                  ? 'bg-slate-800/80 border-slate-600/70 shadow-lg shadow-purple-500/10'
                  : isPast
                    ? 'bg-slate-800/40 border-slate-700/40'
                    : 'bg-slate-800/20 border-slate-700/20'
                }
              `}
            >
              {/* Step number / icon */}
              <div className={`
                flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-md'
                  : isPast
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-500'
                }
              `}>
                {isPast ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors.badge}`}>
                    {step.actor}
                  </span>
                </div>
                <p className={`text-sm font-medium leading-snug ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.text}
                </p>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-slate-400 mt-1 overflow-hidden"
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Active pulse dot */}
              {isActive && (
                <div className="flex-shrink-0 mt-1">
                  <motion.div
                    className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {activeStep === WORKFLOW_STEPS.length - 1 && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-center"
          >
            <p className="text-emerald-400 font-semibold text-sm">
              Task complete. Two deliverables produced — in minutes, not hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function HowCoworkWorks({ onComplete }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-14">

        {/* ── 1. Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          >
            <Cpu className="w-10 h-10 text-white" />
            {/* Orbiting ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            How{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Cowork Works
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            No engineering degree required. Let&apos;s demystify what actually happens
            when you give Cowork a task — explained through plain language and real analogies.
          </p>
        </motion.div>

        {/* ── 2. Simple Explanation (3-step flow) ── */}
        <AnimatePresence>
          {showContent && <SimpleExplanation />}
        </AnimatePresence>

        {/* ── 3. Under the Hood (2×2 expandable cards) ── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
                Under the Hood — Architecture Explained Simply
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ARCH_CARDS.map((card, index) => (
                  <ArchCard key={card.id} data={card} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4. Workflow Visualization ── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50"
            >
              <WorkflowVisualization />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. Key Insight Box ── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-cyan-900/40 border border-purple-500/40 p-8">
                {/* Subtle background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5" />

                <div className="relative space-y-5 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 uppercase tracking-wider">
                    Key Insight
                  </h3>

                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
                    You don&apos;t need to understand the technology. You just need to know that Cowork is{' '}
                    <span className="text-purple-400">secure</span>, can{' '}
                    <span className="text-cyan-400">connect to your tools</span>, and works like a{' '}
                    <span className="text-emerald-400">tireless assistant that never sleeps</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. Continue Button ── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onComplete}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="min-w-[200px]"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default HowCoworkWorks;
