import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Network, Bot, Puzzle, Workflow, Sparkles, User, HelpCircle, Trophy } from 'lucide-react'

import Sidebar from '../components/layout/Sidebar'
import Navigation from '../components/layout/Navigation'
import Header from '../components/layout/Header'

import {
  Introduction,
  ChatbotsVsAgents,
  ToolsExplained,
  HowTheyWorkTogether,
  WhatsPossible,
  YourRole,
  QuizTime,
  Completion
} from '../sections/lesson3'

import { Lesson3Provider, useLesson3 } from '../context/Lesson3Context'

const sections = [
  { id: 1, title: 'Introduction', icon: Network },
  { id: 2, title: 'Chatbots vs Agents', icon: Bot },
  { id: 3, title: 'Tools Explained', icon: Puzzle },
  { id: 4, title: 'How They Work Together', icon: Workflow },
  { id: 5, title: "What's Possible Now", icon: Sparkles },
  { id: 6, title: 'Your Role', icon: User },
  { id: 7, title: 'Quiz Time', icon: HelpCircle },
  { id: 8, title: 'Completion', icon: Trophy }
]

const sectionComponents = {
  1: Introduction,
  2: ChatbotsVsAgents,
  3: ToolsExplained,
  4: HowTheyWorkTogether,
  5: WhatsPossible,
  6: YourRole,
  7: QuizTime,
  8: Completion
}

function Lesson3Content({ onBack, onNavigateToLesson, isNextLessonBlocked }) {
  const { currentSection, sectionCompletion, goToSection, completeSection } = useLesson3()
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
      <Header onBack={onBack} onLogoClick={onBack} />

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
              className="flex-1"
            >
              {CurrentSectionComponent && (
                <CurrentSectionComponent
                  onComplete={handleComplete}
                  onBack={onBack}
                  onNavigateToLesson={onNavigateToLesson}
                  isNextLessonBlocked={isNextLessonBlocked}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation at bottom of content area */}
          <Navigation
            currentSection={currentSection}
            totalSections={sections.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={currentSection > 1}
            canGoNext={currentSection < sections.length}
          />
        </div>
      </div>
    </motion.div>
  )
}

function Lesson3({ onBack, onNavigateToLesson, isNextLessonBlocked }) {
  return (
    <Lesson3Provider>
      <Lesson3Content onBack={onBack} onNavigateToLesson={onNavigateToLesson} isNextLessonBlocked={isNextLessonBlocked} />
    </Lesson3Provider>
  )
}

export default Lesson3
