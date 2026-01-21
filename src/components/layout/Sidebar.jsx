import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Users,
  FileText,
  MessageSquare,
  MousePointer,
  HelpCircle,
  Trophy,
  Check,
} from 'lucide-react';

const sectionIcons = [
  Sparkles,
  Brain,
  Users,
  FileText,
  MessageSquare,
  MousePointer,
  HelpCircle,
  Trophy,
];

export default function Sidebar({
  sections = [],
  currentSection = 0,
  onSectionClick,
  completedSections = [],
}) {
  const completedCount = completedSections.filter(Boolean).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-1/4 min-w-[280px] max-w-[360px]"
    >
      {/* Glassmorphism background */}
      <div className="h-full backdrop-blur-xl bg-slate-900/70 border-r border-white/10 flex flex-col">
        {/* Section header */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Lesson Sections</h2>
          <p className="text-sm text-slate-400 mt-1">Navigate through the content</p>
        </div>

        {/* Sections list */}
        <motion.nav
          className="flex-1 overflow-y-auto py-4 px-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ul className="space-y-2">
            {sections.map((section, index) => {
              const Icon = sectionIcons[index] || FileText;
              const isActive = currentSection === index;
              const isCompleted = completedSections[index];

              return (
                <motion.li key={index} variants={itemVariants}>
                  <motion.button
                    onClick={() => onSectionClick?.(index)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                      transition-colors duration-200 relative overflow-hidden
                      ${isActive
                        ? 'bg-cyan-500/20 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active section glow effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-xl"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-lg shadow-cyan-400/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Icon container */}
                    <div
                      className={`
                        relative z-10 p-2 rounded-lg
                        ${isActive
                          ? 'bg-cyan-500/30 text-cyan-400'
                          : isCompleted
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/5 text-slate-400'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Title */}
                    <span className="relative z-10 flex-1 text-sm font-medium truncate">
                      {section.title || section}
                    </span>

                    {/* Completion checkmark */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 p-1 rounded-full bg-green-500/20"
                      >
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>

        {/* Progress summary */}
        <div className="px-6 py-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm font-medium text-cyan-400">
              {completedCount}/8 sections completed
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 8) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
