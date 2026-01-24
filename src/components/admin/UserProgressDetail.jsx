import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Lock,
  BookOpen,
  Award,
  Calendar
} from 'lucide-react'
import { ProgressBar } from '../common'

// Lesson data matching Dashboard.jsx
const lessons = [
  { id: 1, title: 'AI Thinking Foundations' },
  { id: 2, title: 'Prompt Engineering' },
  { id: 3, title: 'ChatGPT Mastery' },
  { id: 4, title: 'Claude & Competitors' },
  { id: 5, title: 'AI for Email & Docs' },
  { id: 6, title: 'AI for Data Analysis' },
  { id: 7, title: 'AI for Customer Service' },
  { id: 8, title: 'AI Workflows' },
  { id: 9, title: 'Final Project' },
]

function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function LessonRow({ lesson, progress, quizScore }) {
  const isCompleted = progress?.is_completed || false
  const completedAt = progress?.completed_at

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-colors">
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center">
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Lesson {lesson.id}</span>
        </div>
        <p className={`font-medium truncate ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
          {lesson.title}
        </p>
      </div>

      {/* Quiz Score */}
      <div className="flex items-center gap-2 min-w-[80px]">
        {quizScore ? (
          <div className="flex items-center gap-1.5">
            <Award className={`w-4 h-4 ${quizScore.percentage >= 70 ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-medium ${quizScore.percentage >= 70 ? 'text-amber-400' : 'text-slate-400'}`}>
              {quizScore.percentage}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-600">-</span>
        )}
      </div>

      {/* Completed Date */}
      <div className="hidden sm:flex items-center gap-1.5 min-w-[100px] text-xs text-slate-500">
        {completedAt && (
          <>
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(completedAt)}</span>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * UserProgressDetail - Expandable component showing detailed user progress
 * Shows each lesson status with visual progress bar and quiz scores
 *
 * @param {Object} user - User object from useAdminData hook
 * @param {boolean} isExpanded - Whether the detail view is expanded
 * @param {Function} onToggle - Function to toggle expanded state
 */
export default function UserProgressDetail({ user, isExpanded, onToggle }) {
  const progressPercent = Math.round((user.lessonsCompleted / user.totalLessons) * 100)

  // Create a map of quiz scores by lesson id
  const quizScoresByLesson = {}
  user.quizScores?.forEach(score => {
    quizScoresByLesson[score.lessonId] = score
  })

  // Create a map of progress by lesson id
  const progressByLesson = {}
  user.progress?.forEach(p => {
    progressByLesson[p.lesson_id] = p
  })

  const avgQuizScore = user.quizScores?.length > 0
    ? Math.round(user.quizScores.reduce((sum, q) => sum + q.percentage, 0) / user.quizScores.length)
    : null

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200 hover:bg-slate-800/70">
      {/* Clickable Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-white">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{user.name}</p>
          <p className="text-sm text-slate-400 truncate">{user.email}</p>
        </div>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium">{user.lessonsCompleted}</span>
            <span className="text-slate-500">/ {user.totalLessons}</span>
          </div>
          {avgQuizScore !== null && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-white font-medium">{avgQuizScore}%</span>
            </div>
          )}
        </div>

        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0 ml-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expandable Detail Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              {/* Overall Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Overall Progress</span>
                  <span className="text-sm font-medium text-white">{progressPercent}%</span>
                </div>
                <ProgressBar value={progressPercent} size="sm" glow={true} animated={true} />
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-white">{user.lessonsCompleted}</p>
                  <p className="text-xs text-slate-500">Lessons Done</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-white">{user.quizScores?.length || 0}</p>
                  <p className="text-xs text-slate-500">Quizzes Taken</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-white">{avgQuizScore ?? '-'}%</p>
                  <p className="text-xs text-slate-500">Avg Score</p>
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Lesson Progress</h4>
                {lessons.map(lesson => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    progress={progressByLesson[lesson.id]}
                    quizScore={quizScoresByLesson[lesson.id]}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
