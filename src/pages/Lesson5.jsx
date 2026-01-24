import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Layout, FileText, AlertTriangle, Lightbulb, HelpCircle, Trophy } from 'lucide-react'

import Sidebar from '../components/layout/Sidebar'
import Navigation from '../components/layout/Navigation'
import Header from '../components/layout/Header'

import {
  Introduction,
  WhatFramework,
  RequirementsPractice,
  CommonMistakes,
  YourRealToolPlan,
  QuizTime,
  Completion
} from '../sections/lesson5'

import { Lesson5Provider, useLesson5 } from '../context/Lesson5Context'

const sections = [
  { id: 1, title: 'Introduction', icon: Sparkles },
  { id: 2, title: 'The WHAT Framework', icon: Layout },
  { id: 3, title: 'Requirements Practice', icon: FileText },
  { id: 4, title: 'Common Mistakes', icon: AlertTriangle },
  { id: 5, title: 'Your Real Tool Plan', icon: Lightbulb },
  { id: 6, title: 'Quiz Time', icon: HelpCircle },
  { id: 7, title: 'Completion', icon: Trophy }
]

const sectionComponents = {
  1: Introduction,
  2: WhatFramework,
  3: RequirementsPractice,
  4: CommonMistakes,
  5: YourRealToolPlan,
  6: QuizTime,
  7: Completion
}

function Lesson5Content({ onBack, onNavigateToLesson }) {
  const { currentSection, sectionCompletion, goToSection, completeSection } = useLesson5()
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

function Lesson5({ onBack, onNavigateToLesson }) {
  return (
    <Lesson5Provider>
      <Lesson5Content onBack={onBack} onNavigateToLesson={onNavigateToLesson} />
    </Lesson5Provider>
  )
}

export default Lesson5
