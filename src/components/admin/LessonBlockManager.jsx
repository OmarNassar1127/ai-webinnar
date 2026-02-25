import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Unlock,
  BookOpen,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield
} from 'lucide-react'
import { Card } from '../common'
import { useBlockedLessons } from '../../hooks/useBlockedLessons'

// Lesson data matching other admin components
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

function LessonCard({ lesson, isBlocked, onToggle, isToggling }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        isBlocked
          ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/15'
          : 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
      }`}
      onClick={() => !isToggling && onToggle(lesson.id)}
    >
      {/* Toggling overlay */}
      {isToggling && (
        <div className="absolute inset-0 bg-slate-900/50 rounded-xl flex items-center justify-center z-10">
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        </div>
      )}

      {/* Status indicator */}
      <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${
        isBlocked ? 'bg-red-400' : 'bg-emerald-400'
      }`} />

      {/* Lesson icon */}
      <div className="text-2xl mb-2">{lesson.icon}</div>

      {/* Lesson info */}
      <div className="mb-3">
        <span className="text-xs font-medium text-slate-500">Lesson {lesson.id}</span>
        <p className={`text-sm font-medium truncate ${isBlocked ? 'text-slate-400' : 'text-white'}`}>
          {lesson.title}
        </p>
      </div>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
        isBlocked
          ? 'bg-red-500/20 text-red-400'
          : 'bg-emerald-500/20 text-emerald-400'
      }`}>
        {isBlocked ? (
          <>
            <Lock className="w-3 h-3" />
            <span>Blocked</span>
          </>
        ) : (
          <>
            <Unlock className="w-3 h-3" />
            <span>Available</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

/**
 * LessonBlockManager - Admin component for blocking/unblocking lessons globally
 * Shows all 9 lessons in a grid with visual status indicators
 */
export default function LessonBlockManager() {
  const { blockedLessons, loading, error, isLessonBlocked, blockLesson, unblockLesson } = useBlockedLessons()
  const [togglingLessons, setTogglingLessons] = useState(new Set())
  const [feedback, setFeedback] = useState(null)

  const handleToggle = async (lessonId) => {
    setTogglingLessons(prev => new Set([...prev, lessonId]))
    setFeedback(null)

    const isCurrentlyBlocked = isLessonBlocked(lessonId)
    const result = isCurrentlyBlocked
      ? await unblockLesson(lessonId)
      : await blockLesson(lessonId)

    setTogglingLessons(prev => {
      const newSet = new Set(prev)
      newSet.delete(lessonId)
      return newSet
    })

    if (result.success) {
      setFeedback({
        type: 'success',
        message: isCurrentlyBlocked
          ? `Lesson ${lessonId} is now available`
          : `Lesson ${lessonId} is now blocked`
      })
    } else {
      setFeedback({
        type: 'error',
        message: result.error || 'Failed to update'
      })
    }

    setTimeout(() => setFeedback(null), 3000)
  }

  const blockedCount = blockedLessons.length
  const availableCount = 9 - blockedCount

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Lesson Access Control</h2>
            <p className="text-sm text-slate-400">Click a lesson to toggle access</p>
          </div>
        </div>

        {/* Status summary */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm text-slate-300">{availableCount} available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-sm text-slate-300">{blockedCount} blocked</span>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="text-sm">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <p className="text-sm text-slate-400">Loading lessons...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">Failed to load blocked lessons</p>
          </div>
        </div>
      )}

      {/* Lessons Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isBlocked={isLessonBlocked(lesson.id)}
              onToggle={handleToggle}
              isToggling={togglingLessons.has(lesson.id)}
            />
          ))}
        </div>
      )}

      {/* Help Text */}
      {!loading && !error && (
        <div className="mt-6 flex items-start gap-2 text-xs text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Blocked lessons appear locked for all users. Changes take effect immediately.
          </p>
        </div>
      )}
    </Card>
  )
}
