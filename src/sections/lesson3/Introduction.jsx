import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Bot, Puzzle, Sparkles, Zap, ChevronRight } from 'lucide-react';

function Introduction({ onComplete }) {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowObjectives(true), 800);
    const timer2 = setTimeout(() => setShowNote(true), 1600);
    const timer3 = setTimeout(() => setShowButton(true), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const objectives = [
    {
      icon: Bot,
      title: 'Chatbots vs Agents',
      description: 'Understand the evolution from simple chatbots to powerful AI agents that can take action',
      color: 'purple'
    },
    {
      icon: Puzzle,
      title: 'MCPs, Plugins & Skills',
      description: 'Learn the tools that give AI superpowers - connecting to systems and doing real work',
      color: 'cyan'
    },
    {
      icon: Sparkles,
      title: "What's Possible Now",
      description: 'Discover real examples of what AI can accomplish today and where your role fits in',
      color: 'emerald'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Animated Network Visual */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full blur-xl" />
          <div className="relative w-full h-full bg-slate-800/80 rounded-full flex items-center justify-center border border-purple-500/30">
            <Network className="w-16 h-16 text-purple-400" />
          </div>
          {/* Orbiting nodes */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-cyan-500 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                x: Math.cos((i * Math.PI) / 2) * 50 + 56,
                y: Math.sin((i * Math.PI) / 2) * 50 + 56,
              }}
              transition={{
                opacity: { duration: 2, repeat: Infinity },
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Beyond ChatGPT: The World of AI Tools
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-300"
        >
          ChatGPT was just the beginning. Let&apos;s explore the bigger world of AI.
        </motion.p>
      </motion.div>

      {/* Learning Objectives */}
      <AnimatePresence>
        {showObjectives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center">
              In this lesson, you&apos;ll learn:
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {objectives.map((objective, index) => (
                <motion.div
                  key={objective.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`
                    p-6 rounded-2xl
                    bg-slate-800/60 backdrop-blur-sm
                    border border-${objective.color}-500/30
                    hover:border-${objective.color}-500/50
                    transition-all duration-300
                    hover:shadow-lg hover:shadow-${objective.color}-500/10
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl mb-4
                    bg-gradient-to-br from-${objective.color}-500/20 to-${objective.color}-600/20
                    flex items-center justify-center
                  `}>
                    <objective.icon className={`w-6 h-6 text-${objective.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{objective.title}</h3>
                  <p className="text-sm text-slate-400">{objective.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational Note */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-amber-900/30 border border-amber-500/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">Why This Matters</h3>
                  <p className="text-slate-300">
                    Most people think &quot;AI&quot; means ChatGPT. But the real revolution is happening
                    with AI <strong className="text-white">agents</strong> — AI that doesn&apos;t just talk,
                    but <strong className="text-white">takes action</strong>. Understanding this landscape
                    puts you ahead of 95% of people.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Begin Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              onClick={onComplete}
              className="
                inline-flex items-center gap-3 px-8 py-4
                bg-gradient-to-r from-purple-600 to-cyan-600
                hover:from-purple-500 hover:to-cyan-500
                rounded-2xl font-semibold text-white
                shadow-lg shadow-purple-500/25
                transition-all duration-300
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let&apos;s Explore
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Introduction;
