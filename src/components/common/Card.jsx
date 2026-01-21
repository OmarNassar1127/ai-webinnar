import { motion } from 'framer-motion';

/**
 * Card Component
 * A reusable card with glassmorphism effect, optional gradient border, and glow on hover
 *
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {'purple' | 'cyan' | 'green'} glowColor - Glow color on hover
 * @param {boolean} gradient - Whether to show gradient border
 * @param {function} onClick - Click handler
 */
const Card = ({
  children,
  className = '',
  glowColor = 'purple',
  gradient = false,
  onClick,
}) => {
  // Glow color mapping
  const glowColors = {
    purple: 'hover:shadow-purple-500/25',
    cyan: 'hover:shadow-cyan-500/25',
    green: 'hover:shadow-emerald-500/25',
  };

  // Gradient border colors
  const gradientBorders = {
    purple: 'from-purple-500 via-blue-500 to-cyan-500',
    cyan: 'from-cyan-500 via-blue-500 to-purple-500',
    green: 'from-emerald-500 via-cyan-500 to-blue-500',
  };

  const baseClasses = `
    relative
    rounded-2xl
    overflow-hidden
    transition-shadow
    duration-300
    ${glowColors[glowColor]}
  `;

  const innerClasses = `
    bg-slate-800/80
    backdrop-blur-xl
    rounded-2xl
    p-6
    h-full
    border
    border-white/10
  `;

  if (gradient) {
    return (
      <motion.div
        className={`${baseClasses} p-[1px] bg-gradient-to-r ${gradientBorders[glowColor]} ${className}`}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <div className={innerClasses}>
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        ${baseClasses}
        bg-slate-800/80
        backdrop-blur-xl
        border
        border-white/10
        p-6
        ${className}
      `}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)'
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
