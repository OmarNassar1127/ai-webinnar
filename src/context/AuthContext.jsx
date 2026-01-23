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
        .maybeSingle()

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
    let isMounted = true

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user && isMounted) {
          // Set user immediately from session
          setUser(session.user)

          // Then fetch profile (non-blocking for UI)
          fetchProfile(session.user.id).then(profileData => {
            if (!isMounted) return
            // If profile exists and is explicitly inactive, sign out
            if (profileData && profileData.is_active === false) {
              supabase.auth.signOut()
              setUser(null)
              setProfile(null)
            }
          }).catch(err => {
            console.warn('Profile fetch failed:', err)
          })
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return

        if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        if (session?.user) {
          setUser(session.user)

          // Fetch profile in background
          fetchProfile(session.user.id).then(profileData => {
            if (!isMounted) return
            if (profileData && profileData.is_active === false) {
              supabase.auth.signOut()
              setUser(null)
              setProfile(null)
            }
          }).catch(err => {
            console.warn('Profile fetch failed on auth change:', err)
          })
        } else {
          setUser(null)
          setProfile(null)
        }

        if (isMounted) {
          setLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
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

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Sign in timed out. Please try again.')), 15000)
    })

    try {
      // Race the sign in against the timeout
      const { data, error } = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        timeoutPromise
      ])

      if (error) throw error

      // Check if user is active (with timeout protection)
      let profileData = null
      try {
        profileData = await Promise.race([
          fetchProfile(data.user.id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Profile fetch timeout')), 5000))
        ])
      } catch (profileErr) {
        console.warn('Profile fetch failed:', profileErr)
        // Continue without profile - user can still use the app
      }

      // If profile exists and is explicitly inactive, sign them out
      if (profileData && profileData.is_active === false) {
        await supabase.auth.signOut()
        throw new Error('Your account is pending activation. Please contact an administrator.')
      }

      // Check for existing localStorage progress to migrate (non-blocking)
      checkAndOfferMigration(data.user.id).catch(err => {
        console.warn('Migration check failed (non-blocking):', err)
      })

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
        .maybeSingle()

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
          .maybeSingle()

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
      }, { onConflict: 'user_id,lesson_id' })

      if (progress.quizScore !== null && progress.quizAnswers?.length > 0) {
        await supabase.from('quiz_results').upsert({
          user_id: userId,
          lesson_id: 1,
          score: progress.quizScore,
          total_questions: progress.quizAnswers.length,
          answers: progress.quizAnswers
        }, { onConflict: 'user_id,lesson_id' })
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

  const value = {
    user,
    profile,
    loading,
    error,
    showAuthModal,
    authModalMode,
    authSuccess,
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
