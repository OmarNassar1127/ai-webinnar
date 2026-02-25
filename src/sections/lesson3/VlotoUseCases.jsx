import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Car,
  BarChart3,
  ClipboardList,
  Handshake,
  Search,
  Mail,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  Timer,
  ChevronRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CATEGORIES = [
  {
    id: 'contracts',
    icon: FileText,
    title: 'Contracts & SLAs',
    description: 'Turn legal complexity into clear, actionable documents instantly.',
    color: 'purple',
    accentHex: '#7C3AED',
    bgFrom: 'from-purple-500/20',
    bgTo: 'to-purple-700/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/20',
    useCases: [
      'Upload a contract → get risk analysis and unusual clauses highlighted',
      'Describe a partnership → get a full SLA draft ready to send',
      'Compare two contract versions → spot exactly what changed and why it matters',
      'Upload 3 vendor proposals → get a side-by-side matrix of pricing, terms, pros and cons',
      'Build a contract renewal calendar with renegotiation talking points per partner',
      'Extract key terms from a 50-page legal document in seconds',
      'Generate contract summaries for internal stakeholders who won\'t read the full doc',
      'Check if a new contract conflicts with any existing agreements',
      'Template library: NDA, partnership agreement, vendor contract, parking deal',
    ],
  },
  {
    id: 'fleet',
    icon: Car,
    title: 'Fleet & Expansion',
    description: 'Make smarter decisions about where to grow and how to optimise the fleet.',
    color: 'cyan',
    accentHex: '#06B6D4',
    bgFrom: 'from-cyan-500/20',
    bgTo: 'to-cyan-700/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/20',
    useCases: [
      'City expansion scoring: population density, competition, EV infrastructure, parking regulations, public transport gaps',
      'Fleet utilisation analysis: find underused vehicles, zones needing more cars, peak vs dead times',
      'Maintenance pattern predictions from historical service data',
      'Cleaning optimisation: quality scores, route planning, crew scheduling',
      'Ideal vehicle placement recommendations based on real booking patterns',
      'New location scouting: full criteria checklist, desk research, and scoring matrix',
      'Competitor fleet mapping: where are they, what vehicles do they run, what are they charging',
      'Demand forecasting by neighbourhood, day of week, and season',
      'Parking deal research per municipality with relevant contact information',
      'Charging infrastructure gap analysis across your operating zones',
      'Vehicle retirement recommendations based on age, maintenance costs, and utilisation rate',
    ],
  },
  {
    id: 'data',
    icon: BarChart3,
    title: 'Data & Reporting',
    description: 'Go from raw data to insight without needing a data analyst on call.',
    color: 'emerald',
    accentHex: '#10B981',
    bgFrom: 'from-emerald-500/20',
    bgTo: 'to-emerald-700/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20',
    useCases: [
      'Describe a query in plain Dutch → Cowork writes the SQL → runs on a copy database → returns results',
      'Instant charts and visualisations from raw CSV or database exports',
      'Anomaly detection: sudden booking drops, unexpected spikes, unusual user behaviour',
      'Churn risk flagging: identify users likely to stop, with reasons why',
      'First ride to repeat analysis: understand what converts new users into regulars',
      'Weekly ops dashboard generation — consistent format every Monday morning',
      'Monthly performance reports with trends, insights, and recommended actions',
      'Compare this month vs last month vs same period last year automatically',
      'Cohort analysis: how do January signups behave six months later vs June signups',
      'Revenue per vehicle, per zone, and per time slot breakdowns',
      'Customer lifetime value calculations across different user segments',
      'Cost-per-ride analysis with drill-down by region or vehicle type',
      'Utilisation heatmaps by hour, day of week, and location',
      'Seasonal pattern identification across multiple years of data',
      'Ad hoc quick question queries without waiting to submit a data ticket',
    ],
  },
  {
    id: 'process',
    icon: ClipboardList,
    title: 'Process & Documentation',
    description: 'Stop losing knowledge in people\'s heads. Capture it as structured documents.',
    color: 'orange',
    accentHex: '#F97316',
    bgFrom: 'from-orange-500/20',
    bgTo: 'to-orange-700/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/20',
    useCases: [
      'Describe a process verbally → get a full SOP with numbered steps, edge cases, and a checklist',
      'Meeting notes → action items with owners, deadlines, and priorities automatically assigned',
      'Runbook creation for any repeatable ops procedure',
      'Change request documentation with impact assessment and rollback plan',
      'Incident postmortem templates that prompt the right questions',
      'Onboarding documentation for new ops team members joining the company',
      'Knowledge base articles written from subject matter expert interviews',
      'Process improvement suggestions based on your current workflow description',
    ],
  },
  {
    id: 'vendors',
    icon: Handshake,
    title: 'Vendor & Partner Management',
    description: 'Negotiate smarter, manage better, and build stronger partnerships.',
    color: 'pink',
    accentHex: '#EC4899',
    bgFrom: 'from-pink-500/20',
    bgTo: 'to-pink-700/10',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
    badgeBg: 'bg-pink-500/20',
    useCases: [
      'Vendor evaluation scorecards tailored to each service category',
      'RFP generation for new services — full document ready to send',
      'Vendor performance tracking templates with the right KPIs pre-filled',
      'Price negotiation prep: market research, competitor pricing, and your leverage points',
      'Partner communication templates for every stage of the relationship',
      'Quarterly business review preparation with data slides and talking points',
      'Vendor consolidation analysis: where can we reduce suppliers and save cost',
    ],
  },
  {
    id: 'research',
    icon: Search,
    title: 'Research & Analysis',
    description: 'Get the intelligence you need to make confident strategic decisions.',
    color: 'violet',
    accentHex: '#8B5CF6',
    bgFrom: 'from-violet-500/20',
    bgTo: 'to-violet-700/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-400',
    badgeBg: 'bg-violet-500/20',
    useCases: [
      'Competitor scanning: LinkedIn posts, Google results, industry news, and job postings synthesised',
      'New expansion opportunities in high-density cities across the Netherlands',
      'Partnership possibility research with outreach strategy included',
      'Market trends in shared mobility — what\'s coming, what\'s peaking, what\'s dying',
      'Regulatory changes monitoring across Dutch municipalities',
      'Best practices from other markets and comparable mobility operators',
      'Industry report summaries: 40-page white papers condensed to one actionable page',
      'Grant and subsidy opportunities available to EV and shared mobility companies',
    ],
  },
  {
    id: 'communication',
    icon: Mail,
    title: 'Communication',
    description: 'Write better emails, faster — and never stare at a blank draft again.',
    color: 'blue',
    accentHex: '#3B82F6',
    bgFrom: 'from-blue-500/20',
    bgTo: 'to-blue-700/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/20',
    useCases: [
      'Draft emails to municipalities about parking partnerships in the right tone',
      'Follow-up templates for slow-responding partners at 1 week, 2 weeks, 1 month',
      'Internal updates for leadership that are concise and decision-oriented',
      'Stakeholder briefings prepared before meetings so you walk in confident',
      'Translate documents between Dutch and English while preserving tone',
      'Summarise long email threads so you can reply without reading 40 messages',
      'Prepare talking points and anticipated questions for partner calls',
      'Complaint response drafts that are firm, professional, and de-escalating',
    ],
  },
  {
    id: 'planning',
    icon: TrendingUp,
    title: 'Planning & Forecasting',
    description: 'Model the future before committing resources or budget.',
    color: 'teal',
    accentHex: '#14B8A6',
    bgFrom: 'from-teal-500/20',
    bgTo: 'to-teal-700/10',
    borderColor: 'border-teal-500/30',
    textColor: 'text-teal-400',
    badgeBg: 'bg-teal-500/20',
    useCases: [
      'Capacity planning: how many vehicles are needed per zone per quarter',
      'Budget impact analysis for proposed changes before they go to approval',
      'Scenario modelling: best case, worst case, and most likely outcomes side by side',
      'Resource allocation recommendations based on current utilisation patterns',
      'Project timeline drafts with milestones, dependencies, and owners',
      'Risk assessment for new city launches or service expansions',
      'Go / no-go decision frameworks built around your specific criteria',
    ],
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Compliance & Quality',
    description: 'Stay audit-ready and maintain quality standards without the manual grind.',
    color: 'amber',
    accentHex: '#F59E0B',
    bgFrom: 'from-amber-500/20',
    bgTo: 'to-amber-700/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20',
    useCases: [
      'Checklist generation for vehicle inspections at any level of detail',
      'Compliance documentation for insurance requirements and municipal permits',
      'Quality audit templates with scoring criteria built in',
      'Issue tracking and resolution documentation with root cause fields',
      'Safety protocol documentation for drivers and field teams',
      'Insurance claim preparation with the right evidence and narrative structure',
    ],
  },
  {
    id: 'daily',
    icon: Clock,
    title: 'Daily Operations',
    description: 'Reclaim your mornings. Get clarity on what matters most — right now.',
    color: 'rose',
    accentHex: '#F43F5E',
    bgFrom: 'from-rose-500/20',
    bgTo: 'to-rose-700/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/20',
    useCases: [
      'Morning briefing: what needs your attention today, ranked by urgency',
      'Priority sorting: which fires to fight first and which can wait',
      'Quick answers to "how are we doing on X" without digging through five systems',
      'Status updates that write themselves — no more blank page on a Friday afternoon',
      'Customer feedback analysis: recurring themes, trends, and suggested actions',
      'Support ticket categorisation and pattern identification across large volumes',
    ],
  },
];

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(target, duration = 1200, startOnMount = true) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnMount || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startOnMount]);

  return count;
}

// ---------------------------------------------------------------------------
// CategoryCard sub-component
// ---------------------------------------------------------------------------

function CategoryCard({ category, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`
        rounded-2xl border backdrop-blur-xl
        bg-slate-800/80 ${category.borderColor}
        overflow-hidden transition-shadow duration-300
        hover:shadow-lg
      `}
      style={{
        boxShadow: isOpen
          ? `0 0 32px -8px ${category.accentHex}44`
          : undefined,
      }}
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 p-5">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              bg-gradient-to-br ${category.bgFrom} ${category.bgTo}
            `}
          >
            <Icon className={`w-6 h-6 ${category.textColor}`} />
          </div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-semibold text-white text-base leading-tight">
                {category.title}
              </h3>
              <span
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${category.badgeBg} ${category.textColor}
                `}
              >
                {category.useCases.length} use cases
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 leading-snug">
              {category.description}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`flex-shrink-0 ${category.textColor}`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expandable use-case list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className={`
                mx-5 mb-5 pt-4 border-t ${category.borderColor}
              `}
            >
              <ul className="space-y-2.5">
                {category.useCases.map((useCase, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${category.textColor}`}
                    />
                    <span>{useCase}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CategoryCounter sub-component
// ---------------------------------------------------------------------------

function CategoryCounter() {
  const categoryCount = useAnimatedCounter(10, 1000);
  const useCaseCount = useAnimatedCounter(50, 1400);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center justify-center gap-3 flex-wrap"
    >
      {/* Pulsing dot */}
      <motion.span
        className="inline-block w-3 h-3 rounded-full bg-cyan-400"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="text-2xl font-bold text-white">
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {categoryCount}
        </span>
        <span className="text-slate-400 font-medium text-lg"> Categories</span>
      </span>
      <span className="text-slate-600 text-2xl font-light">•</span>
      <span className="text-2xl font-bold text-white">
        <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          {useCaseCount}+
        </span>
        <span className="text-slate-400 font-medium text-lg"> Use Cases</span>
      </span>
      <motion.span
        className="inline-block w-3 h-3 rounded-full bg-emerald-400"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TimeSavedBanner sub-component
// ---------------------------------------------------------------------------

const TIME_COMPARISONS = [
  {
    task: 'Contract risk review',
    before: '3–4 hours',
    after: '< 5 minutes',
    beforeColor: 'text-red-400',
    afterColor: 'text-emerald-400',
  },
  {
    task: 'Monthly ops report',
    before: '1–2 days',
    after: '30 minutes',
    beforeColor: 'text-red-400',
    afterColor: 'text-emerald-400',
  },
  {
    task: 'Vendor comparison matrix',
    before: '4–6 hours',
    after: '10 minutes',
    beforeColor: 'text-red-400',
    afterColor: 'text-emerald-400',
  },
  {
    task: 'SOP documentation',
    before: 'Half a day',
    after: '20 minutes',
    beforeColor: 'text-red-400',
    afterColor: 'text-emerald-400',
  },
  {
    task: 'City expansion research',
    before: '1 week',
    after: '2 hours',
    beforeColor: 'text-red-400',
    afterColor: 'text-emerald-400',
  },
];

function TimeSavedBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden border border-white/10"
    >
      {/* Banner header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <Timer className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-lg">Time Saved With Cowork</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Real task time comparisons — before and after Cowork.
        </p>
      </div>

      {/* Comparison grid */}
      <div className="bg-slate-800/60 backdrop-blur-xl divide-y divide-white/5">
        {/* Header row */}
        <div className="grid grid-cols-3 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>Task</span>
          <span className="text-center">Before Cowork</span>
          <span className="text-center">With Cowork</span>
        </div>

        {TIME_COMPARISONS.map((item, i) => (
          <motion.div
            key={item.task}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="grid grid-cols-3 px-6 py-4 items-center hover:bg-white/5 transition-colors duration-150"
          >
            <span className="text-sm text-slate-300 font-medium pr-4">{item.task}</span>
            <div className="flex items-center justify-center gap-2">
              <span className={`text-sm font-semibold ${item.beforeColor}`}>
                {item.before}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className={`text-sm font-bold ${item.afterColor}`}>
                {item.after}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer arrow label */}
      <div className="bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-emerald-600/20 px-6 py-4 border-t border-white/10 flex items-center justify-center gap-3">
        <span className="text-sm font-semibold text-red-400">Hours / Days</span>
        <ArrowRight className="w-5 h-5 text-slate-400" />
        <span className="text-sm font-bold text-emerald-400">Minutes</span>
        <span className="text-slate-500 mx-2">—</span>
        <span className="text-sm text-slate-300">
          That time goes back to you.
        </span>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// KeyInsightBox sub-component
// ---------------------------------------------------------------------------

function KeyInsightBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl p-[1px] bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500"
    >
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-cyan-300" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg mb-2">
            This Is Not a Future Promise
          </h3>
          <p className="text-slate-300 leading-relaxed">
            Every category above represents work you can do{' '}
            <strong className="text-white">today</strong> with Claude Cowork.
            These are not demos or experiments — they are real tasks that your
            colleagues are already using Cowork for. Every hour you spend doing
            these manually is an hour you could have back.{' '}
            <span className="text-cyan-300 font-semibold">
              Start with one category. See what happens.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function VlotoUseCases({ onComplete }) {
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandKey, setExpandKey] = useState(0);

  // We track an "expand-all" intent by remounting CategoryCards via key — but
  // individual state is inside each card, so we use a controlled approach:
  // pass an `forceOpen` prop derived from the toggle.

  const [forcedOpen, setForcedOpen] = useState(null); // null | true | false

  function handleExpandAll() {
    const next = !allExpanded;
    setAllExpanded(next);
    setForcedOpen(next);
    setExpandKey((k) => k + 1);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Header                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        {/* Icon cluster */}
        <motion.div
          className="relative w-24 h-24 mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-cyan-500/40 rounded-full blur-xl" />
          <div className="relative w-full h-full bg-slate-800/80 rounded-full flex items-center justify-center border border-purple-500/30">
            <Zap className="w-12 h-12 text-purple-400" />
          </div>
          {/* Orbiting dots */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? '#7C3AED' : '#06B6D4',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                x: Math.cos((i * Math.PI) / 3) * 42 + 42,
                y: Math.sin((i * Math.PI) / 3) * 42 + 42,
              }}
              transition={{
                opacity: { duration: 2.2, repeat: Infinity },
                delay: i * 0.18,
              }}
            />
          ))}
        </motion.div>

        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Cowork for Vloto Operations
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          50+ real ways Cowork transforms your daily work
        </p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Category counter                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Card className="!p-5">
        <CategoryCounter />
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Expand / collapse all toggle                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Explore All Categories
        </h2>
        <button
          onClick={handleExpandAll}
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-xl
            text-sm font-medium text-slate-300
            bg-slate-800/80 border border-white/10
            hover:border-purple-500/40 hover:text-white
            transition-all duration-200
          "
        >
          {allExpanded ? (
            <>
              <ChevronDown className="w-4 h-4 rotate-180" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand All
            </>
          )}
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Category cards                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4">
        {CATEGORIES.map((category, index) => (
          <ControlledCategoryCard
            key={`${category.id}-${expandKey}`}
            category={category}
            index={index}
            initialOpen={forcedOpen === true}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Time Saved banner                                                 */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          The Time You Get Back
        </h2>
        <TimeSavedBanner />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Key insight box                                                   */}
      {/* ------------------------------------------------------------------ */}
      <KeyInsightBox />

      {/* ------------------------------------------------------------------ */}
      {/* 6. Continue button                                                   */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center pt-4"
      >
        <Button
          size="lg"
          onClick={onComplete}
          icon={<ChevronRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Continue to Next Section
        </Button>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ControlledCategoryCard — wraps CategoryCard with a controlled initialOpen
// ---------------------------------------------------------------------------

function ControlledCategoryCard({ category, index, initialOpen }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`
        rounded-2xl border backdrop-blur-xl
        bg-slate-800/80 ${category.borderColor}
        overflow-hidden transition-shadow duration-300
      `}
      style={{
        boxShadow: isOpen
          ? `0 0 32px -8px ${category.accentHex}44`
          : undefined,
      }}
    >
      {/* Card header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 p-5">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              bg-gradient-to-br ${category.bgFrom} ${category.bgTo}
            `}
          >
            <Icon className={`w-6 h-6 ${category.textColor}`} />
          </div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-semibold text-white text-base leading-tight">
                {category.title}
              </h3>
              <span
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${category.badgeBg} ${category.textColor}
                `}
              >
                {category.useCases.length} use cases
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 leading-snug">
              {category.description}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`flex-shrink-0 ${category.textColor}`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expandable use-case list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className={`mx-5 mb-5 pt-4 border-t ${category.borderColor}`}
            >
              <ul className="space-y-2.5">
                {category.useCases.map((useCase, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${category.textColor}`}
                    />
                    <span>{useCase}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default VlotoUseCases;
