import { motion } from 'framer-motion';
import { Trophy, Home, ChevronRight } from 'lucide-react';

function Completion({ onComplete, onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Lesson 3 Complete!
        </h1>
        <p className="text-slate-400">
          You now understand the AI tools landscape
        </p>
      </motion.div>

      {/* Placeholder content - will be implemented in US-019 */}
      <div className="bg-slate-800/60 rounded-2xl p-8 mb-8 border border-slate-700/50">
        <p className="text-slate-400 text-center">
          Celebration content coming soon...
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          onClick={onBack}
          className="
            inline-flex items-center gap-2 px-6 py-3
            bg-slate-700 hover:bg-slate-600
            rounded-xl font-medium text-white
            transition-all duration-300
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </motion.button>

        <motion.button
          onClick={onComplete}
          className="
            inline-flex items-center gap-2 px-6 py-3
            bg-gradient-to-r from-purple-600 to-cyan-600
            hover:from-purple-500 hover:to-cyan-500
            rounded-xl font-medium text-white
            shadow-lg shadow-purple-500/25
            transition-all duration-300
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Lesson 4
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default Completion;
