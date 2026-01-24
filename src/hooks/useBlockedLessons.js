import { useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

/**
 * Hook to fetch and manage blocked lessons
 * All users can read blocked status, only admins can modify
 */
export function useBlockedLessons() {
  const { user, isAdmin } = useAuth()
  const [blockedLessons, setBlockedLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlockedLessons = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('blocked_lessons')
        .select('lesson_id, blocked_at, blocked_by')
        .order('lesson_id')

      if (fetchError) throw fetchError
      setBlockedLessons(data || [])
    } catch (err) {
      console.error('Error fetching blocked lessons:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlockedLessons()
  }, [fetchBlockedLessons])

  const isLessonBlocked = useCallback((lessonId) => {
    return blockedLessons.some((bl) => bl.lesson_id === lessonId)
  }, [blockedLessons])

  const blockLesson = useCallback(async (lessonId) => {
    if (!isAdmin || !user) return { success: false, error: 'Unauthorized' }

    try {
      const { error: insertError } = await supabase
        .from('blocked_lessons')
        .insert({ lesson_id: lessonId, blocked_by: user.id })

      if (insertError) throw insertError
      await fetchBlockedLessons()
      return { success: true }
    } catch (err) {
      console.error('Error blocking lesson:', err)
      return { success: false, error: err.message }
    }
  }, [isAdmin, user, fetchBlockedLessons])

  const unblockLesson = useCallback(async (lessonId) => {
    if (!isAdmin) return { success: false, error: 'Unauthorized' }

    try {
      const { error: deleteError } = await supabase
        .from('blocked_lessons')
        .delete()
        .eq('lesson_id', lessonId)

      if (deleteError) throw deleteError
      await fetchBlockedLessons()
      return { success: true }
    } catch (err) {
      console.error('Error unblocking lesson:', err)
      return { success: false, error: err.message }
    }
  }, [isAdmin, fetchBlockedLessons])

  return {
    blockedLessons,
    loading,
    error,
    isLessonBlocked,
    blockLesson,
    unblockLesson,
    refetch: fetchBlockedLessons
  }
}
