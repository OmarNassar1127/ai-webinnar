import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

export default function Navigation({
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
  showComplete = false,
}) {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-center justify-center gap-4 py-6"
    >
      {/* Previous button */}
      <motion.button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-medium
          transition-colors duration-200
          ${canGoPrevious
            ? 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 border border-white/10'
            : 'bg-slate-800/30 text-slate-500 border border-white/5 cursor-not-allowed'
          }
        `}
        variants={buttonVariants}
        whileHover={canGoPrevious ? 'hover' : 'disabled'}
        whileTap={canGoPrevious ? 'tap' : 'disabled'}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </motion.button>

      {/* Next / Complete button */}
      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-medium
          transition-all duration-200
          ${canGoNext
            ? showComplete
              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
            : 'bg-slate-800/30 text-slate-500 border border-white/5 cursor-not-allowed'
          }
        `}
        variants={buttonVariants}
        whileHover={canGoNext ? 'hover' : 'disabled'}
        whileTap={canGoNext ? 'tap' : 'disabled'}
      >
        {showComplete ? (
          <>
            <span>Complete Lesson</span>
            <Trophy className="w-5 h-5" />
          </>
        ) : (
          <>
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </motion.nav>
  );
}
