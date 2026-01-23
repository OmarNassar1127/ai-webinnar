import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { isLesson8Unlocked } from './Lesson8Context'

const GlobalProgressContext = createContext(null)

const STORAGE_KEY = 'vloto-ai-academy-global-progress'
const TOTAL_LESSONS = 9

export function GlobalProgressProvider({ children }) {
  const { user } = useAuth()
  const [lessonCompletions, setLessonCompletions] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetch all lesson progress from Supabase
  const fetchAllProgress = useCallback(async () => {
    setLoading(true)

    if (user) {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select('lesson_id, is_completed')
          .eq('user_id', user.id)

        if (error) throw error

        const completions = {}
        data?.forEach(row => {
          completions[row.lesson_id] = row.is_completed
        })
        setLessonCompletions(completions)

        // Also save to localStorage as cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completions))
      } catch (err) {
        console.error('Error fetching global progress:', err)
        // Fall back to localStorage
        try {
          const cached = localStorage.getItem(STORAGE_KEY)
          if (cached) {
            setLessonCompletions(JSON.parse(cached))
          }
        } catch (e) {
          console.error('Error reading cached progress:', e)
        }
      }
    } else {
      // Not logged in - use localStorage
      try {
        const cached = localStorage.getItem(STORAGE_KEY)
        if (cached) {
          setLessonCompletions(JSON.parse(cached))
        }
      } catch (e) {
        console.error('Error reading cached progress:', e)
      }
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchAllProgress()
  }, [fetchAllProgress])

  // Check if a specific lesson is completed
  const isLessonCompleted = useCallback((lessonId) => {
    return !!lessonCompletions[lessonId]
  }, [lessonCompletions])

  // Check if a lesson should be unlocked (requires previous lesson to be completed)
  const isLessonUnlocked = useCallback((lessonId) => {
    // Lesson 1 is always unlocked
    if (lessonId === 1) return true

    // Lesson 8 has special unlock mechanism
    if (lessonId === 8) return isLesson8Unlocked()

    // For lessons 2-7 and 9, check if the previous lesson is completed
    // Lesson 9 requires lesson 7 to be completed (since 8 is optional/secret)
    const previousLessonId = lessonId === 9 ? 7 : lessonId - 1

    return isLessonCompleted(previousLessonId)
  }, [isLessonCompleted])

  // Mark a lesson as completed
  const markLessonCompleted = useCallback(async (lessonId) => {
    setLessonCompletions(prev => ({
      ...prev,
      [lessonId]: true
    }))

    // Update localStorage
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      current[lessonId] = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
    } catch (e) {
      console.error('Error updating cached progress:', e)
    }

    // Update Supabase if logged in
    if (user) {
      try {
        await supabase.from('lesson_progress').upsert({
          user_id: user.id,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' })
      } catch (err) {
        console.error('Error marking lesson completed in Supabase:', err)
      }
    }
  }, [user])

  // Get overall progress (number of completed lessons)
  const getOverallProgress = useCallback(() => {
    const completed = Object.values(lessonCompletions).filter(Boolean).length
    return {
      completed,
      total: TOTAL_LESSONS,
      percentage: Math.round((completed / TOTAL_LESSONS) * 100)
    }
  }, [lessonCompletions])

  const value = {
    lessonCompletions,
    loading,
    isLessonCompleted,
    isLessonUnlocked,
    markLessonCompleted,
    getOverallProgress,
    refetch: fetchAllProgress
  }

  return (
    <GlobalProgressContext.Provider value={value}>
      {children}
    </GlobalProgressContext.Provider>
  )
}

export function useGlobalProgress() {
  const context = useContext(GlobalProgressContext)
  if (!context) {
    throw new Error('useGlobalProgress must be used within a GlobalProgressProvider')
  }
  return context
}

export default GlobalProgressContext
