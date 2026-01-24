import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Unlock, ChevronRight, ChevronLeft, Sparkles, Play, Trophy, Target, Lock } from 'lucide-react';
import Header from '../components/layout/Header';
import { Card, Button, Badge, ProgressBar } from '../components/common/';
import { useLesson } from '../context/LessonContext';
import { useAuth } from '../context/AuthContext';
import { useGlobalProgress } from '../context/GlobalProgressContext';
import { FloatingAIGraphic, TimelineNode, CircuitPattern } from '../components/dashboard/DashboardGraphics';

const lessons = [
  { id: 1, title: 'AI Thinking Foundations', duration: '1 hour' },
  { id: 2, title: 'How Software Works', duration: '1 hour' },
  { id: 3, title: 'The AI Tools Landscape', duration: '1 hour' },
  { id: 4, title: 'AI in Action', duration: '1 hour' },
  { id: 5, title: 'Your First Build', duration: '1 hour' },
  { id: 6, title: 'Building for Operations', duration: '1 hour' },
  { id: 7, title: 'Data & AI', duration: '1 hour' },
  { id: 8, title: '???', duration: '1 hour', locked: true },
  { id: 9, title: 'Final Project', duration: '1 hour' },
];

const containerVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.3 } },
};

// Learning Journey component with arrow navigation
const LearningJourney = ({ lessons, isLessonReallyUnlocked, isLessonReallyCompleted, onStartLesson }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-white mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your Learning Journey
      </motion.h2>

      <div className="relative group">
        {/* Left Arrow */}
        <motion.button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12
            rounded-full bg-slate-800/90 border border-slate-700 shadow-lg
            flex items-center justify-center transition-all duration-200
            hover:bg-slate-700 hover:border-purple-500/50 hover:shadow-purple-500/20
            ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            -translate-x-2 md:-translate-x-4`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12
            rounded-full bg-slate-800/90 border border-slate-700 shadow-lg
            flex items-center justify-center transition-all duration-200
            hover:bg-slate-700 hover:border-purple-500/50 hover:shadow-purple-500/20
            ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            translate-x-2 md:translate-x-4`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
        </motion.button>

        {/* Gradient fades on edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-slate-900 to-transparent z-[5] pointer-events-none transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-slate-900 to-transparent z-[5] pointer-events-none transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide px-8 md:px-16 py-4"
        >
          <div className="flex items-start justify-start min-w-max">
            {lessons.map((lesson, index) => (
              <TimelineNode
                key={lesson.id}
                lesson={lesson}
                index={index}
                totalLessons={lessons.length}
                isUnlocked={isLessonReallyUnlocked(lesson.id)}
                isActive={isLessonReallyUnlocked(lesson.id) && !isLessonReallyCompleted(lesson.id)}
                isCompleted={isLessonReallyCompleted(lesson.id)}
                onClick={(lessonId) => onStartLesson(lessonId)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard({ onStartLesson }) {
  const { lessonProgress, quizScore, sectionCompletion } = useLesson();
  const { user, profile, openAuthModal } = useAuth();
  const { isLessonUnlocked, isLessonCompleted: checkLessonCompleted, getOverallProgress, refetch } = useGlobalProgress();

  const isLesson1Completed = sectionCompletion?.every(Boolean) || false;
  const completedSections = sectionCompletion?.filter(Boolean).length || 0;
  const overallProgress = getOverallProgress();

  // Refetch global progress when dashboard mounts to pick up any lesson completions
  useEffect(() => {
    // Fetch immediately on mount
    refetch();
    // Also fetch after a delay to catch any pending saves (debounce is 500ms)
    const timer = setTimeout(refetch, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Use local state for lesson 1 completion check since we have it from LessonContext
  const isLessonReallyCompleted = (lessonId) => {
    if (lessonId === 1) return isLesson1Completed;
    return checkLessonCompleted(lessonId);
  };

  // Use combined unlock check - for lesson 2, check if lesson 1 is locally complete
  const isLessonReallyUnlocked = (lessonId) => {
    if (lessonId === 1) return true;
    if (lessonId === 2) return isLesson1Completed;
    return isLessonUnlocked(lessonId);
  };

  const getGreeting = () => {
    if (!user) return 'Welcome, Learner';
    const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Learner';
    return `Welcome back, ${firstName}!`;
  };

  // Find the next lesson to show (first unlocked but not completed, or first lesson)
  const getNextLesson = () => {
    for (const lesson of lessons) {
      if (isLessonReallyUnlocked(lesson.id) && !isLessonReallyCompleted(lesson.id)) {
        return lesson;
      }
    }
    // All completed - return the first lesson as a fallback
    return lessons[0];
  };

  const nextLesson = getNextLesson();
  const isNextLessonCompleted = nextLesson ? isLessonReallyCompleted(nextLesson.id) : false;

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Header />

      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          className="relative py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          variants={itemVariants}
        >
          <div className="flex-1 text-center lg:text-left">
            {user && (
              <motion.p
                className="text-lg text-slate-400 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {getGreeting()}
              </motion.p>
            )}

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
              to boost productivity and streamline your daily operations.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="primary" size="lg" icon={<Play className="w-5 h-5" />} onClick={() => onStartLesson(1)}>
                {lessonProgress > 0 ? 'Continue Learning' : 'Start Learning'}
              </Button>
              {!user && (
                <Button variant="secondary" size="lg" onClick={() => openAuthModal('signup')}>
                  Create Account
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <FloatingAIGraphic />
          </motion.div>
        </motion.section>

        {/* Your Stats Section - Only for logged in users */}
        {user && (
          <motion.section className="py-8" variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Your Progress</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{overallProgress.completed}/9</p>
                  <p className="text-sm text-slate-400">Lessons Completed</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{completedSections}/8</p>
                  <p className="text-sm text-slate-400">L1 Sections</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{quizScore !== null ? `${quizScore}/6` : '-'}</p>
                  <p className="text-sm text-slate-400">L1 Quiz Score</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{overallProgress.percentage}%</p>
                  <p className="text-sm text-slate-400">Overall Progress</p>
                </div>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Sign In Prompt for non-authenticated users */}
        {!user && (
          <motion.section className="py-8" variants={itemVariants}>
            <Card className="p-6 text-center">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Track Your Progress</h3>
              <p className="text-slate-400 mb-4">
                Sign in to save your progress and access it from any device.
              </p>
              <Button variant="primary" size="sm" onClick={() => openAuthModal('login')}>
                Sign In to Track Progress
              </Button>
            </Card>
          </motion.section>
        )}

        {/* Learning Journey Map */}
        <LearningJourney
          lessons={lessons}
          isLessonReallyUnlocked={isLessonReallyUnlocked}
          isLessonReallyCompleted={isLessonReallyCompleted}
          onStartLesson={onStartLesson}
        />

        {/* Main Lesson Card */}
        <motion.section className="py-12" variants={itemVariants}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card gradient glowColor="purple" className="relative overflow-hidden max-w-3xl mx-auto">
              <CircuitPattern />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="active" pulse icon={<Sparkles className="w-3 h-3" />}>
                    Lesson {nextLesson.id}
                  </Badge>
                  <Badge variant="success" icon={<Unlock className="w-3 h-3" />}>
                    {isNextLessonCompleted ? 'Completed' : 'Unlocked'}
                  </Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {nextLesson.title}
                </h3>
                <p className="text-slate-400 text-lg mb-6">
                  {nextLesson.id === 1 && 'Understand how AI really works and why your input matters. Build a solid foundation for effective AI collaboration.'}
                  {nextLesson.id === 2 && 'Learn the basics of how software works, so you can communicate effectively with developers and AI tools.'}
                  {nextLesson.id === 3 && 'Explore the landscape of AI tools and understand when to use each type.'}
                  {nextLesson.id === 4 && 'See AI in action with real-world examples and hands-on exercises.'}
                  {nextLesson.id === 5 && 'Build your first AI-powered tool from scratch.'}
                  {nextLesson.id === 6 && 'Learn to build AI tools specifically for operations workflows.'}
                  {nextLesson.id === 7 && 'Master data analysis and reporting with AI assistance.'}
                  {nextLesson.id === 8 && 'Discover the secret lesson and advanced AI techniques.'}
                  {nextLesson.id === 9 && 'Complete your final project and showcase your AI skills.'}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>{nextLesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>Beginner Friendly</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Play className="w-5 h-5" />}
                    onClick={() => onStartLesson(nextLesson.id)}
                    className="w-full md:w-auto"
                  >
                    {isNextLessonCompleted ? 'Review Lesson' : 'Start Lesson'}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </Card>
          </motion.div>
        </motion.section>

        {/* Quick Stats Section */}
        <motion.section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6" variants={itemVariants}>
          {[
            { icon: <Brain className="w-6 h-6" />, label: 'Total Lessons', value: '9', color: 'purple' },
            { icon: <Clock className="w-6 h-6" />, label: 'Total Duration', value: '9 Hours', color: 'blue' },
            { icon: <Sparkles className="w-6 h-6" />, label: 'Hands-on Projects', value: '5+', color: 'cyan' },
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
