import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Eye, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common';

// Matrix-style rain effect component
const MatrixRain = () => {
  const columns = 20;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 text-xs font-mono whitespace-pre"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: -500 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2,
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.03 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default function TheBigReveal({ onComplete }) {
  const [showContent, setShowContent] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 1000);
    const timer2 = setTimeout(() => setShowReveal(true), 2500);
    const timer3 = setTimeout(() => setShowButton(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <MatrixRain />

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Secret unlocked badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-8"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-300 font-medium">Secret Lesson Unlocked</span>
        </motion.div>

        {/* Main heading with dramatic reveal */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Welcome to </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                The Magic Lesson
              </span>
            </h1>
          </motion.div>
        )}

        {/* The big reveal */}
        {showReveal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-emerald-500/30">
              <motion.div
                animate={{
                  boxShadow: ['0 0 20px rgba(16, 185, 129, 0.3)', '0 0 40px rgba(16, 185, 129, 0.5)', '0 0 20px rgba(16, 185, 129, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-6"
              >
                <Sparkles className="w-10 h-10 text-emerald-400" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What if AI could build while you sleep?
              </h2>

              <p className="text-lg text-slate-300 mb-6">
                You've learned to <span className="text-cyan-400">describe</span> tools. You've learned to <span className="text-purple-400">guide</span> AI step-by-step.
              </p>

              <p className="text-xl text-white font-medium">
                Now discover how AI can work <span className="text-emerald-400">autonomously</span> — turning your ideas into reality while you focus on other things.
              </p>
            </div>
          </motion.div>
        )}

        {/* Learning objectives */}
        {showReveal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {[
              { icon: Zap, title: 'Autonomous AI', desc: 'AI that works independently on complex tasks' },
              { icon: Eye, title: 'Meet Ralph', desc: 'A pattern for hands-off development' },
              { icon: Sparkles, title: 'The Future', desc: 'Where AI development is heading' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <item.icon className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Continue button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onComplete}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              Enter the Matrix
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
