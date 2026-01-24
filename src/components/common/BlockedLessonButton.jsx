import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import Button from './Button';

/**
 * BlockedLessonButton Component
 * A button that either navigates to the next lesson or shows a blocked modal
 *
 * @param {number} nextLessonId - The lesson ID to navigate to
 * @param {boolean} isBlocked - Whether the next lesson is blocked
 * @param {function} onNavigate - Function to navigate to the lesson
 * @param {string} className - Additional CSS classes
 */
const BlockedLessonButton = ({
  nextLessonId,
  isBlocked,
  onNavigate,
  className = '',
}) => {
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const lessonLabel = nextLessonId === 9 ? 'Final Lesson' : `Lesson ${nextLessonId}`;

  const handleClick = () => {
    if (isBlocked) {
      setShowBlockedModal(true);
    } else {
      onNavigate && onNavigate(nextLessonId);
    }
  };

  return (
    <>
      <Button
        variant={isBlocked ? 'warning' : 'primary'}
        size="lg"
        onClick={handleClick}
        className={className}
      >
        {isBlocked ? (
          <>
            <Lock className="w-5 h-5 mr-2" />
            {lessonLabel} Locked
          </>
        ) : (
          <>
            Continue to {lessonLabel}
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      {/* Blocked Lesson Modal */}
      <AnimatePresence>
        {showBlockedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBlockedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-amber-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-4">
                Lesson Not Available Yet
              </h3>

              <p className="text-slate-300 text-center mb-6 leading-relaxed">
                Your instructor has temporarily locked this lesson to help you master the current material first.
              </p>

              <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                <p className="text-slate-400 text-sm leading-relaxed">
                  <span className="text-amber-400 font-medium">Tip:</span> Use this time to review what you've learned. When the lesson opens, everything will make much more sense!
                </p>
              </div>

              <button
                onClick={() => setShowBlockedModal(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlockedLessonButton;
