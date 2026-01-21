import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const exercises = [
  {
    id: 1,
    title: "The Angry Customer",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    situation: "Customer Jan emailed saying he was charged €45 but only drove 20km. He's angry and wants a refund.",
    hints: [
      "Who is the customer? (Name, history if relevant)",
      "What specifically happened? (Amount, distance, dates)",
      "What's the customer's emotional state?",
      "What outcome do you want? (Investigation, response, refund?)",
      "What tone should the response have?",
      "What information do you need AI to include?"
    ],
    expertPrompt: `Help me respond to an angry customer email. Here's the situation:

Customer: Jan (regular customer, 15+ trips this year)
Issue: Charged €45 for a trip where he only drove 20km
His expectation: Our pricing is €0.35/km + €2.50 booking fee, so he expected ~€9.50
His mood: Frustrated, demanding refund

I need to:
1. First, help me understand if there's a pricing error or if additional fees apply (parking, time-based charges, damage deposit?)
2. Draft a calm, empathetic response in Dutch that:
   - Acknowledges his frustration
   - Explains I'm looking into it personally
   - Provides a timeline (24 hours)
   - Maintains his loyalty as a good customer

Tone: Professional but warm, not corporate-speak. Sign as "Karin, Klantenservice Vloto"`
  },
  {
    id: 2,
    title: "The Weekly Report",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    situation: "It's Monday and you need the weekly fleet status for the management meeting",
    hints: [
      "What time period should the report cover?",
      "Who is the audience? (Management = high-level)",
      "What KPIs matter most to management?",
      "What format works for a meeting? (Slides, bullets, numbers)",
      "Should it highlight problems AND wins?",
      "What comparisons are useful? (vs last week, vs target)"
    ],
    expertPrompt: `Create a weekly fleet status report for our Monday management meeting.

Report period: Last week (Mon-Sun)
Audience: C-level executives (CEO, COO, CFO) - they want headlines, not details

Data I'm providing: [paste fleet data here]

Structure needed:
1. Executive Summary (3 bullet points max)
2. Key Metrics Dashboard:
   - Total trips completed (vs last week %)
   - Fleet utilization rate (target: 65%)
   - Revenue per car
   - Customer satisfaction score
3. Wins This Week (top 2-3)
4. Issues Requiring Attention (prioritized)
5. Next Week Focus

Format: Clean, scannable, use arrows/colors for trends (↑ green, ↓ red)
Length: Max 1 page when printed
Tone: Data-driven, confident, solution-oriented for any issues raised`
  },
  {
    id: 3,
    title: "Partner Communication",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    situation: "A new charging company wants to partner with us. Write the first response.",
    hints: [
      "Who sent the inquiry? (Company name, person's role)",
      "What kind of partnership are they proposing?",
      "What does Vloto need from charging partners?",
      "What's the goal of this first response? (Meeting? More info?)",
      "What tone represents Vloto professionally?",
      "What key points should you mention about Vloto?"
    ],
    expertPrompt: `Help me write a response to a partnership inquiry.

Incoming request from:
- Company: GreenCharge NL (new EV charging network)
- Contact: Lisa van Berg, Business Development Manager
- Their offer: Discounted charging rates for Vloto fleet at their 50 Amsterdam stations

About Vloto (include naturally):
- 150+ shared EVs in Amsterdam
- Growing 20% monthly
- Current challenge: charging infrastructure in East Amsterdam

My goals for this response:
1. Show genuine interest (this could be valuable)
2. Propose a discovery call this week or next
3. Ask 2-3 smart questions that show we're serious:
   - Coverage map (especially east Amsterdam)
   - Their pricing model for B2B fleet customers
   - Integration options with fleet management systems

Tone: Professional but warm, innovative company to innovative company
Length: Short - this is just the door opener
Language: English (she wrote in English)
Sign as: My name is Thomas, Partnership Manager at Vloto`
  }
];

const ExerciseCard = ({ exercise, index }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showExpert, setShowExpert] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Exercise Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white">
            {exercise.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-violet-400">Exercise {index + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{exercise.title}</h3>
          </div>
        </div>
      </div>

      {/* Situation */}
      <div className="px-6 py-4 bg-slate-800/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-400 mb-1">Situation</p>
            <p className="text-slate-300">{exercise.situation}</p>
          </div>
        </div>
      </div>

      {/* User Input Area */}
      <div className="p-6">
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Write your prompt:
        </label>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Think about what context would help AI give you the best response..."
          className="w-full h-32 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowHints(!showHints)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              showHints
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowExpert(!showExpert)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              showExpert
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {showExpert ? 'Hide Expert Version' : 'Show Expert Version'}
          </motion.button>
        </div>

        {/* Hints Panel */}
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Context Checklist
                </p>
                <ul className="space-y-2">
                  {exercise.hints.map((hint, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      {hint}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expert Version Panel */}
        <AnimatePresence>
          {showExpert && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Expert Prompt Example
                </p>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/50 p-4 rounded-lg overflow-x-auto">
                  {exercise.expertPrompt}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const InteractiveExamples = ({ onComplete }) => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-sm font-medium text-slate-300">10 min section</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Your Turn - Build Better Prompts</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Let's practice with scenarios you'll actually face
          </p>
        </motion.div>

        {/* Exercise Cards */}
        <div className="space-y-8 mb-12">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6 mb-8 border-l-4 border-violet-500"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300">
              <span className="font-semibold text-violet-400">Don't worry about getting it "perfect"</span> - the goal is to practice including more context! Compare your version with the expert example to see what additional details you might include next time.
            </p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3"
          >
            Continue to Quiz
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

export default InteractiveExamples;
