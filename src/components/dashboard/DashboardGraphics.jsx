import { motion } from 'framer-motion';
import { Brain, Lock } from 'lucide-react';

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const FloatingAIGraphic = () => {
  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80"
      variants={floatVariants}
      animate="animate"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-lg"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 shadow-2xl shadow-purple-500/30">
            <Brain className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </div>
        </div>
      </motion.div>

      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
        <motion.div
          key={angle}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
          style={{ top: '50%', left: '50%' }}
          animate={{
            x: [
              Math.cos((angle * Math.PI) / 180) * 100,
              Math.cos(((angle + 360) * Math.PI) / 180) * 100,
            ],
            y: [
              Math.sin((angle * Math.PI) / 180) * 100,
              Math.sin(((angle + 360) * Math.PI) / 180) * 100,
            ],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.2,
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[45, 90, 135, 180, 225, 270, 315, 360].map((angle, index) => (
          <motion.line
            key={angle}
            x1="160"
            y1="160"
            x2={160 + Math.cos((angle * Math.PI) / 180) * 120}
            y2={160 + Math.sin((angle * Math.PI) / 180) * 120}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
            transition={{
              pathLength: { delay: 0.5 + index * 0.1, duration: 1.5 },
              opacity: { duration: 2, repeat: Infinity },
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export const TimelineNode = ({ lesson, index, isUnlocked, isActive, isCompleted, onClick }) => {
  const handleClick = () => {
    if (isUnlocked && onClick) {
      onClick(lesson.id);
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center relative ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      onClick={handleClick}
    >
      {index < 8 && (
        <motion.div
          className="absolute left-full top-6 w-8 md:w-12 lg:w-16 h-0.5"
          style={{
            background: isUnlocked
              ? 'linear-gradient(90deg, #8B5CF6, #3B82F6)'
              : 'linear-gradient(90deg, #334155, #1E293B)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
        >
          {isUnlocked && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}

      <motion.div
        className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
          isCompleted
            ? 'bg-gradient-to-br from-emerald-600 to-cyan-600'
            : isActive
            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
            : isUnlocked
            ? 'bg-gradient-to-br from-purple-600/50 to-blue-600/50'
            : 'bg-slate-700/50'
        } border-2 ${
          isCompleted
            ? 'border-emerald-400'
            : isActive
            ? 'border-purple-400'
            : isUnlocked
            ? 'border-purple-500/50'
            : 'border-slate-600'
        }`}
        whileHover={isUnlocked ? { scale: 1.1 } : {}}
      >
        {isActive && !isCompleted && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))',
                filter: 'blur(8px)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </>
        )}

        {isUnlocked ? (
          <span className="text-white font-bold text-lg relative z-10">
            {isCompleted ? '✓' : lesson.id}
          </span>
        ) : (
          <Lock className="w-5 h-5 text-slate-500" />
        )}
      </motion.div>

      <motion.div
        className="mt-3 text-center max-w-20 md:max-w-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <p className={`text-xs font-medium leading-tight ${isUnlocked ? 'text-slate-300' : 'text-slate-500'}`}>
          {lesson.title}
        </p>
        <p className={`text-xs mt-1 ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
          {lesson.duration}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const CircuitPattern = () => (
  <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="none">
    <path d="M10 90 L10 50 L30 50 L30 30 L50 30 L50 10" stroke="url(#circuit-gradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 90 L90 70 L70 70 L70 50 L50 50" stroke="url(#circuit-gradient)" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 90 L50 70 L30 70" stroke="url(#circuit-gradient)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="90" r="3" fill="#8B5CF6" />
    <circle cx="30" cy="50" r="3" fill="#3B82F6" />
    <circle cx="50" cy="30" r="3" fill="#06B6D4" />
    <circle cx="50" cy="10" r="3" fill="#8B5CF6" />
    <circle cx="90" cy="90" r="3" fill="#3B82F6" />
    <circle cx="70" cy="70" r="3" fill="#06B6D4" />
    <circle cx="50" cy="50" r="3" fill="#8B5CF6" />
    <circle cx="50" cy="90" r="3" fill="#3B82F6" />
    <circle cx="30" cy="70" r="3" fill="#06B6D4" />
    <defs>
      <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>
);
