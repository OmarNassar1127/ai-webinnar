import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MonitorPlay,
  FolderOpen,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Star,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Circle,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// ─── Data ────────────────────────────────────────────────────────────────────

const FIRST_STEPS = [
  {
    icon: MonitorPlay,
    title: 'Open Claude Desktop app',
    detail: 'Available on macOS and Windows — download from claude.ai/download',
    color: '#7C3AED',
    bg: 'from-purple-500/20 to-violet-600/20',
    border: 'border-purple-500/30',
  },
  {
    icon: MessageSquare,
    title: 'Click the "Cowork" tab',
    detail: "It's separate from regular chat — look for the Cowork icon in the sidebar",
    color: '#3B82F6',
    bg: 'from-blue-500/20 to-blue-600/20',
    border: 'border-blue-500/30',
  },
  {
    icon: FolderOpen,
    title: 'Share a folder',
    detail: 'This is where Cowork reads and writes files — grant access to your working folder',
    color: '#06B6D4',
    bg: 'from-cyan-500/20 to-cyan-600/20',
    border: 'border-cyan-500/30',
  },
  {
    icon: MessageSquare,
    title: 'Describe your task in plain language',
    detail:
      'No code needed — just explain what you want as you would to a capable colleague',
    color: '#10B981',
    bg: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: CheckCircle2,
    title: 'Review the results and iterate',
    detail:
      'Check the output, give feedback, and refine — you stay in control the whole time',
    color: '#F59E0B',
    bg: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
  },
];

const PROMPT_TIPS = [
  {
    title: 'Be Specific About Output',
    icon: Star,
    bad: 'Analyze our fleet data',
    good: 'Create an Excel file with fleet utilization by vehicle for last week, including a chart showing peak hours and a summary tab',
    why: 'Cowork produces better results when it knows exactly what format you want',
    color: 'purple',
    badColor: '#EF4444',
    goodColor: '#10B981',
    border: 'border-purple-500/30',
    bg: 'from-purple-500/10 to-violet-600/10',
    iconColor: 'text-purple-400',
    iconBg: 'from-purple-500/20 to-violet-600/20',
  },
  {
    title: 'Give Business Context',
    icon: Building2,
    bad: 'Compare these contracts',
    good: 'Compare these 3 parking contracts for our Amsterdam expansion. We prioritize price and flexibility over long-term commitment. Flag any exclusivity clauses.',
    why: 'Your domain knowledge makes AI output actually useful',
    color: 'cyan',
    badColor: '#EF4444',
    goodColor: '#10B981',
    border: 'border-cyan-500/30',
    bg: 'from-cyan-500/10 to-blue-600/10',
    iconColor: 'text-cyan-400',
    iconBg: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    title: 'Start Small, Build Up',
    icon: Zap,
    bad: 'Redesign our entire operations workflow',
    good: 'Start with: Create a template for our weekly fleet report. Then iterate: add charts, add recommendations, add forecasting.',
    why: 'Iterating gets better results than one big prompt',
    color: 'green',
    badColor: '#EF4444',
    goodColor: '#10B981',
    border: 'border-emerald-500/30',
    bg: 'from-emerald-500/10 to-green-600/10',
    iconColor: 'text-emerald-400',
    iconBg: 'from-emerald-500/20 to-green-600/20',
  },
  {
    title: 'Review and Redirect',
    icon: MessageSquare,
    bad: 'Accepting first output without checking',
    good: 'This is good but the revenue column should exclude test rides. Also add a trend line to the bookings chart.',
    why: "You're the director — Cowork is the executor",
    color: 'purple',
    badColor: '#EF4444',
    goodColor: '#10B981',
    border: 'border-blue-500/30',
    bg: 'from-blue-500/10 to-indigo-600/10',
    iconColor: 'text-blue-400',
    iconBg: 'from-blue-500/20 to-indigo-600/20',
  },
];

const QUICK_WINS = [
  {
    id: 1,
    text: 'Upload a contract and ask for a summary with key terms highlighted',
  },
  {
    id: 2,
    text: 'Describe your weekly report and have Cowork create an Excel template',
  },
  {
    id: 3,
    text: 'Paste meeting notes and get action items with owners and deadlines',
  },
  {
    id: 4,
    text: 'Ask Cowork to draft an email to a municipality about parking partnerships',
  },
  {
    id: 5,
    text: 'Have Cowork analyze a month of booking data and create a dashboard',
  },
];

const PRICING_TIERS = [
  {
    name: 'Pro',
    price: '$20/mo',
    description: 'Basic Cowork access for individuals getting started',
    highlight: false,
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'from-purple-500/10 to-violet-600/10',
    badge: null,
  },
  {
    name: 'Max',
    price: '$100–200/mo',
    description: 'Extended usage limits for heavy users tackling complex workflows',
    highlight: true,
    color: 'text-cyan-400',
    border: 'border-cyan-500/50',
    bg: 'from-cyan-500/15 to-blue-600/15',
    badge: 'Heavy Users',
  },
  {
    name: 'Team',
    price: '$30/user/mo',
    subPrice: 'Premium Seat $125/user/mo',
    description: 'For the whole ops team — admin controls, shared context, usage visibility',
    highlight: false,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'from-emerald-500/10 to-green-600/10',
    badge: 'Recommended',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description:
      'Full control, private plugins, usage analytics, and dedicated support for large orgs',
    highlight: false,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'from-amber-500/10 to-orange-600/10',
    badge: null,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * Animated step row for "Your First 5 Minutes"
 */
function StepRow({ step, index, isVisible }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.45, delay: index * 0.12, type: 'spring', stiffness: 220 }}
      className={`
        flex items-start gap-4 p-4 rounded-xl
        bg-gradient-to-r ${step.bg}
        border ${step.border}
        backdrop-blur-sm
      `}
    >
      {/* Step number bubble */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md"
        style={{ backgroundColor: step.color }}
      >
        {index + 1}
      </div>

      {/* Icon */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${step.color}22`, border: `1px solid ${step.color}44` }}
      >
        <Icon style={{ color: step.color }} className="w-5 h-5" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-semibold text-white text-sm leading-snug">{step.title}</p>
        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{step.detail}</p>
      </div>
    </motion.div>
  );
}

/**
 * Bad vs Good prompt comparison card
 */
function PromptTipCard({ tip, index }) {
  const Icon = tip.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`
        rounded-2xl p-5
        bg-gradient-to-br ${tip.bg}
        border ${tip.border}
        backdrop-blur-sm
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tip.iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${tip.iconColor}`} />
        </div>
        <h3 className="font-semibold text-white text-sm">{tip.title}</h3>
      </div>

      {/* Bad prompt */}
      <div className="mb-3 rounded-xl p-3 bg-red-900/20 border border-red-500/20">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold leading-none">✕</span>
          </div>
          <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Too vague</span>
        </div>
        <p className="text-slate-300 text-sm italic leading-relaxed">"{tip.bad}"</p>
      </div>

      {/* Good prompt */}
      <div className="mb-3 rounded-xl p-3 bg-emerald-900/20 border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold leading-none">✓</span>
          </div>
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Specific & clear</span>
        </div>
        <p className="text-slate-300 text-sm italic leading-relaxed">"{tip.good}"</p>
      </div>

      {/* Why */}
      <div className="flex items-start gap-2 rounded-xl p-3 bg-slate-900/40">
        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-amber-400 font-semibold">Why: </span>
          {tip.why}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Interactive quick-win checklist item
 */
function QuickWinItem({ item, checked, onToggle, index }) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full text-left flex items-start gap-3 p-4 rounded-xl
        border transition-all duration-300 cursor-pointer
        ${checked
          ? 'bg-emerald-900/20 border-emerald-500/40'
          : 'bg-slate-800/50 border-white/10 hover:border-white/20'}
      `}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 mt-0.5">
        <AnimatePresence mode="wait">
          {checked ? (
            <motion.div
              key="checked"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </motion.div>
          ) : (
            <motion.div key="unchecked" initial={{ scale: 1 }} exit={{ scale: 0 }}>
              <Circle className="w-5 h-5 text-slate-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <span
        className={`text-sm leading-relaxed transition-colors duration-300 ${
          checked ? 'text-emerald-300 line-through decoration-emerald-500/50' : 'text-slate-300'
        }`}
      >
        {item.text}
      </span>
    </motion.button>
  );
}

/**
 * Single pricing tier card
 */
function PricingCard({ tier, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`
        relative rounded-2xl p-5
        bg-gradient-to-br ${tier.bg}
        border ${tier.border}
        backdrop-blur-sm
        ${tier.highlight ? 'ring-1 ring-cyan-500/40' : ''}
      `}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-2.5 left-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30">
            {tier.badge}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-white text-base">{tier.name}</h3>
        <div className="text-right flex-shrink-0">
          <p className={`font-bold text-sm ${tier.color}`}>{tier.price}</p>
          {tier.subPrice && (
            <p className="text-slate-500 text-xs mt-0.5">{tier.subPrice}</p>
          )}
        </div>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">{tier.description}</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * GettingStarted — Lesson 3 section
 *
 * Practical guide to getting started with Claude Cowork for Vloto ops staff.
 *
 * @param {{ onComplete: () => void }} props
 */
function GettingStarted({ onComplete }) {
  const [stepsVisible] = useState(true);
  const [checkedWins, setCheckedWins] = useState(new Set());

  function toggleWin(id) {
    setCheckedWins((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const allChecked = checkedWins.size === QUICK_WINS.length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

      {/* ── 1. Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 mb-6 border border-white/10"
        >
          <MonitorPlay className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Getting Started
          </span>
          <br />
          <span className="text-white text-3xl md:text-4xl font-semibold">with Cowork</span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          You don't need a technical background. If you can describe what you need, Cowork can
          do it. Here's how to take your first steps today.
        </motion.p>
      </motion.div>

      {/* ── 2. Your First 5 Minutes ───────────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-600/30 flex items-center justify-center border border-purple-500/30">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your First 5 Minutes</h2>
          </div>
          <p className="text-slate-400 text-sm ml-11">
            Follow these steps once and you'll be up and running.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FIRST_STEPS.map((step, i) => (
            <StepRow key={i} step={step} index={i} isVisible={stepsVisible} />
          ))}
        </div>
      </section>

      {/* ── 3. Prompting Tips for Ops ─────────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center border border-cyan-500/30">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Prompting Tips for Ops</h2>
          </div>
          <p className="text-slate-400 text-sm ml-11">
            The difference between a good result and a great one is how you ask.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {PROMPT_TIPS.map((tip, i) => (
            <PromptTipCard key={tip.title} tip={tip} index={i} />
          ))}
        </div>
      </section>

      {/* ── 4. What to Try This Week ─────────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-600/30 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">What to Try This Week</h2>
          </div>
          <p className="text-slate-400 text-sm ml-11">
            Five quick wins to build your confidence. Click each one when you've done it.
          </p>
        </motion.div>

        <div className="space-y-2 mb-4">
          {QUICK_WINS.map((item, i) => (
            <QuickWinItem
              key={item.id}
              item={item}
              index={i}
              checked={checkedWins.has(item.id)}
              onToggle={() => toggleWin(item.id)}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <AnimatePresence>
          {checkedWins.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className={`
                mt-3 p-3 rounded-xl text-center text-sm font-medium
                ${allChecked
                  ? 'bg-emerald-900/30 border border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800/50 border border-white/10 text-slate-400'}
              `}
            >
              {allChecked
                ? '🎉 All 5 complete — you\'re an AI-powered operator!'
                : `${checkedWins.size} of ${QUICK_WINS.length} completed — keep going!`}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 5. Pricing at a Glance ────────────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/30 flex items-center justify-center border border-amber-500/30">
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Pricing at a Glance</h2>
          </div>
          <p className="text-slate-400 text-sm ml-11">
            Pick the tier that fits your usage. Most ops teams start with Team.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* ── 6. Your Superpower Reminder ──────────────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-600/30 flex items-center justify-center border border-purple-500/30">
              <Star className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your Superpower Reminder</h2>
          </div>
        </motion.div>

        {/* Human-AI partnership visual */}
        <div className="grid md:grid-cols-3 gap-4 items-center">

          {/* YOU bring */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/15 to-violet-600/15 border border-purple-500/30 backdrop-blur-sm"
          >
            <div className="text-center mb-3">
              <div className="inline-flex w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 items-center justify-center mb-2 shadow-lg shadow-purple-500/30">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-purple-300 text-sm uppercase tracking-wider">YOU bring</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Domain knowledge',
                'Business context',
                'Quality judgment',
                'Final decisions',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow + Together */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-slate-500">
              <ArrowRight className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest">Together</span>
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="rounded-2xl p-4 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 backdrop-blur-sm text-center">
              <p className="text-cyan-300 font-semibold text-sm leading-relaxed">
                "You're not learning to code.<br />You're becoming an{' '}
                <span className="text-white font-bold">AI-powered operator.</span>"
              </p>
            </div>
          </motion.div>

          {/* COWORK brings */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-5 bg-gradient-to-br from-blue-500/15 to-cyan-600/15 border border-blue-500/30 backdrop-blur-sm"
          >
            <div className="text-center mb-3">
              <div className="inline-flex w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-blue-300 text-sm uppercase tracking-wider">COWORK brings</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Speed',
                'File access',
                'Parallel processing',
                'Tireless execution',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── 7. Key Insight Box ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-amber-900/30 border border-amber-500/30">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/8 to-orange-500/8 blur-xl pointer-events-none" />

          <div className="relative flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              <Star className="w-5 h-5 text-white" />
            </motion.div>

            <div>
              <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-wider mb-2">
                Key Insight
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The best Cowork users aren't the most technical — they're the ones who describe
                what they need most clearly.{' '}
                <strong className="text-white">
                  Your operational expertise IS the superpower.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 8. Continue Button ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center pt-2"
      >
        <motion.button
          onClick={onComplete}
          className="
            inline-flex items-center gap-3 px-8 py-4
            bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500
            hover:from-purple-500 hover:via-blue-500 hover:to-cyan-400
            rounded-2xl font-semibold text-white text-lg
            shadow-lg shadow-purple-500/30
            transition-colors duration-300
          "
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <CheckCircle2 className="w-5 h-5" />
          I'm Ready — Let's Continue
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        <p className="text-slate-500 text-sm mt-3">
          Section complete — great work!
        </p>
      </motion.div>

    </div>
  );
}

export default GettingStarted;
