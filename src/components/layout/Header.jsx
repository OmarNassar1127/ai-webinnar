import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';

export default function Header({ onLogoClick }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism background */}
      <div className="backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo area */}
          <motion.div
            onClick={onLogoClick}
            className={`flex items-center gap-3 ${onLogoClick ? 'cursor-pointer' : ''}`}
            whileHover={onLogoClick ? { scale: 1.02 } : {}}
            whileTap={onLogoClick ? { scale: 0.98 } : {}}
          >
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Vloto AI Academy
              </h1>
            </div>
          </motion.div>

          {/* Current user display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <div className="p-1.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-slate-300">Welcome, Learner</span>
          </motion.div>
        </div>

        {/* Animated gradient border at bottom */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.header>
  );
}
