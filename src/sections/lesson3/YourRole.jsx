import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

function YourRole({ onComplete }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Your Role in This Future
        </h1>
        <p className="text-slate-400">
          Understanding your unique superpowers in the AI era
        </p>
      </motion.div>

      {/* Placeholder content - will be implemented in US-018 */}
      <div className="bg-slate-800/60 rounded-2xl p-8 mb-8 border border-slate-700/50">
        <p className="text-slate-400 text-center">
          Section content coming soon...
        </p>
      </div>

      <div className="text-center">
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
          Continue
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default YourRole;
