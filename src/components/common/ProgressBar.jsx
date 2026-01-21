import { motion } from 'framer-motion';

/**
 * ProgressBar Component
 * An animated progress bar with gradient fill and optional glow effect
 *
 * @param {number} value - Progress value (0-100)
 * @param {boolean} showLabel - Whether to show percentage label
 * @param {'sm' | 'md' | 'lg'} size - Bar height size
 * @param {boolean} animated - Whether to animate on mount/change
 * @param {boolean} glow - Whether to show glow effect
 * @param {string} className - Additional CSS classes
 */
const ProgressBar = ({
  value = 0,
  showLabel = false,
  size = 'md',
  animated = true,
  glow = true,
  className = '',
}) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  // Size classes for the bar height
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  // Label size classes
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={`text-gray-300 ${labelSizeClasses[size]}`}>
            Progress
          </span>
          <motion.span
            className={`text-white font-semibold ${labelSizeClasses[size]}`}
            key={clampedValue}
            initial={animated ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(clampedValue)}%
          </motion.span>
        </div>
      )}

      <div
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          bg-slate-700/50
          rounded-full
          overflow-hidden
          backdrop-blur-sm
        `}
      >
        <motion.div
          className={`
            absolute
            inset-y-0
            left-0
            bg-gradient-to-r
            from-purple-600
            via-blue-500
            to-cyan-500
            rounded-full
            ${glow ? 'shadow-lg shadow-purple-500/30' : ''}
          `}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
          }}
        >
          {/* Shimmer effect */}
          {animated && clampedValue > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>

        {/* Glow effect overlay */}
        {glow && clampedValue > 0 && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full blur-sm bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50"
            initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
            animate={{ width: `${clampedValue}%` }}
            transition={{
              duration: animated ? 0.8 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ zIndex: -1 }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
