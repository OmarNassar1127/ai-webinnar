import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Home, Monitor, Server, HardDrive, ArrowLeftRight, Zap, Sparkles } from 'lucide-react';
import { useLesson2 } from '../../context/Lesson2Context';
import { BlockedLessonButton } from '../../components/common';

const recapCards = [
  {
    id: 1,
    title: "Frontend = The Dining Room",
    description: "What users see and interact with - the buttons, screens, and visual elements",
    icon: Monitor,
    gradient: "from-purple-500 to-violet-500",
    color: "purple"
  },
  {
    id: 2,
    title: "Backend = The Kitchen",
    description: "Where the actual work happens - processing orders, running calculations, applying logic",
    icon: Server,
    gradient: "from-cyan-500 to-blue-500",
    color: "cyan"
  },
  {
    id: 3,
    title: "Database = The Pantry",
    description: "Where all the information is stored - user accounts, history, settings, content",
    icon: HardDrive,
    gradient: "from-emerald-500 to-teal-500",
    color: "emerald"
  },
  {
    id: 4,
    title: "API = The Waiters",
    description: "The messengers carrying requests and responses between frontend and backend",
    icon: ArrowLeftRight,
    gradient: "from-orange-500 to-amber-500",
    color: "orange"
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

const Completion = ({ onComplete, onBack, onNavigateToLesson, isNextLessonBlocked }) => {
  const { completeSection } = useLesson2();
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiParticles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: Math.random() * 1
    }))
  );

  // Mark lesson as complete on mount
  useEffect(() => {
    completeSection(8);
  }, [completeSection]);

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
            <Trophy className="w-16 h-16 text-white" />
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
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Lesson 2 Complete!
            </span>
          </h1>
          <p className="text-xl text-slate-400">
            You now understand how software works - from the inside out
          </p>
        </motion.div>

        {/* Recap Cards */}
        <div className="space-y-4 mb-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-white text-center mb-6"
          >
            What You Learned
          </motion.h2>
          {recapCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-5 border border-white/10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center flex-shrink-0 text-white`}
                >
                  <IconComponent className="w-7 h-7" />
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
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Takeaway Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-violet-500/30"
          style={{
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)'
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-violet-400 mb-2">Key Takeaway</h3>
              <p className="text-white text-lg leading-relaxed">
                Now when you look at <span className="font-bold text-purple-400">any app or website</span>, you can identify its four key components. This skill helps you <span className="font-bold text-cyan-400">communicate clearly</span> with developers and <span className="font-bold text-emerald-400">give precise instructions to AI tools</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Lesson Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-10 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative overflow-hidden"
        >
          {/* Sparkle decoration */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </motion.div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full">
                  Coming Next
                </span>
                {isNextLessonBlocked ? (
                  <span className="text-xs font-medium text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                    Blocked by Admin
                  </span>
                ) : (
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    Unlocked
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Claude & Cowork</h3>
              <p className="text-slate-400">
                Meet Claude Cowork — the autonomous AI agent that creates real files, connects to your tools, and transforms Vloto operations with 50+ use cases.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="group px-8 py-4 rounded-xl bg-slate-700/50 border border-white/10 text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-slate-700"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
          <BlockedLessonButton
            nextLessonId={3}
            isBlocked={isNextLessonBlocked}
            onNavigate={onNavigateToLesson}
          />
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
