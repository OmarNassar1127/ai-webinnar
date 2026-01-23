import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const recapCards = [
  {
    id: 1,
    title: "AI is pattern matching, not magic",
    description: "AI predicts helpful responses based on patterns learned from training data",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: 2,
    title: "Context is everything - the Capable Colleague Rule",
    description: "Treat AI like a knowledgeable colleague who needs clear direction and background",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Good prompts = Clear task + Background + Requirements",
    description: "Include WHO, WHAT, WHY, HOW, and CONSTRAINTS for best results",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500"
  }
];

const ConfettiParticle = ({ delay }) => {
  const colors = ['#7C3AED', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * 100;
  const endX = startX + (Math.random() - 0.5) * 50;

  return (
    <motion.div
      initial={{
        x: `${startX}vw`,
        y: -20,
        rotate: 0,
        opacity: 1
      }}
      animate={{
        y: '110vh',
        x: `${endX}vw`,
        rotate: Math.random() * 720 - 360,
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: Math.random() * 2 + 3,
        delay: delay,
        ease: "linear"
      }}
      className="fixed w-3 h-3 pointer-events-none z-50"
      style={{
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px'
      }}
    />
  );
};

const Completion = ({ onComplete, onBack }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiParticles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: Math.random() * 1
    }))
  );

  // Auto-complete this section when viewed
  useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {confettiParticles.map((particle) => (
              <ConfettiParticle key={particle.id} delay={particle.delay} />
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Trophy Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 60px rgba(251, 191, 36, 0.4), 0 0 100px rgba(251, 191, 36, 0.2)'
            }}
          >
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Lesson 1 Complete!</span>
          </h1>
          <p className="text-xl text-slate-400">
            You've mastered the foundations of AI thinking
          </p>
        </motion.div>

        {/* Recap Cards */}
        <div className="space-y-4 mb-10">
          {recapCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="glass rounded-2xl p-6 flex items-start gap-5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center flex-shrink-0 text-white`}
              >
                {card.icon}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.description}</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.15 }}
                className="ml-auto flex-shrink-0"
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Key Takeaway Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-violet-500/30"
          style={{
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-violet-400 mb-2">Key Takeaway</h3>
              <p className="text-white text-lg leading-relaxed">
                Starting today, before every AI interaction, take <span className="font-bold text-cyan-400">10 extra seconds</span> to add context. That small investment will <span className="font-bold text-emerald-400">10x your results</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Lesson Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-10 glass rounded-2xl p-6 border border-white/10 relative overflow-hidden"
        >
          {/* Preview Content */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full">
                  Up Next
                </span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  Unlocked
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lesson 2: How Software Works</h3>
              <p className="text-slate-400">
                Understand the basics of how software is built, so you can communicate effectively with developers and AI tools.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="group px-8 py-4 rounded-xl bg-slate-800 border border-white/10 text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </motion.button>
        </motion.div>

        {/* Celebration sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute w-2 h-2 bg-violet-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Completion;
