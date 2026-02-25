import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, CheckCircle, AlertCircle, Loader2, History } from 'lucide-react'
import { Card, Badge } from '../common/'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const lessons = [
  { id: 1, title: 'AI Thinking Foundations' },
  { id: 2, title: 'Prompt Engineering' },
  { id: 3, title: 'Claude & Cowork' },
  { id: 4, title: 'Claude & Competitors' },
  { id: 5, title: 'AI for Email & Docs' },
  { id: 6, title: 'AI for Data Analysis' },
  { id: 7, title: 'AI for Customer Service' },
  { id: 8, title: 'AI Workflows' },
  { id: 9, title: 'Final Project' },
]

const PASSING_SCORE = 70

function QuizHistoryItem({ quiz }) {
  const lessonTitle = lessons.find(l => l.id === quiz.lesson_id)?.title || `Lesson ${quiz.lesson_id}`
  const percentage = Math.round((quiz.score / quiz.total_questions) * 100)
  const passed = percentage >= PASSING_SCORE

  const formattedDate = new Date(quiz.completed_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          passed ? 'bg-green-500/20' : 'bg-amber-500/20'
        }`}>
          {passed ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-white">{lessonTitle}</p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-bold text-lg ${passed ? 'text-green-400' : 'text-amber-400'}`}>
            {quiz.score}/{quiz.total_questions}
          </p>
          <p className="text-xs text-slate-400">{percentage}%</p>
        </div>
        <Badge variant={passed ? 'success' : 'warning'}>
          {passed ? 'Passed' : 'Retry'}
        </Badge>
      </div>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
        <Star className="w-8 h-8 text-slate-500" />
      </div>
      <p className="text-slate-400 mb-2">No quiz attempts yet</p>
      <p className="text-sm text-slate-500">Complete lessons to take quizzes and track your scores here</p>
    </div>
  )
}

function QuizHistory({ showTitle = true, maxItems = 0, className = '' }) {
  const { user } = useAuth()
  const [quizHistory, setQuizHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })

        if (fetchError) throw fetchError
        setQuizHistory(data || [])
      } catch (err) {
        console.error('Error fetching quiz history:', err)
        setError('Failed to load quiz history')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizHistory()
  }, [user])

  const displayedItems = maxItems > 0 ? quizHistory.slice(0, maxItems) : quizHistory
  const hasMore = maxItems > 0 && quizHistory.length > maxItems

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center py-8">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-slate-400">{error}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`p-6 ${className}`}>
      {showTitle && (
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <History className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Quiz History</h2>
            <p className="text-sm text-slate-400">
              {quizHistory.length} attempt{quizHistory.length !== 1 ? 's' : ''} total
            </p>
          </div>
        </div>
      )}

      {quizHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {displayedItems.map((quiz, index) => (
            <QuizHistoryItem key={quiz.id || index} quiz={quiz} />
          ))}
          {hasMore && (
            <p className="text-center text-sm text-slate-400 pt-2">
              +{quizHistory.length - maxItems} more attempts
            </p>
          )}
        </div>
      )}
    </Card>
  )
}

export default QuizHistory
