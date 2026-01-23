import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, FileText, CheckSquare, Rocket, ArrowRight, Home, Database } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { useLesson6 } from '../../context/Lesson6Context';

const recapCards = [
  {
    icon: Target,
    title: 'Pain Points Identified',
    description: 'Found the operations tasks that waste the most time and deserve automation',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: FileText,
    title: 'Complete Specification',
    description: 'Wrote a professional-quality spec with frontend, backend, database, and edge cases',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: CheckSquare,
    title: 'Quality Reviewed',
    description: 'Used the checklist to ensure your specification is clear and complete',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: Rocket,
    title: 'Implementation Ready',
    description: 'Know the realistic timeline and approach for building your tool',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500'
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
  const { completeSection } = useLesson6();
  const [confettiParticles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      color: ['bg-purple-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
    }))
  );

  useEffect(() => {
    completeSection(8);
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
          <span className="text-white">Lesson 6</span>{' '}
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
          You've created a professional-quality tool specification!
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
          What You Accomplished:
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
              <FileText className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Key Takeaway</h3>
              <p className="text-slate-300">
                Your specification is your <strong className="text-white">blueprint for success</strong>.
                The more detailed and clear it is, the better AI can build what you actually need.
                Remember: <strong className="text-white">specific descriptions = specific results</strong>.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
      >
        <Card className="p-6 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Rocket className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Your Next Steps
              </h3>
              <p className="text-slate-300 mb-3">
                You have a complete specification document. Here's what to do with it:
              </p>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">1.</span>
                  Review your spec with a colleague for feedback
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">2.</span>
                  Refine any sections that feel unclear
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">3.</span>
                  When ready, use it to start building with AI tools!
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
        <Card className="p-6 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-cyan-900/20 border-cyan-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-cyan-300">Coming Next: Data & AI</h3>
          </div>
          <p className="text-slate-300 mb-4">
            In Lesson 7, you'll learn how AI can transform your spreadsheets and data.
            From analysis to report generation, discover how to leverage AI for data tasks
            you do every day.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Spreadsheet Analysis</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Report Generation</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">Finding Insights</span>
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
          Continue to Lesson 7
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

export default Completion;
