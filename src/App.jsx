import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LessonProvider } from './context/LessonContext'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import Dashboard from './pages/Dashboard'
import Lesson1 from './pages/Lesson1'
import AdminDashboard from './pages/AdminDashboard'
import AnimatedBackground from './components/layout/AnimatedBackground'
import AuthModal from './components/auth/AuthModal'

function AppContent() {
  const { currentPage, setCurrentPage } = useNavigation()
  const { user, openAuthModal } = useAuth()

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
  const handleStartLesson = () => {
    if (!user) {
      openAuthModal('login')
      return
    }
    setCurrentPage('lesson1')
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
            {currentPage === 'admin' && (
              <AdminDashboard key="admin" />
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
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  )
}

export default App
