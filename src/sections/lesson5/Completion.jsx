import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Layout, FileText, AlertTriangle, Lightbulb, Home, Sparkles } from 'lucide-react';
import { Card, Button, BlockedLessonButton } from '../../components/common';
import { useLesson5 } from '../../context/Lesson5Context';

const recapCards = [
  {
    icon: Layout,
    title: 'The WHAT Framework',
    description: 'W=What it does, H=How users interact, A=Actions behind scenes, T=Things to remember',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: FileText,
    title: 'Clear Descriptions Win',
    description: 'Specific details lead to specific results - vague requests get vague outcomes',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: AlertTriangle,
    title: 'Avoid Common Mistakes',
    description: "Don't forget edge cases, user perspectives, and success criteria",
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: Lightbulb,
    title: 'Your Tool Plan',
    description: 'You now have a real tool idea to develop further in Lesson 6',
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
  const { completeSection } = useLesson5();
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
          <span className="text-white">Lesson 5</span>{' '}
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
          You've mastered the art of describing tools!
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
              <Layout className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Key Takeaway</h3>
              <p className="text-slate-300">
                The WHAT framework is your <strong className="text-white">secret weapon</strong>.
                With it, you can describe any tool clearly enough for AI to build it. Remember:
                <strong className="text-white"> W</strong>hat it does,
                <strong className="text-white"> H</strong>ow users interact,
                <strong className="text-white"> A</strong>ctions behind scenes,
                <strong className="text-white"> T</strong>hings to remember.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Homework */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Before Lesson 6
              </h3>
              <p className="text-slate-300">
                Take some time to refine your tool plan. Talk to colleagues about the problem you're
                trying to solve. The better you understand the need, the better your specification will be.
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
            <h3 className="text-lg font-semibold text-cyan-300">Coming Next: Building for Operations</h3>
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
            In Lesson 6, you'll take your tool plan and turn it into a complete specification.
            You'll identify operations pain points, choose the perfect tool to build, and create
            a document that's ready for AI implementation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Pain Point Analysis</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Specification Workshop</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Implementation Path</span>
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
          nextLessonId={6}
          isBlocked={isNextLessonBlocked}
          onNavigate={onNavigateToLesson}
        />
      </motion.div>
    </div>
  );
}

export default Completion;
