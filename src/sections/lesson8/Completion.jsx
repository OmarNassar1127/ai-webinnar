import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Zap, Bot, FileText, Target, Home, Rocket } from 'lucide-react';
import { Button, Card, BlockedLessonButton } from '../../components/common';
import { useLesson8 } from '../../context/Lesson8Context';

// Confetti particles - extra special for the magic lesson!
const ConfettiParticle = ({ index, color }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 2;
  const randomRotation = Math.random() * 720 - 360;

  return (
    <motion.div
      className={`absolute w-3 h-3 ${color}`}
      style={{
        left: `${randomX}%`,
        top: -20,
        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
        rotate: randomRotation,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
};

// Extra sparkle effect for magic lesson
const SparkleEffect = ({ index }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 3;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay: randomDelay,
        repeat: Infinity,
      }}
    >
      <Sparkles className="w-4 h-4 text-emerald-400" />
    </motion.div>
  );
};

const recapCards = [
  {
    icon: Bot,
    title: 'Autonomous AI',
    description: 'AI that works independently through structured task lists',
    color: 'emerald',
  },
  {
    icon: FileText,
    title: 'The PRD Pattern',
    description: 'User stories with clear acceptance criteria guide the AI',
    color: 'purple',
  },
  {
    icon: Target,
    title: 'Context Preserved',
    description: 'Fresh context each iteration, progress tracked in JSON',
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'Human + AI',
    description: 'You design, AI executes, you review and refine',
    color: 'amber',
  },
];

export default function Completion({ onComplete, onBack, onNavigateToLesson, isNextLessonBlocked }) {
  const { completeSection } = useLesson8();
  const [showContent, setShowContent] = useState(false);

  // Confetti colors - extra vibrant for the magic lesson
  const confettiColors = [
    'bg-emerald-400', 'bg-cyan-400', 'bg-purple-400', 'bg-pink-400',
    'bg-amber-400', 'bg-green-400', 'bg-blue-400', 'bg-violet-400',
  ];

  // Generate confetti particles - more for extra celebration
  const [confettiParticles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: confettiColors[i % confettiColors.length],
    }))
  );

  // Generate sparkle effects
  const [sparkles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({ id: i }))
  );

  useEffect(() => {
    // Mark section as complete
    completeSection(8);

    // Show content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, [completeSection]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none">
        {confettiParticles.map((particle) => (
          <ConfettiParticle key={particle.id} index={particle.id} color={particle.color} />
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <SparkleEffect key={sparkle.id} index={sparkle.id} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Trophy animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(16, 185, 129, 0.3)',
                  '0 0 60px rgba(16, 185, 129, 0.5)',
                  '0 0 30px rgba(16, 185, 129, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-6 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border-2 border-emerald-500/50"
            >
              <Trophy className="w-16 h-16 text-emerald-400" />
            </motion.div>

            {/* Orbiting stars */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: -60 - i * 10,
                  }}
                >
                  <Sparkles className={`w-4 h-4 ${
                    i === 0 ? 'text-emerald-400' : i === 1 ? 'text-cyan-400' : 'text-purple-400'
                  }`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Heading */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Magic Lesson
              </span>
              <span className="text-white"> Complete!</span>
            </h1>
            <p className="text-lg text-slate-400">
              You've unlocked the secret of autonomous AI development
            </p>
          </motion.div>
        )}

        {/* Recap cards */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          >
            {recapCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className={`p-4 border-l-4 ${
                  card.color === 'emerald' ? 'border-l-emerald-500' :
                  card.color === 'purple' ? 'border-l-purple-500' :
                  card.color === 'cyan' ? 'border-l-cyan-500' :
                  'border-l-amber-500'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      card.color === 'emerald' ? 'bg-emerald-500/20' :
                      card.color === 'purple' ? 'bg-purple-500/20' :
                      card.color === 'cyan' ? 'bg-cyan-500/20' :
                      'bg-amber-500/20'
                    }`}>
                      <card.icon className={`w-5 h-5 ${
                        card.color === 'emerald' ? 'text-emerald-400' :
                        card.color === 'purple' ? 'text-purple-400' :
                        card.color === 'cyan' ? 'text-cyan-400' :
                        'text-amber-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{card.title}</h3>
                      <p className="text-sm text-slate-400">{card.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Key Takeaway */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-10"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 via-slate-800/40 to-purple-900/40 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6 text-emerald-400" />
                </motion.div>
                <span className="text-emerald-300 font-medium">The Future is Here</span>
              </div>
              <p className="text-lg text-white mb-4">
                You now understand how AI can work <span className="text-cyan-400">autonomously</span> on complex projects. This isn't science fiction — it's how this very course was built.
              </p>
              <p className="text-slate-300">
                As AI continues to evolve, the ability to <span className="text-purple-400">direct autonomous systems</span> will become one of the most valuable skills you can have.
              </p>
            </div>
          </motion.div>
        )}

        {/* Next Lesson Preview */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-10"
          >
            <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Rocket className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-purple-300 font-medium">Coming Next</span>
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
              <h3 className="text-xl text-white font-bold mb-2">Final Project & What's Next</h3>
              <p className="text-slate-400 mb-4">
                Celebrate your journey, showcase your work, and plan your next steps into the AI-powered future.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Journey Recap', 'Tool Showcase', 'Certificate', 'Resources'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-slate-700/50 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action buttons */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="secondary" size="lg" onClick={onBack}>
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <BlockedLessonButton
              nextLessonId={9}
              isBlocked={isNextLessonBlocked}
              onNavigate={onNavigateToLesson}
              className={!isNextLessonBlocked ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600" : ""}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
