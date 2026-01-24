import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const STORAGE_KEY = 'vloto-ai-academy-progress'
const ALLOWED_DOMAINS = ['vloto.nl', 'knsf.nl']

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [authSuccess, setAuthSuccess] = useState(false)

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
          const profileData = await fetchProfile(session.user.id)
          // Only set user if profile is active
          if (profileData?.is_active) {
            setUser(session.user)
          } else if (profileData) {
            // User exists but not active - sign them out
            await supabase.auth.signOut()
            setUser(null)
            setProfile(null)
          }
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
          const profileData = await fetchProfile(session.user.id)
          if (profileData?.is_active) {
            setUser(session.user)
          } else {
            setUser(null)
            setProfile(null)
          }
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  // Validate email domain
  const isEmailAllowed = (email) => {
    const domain = email.split('@')[1]?.toLowerCase()
    return ALLOWED_DOMAINS.includes(domain)
  }

  // Sign up with email and password
  const signUp = async (email, password, fullName) => {
    setError(null)

    // Check email domain
    if (!isEmailAllowed(email)) {
      const err = new Error(`Only @${ALLOWED_DOMAINS.join(' and @')} email addresses are allowed`)
      setError(err.message)
      return { data: null, error: err }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })

      if (error) throw error

      // Don't set user - they need to be activated first
      return { data, error: null, needsActivation: true }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    setError(null)
    setAuthSuccess(false)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Check if user is active
      const profileData = await fetchProfile(data.user.id)
      if (!profileData?.is_active) {
        await supabase.auth.signOut()
        throw new Error('Your account is pending activation. Please contact an administrator.')
      }

      // Check for existing localStorage progress to migrate
      await checkAndOfferMigration(data.user.id)

      setUser(data.user)
      setAuthSuccess(true)

      // Close modal after short delay to show success
      setTimeout(() => {
        setShowAuthModal(false)
        setAuthSuccess(false)
      }, 1500)

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
        const { data: existingProgress } = await supabase
          .from('lesson_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('lesson_id', 1)
          .single()

        if (!existingProgress) {
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

      await supabase.from('lesson_progress').upsert({
        user_id: userId,
        lesson_id: 1,
        current_section: progress.currentSection || 1,
        completed_sections: completedSections,
        is_completed: completedSections.length === 8,
        completed_at: completedSections.length === 8 ? new Date().toISOString() : null
      })

      if (progress.quizScore !== null && progress.quizAnswers?.length > 0) {
        await supabase.from('quiz_results').upsert({
          user_id: userId,
          lesson_id: 1,
          score: progress.quizScore,
          total_questions: progress.quizAnswers.length,
          answers: progress.quizAnswers
        })
      }

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
    setAuthSuccess(false)
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
    setError(null)
    setAuthSuccess(false)
  }

  // Derive isAdmin from profile, defaulting to false
  const isAdmin = profile?.is_admin ?? false

  const value = {
    user,
    profile,
    loading,
    error,
    showAuthModal,
    authModalMode,
    authSuccess,
    isAdmin,
    isEmailAllowed,
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
