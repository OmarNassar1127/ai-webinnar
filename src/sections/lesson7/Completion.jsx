import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Database, FileText, Eraser, Search, ArrowRight, Home, Lock } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { useLesson7 } from '../../context/Lesson7Context';

const recapCards = [
  {
    icon: Database,
    title: 'Spreadsheet Analysis',
    description: 'Ask questions about your data in plain English - no formulas needed',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: FileText,
    title: 'Report Generation',
    description: 'Create professional reports automatically from raw data',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: Eraser,
    title: 'Data Cleaning',
    description: 'Fix messy data faster than ever - dates, duplicates, missing values',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: Search,
    title: 'Finding Insights',
    description: 'Discover patterns and trends hidden in your numbers',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
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

function Completion({ onComplete, onBack }) {
  const { completeSection } = useLesson7();
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
          <span className="text-white">Lesson 7</span>{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Complete!
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          You've unlocked the power of AI for your data work!
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
        <Card className="p-6 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-purple-900/30 border-cyan-500/30">
          <div className="flex items-start gap-4">
            <motion.div
              className="p-2 rounded-lg bg-cyan-500/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Database className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Key Takeaway</h3>
              <p className="text-slate-300">
                AI transforms how you work with data. Instead of spending hours on formulas,
                pivot tables, and manual cleanup, you can <strong className="text-white">describe what you need</strong> and
                get results instantly. The same clear communication skills you've learned apply here too.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Practical Challenge */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Practical Challenge
              </h3>
              <p className="text-slate-300 mb-3">
                Try these with your real work data:
              </p>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">1.</span>
                  Pick a spreadsheet you use regularly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">2.</span>
                  Ask AI 3 questions about the data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">3.</span>
                  Generate a simple report from the data
                </li>
              </ul>
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
        <Card className="p-6 bg-gradient-to-r from-purple-900/20 via-violet-900/20 to-purple-900/20 border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-300">Coming Next: The Magic Lesson</h3>
          </div>
          <p className="text-slate-300 mb-4">
            Lesson 8 is a special hidden lesson that unlocks advanced capabilities.
            You've earned access to the secret of autonomous AI development - when AI
            can build entire features while you sleep!
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">Beyond Single Prompts</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">Meet Ralph</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">Autonomous AI</span>
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
        <Button variant="primary" size="lg" onClick={onComplete}>
          Continue to Lesson 8
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default Completion;
