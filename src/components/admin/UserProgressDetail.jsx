import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Lock,
  BookOpen,
  Award,
  Calendar,
  Clock,
  User,
  Mail,
  Loader2,
  UserCheck,
  UserX,
  Shield
} from 'lucide-react'
import { ProgressBar } from '../common'

// Lesson data matching Dashboard.jsx
const lessons = [
  { id: 1, title: 'AI Thinking Foundations', icon: '🧠' },
  { id: 2, title: 'How Software Works', icon: '💻' },
  { id: 3, title: 'Claude & Cowork', icon: '🤖' },
  { id: 4, title: 'AI in Action', icon: '⚡' },
  { id: 5, title: 'Your First Build', icon: '🔨' },
  { id: 6, title: 'Building for Operations', icon: '🏗️' },
  { id: 7, title: 'Data & AI', icon: '📊' },
  { id: 8, title: '???', icon: '🔮' },
  { id: 9, title: 'Final Project', icon: '🎓' },
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

function formatRelativeTime(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(dateString)
}

function LessonRow({ lesson, progress, quizScore }) {
  const isCompleted = progress?.is_completed || false
  const completedAt = progress?.completed_at

  return (
    <div className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
      isCompleted ? 'bg-emerald-500/5' : 'bg-slate-900/30'
    }`}>
      {/* Lesson icon */}
      <span className="text-lg flex-shrink-0">{lesson.icon}</span>

      {/* Lesson info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
          {lesson.title}
        </p>
      </div>

      {/* Quiz Score */}
      <div className="flex items-center gap-1.5 min-w-[60px] justify-end">
        {quizScore ? (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            quizScore.percentage >= 80
              ? 'bg-emerald-500/20 text-emerald-400'
              : quizScore.percentage >= 60
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-red-500/20 text-red-400'
          }`}>
            {quizScore.percentage}%
          </span>
        ) : (
          <span className="text-xs text-slate-600">--</span>
        )}
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-slate-600" />
        )}
      </div>
    </div>
  )
}

/**
 * UserProgressDetail - Expandable component showing detailed user progress
 * Shows each lesson status with visual progress bar and quiz scores
 * Includes active/inactive toggle for admin control
 *
 * @param {Object} user - User object from useAdminData hook
 * @param {boolean} isExpanded - Whether the detail view is expanded
 * @param {Function} onToggle - Function to toggle expanded state
 * @param {Function} onToggleActive - Function to toggle user active status
 */
export default function UserProgressDetail({ user, isExpanded, onToggle, onToggleActive }) {
  const [isTogglingActive, setIsTogglingActive] = useState(false)
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

  const handleToggleActive = async (e) => {
    e.stopPropagation()
    if (!onToggleActive || isTogglingActive) return

    setIsTogglingActive(true)
    await onToggleActive(user.id, user.isActive)
    setIsTogglingActive(false)
  }

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-200 ${
      user.isActive ? 'border-white/5 hover:bg-slate-800/70' : 'border-red-500/20 bg-red-500/5'
    }`}>
      {/* Clickable Header */}
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        className="w-full p-4 flex items-center gap-4 text-left cursor-pointer"
      >
        {/* User Avatar */}
        <div className={`relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
          user.isActive
            ? 'bg-gradient-to-br from-purple-500 to-blue-500'
            : 'bg-gradient-to-br from-slate-600 to-slate-700'
        }`}>
          <span className="text-sm font-semibold text-white">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
          {/* Admin badge */}
          {user.isAdmin && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`font-medium truncate ${user.isActive ? 'text-white' : 'text-slate-400'}`}>
              {user.name}
            </p>
            {!user.isActive && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-500/20 text-red-400">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 truncate">{user.email}</p>
        </div>

        {/* Quick Stats - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Progress */}
          <div className="flex items-center gap-2 min-w-[100px]">
            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 w-8">{progressPercent}%</span>
          </div>

          {/* Lessons */}
          <div className="flex items-center gap-1.5 text-sm">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium">{user.lessonsCompleted}</span>
            <span className="text-slate-500">/ {user.totalLessons}</span>
          </div>

          {/* Quiz Score */}
          {avgQuizScore !== null && (
            <div className="flex items-center gap-1.5 text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-white font-medium">{avgQuizScore}%</span>
            </div>
          )}

          {/* Last Active */}
          {user.lastActive && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatRelativeTime(user.lastActive)}</span>
            </div>
          )}
        </div>

        {/* Active Toggle Button */}
        <button
          onClick={handleToggleActive}
          disabled={isTogglingActive}
          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
            isTogglingActive
              ? 'bg-slate-700 cursor-not-allowed'
              : user.isActive
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
                : 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
          }`}
          title={user.isActive ? 'Deactivate user' : 'Activate user'}
        >
          {isTogglingActive ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : user.isActive ? (
            <UserCheck className="w-4 h-4" />
          ) : (
            <UserX className="w-4 h-4" />
          )}
        </button>

        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

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
              {/* User Details Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300 truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">Joined {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">
                    {user.lastActive ? `Active ${formatRelativeTime(user.lastActive)}` : 'Never active'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {user.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Active account</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">Inactive account</span>
                    </>
                  )}
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Course Progress</span>
                  <span className="text-sm font-medium text-white">{progressPercent}%</span>
                </div>
                <ProgressBar value={progressPercent} size="sm" glow={true} animated={true} />
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-slate-500">Lessons</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {user.lessonsCompleted}<span className="text-slate-500 text-sm font-normal">/{user.totalLessons}</span>
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-slate-500">Quizzes</span>
                  </div>
                  <p className="text-lg font-bold text-white">{user.quizScores?.length || 0}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-500">Avg Score</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {avgQuizScore !== null ? `${avgQuizScore}%` : '--'}
                  </p>
                </div>
              </div>

              {/* Lessons Grid */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Lesson Progress</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
