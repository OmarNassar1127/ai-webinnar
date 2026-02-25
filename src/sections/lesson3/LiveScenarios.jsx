import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  MapPin,
  FileText,
  Users,
  ArrowRight,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Timer,
  TrendingDown,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Button, Card } from '../../components/common';

// ─── Scenario Data ────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: 1,
    title: 'Monday Morning Fleet Report',
    icon: BarChart3,
    color: 'purple',
    accentHex: '#7C3AED',
    glowClass: 'shadow-purple-500/30',
    borderClass: 'border-purple-500/40',
    bgClass: 'from-purple-900/40 to-violet-900/30',
    iconBgClass: 'from-purple-600 to-violet-600',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    situation:
      "It's Monday morning. Management wants a fleet utilisation report for last week.",
    withoutTime: '3 – 4 hours',
    withTime: '15 minutes',
    withoutSteps: [
      'Open 3 different systems (booking platform, fleet tracker, CRM)',
      'Export data from each as CSV',
      'Open Excel and merge data manually',
      'Create pivot tables and charts',
      'Format report and add commentary',
    ],
    withSteps: [
      'Tell Cowork: "Create a fleet utilisation report for last week. Include bookings per vehicle, zone heatmap, peak hours, and revenue breakdown."',
      'Cowork reads all data files automatically',
      'Formatted Excel with multiple tabs, charts, and executive summary delivered',
    ],
    prompt:
      '"Create a fleet utilisation report for last week. Include bookings per vehicle, zone heatmap, peak hours, and revenue breakdown."',
  },
  {
    id: 2,
    title: 'New City Expansion Analysis',
    icon: MapPin,
    color: 'cyan',
    accentHex: '#06B6D4',
    glowClass: 'shadow-cyan-500/30',
    borderClass: 'border-cyan-500/40',
    bgClass: 'from-cyan-900/40 to-blue-900/30',
    iconBgClass: 'from-cyan-600 to-blue-600',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    situation:
      'Vloto is considering expanding to Utrecht. You need a full analysis.',
    withoutTime: '2 – 3 days',
    withTime: '45 minutes',
    withoutSteps: [
      'Research population density data manually',
      'Check competitor presence on each platform',
      'Look up parking regulations for Utrecht',
      'Research EV charging infrastructure',
      'Analyse public transport gaps',
      'Compile everything into a presentation',
    ],
    withSteps: [
      'Tell Cowork: "Analyse Utrecht as a potential expansion city. Score it on population density, competition, EV infrastructure, parking regulations, and public transport gaps. Create a recommendation deck."',
      'Cowork researches all dimensions in parallel',
      'PowerPoint deck with data visualisations and scored recommendation delivered',
    ],
    prompt:
      '"Analyse Utrecht as a potential expansion city. Score it on population density, competition, EV infrastructure, parking regulations, and public transport gaps. Create a recommendation deck."',
  },
  {
    id: 3,
    title: 'Contract Comparison',
    icon: FileText,
    color: 'green',
    accentHex: '#10B981',
    glowClass: 'shadow-emerald-500/30',
    borderClass: 'border-emerald-500/40',
    bgClass: 'from-emerald-900/40 to-teal-900/30',
    iconBgClass: 'from-emerald-600 to-teal-600',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    situation: 'Three parking companies sent proposals. You need to compare them.',
    withoutTime: 'Full day',
    withTime: '20 minutes',
    withoutSteps: [
      'Read each 20+ page contract manually',
      'Create a comparison table in Word / Excel',
      'Highlight differences, risks, and unusual clauses',
      'Summarise findings for management',
    ],
    withSteps: [
      'Drop 3 PDFs into the shared folder',
      'Tell Cowork: "Compare these 3 parking proposals. Create a matrix with pricing, terms, SLA, pros/cons. Highlight risks and recommend the best option."',
      'Excel comparison matrix and 1-page summary doc delivered instantly',
    ],
    prompt:
      '"Compare these 3 parking proposals. Create a matrix with pricing, terms, SLA, pros/cons. Highlight risks and recommend the best option."',
  },
  {
    id: 4,
    title: 'Customer Churn Investigation',
    icon: Users,
    color: 'cyan',
    accentHex: '#F97316',
    glowClass: 'shadow-orange-500/30',
    borderClass: 'border-orange-500/40',
    bgClass: 'from-orange-900/40 to-amber-900/30',
    iconBgClass: 'from-orange-600 to-amber-600',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    situation: 'Customer retention has dropped 8% this quarter. Why?',
    withoutTime: '1 – 2 weeks',
    withTime: '30 minutes',
    withoutSteps: [
      'Pull user data from database (need analyst help)',
      'Wait for data team to run queries',
      'Analyse spreadsheets manually',
      'Look for patterns across large datasets',
    ],
    withSteps: [
      'Tell Cowork: "Analyse our customer data. Flag users at risk of churning, identify common patterns, and suggest 5 retention actions we can take this week."',
      'Cowork runs full analysis autonomously',
      'Report with churn segments, charts, and a prioritised action plan delivered',
    ],
    prompt:
      '"Analyse our customer data. Flag users at risk of churning, identify common patterns, and suggest 5 retention actions we can take this week."',
  },
];

// Time-saved guesses for the interactive element
const TIME_GUESSES = [
  { label: '5 min', value: 5 },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '60 min', value: 60 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Animated step list shown inside the Before / After panels.
 * Items stagger in with a slide + fade.
 */
function StepList({ steps, variant }) {
  const isWithout = variant === 'without';
  return (
    <ul className="space-y-2.5">
      {steps.map((step, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: isWithout ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
          className="flex items-start gap-3 text-sm leading-relaxed"
        >
          {isWithout ? (
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          <span className={isWithout ? 'text-gray-400' : 'text-gray-200'}>
            {step}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * Renders the "Before vs After" animated panel for a single scenario.
 * The two halves are shown side-by-side on md+ screens.
 */
function ScenarioPanel({ scenario, isActive }) {
  const Icon = scenario.icon;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Situation badge */}
          <div
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              border text-sm font-medium
              ${scenario.badgeClass}
            `}
          >
            <Icon className="w-4 h-4" />
            The Situation
          </div>

          <p className="text-lg text-gray-200 leading-relaxed italic">
            "{scenario.situation}"
          </p>

          {/* Before / After split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BEFORE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="rounded-2xl bg-red-950/40 border border-red-500/30 p-5 space-y-4"
            >
              {/* Panel header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-red-400 uppercase tracking-wider font-semibold">
                    Without Cowork
                  </p>
                  <p className="text-sm text-gray-300">The old way</p>
                </div>
              </div>

              <StepList steps={scenario.withoutSteps} variant="without" />

              {/* Time badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-red-500/20">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-300 font-semibold text-sm">
                  Time: {scenario.withoutTime}
                </span>
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className={`
                rounded-2xl border p-5 space-y-4
                bg-gradient-to-br ${scenario.bgClass} ${scenario.borderClass}
              `}
            >
              {/* Panel header */}
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    bg-gradient-to-br ${scenario.iconBgClass}
                  `}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: scenario.accentHex }}
                  >
                    With Cowork
                  </p>
                  <p className="text-sm text-gray-300">The new way</p>
                </div>
              </div>

              <StepList steps={scenario.withSteps} variant="with" />

              {/* Prompt preview */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Your prompt
                </p>
                <p className="text-sm text-cyan-300 font-mono leading-relaxed">
                  {scenario.prompt}
                </p>
              </div>

              {/* Time badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold text-sm">
                  Time: {scenario.withTime}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Tab row at the top — allows users to switch between the 4 scenarios.
 */
function ScenarioTabs({ scenarios, activeIndex, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {scenarios.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === activeIndex;
        return (
          <motion.button
            key={s.id}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              border transition-all duration-300
              ${isActive
                ? `bg-gradient-to-br ${s.iconBgClass} text-white ${s.borderClass} shadow-lg ${s.glowClass}`
                : 'bg-slate-800/60 text-gray-400 border-slate-700/60 hover:text-white hover:border-slate-500/60'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{s.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * "Guess the Time Saved" interactive mini-game for a single scenario.
 */
function TimeSavedGuess({ scenario, onGuessed }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // Parse the actual Cowork time to a number for comparison
  const actualMinutes = parseInt(scenario.withTime, 10);

  const handleGuess = (value) => {
    if (revealed) return;
    setSelected(value);
  };

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
    onGuessed && onGuessed();
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-gray-300 text-sm">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <span>
          Without Cowork this takes{' '}
          <span className="text-red-300 font-semibold">{scenario.withoutTime}</span>.
          How long with Cowork?
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TIME_GUESSES.map((g) => {
          const isSelected = selected === g.value;
          const isCorrect = revealed && Math.abs(g.value - actualMinutes) <= 5;
          const isWrong = revealed && isSelected && !isCorrect;

          return (
            <motion.button
              key={g.value}
              onClick={() => handleGuess(g.value)}
              whileHover={!revealed ? { scale: 1.05 } : {}}
              whileTap={!revealed ? { scale: 0.97 } : {}}
              className={`
                py-3 rounded-xl font-semibold text-sm border transition-all duration-300
                ${isCorrect
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                  : isWrong
                    ? 'bg-red-700/60 border-red-400 text-white'
                    : isSelected
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : 'bg-slate-700/60 border-slate-600/60 text-gray-300 hover:border-slate-400'
                }
              `}
            >
              {g.label}
            </motion.button>
          );
        })}
      </div>

      {!revealed ? (
        <motion.button
          onClick={handleReveal}
          disabled={selected === null}
          whileHover={selected !== null ? { scale: 1.03 } : {}}
          whileTap={selected !== null ? { scale: 0.97 } : {}}
          className={`
            w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300
            ${selected !== null
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg'
              : 'bg-slate-700/40 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Reveal Answer
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/40 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-300 font-semibold">
                  Answer: {scenario.withTime}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Down from {scenario.withoutTime} — that's an extraordinary time saving.
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              Try another guess
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * LiveScenarios — Lesson 3
 * Shows 4 interactive before/after Cowork scenarios with a time-saved guessing game.
 *
 * @param {{ onComplete: () => void }} props
 */
function LiveScenarios({ onComplete }) {
  const [showContent, setShowContent] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [guessedScenarios, setGuessedScenarios] = useState(new Set());

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, []);

  const activeScenario = SCENARIOS[activeScenarioIndex];

  const handlePrev = () =>
    setActiveScenarioIndex((i) => (i - 1 + SCENARIOS.length) % SCENARIOS.length);
  const handleNext = () =>
    setActiveScenarioIndex((i) => (i + 1) % SCENARIOS.length);

  const handleGuessed = () => {
    setGuessedScenarios((prev) => new Set(prev).add(activeScenarioIndex));
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-14">

        {/* ── 1. Header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Cowork{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See real transformations — the same work, done two different ways.
            Watch what changes when you have Cowork on your side.
          </p>
        </motion.div>

        {/* ── 2. Scenario Showcase ────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-8"
            >
              {/* Tabs */}
              <ScenarioTabs
                scenarios={SCENARIOS}
                activeIndex={activeScenarioIndex}
                onSelect={setActiveScenarioIndex}
              />

              {/* Active scenario card */}
              <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 min-h-[400px]">
                {/* Scenario header row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        bg-gradient-to-br ${activeScenario.iconBgClass}
                        shadow-lg ${activeScenario.glowClass}
                      `}
                    >
                      <activeScenario.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        Scenario {activeScenarioIndex + 1} of {SCENARIOS.length}
                      </p>
                      <h2 className="text-xl font-bold text-white">
                        {activeScenario.title}
                      </h2>
                    </div>
                  </div>

                  {/* Prev / Next arrows */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={handlePrev}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/60 flex items-center justify-center text-gray-300 hover:text-white hover:border-slate-400 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/60 flex items-center justify-center text-gray-300 hover:text-white hover:border-slate-400 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Scenario content */}
                <ScenarioPanel
                  scenario={activeScenario}
                  isActive
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 3. Interactive: Guess the Time Saved ────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card glowColor="cyan" className="space-y-6">
                {/* Section header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Guess the Time Saved
                    </h3>
                    <p className="text-sm text-gray-400">
                      Test your intuition for{' '}
                      <span className="text-cyan-400 font-medium">
                        {activeScenario.title}
                      </span>
                    </p>
                  </div>
                </div>

                <TimeSavedGuess
                  scenario={activeScenario}
                  onGuessed={handleGuessed}
                />

                {/* Progress across all 4 scenarios */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                    Scenarios explored
                  </p>
                  <div className="flex gap-2">
                    {SCENARIOS.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`
                          flex-1 h-2 rounded-full transition-all duration-500
                          ${guessedScenarios.has(i)
                            ? `bg-gradient-to-r ${s.iconBgClass}`
                            : 'bg-slate-700'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4. Impact Summary Card ───────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 p-8">
                {/* Decorative glow blobs */}
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Total Impact Across All 4 Scenarios
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Stat 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75 }}
                      className="text-center p-5 rounded-2xl bg-red-950/40 border border-red-500/30"
                    >
                      <p className="text-xs text-red-400 uppercase tracking-wider mb-2">
                        Old Way Total
                      </p>
                      <p className="text-4xl font-black text-red-300">5+</p>
                      <p className="text-sm text-gray-400 mt-1">days of work</p>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 }}
                      className="text-center p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30"
                    >
                      <p className="text-xs text-emerald-400 uppercase tracking-wider mb-2">
                        With Cowork
                      </p>
                      <p className="text-4xl font-black text-emerald-300">&lt;2</p>
                      <p className="text-sm text-gray-400 mt-1">hours total</p>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.95 }}
                      className="text-center p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border border-purple-500/30"
                    >
                      <p className="text-xs text-purple-400 uppercase tracking-wider mb-2">
                        Time Saved
                      </p>
                      <motion.p
                        className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        97%+
                      </motion.p>
                      <p className="text-sm text-gray-400 mt-1">efficiency gain</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. Key Insight Box ──────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-slate-800/60 to-cyan-900/40 border border-purple-500/30 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                <div className="relative flex flex-col items-center text-center gap-5">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-widest">
                    Key Insight
                  </h3>

                  <p className="text-2xl md:text-3xl text-white font-semibold leading-relaxed max-w-3xl">
                    Cowork doesn't just save time —{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      it changes what's possible.
                    </span>
                  </p>

                  <p className="text-lg text-gray-300 max-w-2xl">
                    Analysis that you&apos;d never have time to do can now happen{' '}
                    <span className="text-cyan-400 font-medium">every week</span>.
                    Decisions that used to wait days for a report can happen in{' '}
                    <span className="text-purple-400 font-medium">an afternoon</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. Continue Button ──────────────────────────────────────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center pb-8"
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

export default LiveScenarios;
