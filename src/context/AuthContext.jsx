import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const STORAGE_KEY = 'vloto-ai-academy-progress'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (err) {
      console.error('Error fetching profile:', err)
      return null
    }
  }, [])

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  // Sign up with email and password
  const signUp = async (email, password, fullName) => {
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })

      if (error) throw error

      // Check for existing localStorage progress to migrate
      if (data.user) {
        await migrateLocalStorageProgress(data.user.id)
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Check for existing localStorage progress to migrate
      if (data.user) {
        await checkAndOfferMigration(data.user.id)
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Sign out
  const signOut = async () => {
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err }
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err }
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('Not authenticated') }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Check for localStorage progress and offer migration
  const checkAndOfferMigration = async (userId) => {
    try {
      const localData = localStorage.getItem(STORAGE_KEY)
      if (!localData) return

      const progress = JSON.parse(localData)
      const hasProgress = progress.sectionCompletion?.some(Boolean) ||
                         progress.quizScore !== null

      if (hasProgress) {
        // Check if user already has progress in database
        const { data: existingProgress } = await supabase
          .from('lesson_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('lesson_id', 1)
          .single()

        if (!existingProgress) {
          // Migrate the data
          await migrateLocalStorageProgress(userId)
        }
      }
    } catch (err) {
      console.error('Error checking migration:', err)
    }
  }

  // Migrate localStorage progress to Supabase
  const migrateLocalStorageProgress = async (userId) => {
    try {
      const localData = localStorage.getItem(STORAGE_KEY)
      if (!localData) return

      const progress = JSON.parse(localData)
      const completedSections = progress.sectionCompletion
        ?.map((completed, index) => completed ? index + 1 : null)
        .filter(Boolean) || []

      if (completedSections.length === 0 && progress.quizScore === null) return

      // Insert lesson progress
      await supabase.from('lesson_progress').upsert({
        user_id: userId,
        lesson_id: 1,
        current_section: progress.currentSection || 1,
        completed_sections: completedSections,
        is_completed: completedSections.length === 8,
        completed_at: completedSections.length === 8 ? new Date().toISOString() : null
      })

      // Insert quiz results if exists
      if (progress.quizScore !== null && progress.quizAnswers?.length > 0) {
        await supabase.from('quiz_results').upsert({
          user_id: userId,
          lesson_id: 1,
          score: progress.quizScore,
          total_questions: progress.quizAnswers.length,
          answers: progress.quizAnswers
        })
      }

      // Clear localStorage after successful migration
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Error migrating progress:', err)
    }
  }

  // Auth modal controls
  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode)
    setShowAuthModal(true)
    setError(null)
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
    setError(null)
  }

  const value = {
    user,
    profile,
    loading,
    error,
    showAuthModal,
    authModalMode,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
