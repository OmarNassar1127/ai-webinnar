import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LessonProvider, useLesson } from './context/LessonContext'
import { GlobalProgressProvider, useGlobalProgress } from './context/GlobalProgressContext'
import { unlockLesson8 } from './context/Lesson8Context'
import Dashboard from './pages/Dashboard'
import Lesson1 from './pages/Lesson1'
import Lesson2 from './pages/Lesson2'
import Lesson3 from './pages/Lesson3'
import Lesson4 from './pages/Lesson4'
import Lesson5 from './pages/Lesson5'
import Lesson6 from './pages/Lesson6'
import Lesson7 from './pages/Lesson7'
import Lesson8 from './pages/Lesson8'
import Lesson9 from './pages/Lesson9'
import AnimatedBackground from './components/layout/AnimatedBackground'
import AuthModal from './components/auth/AuthModal'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { user, openAuthModal } = useAuth()
  const { isLessonUnlocked } = useGlobalProgress()
  const { sectionCompletion } = useLesson()

  // Check if Lesson 1 is completed locally
  const isLesson1Completed = sectionCompletion?.every(Boolean) || false

  // Combined unlock check that uses local state for immediate feedback
  const isLessonReallyUnlocked = (lessonId) => {
    if (lessonId === 1) return true
    if (lessonId === 2) return isLesson1Completed // Use local state
    return isLessonUnlocked(lessonId)
  }

  // Check for URL-based unlock on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const unlockCode = params.get('unlock')
    if (unlockCode?.toUpperCase() === 'RALPH') {
      unlockLesson8()
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && currentPage !== 'dashboard') {
        setCurrentPage('dashboard')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage])

  // Handle start lesson - require login and check if lesson is unlocked
  const handleStartLesson = (lessonId = 1) => {
    if (!user) {
      openAuthModal('login')
      return
    }
    // Check if the lesson is unlocked
    if (!isLessonReallyUnlocked(lessonId)) {
      // Don't navigate to locked lessons
      return
    }
    setCurrentPage(`lesson${lessonId}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
        <div className="relative z-10">
            {currentPage === 'dashboard' && (
              <Dashboard
                key="dashboard"
                onStartLesson={handleStartLesson}
              />
            )}
            {currentPage === 'lesson1' && (
              <Lesson1
                key="lesson1"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson2' && (
              <Lesson2
                key="lesson2"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson3' && (
              <Lesson3
                key="lesson3"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson4' && (
              <Lesson4
                key="lesson4"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson5' && (
              <Lesson5
                key="lesson5"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson6' && (
              <Lesson6
                key="lesson6"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson7' && (
              <Lesson7
                key="lesson7"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson8' && (
              <Lesson8
                key="lesson8"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
            {currentPage === 'lesson9' && (
              <Lesson9
                key="lesson9"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
        </div>

      {/* Auth Modal - rendered at app level for global access */}
      <AuthModal />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <GlobalProgressProvider>
        <LessonProvider>
          <AppContent />
        </LessonProvider>
      </GlobalProgressProvider>
    </AuthProvider>
  )
}

export default App
