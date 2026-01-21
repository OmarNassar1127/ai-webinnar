import { motion } from 'framer-motion';

/**
 * Badge Component
 * A status badge with multiple variants and optional pulse animation
 *
 * @param {React.ReactNode} children - Badge content
 * @param {'default' | 'success' | 'warning' | 'locked' | 'active'} variant - Badge style variant
 * @param {'sm' | 'md'} size - Badge size
 * @param {React.ReactNode} icon - Optional icon element
 * @param {boolean} pulse - Whether to show pulse animation (useful for active state)
 * @param {string} className - Additional CSS classes
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
  };

  // Variant styling
  const variantClasses = {
    default: `
      bg-slate-700/80
      text-gray-300
      border border-slate-600/50
    `,
    success: `
      bg-emerald-500/20
      text-emerald-400
      border border-emerald-500/30
    `,
    warning: `
      bg-amber-500/20
      text-amber-400
      border border-amber-500/30
    `,
    locked: `
      bg-slate-800/80
      text-gray-500
      border border-slate-700/50
    `,
    active: `
      bg-purple-500/20
      text-purple-400
      border border-purple-500/30
    `,
  };

  // Pulse colors for the animation
  const pulseColors = {
    default: 'bg-slate-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    locked: 'bg-gray-500',
    active: 'bg-purple-400',
  };

  // Icon colors
  const iconColors = {
    default: 'text-gray-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    locked: 'text-gray-500',
    active: 'text-purple-400',
  };

  return (
    <motion.span
      className={`
        inline-flex
        items-center
        justify-center
        font-medium
        rounded-full
        backdrop-blur-sm
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 25
      }}
    >
      {/* Pulse indicator */}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`
              animate-ping
              absolute
              inline-flex
              h-full
              w-full
              rounded-full
              opacity-75
              ${pulseColors[variant]}
            `}
          />
          <span
            className={`
              relative
              inline-flex
              rounded-full
              h-2
              w-2
              ${pulseColors[variant]}
            `}
          />
        </span>
      )}

      {/* Icon */}
      {icon && (
        <span className={`flex-shrink-0 ${iconColors[variant]}`}>
          {icon}
        </span>
      )}

      {/* Content */}
      {children}
    </motion.span>
  );
};

export default Badge;
