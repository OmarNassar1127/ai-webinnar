import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PartyPopper, Map, Wrench, Rocket, Heart, Trophy } from 'lucide-react'

import Sidebar from '../components/layout/Sidebar'
import Navigation from '../components/layout/Navigation'
import Header from '../components/layout/Header'

import {
  OpeningCelebration,
  JourneyRecap,
  ToolShowcase,
  WhatsNext,
  ThankYouClose,
  FinalCompletion
} from '../sections/lesson9'

import { Lesson9Provider, useLesson9 } from '../context/Lesson9Context'

const sections = [
  { id: 1, title: 'Opening Celebration', icon: PartyPopper },
  { id: 2, title: 'Your Journey Recap', icon: Map },
  { id: 3, title: 'Tool Showcase', icon: Wrench },
  { id: 4, title: "What's Next", icon: Rocket },
  { id: 5, title: 'Thank You & Close', icon: Heart },
  { id: 6, title: 'Final Completion', icon: Trophy }
]

const sectionComponents = {
  1: OpeningCelebration,
  2: JourneyRecap,
  3: ToolShowcase,
  4: WhatsNext,
  5: ThankYouClose,
  6: FinalCompletion
}

function Lesson9Content({ onBack, onNavigateToLesson }) {
  const { currentSection, sectionCompletion, goToSection, completeSection } = useLesson9()
  const contentRef = useRef(null)

  // Scroll to top when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Also scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSection])

  const handleSectionClick = useCallback((sectionId) => {
    goToSection(sectionId)
  }, [goToSection])

  const handlePrevious = useCallback(() => {
    if (currentSection > 1) {
      goToSection(currentSection - 1)
    }
  }, [currentSection, goToSection])

  const handleNext = useCallback(() => {
    if (currentSection < sections.length) {
      completeSection(currentSection)
      goToSection(currentSection + 1)
    }
  }, [currentSection, completeSection, goToSection])

  const handleComplete = useCallback(() => {
    completeSection(currentSection)
    if (currentSection < sections.length) {
      goToSection(currentSection + 1)
    }
  }, [currentSection, completeSection, goToSection])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentSection > 1) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentSection < sections.length) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, handlePrevious, handleNext])

  const CurrentSectionComponent = sectionComponents[currentSection]

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  const sectionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Fixed Header */}
      <Header onBack={onBack} />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 pt-16 pb-20">
        {/* Sidebar - 25% width */}
        <div className="w-1/4 min-w-[250px] max-w-[320px]">
          <Sidebar
            sections={sections}
            currentSection={currentSection}
            completedSections={sectionCompletion}
            onSectionClick={handleSectionClick}
          />
        </div>

        {/* Main content - 75% width */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {CurrentSectionComponent && (
                <CurrentSectionComponent
                  onComplete={handleComplete}
                  onBack={onBack}
                  onNavigateToLesson={onNavigateToLesson}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed Navigation at bottom */}
      <Navigation
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentSection > 1}
        canGoNext={currentSection < sections.length}
      />
    </motion.div>
  )
}

function Lesson9({ onBack, onNavigateToLesson }) {
  return (
    <Lesson9Provider>
      <Lesson9Content onBack={onBack} onNavigateToLesson={onNavigateToLesson} />
    </Lesson9Provider>
  )
}

export default Lesson9
