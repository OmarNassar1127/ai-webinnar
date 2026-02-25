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
  Award,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import Header from '../components/layout/Header'
import { Card, Button, ProgressBar, Badge } from '../components/common/'
import { useAuth } from '../context/AuthContext'
import { useLesson } from '../context/LessonContext'
import { useNavigation } from '../context/NavigationContext'
import { useBlockedLessons } from '../hooks/useBlockedLessons'
import { supabase } from '../lib/supabase'

const lessons = [
  { id: 1, title: 'AI Thinking Foundations', duration: '1 hour', icon: '🧠' },
  { id: 2, title: 'How Software Works', duration: '1 hour', icon: '💻' },
  { id: 3, title: 'Claude & Cowork', duration: '1 hour', icon: '🤖' },
  { id: 4, title: 'AI in Action', duration: '1 hour', icon: '⚡' },
  { id: 5, title: 'Your First Build', duration: '1 hour', icon: '🔨' },
  { id: 6, title: 'Building for Operations', duration: '1 hour', icon: '🏗️' },
  { id: 7, title: 'Data & AI', duration: '1 hour', icon: '📊' },
  { id: 8, title: '???', duration: '1 hour', icon: '🔮' },
  { id: 9, title: 'Final Project', duration: '1 hour', icon: '🎓' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function StatCard({ icon: Icon, label, value, color, subtext }) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/20',
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/20',
    cyan: 'from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-cyan-500/20',
    amber: 'from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/20 text-emerald-400 border-emerald-500/20',
  }

  return (
    <Card className={`p-5 border ${colorClasses[color].split(' ').slice(2).join(' ')}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color].split(' ').slice(0, 2).join(' ')}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-slate-400">{label}</p>
          {subtext && <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>}
        </div>
      </div>
    </Card>
  )
}

function LessonCard({ lesson, isCompleted, isUnlocked, quizScore, onAction }) {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      className={`
        relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
        ${isCompleted
          ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30'
          : isUnlocked
            ? 'bg-slate-800/50 border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800/70'
            : 'bg-slate-800/30 border-slate-700/30 opacity-50'
        }
      `}
      onClick={() => isUnlocked && onAction(lesson.id)}
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
        </div>
      )}
      {!isUnlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-4 h-4 text-slate-500" />
        </div>
      )}

      {/* Lesson icon */}
      <div className="text-3xl mb-3">{lesson.icon}</div>

      {/* Lesson info */}
      <div className="mb-3">
        <span className="text-xs font-medium text-slate-500">Lesson {lesson.id}</span>
        <h4 className={`font-medium text-sm leading-tight ${isCompleted ? 'text-emerald-300' : 'text-white'}`}>
          {lesson.title}
        </h4>
      </div>

      {/* Meta info */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {lesson.duration}
        </span>
        {quizScore !== null && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            (quizScore / 6) * 100 >= 70
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/20 text-amber-400'
          }`}>
            {quizScore}/6
          </span>
        )}
      </div>

      {/* Action hint */}
      {isUnlocked && (
        <div className={`mt-3 pt-3 border-t ${isCompleted ? 'border-emerald-500/20' : 'border-slate-700/50'}`}>
          <span className={`text-xs font-medium flex items-center gap-1 ${
            isCompleted ? 'text-emerald-400' : 'text-purple-400'
          }`}>
            {isCompleted ? (
              <><RotateCcw className="w-3 h-3" /> Review</>
            ) : (
              <><Play className="w-3 h-3" /> Start</>
            )}
          </span>
        </div>
      )}
    </motion.div>
  )
}

function QuizResultCard({ quiz, lessonTitle }) {
  const percentage = Math.round((quiz.score / quiz.total_questions) * 100)
  const passed = percentage >= 70

  return (
    <div className={`p-4 rounded-xl border ${
      passed
        ? 'bg-emerald-500/5 border-emerald-500/20'
        : 'bg-amber-500/5 border-amber-500/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
          }`}>
            {passed ? (
              <Trophy className="w-5 h-5 text-emerald-400" />
            ) : (
              <Star className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-white text-sm">{lessonTitle}</p>
            <p className="text-xs text-slate-500">
              {new Date(quiz.completed_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {percentage}%
          </p>
          <p className="text-xs text-slate-500">{quiz.score}/{quiz.total_questions} correct</p>
        </div>
      </div>
    </div>
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

  const handleLessonAction = (lessonId) => {
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
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">My Progress</h1>
              <p className="text-slate-400 text-sm">Track your learning journey and achievements</p>
            </div>
          </div>
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
                subtext={completedLessons === totalLessons ? 'Course complete!' : `${totalLessons - completedLessons} remaining`}
                color="purple"
              />
              <StatCard
                icon={Target}
                label="Overall Progress"
                value={`${overallProgress}%`}
                subtext={overallProgress === 100 ? 'Congratulations!' : 'Keep going!'}
                color="blue"
              />
              <StatCard
                icon={Award}
                label="Quiz Average"
                value={averageQuizScore !== null ? `${averageQuizScore}%` : '--'}
                subtext={averageQuizScore !== null ? (averageQuizScore >= 70 ? 'Great job!' : 'Keep practicing') : 'No quizzes yet'}
                color={averageQuizScore !== null && averageQuizScore >= 70 ? 'emerald' : 'cyan'}
              />
              <StatCard
                icon={Trophy}
                label="Quizzes Taken"
                value={quizHistory.length}
                subtext={quizHistory.length > 0 ? `${quizHistory.filter(q => (q.score / q.total_questions) >= 0.7).length} passed` : 'Start a quiz!'}
                color="amber"
              />
            </motion.div>

            {/* Course Progress Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Course Progress</h2>
                  </div>
                  <span className="text-sm text-slate-400">{completedLessons} of {totalLessons} lessons</span>
                </div>
                <ProgressBar value={overallProgress} showLabel size="lg" glow />

                {overallProgress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center gap-3"
                  >
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <div>
                      <p className="font-medium text-amber-400">Congratulations!</p>
                      <p className="text-sm text-slate-400">You've completed the entire course!</p>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Learning Journey Grid */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Learning Journey</h2>
                    <p className="text-sm text-slate-400">Click a lesson to start or review</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={lesson.id === 1 && isLesson1Completed}
                      isUnlocked={isLessonUnlocked(lesson.id)}
                      quizScore={getQuizScoreForLesson(lesson.id)}
                      onAction={handleLessonAction}
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
                    <div>
                      <h2 className="text-lg font-semibold text-white">Quiz History</h2>
                      <p className="text-sm text-slate-400">Your recent quiz attempts</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quizHistory.map((quiz, index) => {
                      const lessonTitle = lessons.find(l => l.id === quiz.lesson_id)?.title || `Lesson ${quiz.lesson_id}`
                      return (
                        <QuizResultCard
                          key={quiz.id || index}
                          quiz={quiz}
                          lessonTitle={lessonTitle}
                        />
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
