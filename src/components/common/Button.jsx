import { motion } from 'framer-motion';

/**
 * Button Component
 * A reusable button with multiple variants, sizes, and states
 *
 * @param {React.ReactNode} children - Button content
 * @param {'primary' | 'secondary' | 'ghost'} variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} size - Button size
 * @param {React.ReactNode} icon - Icon element
 * @param {'left' | 'right'} iconPosition - Icon position
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-7 py-3.5 text-lg gap-2.5',
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-600 to-blue-600
      text-white
      border-0
      hover:from-purple-500 hover:to-blue-500
    `,
    secondary: `
      bg-transparent
      text-white
      border-2 border-purple-500/50
      hover:border-purple-400
      hover:bg-purple-500/10
    `,
    ghost: `
      bg-transparent
      text-gray-300
      border-0
      hover:text-white
      hover:bg-white/5
    `,
  };

  // Glow effects for hover
  const glowEffects = {
    primary: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
    secondary: '0 0 20px rgba(124, 58, 237, 0.3)',
    ghost: 'none',
  };

  // Spinner component
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        rounded-xl
        transition-colors
        duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? {} : {
        scale: 1.05,
        boxShadow: glowEffects[variant]
      }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
