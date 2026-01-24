import { useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

/**
 * Hook for admin dashboard - fetches all users with their progress data
 * Only admins should use this hook
 */
export function useAdminData() {
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAdminData = useCallback(async () => {
    if (!isAdmin) {
      setError(new Error('Unauthorized: Admin access required'))
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, is_active, is_admin, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (profilesError) throw profilesError

      // Fetch all lesson progress
      const { data: allProgress, error: progressError } = await supabase
        .from('lesson_progress')
        .select('user_id, lesson_id, is_completed, completed_at, updated_at')

      if (progressError) throw progressError

      // Fetch all quiz results
      const { data: allQuizResults, error: quizError } = await supabase
        .from('quiz_results')
        .select('user_id, lesson_id, score, total_questions, completed_at')

      if (quizError) throw quizError

      // Group progress by user
      const progressByUser = {}
      allProgress?.forEach((p) => {
        if (!progressByUser[p.user_id]) {
          progressByUser[p.user_id] = []
        }
        progressByUser[p.user_id].push(p)
      })

      // Group quiz results by user
      const quizzesByUser = {}
      allQuizResults?.forEach((q) => {
        if (!quizzesByUser[q.user_id]) {
          quizzesByUser[q.user_id] = []
        }
        quizzesByUser[q.user_id].push(q)
      })

      // Combine into user objects
      const combinedUsers = profiles?.map((profile) => {
        const userProgress = progressByUser[profile.id] || []
        const userQuizzes = quizzesByUser[profile.id] || []

        // Count completed lessons
        const lessonsCompleted = userProgress.filter((p) => p.is_completed).length

        // Calculate quiz scores
        const quizScores = userQuizzes.map((q) => ({
          lessonId: q.lesson_id,
          score: q.score,
          totalQuestions: q.total_questions,
          percentage: Math.round((q.score / q.total_questions) * 100),
          completedAt: q.completed_at
        }))

        // Find last activity date
        const activityDates = [
          profile.updated_at,
          ...userProgress.map((p) => p.updated_at || p.completed_at),
          ...userQuizzes.map((q) => q.completed_at)
        ].filter(Boolean)

        const lastActive = activityDates.length > 0
          ? new Date(Math.max(...activityDates.map((d) => new Date(d).getTime())))
          : null

        return {
          id: profile.id,
          name: profile.full_name || 'Unknown User',
          email: profile.email,
          isActive: profile.is_active,
          isAdmin: profile.is_admin,
          createdAt: profile.created_at,
          lessonsCompleted,
          totalLessons: 9,
          lastActive: lastActive?.toISOString() || null,
          quizScores,
          progress: userProgress
        }
      }) || []

      setUsers(combinedUsers)
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  // Fetch on mount and when isAdmin changes
  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData])

  // Toggle user active status
  const toggleUserActive = useCallback(async (userId, currentStatus) => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized' }
    }

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', userId)

      if (updateError) throw updateError

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId
          ? { ...user, isActive: !currentStatus }
          : user
      ))

      return { success: true }
    } catch (err) {
      console.error('Error toggling user status:', err)
      return { success: false, error: err.message }
    }
  }, [isAdmin])

  return {
    users,
    loading,
    error,
    refetch: fetchAdminData,
    toggleUserActive
  }
}
