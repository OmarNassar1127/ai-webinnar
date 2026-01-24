import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Lock, Clock, Star, ChevronDown, BookOpen, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { Button, Badge, ProgressBar } from '../common/'
import { lessonTakeaways } from '../../data/lessonTakeaways'

function LessonProgressCard({
  lesson,
  isCompleted,
  isUnlocked,
  quizScore,
  totalQuestions = 6,
  onReviewLesson
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const takeaways = lessonTakeaways[lesson.id] || []
  const scorePercentage = quizScore !== null ? Math.round((quizScore / totalQuestions) * 100) : null

  const cardClasses = isCompleted
    ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
    : isUnlocked
      ? 'bg-slate-800/50 border-slate-700/50 hover:border-purple-500/30'
      : 'bg-slate-800/30 border-slate-700/30 opacity-60'

  const canExpand = isCompleted || isUnlocked

  return (
    <motion.div
      layout
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${cardClasses}`}
    >
      <div
        className={`p-4 ${canExpand ? 'cursor-pointer' : ''}`}
        onClick={() => canExpand && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              isCompleted ? 'bg-green-500/20 text-green-400'
                : isUnlocked ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-slate-700/50 text-slate-500'
            }`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : lesson.id}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${isCompleted ? 'text-green-300' : isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                {lesson.title}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lesson.duration}
                </span>
                {quizScore !== null && (
                  <span className="text-xs text-cyan-400 flex items-center gap-1">
                    <Star className="w-3 h-3" /> Quiz: {quizScore}/{totalQuestions}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isCompleted && (
              <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Completed</Badge>
            )}
            {!isUnlocked && <Lock className="w-4 h-4 text-slate-500" />}
            {canExpand && (
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && canExpand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-slate-700/50">
              {quizScore !== null && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Quiz Score</span>
                    <span className={`text-sm font-semibold ${scorePercentage >= 70 ? 'text-green-400' : 'text-amber-400'}`}>
                      {scorePercentage}%
                    </span>
                  </div>
                  <ProgressBar value={scorePercentage} size="sm" glow animated={false} />
                </div>
              )}
              {isCompleted && takeaways.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-white">Key Takeaways</span>
                  </div>
                  <ul className="space-y-2">
                    {takeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-purple-400 mt-1">-</span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                icon={<BookOpen className="w-4 h-4" />}
                onClick={(e) => { e.stopPropagation(); onReviewLesson(lesson.id) }}
                className="w-full"
              >
                {isCompleted ? 'Review Lesson' : 'Start Lesson'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default LessonProgressCard
