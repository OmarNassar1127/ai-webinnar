import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Zap, Bot, FileText, Play, Target, HelpCircle, Trophy, Lock, ArrowLeft } from 'lucide-react'

import Sidebar from '../components/layout/Sidebar'
import Navigation from '../components/layout/Navigation'
import Header from '../components/layout/Header'
import { Button, Card } from '../components/common'

import {
  TheBigReveal,
  BeyondSinglePrompts,
  MeetRalph,
  ThePRD,
  SeeingItInAction,
  WhenToUse,
  QuizTime,
  Completion
} from '../sections/lesson8'

import { Lesson8Provider, useLesson8, isLesson8Unlocked } from '../context/Lesson8Context'

const sections = [
  { id: 1, title: 'The Big Reveal', icon: Eye },
  { id: 2, title: 'Beyond Single Prompts', icon: Zap },
  { id: 3, title: 'Meet Ralph', icon: Bot },
  { id: 4, title: 'The PRD', icon: FileText },
  { id: 5, title: 'Seeing It In Action', icon: Play },
  { id: 6, title: 'When to Use', icon: Target },
  { id: 7, title: 'Quiz Time', icon: HelpCircle },
  { id: 8, title: 'Completion', icon: Trophy }
]

const sectionComponents = {
  1: TheBigReveal,
  2: BeyondSinglePrompts,
  3: MeetRalph,
  4: ThePRD,
  5: SeeingItInAction,
  6: WhenToUse,
  7: QuizTime,
  8: Completion
}

// Locked message component shown when lesson is not unlocked
function LockedMessage({ onBack }) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="max-w-md p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex p-4 rounded-full bg-amber-500/20 border border-amber-500/40 mb-6"
        >
          <Lock className="w-10 h-10 text-amber-400" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-4">
          The Magic Lesson is Locked
        </h1>
        <p className="text-slate-400 mb-6">
          This secret lesson contains advanced content about autonomous AI development.
          It will be unlocked at a special moment in your learning journey.
        </p>
        <p className="text-sm text-slate-500 mb-8">
          Hint: Complete the other lessons and keep an eye out for special announcements.
        </p>

        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Button>
      </Card>
    </motion.div>
  )
}

function Lesson8Content({ onBack }) {
  const { currentSection, sectionCompletion, goToSection, completeSection, isUnlocked } = useLesson8()
  const contentRef = useRef(null)

  // If not unlocked, show locked message
  if (!isUnlocked) {
    return <LockedMessage onBack={onBack} />
  }

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

function Lesson8({ onBack }) {
  return (
    <Lesson8Provider>
      <Lesson8Content onBack={onBack} />
    </Lesson8Provider>
  )
}

export default Lesson8
