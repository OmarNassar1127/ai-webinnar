import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Car, FileText, Zap, ChevronRight, BarChart3 } from 'lucide-react';

// Satellite tool icons that orbit the central brain in the animated visual
const ORBIT_TOOLS = [
  { label: 'Email',        angle: 0,   color: '#06B6D4', icon: '✉' },
  { label: 'Files',        angle: 60,  color: '#8B5CF6', icon: '📄' },
  { label: 'Sheets',       angle: 120, color: '#10B981', icon: '📊' },
  { label: 'Calendar',     angle: 180, color: '#F59E0B', icon: '📅' },
  { label: 'Fleet',        angle: 240, color: '#EF4444', icon: '🚗' },
  { label: 'Contracts',    angle: 300, color: '#3B82F6', icon: '📋' },
];

// Convert polar angle + radius to Cartesian offset from the centre of a 160×160 container
function polarToCartesian(angleDeg, radius) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
  };
}

/**
 * CoworkVisual
 * A central "brain" icon with six satellite tool nodes orbiting it.
 * Animated connection lines pulse outward from the centre to each node.
 */
function CoworkVisual() {
  return (
    <div className="relative w-40 h-40 mx-auto mb-8">
      {/* Outer glow halo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-orange-400/20 to-blue-500/30 rounded-full blur-2xl" />

      {/* Animated connection lines */}
      {ORBIT_TOOLS.map((tool, i) => {
        const { x, y } = polarToCartesian(tool.angle, 55);
        const rotation = tool.angle - 90; // rotate the line to point at the node
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: 55,
              height: 2,
              transformOrigin: '0 50%',
              rotate: rotation,
              x: 0,
              y: -1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.33,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${tool.color}99, ${tool.color}00)`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Central brain / logo circle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 20px rgba(124, 58, 237, 0.4)',
            '0 0 40px rgba(124, 58, 237, 0.7)',
            '0 0 20px rgba(124, 58, 237, 0.4)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-orange-400 flex items-center justify-center shadow-lg shadow-purple-500/40 border border-white/10">
          <Sparkles className="w-9 h-9 text-white" />
        </div>
      </motion.div>

      {/* Orbiting satellite nodes */}
      {ORBIT_TOOLS.map((tool, i) => {
        const { x, y } = polarToCartesian(tool.angle, 62);
        return (
          <motion.div
            key={`node-${i}`}
            className="absolute w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg border border-white/10"
            style={{
              left: `calc(50% + ${x}px - 16px)`,
              top: `calc(50% + ${y}px - 16px)`,
              backgroundColor: `${tool.color}22`,
              borderColor: `${tool.color}55`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.05, 0.9],
            }}
            transition={{
              opacity: { duration: 0.4, delay: i * 0.1 },
              scale: {
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              },
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>{tool.icon}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// Learning objective data
const OBJECTIVES = [
  {
    icon: Sparkles,
    title: 'Meet Claude & Cowork',
    description:
      'Understand the evolution from chatbots to an AI that can take real action on your behalf',
    color: 'purple',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-violet-600/20',
    border: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    iconColor: 'text-purple-400',
    shadow: 'hover:shadow-purple-500/10',
  },
  {
    icon: Car,
    secondaryIcon: BarChart3,
    title: 'Cowork for Vloto',
    description:
      'Explore 50+ real use cases across contracts, fleet management, data analysis, and more',
    color: 'cyan',
    gradientFrom: 'from-cyan-500/20',
    gradientTo: 'to-blue-600/20',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/60',
    iconColor: 'text-cyan-400',
    shadow: 'hover:shadow-cyan-500/10',
  },
  {
    icon: FileText,
    title: 'Getting Started',
    description:
      'Learn how to use Cowork effectively and start automating your workflows today',
    color: 'emerald',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-green-600/20',
    border: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    iconColor: 'text-emerald-400',
    shadow: 'hover:shadow-emerald-500/10',
  },
];

/**
 * Introduction — Lesson 3
 * "Claude & Cowork: Your AI Operations Partner"
 *
 * @param {{ onComplete: () => void }} props
 */
function Introduction({ onComplete }) {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowObjectives(true), 800);
    const timer2 = setTimeout(() => setShowNote(true), 1600);
    const timer3 = setTimeout(() => setShowButton(true), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Animated Cowork visual */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
        >
          <CoworkVisual />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
            Claude &amp; Cowork
          </span>
          <br />
          <span className="text-white text-3xl md:text-4xl font-semibold">
            Your AI Operations Partner
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Meet the AI that doesn&apos;t just talk &mdash; it works. Discover how Claude Cowork
          transforms daily operations at Vloto.
        </motion.p>
      </motion.div>

      {/* ── Learning Objectives ─────────────────────────────────────── */}
      <AnimatePresence>
        {showObjectives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-lg font-semibold text-slate-400 mb-6 text-center uppercase tracking-wider">
              In this lesson, you&apos;ll learn:
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {OBJECTIVES.map((obj, index) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.45,
                    type: 'spring',
                    stiffness: 220,
                  }}
                  className={`
                    p-6 rounded-2xl
                    bg-slate-800/60 backdrop-blur-sm
                    border ${obj.border}
                    ${obj.hoverBorder}
                    hover:shadow-lg ${obj.shadow}
                    transition-all duration-300
                  `}
                >
                  {/* Icon badge row — primary icon + optional secondary icon */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-gradient-to-br ${obj.gradientFrom} ${obj.gradientTo}
                      `}
                    >
                      <obj.icon className={`w-6 h-6 ${obj.iconColor}`} />
                    </div>
                    {obj.secondaryIcon && (
                      <div
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center
                          bg-gradient-to-br ${obj.gradientFrom} ${obj.gradientTo}
                          opacity-70
                        `}
                      >
                        <obj.secondaryIcon className={`w-4 h-4 ${obj.iconColor}`} />
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-white mb-2">{obj.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{obj.description}</p>

                  {/* Animated bottom accent line */}
                  <motion.div
                    className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${obj.gradientFrom} ${obj.gradientTo}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Why This Matters note ───────────────────────────────────── */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-amber-900/30 border border-amber-500/30">
              {/* Background glow layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/8 to-orange-500/8 blur-xl pointer-events-none" />

              <div className="relative flex items-start gap-4">
                {/* Zap icon with subtle wobble */}
                <motion.div
                  animate={{ rotate: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>

                <div>
                  <h3 className="font-semibold text-amber-300 text-sm uppercase tracking-wider mb-2">
                    Why This Matters
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Claude Cowork triggered a{' '}
                    <strong className="text-white">$285 billion</strong> software stocks selloff.
                    The biggest companies in the world see this as a game-changer. At Vloto, it
                    means you can do in{' '}
                    <strong className="text-amber-300">minutes</strong> what used to take{' '}
                    <strong className="text-amber-300">hours</strong> &mdash; from contract
                    analysis to fleet optimization to instant data reports.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA Button ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.button
              onClick={onComplete}
              className="
                inline-flex items-center gap-3 px-8 py-4
                bg-gradient-to-r from-purple-600 via-violet-600 to-orange-500
                hover:from-purple-500 hover:via-violet-500 hover:to-orange-400
                rounded-2xl font-semibold text-white text-lg
                shadow-lg shadow-purple-500/30
                transition-colors duration-300
              "
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-5 h-5" />
              Let&apos;s Explore
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Introduction;
