import { useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'vloto-ai-academy-progress'
const DEBOUNCE_MS = 1000

export function useProgress(lessonId = 1) {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const saveTimeoutRef = useRef(null)

  // Fetch progress from Supabase or localStorage
  const fetchProgress = useCallback(async () => {
    setLoading(true)

    if (user) {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .maybeSingle()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching progress:', error)
        }

        if (data) {
          setProgress(data)
        } else {
          // No progress yet, create default
          setProgress({
            lesson_id: lessonId,
            current_section: 1,
            completed_sections: [],
            is_completed: false
          })
        }
      } catch (err) {
        console.error('Error fetching progress:', err)
      }
    } else {
      // Use localStorage for non-authenticated users
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        try {
          const parsed = JSON.parse(localData)
          const completedSections = parsed.sectionCompletion
            ?.map((completed, index) => completed ? index + 1 : null)
            .filter(Boolean) || []

          setProgress({
            lesson_id: lessonId,
            current_section: parsed.currentSection || 1,
            completed_sections: completedSections,
            is_completed: completedSections.length === 8
          })
        } catch (err) {
          console.error('Error parsing localStorage:', err)
        }
      } else {
        setProgress({
          lesson_id: lessonId,
          current_section: 1,
          completed_sections: [],
          is_completed: false
        })
      }
    }

    setLoading(false)
  }, [user, lessonId])

  // Initial fetch
  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  // Save progress to Supabase (debounced)
  const saveProgress = useCallback(async (newProgress) => {
    if (!user) {
      // Save to localStorage for non-authenticated users
      const localData = {
        currentSection: newProgress.current_section,
        sectionCompletion: Array(8).fill(false).map((_, i) =>
          newProgress.completed_sections.includes(i + 1)
        ),
        quizAnswers: [],
        quizScore: null
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localData))
      return
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Debounce save
    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true)
      try {
        const { error } = await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            current_section: newProgress.current_section,
            completed_sections: newProgress.completed_sections,
            is_completed: newProgress.is_completed,
            completed_at: newProgress.is_completed ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          })

        if (error) {
          console.error('Error saving progress:', error)
        }
      } catch (err) {
        console.error('Error saving progress:', err)
      } finally {
        setSaving(false)
      }
    }, DEBOUNCE_MS)
  }, [user, lessonId])

  // Update current section
  const updateCurrentSection = useCallback((sectionNum) => {
    const newProgress = {
      ...progress,
      current_section: sectionNum
    }
    setProgress(newProgress)
    saveProgress(newProgress)
  }, [progress, saveProgress])

  // Complete a section
  const completeSection = useCallback((sectionNum) => {
    const completedSections = progress?.completed_sections || []
    if (completedSections.includes(sectionNum)) return

    const newCompletedSections = [...completedSections, sectionNum].sort((a, b) => a - b)
    const isCompleted = newCompletedSections.length === 8

    const newProgress = {
      ...progress,
      completed_sections: newCompletedSections,
      is_completed: isCompleted
    }

    setProgress(newProgress)
    saveProgress(newProgress)
  }, [progress, saveProgress])

  // Complete the entire lesson
  const completeLesson = useCallback(() => {
    const newProgress = {
      ...progress,
      completed_sections: [1, 2, 3, 4, 5, 6, 7, 8],
      is_completed: true
    }
    setProgress(newProgress)
    saveProgress(newProgress)
  }, [progress, saveProgress])

  // Reset progress
  const resetProgress = useCallback(async () => {
    const defaultProgress = {
      lesson_id: lessonId,
      current_section: 1,
      completed_sections: [],
      is_completed: false
    }

    setProgress(defaultProgress)

    if (user) {
      try {
        await supabase
          .from('lesson_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
      } catch (err) {
        console.error('Error resetting progress:', err)
      }
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user, lessonId])

  // Calculate progress percentage
  const progressPercentage = progress
    ? ((progress.completed_sections?.length || 0) / 8) * 100
    : 0

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return {
    progress,
    loading,
    saving,
    progressPercentage,
    fetchProgress,
    updateCurrentSection,
    completeSection,
    completeLesson,
    resetProgress
  }
}

// Hook to get all lesson progress for dashboard
export function useAllProgress() {
  const { user } = useAuth()
  const [allProgress, setAllProgress] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllProgress = useCallback(async () => {
    setLoading(true)

    if (user) {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('lesson_id')

        if (error) {
          console.error('Error fetching all progress:', error)
        }

        setAllProgress(data || [])
      } catch (err) {
        console.error('Error fetching all progress:', err)
      }
    } else {
      // Use localStorage for lesson 1
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        try {
          const parsed = JSON.parse(localData)
          const completedSections = parsed.sectionCompletion
            ?.map((completed, index) => completed ? index + 1 : null)
            .filter(Boolean) || []

          setAllProgress([{
            lesson_id: 1,
            current_section: parsed.currentSection || 1,
            completed_sections: completedSections,
            is_completed: completedSections.length === 8
          }])
        } catch (err) {
          console.error('Error parsing localStorage:', err)
        }
      }
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchAllProgress()
  }, [fetchAllProgress])

  return { allProgress, loading, refetch: fetchAllProgress }
}
