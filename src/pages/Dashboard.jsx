import { motion } from 'framer-motion';
import { Brain, Clock, Unlock, ChevronRight, Sparkles, Play, Trophy, Target } from 'lucide-react';
import Header from '../components/layout/Header';
import { Card, Button, Badge, ProgressBar } from '../components/common/';
import { useLesson } from '../context/LessonContext';
import { useAuth } from '../context/AuthContext';
import { FloatingAIGraphic, TimelineNode, CircuitPattern } from '../components/dashboard/DashboardGraphics';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Dashboard({ onStartLesson }) {
  const { lessonProgress, quizScore, sectionCompletion } = useLesson();
  const { user, profile, openAuthModal } = useAuth();

  const isLessonUnlocked = (id) => id === 1;
  const isLessonCompleted = sectionCompletion?.every(Boolean) || false;
  const completedSections = sectionCompletion?.filter(Boolean).length || 0;

  const getGreeting = () => {
    if (!user) return 'Welcome, Learner';
    const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Learner';
    return `Welcome back, ${firstName}!`;
  };

  return (
    <motion.div className="min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
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
              <Button variant="primary" size="lg" icon={<Play className="w-5 h-5" />} onClick={onStartLesson}>
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
                  <p className="text-2xl font-bold text-white">{isLessonCompleted ? 1 : 0}/9</p>
                  <p className="text-sm text-slate-400">Lessons Completed</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{completedSections}/8</p>
                  <p className="text-sm text-slate-400">Sections Done</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{quizScore !== null ? `${quizScore}/6` : '-'}</p>
                  <p className="text-sm text-slate-400">Quiz Score</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50">
                  <p className="text-2xl font-bold text-white">{lessonProgress}%</p>
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
        <motion.section className="py-12" variants={itemVariants}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Learning Journey
          </motion.h2>

          <div className="relative overflow-x-auto pb-4">
            <div className="flex items-start gap-4 md:gap-6 lg:gap-8 min-w-max px-4 md:px-0 justify-center">
              {lessons.map((lesson, index) => (
                <TimelineNode
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  isUnlocked={isLessonUnlocked(lesson.id)}
                  isActive={lesson.id === 1 && !isLessonCompleted}
                  isCompleted={lesson.id === 1 && isLessonCompleted}
                />
              ))}
            </div>
          </div>

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
              <CircuitPattern />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="active" pulse icon={<Sparkles className="w-3 h-3" />}>
                    Lesson 1
                  </Badge>
                  <Badge variant="success" icon={<Unlock className="w-3 h-3" />}>
                    {isLessonCompleted ? 'Completed' : 'Unlocked'}
                  </Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  AI Thinking Foundations
                </h3>
                <p className="text-slate-400 text-lg mb-6">
                  Understand how AI really works and why your input matters. Build a solid
                  foundation for effective AI collaboration.
                </p>

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

                <div className="mb-8">
                  <ProgressBar value={lessonProgress} showLabel size="md" glow />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Play className="w-5 h-5" />}
                    onClick={onStartLesson}
                    className="w-full md:w-auto"
                  >
                    {isLessonCompleted ? 'Review Lesson' : lessonProgress > 0 ? 'Continue Lesson' : 'Start Lesson'}
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
