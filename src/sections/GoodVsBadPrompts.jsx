import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comparisonExamples = [
  {
    id: 1,
    title: "Customer Email",
    bad: "Write an email to a customer",
    good: "Write a friendly email in Dutch to customer Pieter who asked when his subscription renews. His Plus subscription (€29/month) renews on the 15th. Include that he can manage this in the app. Sign off as 'Team Vloto'. Keep it under 100 words.",
    annotations: [
      { label: "Language", detail: "Specified Dutch" },
      { label: "Tone", detail: "Friendly" },
      { label: "Context", detail: "Customer name, subscription type, renewal date" },
      { label: "Action items", detail: "Include app management info" },
      { label: "Constraints", detail: "Under 100 words, specific sign-off" }
    ]
  },
  {
    id: 2,
    title: "Problem Solving",
    bad: "A car has a problem, what do I do?",
    good: "A customer reported that Vloto car NL-456-XX (Renault Zoe) won't start. The app shows 45% battery. The car is at Centraal Station parking P3. What are the most likely issues and what steps should I take to troubleshoot remotely before sending a technician?",
    annotations: [
      { label: "Specific vehicle", detail: "License plate and model" },
      { label: "Current data", detail: "Battery level from app" },
      { label: "Location", detail: "Exact parking location" },
      { label: "Goal", detail: "Troubleshoot before sending technician" },
      { label: "Format", detail: "Likely issues + steps" }
    ]
  },
  {
    id: 3,
    title: "Data Analysis",
    bad: "Analyze our data",
    good: "Analyze our January booking data (attached). I need to know: 1) Peak booking hours, 2) Most popular pickup locations, 3) Average booking duration, 4) Any cars with unusually low usage. Present findings in a summary with bullet points, then a detailed breakdown.",
    annotations: [
      { label: "Timeframe", detail: "January data" },
      { label: "Specific metrics", detail: "4 clear questions" },
      { label: "Priority order", detail: "Numbered list" },
      { label: "Output format", detail: "Summary + detailed breakdown" },
      { label: "Anomaly detection", detail: "Unusual patterns flagged" }
    ]
  },
  {
    id: 4,
    title: "Content Creation",
    bad: "Write a social media post",
    good: "Write an Instagram post announcing our new family car (Volkswagen ID.4) joining the Amsterdam fleet. Tone: excited but not over-the-top. Include emojis. Mention it fits 5 people and has 400km range. Add relevant hashtags. Target audience: young families in Amsterdam. Max 150 characters for the main text.",
    annotations: [
      { label: "Platform", detail: "Instagram" },
      { label: "Product details", detail: "VW ID.4, capacity, range" },
      { label: "Tone guide", detail: "Excited but balanced" },
      { label: "Audience", detail: "Young families in Amsterdam" },
      { label: "Constraints", detail: "150 chars, include emojis/hashtags" }
    ]
  },
  {
    id: 5,
    title: "Process Documentation",
    bad: "Document our process",
    good: "Create a step-by-step guide for handling a customer damage report. Include: 1) Initial customer contact script, 2) Information to collect (photos, damage description, location), 3) Internal escalation path, 4) Timeline promises we can make. Format as a numbered checklist that new team members can follow.",
    annotations: [
      { label: "Specific process", detail: "Damage report handling" },
      { label: "Components", detail: "4 clear sections defined" },
      { label: "Practical elements", detail: "Scripts, checklists" },
      { label: "Audience", detail: "New team members" },
      { label: "Format", detail: "Numbered checklist" }
    ]
  },
  {
    id: 6,
    title: "Translation",
    bad: "Translate this to Dutch",
    good: "Translate this customer announcement to Dutch. Keep it informal (use 'je' not 'u'). The tone should match our brand: friendly, modern, slightly playful. If any English terms are commonly used in Dutch (like 'app'), keep them.",
    annotations: [
      { label: "Formality", detail: "Informal - 'je' not 'u'" },
      { label: "Brand voice", detail: "Friendly, modern, playful" },
      { label: "Technical terms", detail: "Keep common English words" },
      { label: "Cultural context", detail: "Dutch language conventions" },
      { label: "Consistency", detail: "Match existing brand tone" }
    ]
  }
];

const ComparisonCard = ({ example, index }) => {
  const [showAnnotations, setShowAnnotations] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            {example.title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAnnotations(!showAnnotations)}
            className="px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400 transition-all duration-200"
          >
            {showAnnotations ? 'Hide Why' : 'See Why'}
          </motion.button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Bad Prompt Side */}
        <div className="p-6 bg-red-500/5 border-r border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-red-400">Vague Prompt</span>
          </div>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-slate-300 text-sm leading-relaxed italic">"{example.bad}"</p>
          </div>
        </div>

        {/* Good Prompt Side */}
        <div className="p-6 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-emerald-400">Detailed Prompt</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-slate-300 text-sm leading-relaxed italic">"{example.good}"</p>
          </div>
        </div>
      </div>

      {/* Annotations Panel */}
      <AnimatePresence>
        {showAnnotations && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border-t border-white/10">
              <p className="text-sm text-cyan-400 font-medium mb-3">What makes this prompt effective:</p>
              <div className="flex flex-wrap gap-2">
                {example.annotations.map((annotation, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative"
                  >
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-slate-300 hover:bg-white/15 transition-colors cursor-default">
                      {annotation.label}
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {annotation.detail}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GoodVsBadPrompts = ({ onComplete }) => {
  const [viewedCards, setViewedCards] = useState(new Set());

  const handleCardView = (id) => {
    setViewedCards(prev => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 mb-6"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-300">10 min section</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Spot the Difference</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Let's look at real examples and see what makes prompts effective
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="space-y-6 mb-12">
          {comparisonExamples.map((example, index) => (
            <div key={example.id} onMouseEnter={() => handleCardView(example.id)}>
              <ComparisonCard example={example} index={index} />
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 mb-8 gradient-border"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">The Pattern</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Good prompts include{' '}
                <span className="text-violet-400 font-semibold">WHO</span> you are,{' '}
                <span className="text-blue-400 font-semibold">WHAT</span> you need,{' '}
                <span className="text-cyan-400 font-semibold">WHY</span> it matters,{' '}
                <span className="text-emerald-400 font-semibold">HOW</span> you want it formatted,{' '}
                and any <span className="text-amber-400 font-semibold">CONSTRAINTS</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3"
          >
            Continue to Practice
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GoodVsBadPrompts;
