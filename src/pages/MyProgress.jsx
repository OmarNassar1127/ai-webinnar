import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  BookOpen,
  ArrowLeft,
  Loader2,
  Star,
  Lock,
  Award
} from 'lucide-react'
import Header from '../components/layout/Header'
import { Card, Button, ProgressBar, Badge } from '../components/common/'
import { useAuth } from '../context/AuthContext'
import { useLesson } from '../context/LessonContext'
import { useNavigation } from '../context/NavigationContext'
import { useBlockedLessons } from '../hooks/useBlockedLessons'
import { supabase } from '../lib/supabase'

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
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function StatCard({ icon: Icon, label, value, subValue, color }) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-400',
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-400',
    cyan: 'from-cyan-500/20 to-cyan-600/20 text-cyan-400',
    amber: 'from-amber-500/20 to-amber-600/20 text-amber-400',
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-slate-400">{label}</p>
          {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
        </div>
      </div>
    </Card>
  )
}

function LessonJourneyCard({ lesson, isCompleted, isUnlocked, quizScore, onReview }) {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      className={`
        relative p-4 rounded-xl border transition-all duration-200
        ${isCompleted
          ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
          : isUnlocked
            ? 'bg-slate-800/50 border-slate-700/50 hover:border-purple-500/30'
            : 'bg-slate-800/30 border-slate-700/30 opacity-60'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${isCompleted
              ? 'bg-green-500/20 text-green-400'
              : isUnlocked
                ? 'bg-purple-500/20 text-purple-400'
                : 'bg-slate-700/50 text-slate-500'
            }
          `}>
            {isCompleted ? <CheckCircle className="w-5 h-5" /> : lesson.id}
          </div>

          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-green-300' : 'text-white'}`}>
              {lesson.title}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lesson.duration}
              </span>
              {quizScore !== null && (
                <span className="text-xs text-cyan-400 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Quiz: {quizScore}/6
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
              Completed
            </Badge>
          )}
          {!isUnlocked && (
            <Lock className="w-4 h-4 text-slate-500" />
          )}
          {isUnlocked && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onReview(lesson.id)}
            >
              {isCompleted ? 'Review' : 'Start'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function MyProgress() {
  const { user, openAuthModal } = useAuth()
  const { sectionCompletion, quizScore, lessonProgress, loading: lessonLoading } = useLesson()
  const { navigateTo } = useNavigation()
  const { isLessonBlocked } = useBlockedLessons()
  const [quizHistory, setQuizHistory] = useState([])
  const [loadingQuizHistory, setLoadingQuizHistory] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      openAuthModal('login')
      navigateTo('dashboard')
    }
  }, [user, openAuthModal, navigateTo])

  // Fetch quiz history from Supabase
  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })

        if (error) throw error
        setQuizHistory(data || [])
      } catch (err) {
        console.error('Error fetching quiz history:', err)
      } finally {
        setLoadingQuizHistory(false)
      }
    }

    fetchQuizHistory()
  }, [user])

  // Calculate stats
  const isLesson1Completed = sectionCompletion?.every(Boolean) || false
  const completedLessons = isLesson1Completed ? 1 : 0
  const totalLessons = 9
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  // Calculate average quiz score
  const averageQuizScore = quizHistory.length > 0
    ? Math.round(quizHistory.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / quizHistory.length)
    : null

  const handleReviewLesson = (lessonId) => {
    if (lessonId === 1) {
      navigateTo('lesson1')
    }
  }

  // Check if lesson is unlocked (not blocked and meets requirements)
  const isLessonUnlocked = (id) => {
    if (isLessonBlocked(id)) return false
    return id === 1 // Only lesson 1 is available for now
  }

  // Get quiz score for a lesson
  const getQuizScoreForLesson = (lessonId) => {
    const result = quizHistory.find(q => q.lesson_id === lessonId)
    return result ? result.score : null
  }

  if (!user) {
    return null
  }

  const isLoading = lessonLoading || loadingQuizHistory

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header onLogoClick={() => navigateTo('dashboard')} />

      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigateTo('dashboard')}
            className="mb-6"
          >
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Progress</h1>
          </div>
          <p className="text-slate-400">Track your learning journey and achievements</p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div variants={itemVariants} className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <p className="text-slate-400">Loading your progress...</p>
            </div>
          </motion.div>
        )}

        {!isLoading && (
          <>
            {/* Stats Overview */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <StatCard
                icon={BookOpen}
                label="Lessons Completed"
                value={`${completedLessons}/${totalLessons}`}
                color="purple"
              />
              <StatCard
                icon={Target}
                label="Overall Progress"
                value={`${overallProgress}%`}
                color="blue"
              />
              <StatCard
                icon={Award}
                label="Quiz Average"
                value={averageQuizScore !== null ? `${averageQuizScore}%` : '-'}
                color="cyan"
              />
              <StatCard
                icon={Trophy}
                label="Quizzes Taken"
                value={quizHistory.length}
                color="amber"
              />
            </motion.div>

            {/* Overall Progress Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Course Progress</h2>
                  <span className="text-sm text-slate-400">{completedLessons} of {totalLessons} lessons</span>
                </div>
                <ProgressBar value={overallProgress} showLabel size="lg" glow />

                {overallProgress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-amber-400"
                  >
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Congratulations! You've completed the course!</span>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Learning Journey */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Learning Journey</h2>
                </div>

                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <LessonJourneyCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={lesson.id === 1 && isLesson1Completed}
                      isUnlocked={isLessonUnlocked(lesson.id)}
                      quizScore={getQuizScoreForLesson(lesson.id)}
                      onReview={handleReviewLesson}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quiz History */}
            {quizHistory.length > 0 && (
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                      <Star className="w-5 h-5 text-amber-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Quiz History</h2>
                  </div>

                  <div className="space-y-3">
                    {quizHistory.map((quiz, index) => {
                      const lessonTitle = lessons.find(l => l.id === quiz.lesson_id)?.title || `Lesson ${quiz.lesson_id}`
                      const percentage = Math.round((quiz.score / quiz.total_questions) * 100)
                      const passed = percentage >= 70

                      return (
                        <div
                          key={quiz.id || index}
                          className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                        >
                          <div>
                            <p className="font-medium text-white">{lessonTitle}</p>
                            <p className="text-sm text-slate-400">
                              {new Date(quiz.completed_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className={`font-bold ${passed ? 'text-green-400' : 'text-amber-400'}`}>
                                {quiz.score}/{quiz.total_questions}
                              </p>
                              <p className="text-xs text-slate-400">{percentage}%</p>
                            </div>
                            <Badge variant={passed ? 'success' : 'warning'}>
                              {passed ? 'Passed' : 'Retry'}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </main>
    </motion.div>
  )
}
