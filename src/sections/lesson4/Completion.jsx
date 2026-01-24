import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, MessageSquare, RefreshCw, FileText, Zap, Home, Sparkles } from 'lucide-react';
import { Card, Button, BlockedLessonButton } from '../../components/common';
import { useLesson4 } from '../../context/Lesson4Context';

const recapCards = [
  {
    icon: MessageSquare,
    title: 'Building is a Conversation',
    description: 'AI development is an iterative dialogue, not a one-shot request',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: RefreshCw,
    title: 'Mistakes are Part of the Process',
    description: "The first version is rarely perfect - and that's completely normal",
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: FileText,
    title: 'Description Quality Matters',
    description: 'Clear, specific descriptions lead to better AI-generated solutions',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'You Direct, AI Executes',
    description: "You bring domain knowledge and judgment, AI handles the technical work",
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500'
  }
];

// Confetti particle component
function ConfettiParticle({ delay, color }) {
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      className={`absolute w-3 h-3 ${color}`}
      style={{
        left: `${randomX}%`,
        top: '-20px',
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: '100vh',
        rotate: randomRotation + 720,
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: delay,
        ease: 'easeIn'
      }}
    />
  );
}

function Completion({ onComplete, onBack, onNavigateToLesson, isNextLessonBlocked }) {
  const { completeSection } = useLesson4();
  const [confettiParticles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      color: ['bg-purple-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
    }))
  );

  useEffect(() => {
    completeSection(7);
  }, [completeSection]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiParticles.map((particle) => (
          <ConfettiParticle
            key={particle.id}
            delay={particle.delay}
            color={particle.color}
          />
        ))}
      </div>

      {/* Sparkle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 3,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Celebration Header */}
      <motion.div
        className="text-center mb-12 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Trophy Animation */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-500/30 border border-amber-500/50 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, delay: 0.2 }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-12 h-12 text-amber-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-white">Lesson 4</span>{' '}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Complete!
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          You've seen AI building in action!
        </motion.p>
      </motion.div>

      {/* Recap Cards */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-lg font-semibold text-slate-300 mb-6 text-center">
          What You Learned:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recapCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} bg-opacity-20 mb-4`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-500/30">
          <div className="flex items-start gap-4">
            <motion.div
              className="p-2 rounded-lg bg-purple-500/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Key Takeaway</h3>
              <p className="text-slate-300">
                AI building is <strong className="text-white">accessible to everyone</strong>.
                You don't need to code - you need to <strong className="text-white">describe, iterate, and direct</strong>.
                With clear descriptions and thoughtful feedback, you can build real tools that solve real problems.
                The next step? Learning exactly how to describe what you want.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next Lesson Preview */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-cyan-900/20 border-cyan-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-cyan-300">Coming Next: Your First Build</h3>
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
          <p className="text-slate-300 mb-4">
            In Lesson 5, you'll learn the WHAT framework - a simple system for describing any tool you want to build.
            You'll practice turning ideas into clear descriptions that AI can understand and execute.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">WHAT Framework</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Requirements Practice</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Your Tool Plan</span>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Button variant="secondary" onClick={onBack}>
          <Home className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
        <BlockedLessonButton
          nextLessonId={5}
          isBlocked={isNextLessonBlocked}
          onNavigate={onNavigateToLesson}
        />
      </motion.div>
    </div>
  );
}

export default Completion;
