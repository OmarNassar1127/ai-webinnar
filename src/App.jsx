import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LessonProvider } from './context/LessonContext'
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

  // Handle start lesson - require login
  const handleStartLesson = (lessonId = 1) => {
    if (!user) {
      openAuthModal('login')
      return
    }
    setCurrentPage(`lesson${lessonId}`)
  }

  return (
    <LessonProvider>
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </div>

        {/* Auth Modal - rendered at app level for global access */}
        <AuthModal />
      </div>
    </LessonProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
