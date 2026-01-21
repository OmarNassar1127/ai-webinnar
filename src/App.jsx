import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LessonProvider } from './context/LessonContext'
import Dashboard from './pages/Dashboard'
import Lesson1 from './pages/Lesson1'
import AnimatedBackground from './components/layout/AnimatedBackground'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

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

  return (
    <LessonProvider>
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'dashboard' && (
              <Dashboard
                key="dashboard"
                onStartLesson={() => setCurrentPage('lesson1')}
              />
            )}
            {currentPage === 'lesson1' && (
              <Lesson1
                key="lesson1"
                onBack={() => setCurrentPage('dashboard')}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </LessonProvider>
  )
}

export default App
