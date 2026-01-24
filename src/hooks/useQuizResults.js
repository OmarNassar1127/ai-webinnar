import { useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'vloto-ai-academy-progress'

export function useQuizResults(lessonId = 1) {
  const { user } = useAuth()
  const [quizResult, setQuizResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch quiz result from Supabase or localStorage
  const fetchQuizResult = useCallback(async () => {
    setLoading(true)

    if (user) {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .maybeSingle()

        if (error) {
          console.error('Error fetching quiz result:', error)
        }

        setQuizResult(data || null)
      } catch (err) {
        console.error('Error fetching quiz result:', err)
      }
    } else {
      // Use localStorage
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        try {
          const parsed = JSON.parse(localData)
          if (parsed.quizScore !== null) {
            setQuizResult({
              lesson_id: lessonId,
              score: parsed.quizScore,
              total_questions: parsed.quizAnswers?.length || 6,
              answers: parsed.quizAnswers
            })
          }
        } catch (err) {
          console.error('Error parsing localStorage:', err)
        }
      }
    }

    setLoading(false)
  }, [user, lessonId])

  // Initial fetch
  useEffect(() => {
    fetchQuizResult()
  }, [fetchQuizResult])

  // Save quiz result
  const saveQuizResult = useCallback(async (score, totalQuestions, answers) => {
    setSaving(true)

    const newResult = {
      lesson_id: lessonId,
      score,
      total_questions: totalQuestions,
      answers
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('quiz_results')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            score,
            total_questions: totalQuestions,
            answers,
            completed_at: new Date().toISOString()
          }, { onConflict: 'user_id,lesson_id' })

        if (error) {
          console.error('Error saving quiz result:', error)
        } else {
          setQuizResult(newResult)
        }
      } catch (err) {
        console.error('Error saving quiz result:', err)
      }
    } else {
      // Save to localStorage
      const localData = localStorage.getItem(STORAGE_KEY)
      const parsed = localData ? JSON.parse(localData) : {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...parsed,
        quizAnswers: answers,
        quizScore: score
      }))
      setQuizResult(newResult)
    }

    setSaving(false)
  }, [user, lessonId])

  // Reset quiz result
  const resetQuizResult = useCallback(async () => {
    if (user) {
      try {
        await supabase
          .from('quiz_results')
          .delete()
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
      } catch (err) {
        console.error('Error resetting quiz result:', err)
      }
    } else {
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        const parsed = JSON.parse(localData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...parsed,
          quizAnswers: [],
          quizScore: null
        }))
      }
    }

    setQuizResult(null)
  }, [user, lessonId])

  return {
    quizResult,
    loading,
    saving,
    fetchQuizResult,
    saveQuizResult,
    resetQuizResult
  }
}

// Hook to get all quiz results for dashboard stats
export function useAllQuizResults() {
  const { user } = useAuth()
  const [allResults, setAllResults] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllResults = useCallback(async () => {
    setLoading(true)

    if (user) {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('lesson_id')

        if (error) {
          console.error('Error fetching all quiz results:', error)
        }

        setAllResults(data || [])
      } catch (err) {
        console.error('Error fetching all quiz results:', err)
      }
    } else {
      // Use localStorage for lesson 1
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        try {
          const parsed = JSON.parse(localData)
          if (parsed.quizScore !== null) {
            setAllResults([{
              lesson_id: 1,
              score: parsed.quizScore,
              total_questions: parsed.quizAnswers?.length || 6,
              answers: parsed.quizAnswers
            }])
          }
        } catch (err) {
          console.error('Error parsing localStorage:', err)
        }
      }
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchAllResults()
  }, [fetchAllResults])

  // Calculate stats
  const stats = {
    totalQuizzes: allResults.length,
    averageScore: allResults.length > 0
      ? Math.round(allResults.reduce((sum, r) => sum + (r.score / r.total_questions) * 100, 0) / allResults.length)
      : 0,
    perfectScores: allResults.filter(r => r.score === r.total_questions).length
  }

  return { allResults, stats, loading, refetch: fetchAllResults }
}
