import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  Unlock,
  BookOpen,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Card } from '../common'
import { useBlockedLessons } from '../../hooks/useBlockedLessons'

// Lesson data matching other admin components
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

function LessonToggleRow({ lesson, isBlocked, onToggle, isToggling }) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-colors">
      {/* Lesson Icon */}
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isBlocked
            ? 'bg-red-500/20'
            : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
        }`}>
          {isBlocked ? (
            <Lock className="w-5 h-5 text-red-400" />
          ) : (
            <BookOpen className="w-5 h-5 text-purple-400" />
          )}
        </div>
      </div>

      {/* Lesson Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Lesson {lesson.id}</span>
          {isBlocked && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
              Blocked
            </span>
          )}
        </div>
        <p className={`font-medium truncate ${isBlocked ? 'text-slate-400' : 'text-white'}`}>
          {lesson.title}
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onToggle(lesson.id)}
          disabled={isToggling}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            isBlocked
              ? 'bg-red-500/30'
              : 'bg-emerald-500/30'
          } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={isBlocked ? `Unblock ${lesson.title}` : `Block ${lesson.title}`}
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 text-white absolute left-1/2 -translate-x-1/2 animate-spin" />
          ) : (
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full transition-transform ${
                isBlocked
                  ? 'translate-x-1 bg-red-400'
                  : 'translate-x-6 bg-emerald-400'
              }`}
            >
              {isBlocked ? (
                <Lock className="w-3 h-3 text-white" />
              ) : (
                <Unlock className="w-3 h-3 text-white" />
              )}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

/**
 * LessonBlockManager - Admin component for blocking/unblocking lessons globally
 * Shows all 9 lessons with toggle switches to control access
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
          ? `Lesson ${lessonId} is now available to users`
          : `Lesson ${lessonId} is now blocked`
      })
    } else {
      setFeedback({
        type: 'error',
        message: result.error || 'Failed to update lesson status'
      })
    }

    // Clear feedback after 3 seconds
    setTimeout(() => setFeedback(null), 3000)
  }

  const blockedCount = blockedLessons.length

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Lesson Access Control</h2>
          <p className="text-sm text-slate-400 mt-1">
            Block lessons to prevent user access
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50">
          <Lock className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-white">{blockedCount}</span>
          <span className="text-sm text-slate-400">blocked</span>
        </div>
      </div>

      {/* Feedback Toast */}
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

      {/* Lessons List */}
      {!loading && !error && (
        <div className="space-y-2">
          {lessons.map(lesson => (
            <LessonToggleRow
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
        <div className="mt-6 p-4 rounded-lg bg-slate-900/30 border border-white/5">
          <p className="text-xs text-slate-500">
            <strong className="text-slate-400">Note:</strong> Blocked lessons will appear locked for all users,
            even if they have completed previous lessons. Changes take effect immediately.
          </p>
        </div>
      )}
    </Card>
  )
}
