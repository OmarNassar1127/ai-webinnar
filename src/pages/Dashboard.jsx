import { motion } from 'framer-motion';
import { Brain, Clock, Lock, Unlock, ChevronRight, Sparkles, Play } from 'lucide-react';
import Header from '../components/layout/Header';
import { Card, Button, Badge, ProgressBar } from '../components/common/';
import { useLesson } from '../context/LessonContext';

// Lesson data
const lessons = [
  { id: 1, title: 'AI Thinking Foundations', duration: '1 hour' },
  { id: 2, title: 'Prompt Engineering', duration: '1 hour' },
  { id: 3, title: 'ChatGPT Mastery', duration: '1 hour' },
  { id: 4, title: 'Claude & Competitors', duration: '1 hour' },
  { id: 5, title: 'AI for Email & Docs', duration: '1 hour' },
  { id: 6, title: 'AI for Data Analysis', duration: '1 hour' },
  { id: 7, title: 'AI for Customer Service', duration: '1 hour' },
  { id: 8, title: 'AI Workflows', duration: '1 hour' },
  { id: 9, title: 'Final Project', duration: '1 hour' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

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

// Floating AI Graphic Component
const FloatingAIGraphic = () => {
  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80"
      variants={floatVariants}
      animate="animate"
    >
      {/* Central brain icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
      >
        <div className="relative">
          {/* Outer glow rings */}
          <motion.div
            className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-lg"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          {/* Brain container */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 shadow-2xl shadow-purple-500/30">
            <Brain className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Orbiting nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
        <motion.div
          key={angle}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
          style={{
            top: '50%',
            left: '50%',
          }}
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

      {/* Neural network lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 320"
      >
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

// Timeline Node Component
const TimelineNode = ({ lesson, index, isUnlocked, isActive, progress }) => {
  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    >
      {/* Connection line to next node */}
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
          {/* Animated dots on line */}
          {isUnlocked && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}

      {/* Node circle */}
      <motion.div
        className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
          isActive
            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
            : isUnlocked
            ? 'bg-gradient-to-br from-purple-600/50 to-blue-600/50'
            : 'bg-slate-700/50'
        } border-2 ${
          isActive
            ? 'border-purple-400'
            : isUnlocked
            ? 'border-purple-500/50'
            : 'border-slate-600'
        }`}
        whileHover={isUnlocked ? { scale: 1.1 } : {}}
      >
        {/* Active pulse animation */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))',
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </>
        )}

        {/* Icon */}
        {isUnlocked ? (
          <span className="text-white font-bold text-lg relative z-10">{lesson.id}</span>
        ) : (
          <Lock className="w-5 h-5 text-slate-500" />
        )}
      </motion.div>

      {/* Lesson title */}
      <motion.div
        className="mt-3 text-center max-w-20 md:max-w-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <p
          className={`text-xs font-medium leading-tight ${
            isUnlocked ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {lesson.title}
        </p>
        <p
          className={`text-xs mt-1 ${
            isUnlocked ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {lesson.duration}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Circuit Pattern SVG for decoration
const CircuitPattern = () => (
  <svg
    className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
    viewBox="0 0 100 100"
    fill="none"
  >
    <path
      d="M10 90 L10 50 L30 50 L30 30 L50 30 L50 10"
      stroke="url(#circuit-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M90 90 L90 70 L70 70 L70 50 L50 50"
      stroke="url(#circuit-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M50 90 L50 70 L30 70"
      stroke="url(#circuit-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
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

export default function Dashboard({ onStartLesson }) {
  const { lessonProgress } = useLesson();
  // For now, only lesson 1 is available
  const isLessonUnlocked = (id) => id === 1;
  const lesson1Progress = { progress: lessonProgress };

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      {/* Main content with padding for fixed header */}
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          className="relative py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          variants={itemVariants}
        >
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">9 Comprehensive Lessons</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block text-white">Master AI for</span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Operations
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Transform how you work with artificial intelligence. Learn to leverage AI tools
              to boost productivity and streamline your daily operations. Created by Omar and his AI agents.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<Play className="w-5 h-5" />}
                onClick={onStartLesson}
              >
                {lesson1Progress.progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </Button>
                          </motion.div>
          </div>

          {/* Floating AI Graphic */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <FloatingAIGraphic />
          </motion.div>
        </motion.section>

        {/* Learning Journey Map */}
        <motion.section className="py-12" variants={itemVariants}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Learning Journey
          </motion.h2>

          {/* Timeline container with horizontal scroll on mobile */}
          <div className="relative overflow-x-auto pb-4">
            <div className="flex items-start gap-4 md:gap-6 lg:gap-8 min-w-max px-4 md:px-0 justify-center">
              {lessons.map((lesson, index) => (
                <TimelineNode
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isUnlocked={isLessonUnlocked(lesson.id)}
                  isActive={lesson.id === 1}
                  progress={lesson.id === 1 ? lessonProgress : 0}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint for mobile */}
          <motion.p
            className="text-center text-slate-500 text-sm mt-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Scroll to see all lessons
          </motion.p>
        </motion.section>

        {/* Main Lesson Card */}
        <motion.section className="py-12" variants={itemVariants}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card gradient glowColor="purple" className="relative overflow-hidden max-w-3xl mx-auto">
              {/* Circuit pattern decoration */}
              <CircuitPattern />

              {/* Content */}
              <div className="relative z-10">
                {/* Header with badge */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="active" pulse icon={<Sparkles className="w-3 h-3" />}>
                    Lesson 1
                  </Badge>
                  <Badge variant="success" icon={<Unlock className="w-3 h-3" />}>
                    Unlocked
                  </Badge>
                </div>

                {/* Title and description */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  AI Thinking Foundations
                </h3>
                <p className="text-slate-400 text-lg mb-6">
                  Understand how AI really works and why your input matters. Build a solid
                  foundation for effective AI collaboration.
                </p>

                {/* Duration and metadata */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>60 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>Beginner Friendly</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <ProgressBar
                    value={lesson1Progress.progress}
                    showLabel
                    size="md"
                    glow
                  />
                </div>

                {/* Action button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Play className="w-5 h-5" />}
                    onClick={onStartLesson}
                    className="w-full md:w-auto"
                  >
                    {lesson1Progress.progress > 0 ? 'Continue Lesson' : 'Start Lesson'}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.div>
              </div>

              {/* Decorative gradient orbs */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </Card>
          </motion.div>
        </motion.section>

        {/* Quick Stats Section */}
        <motion.section
          className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {[
            {
              icon: <Brain className="w-6 h-6" />,
              label: 'Total Lessons',
              value: '9',
              color: 'purple',
            },
            {
              icon: <Clock className="w-6 h-6" />,
              label: 'Total Duration',
              value: '9 Hours',
              color: 'blue',
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              label: 'Hands-on Projects',
              value: '5+',
              color: 'cyan',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Card className="text-center py-8">
                <motion.div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    stat.color === 'purple'
                      ? 'bg-purple-500/20 text-purple-400'
                      : stat.color === 'blue'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </motion.div>
  );
}
