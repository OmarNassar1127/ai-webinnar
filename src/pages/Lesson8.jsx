import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Zap, Bot, FileText, Play, Target, HelpCircle, Trophy, Lock, ArrowLeft, Sparkles, KeyRound } from 'lucide-react'

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

import { Lesson8Provider, useLesson8, isLesson8Unlocked, unlockLesson8 } from '../context/Lesson8Context'

// The secret unlock code
const UNLOCK_CODE = 'RALPH'

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

// Reveal animation when lesson is unlocked
function UnlockRevealAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Sparkle burst effect */}
      {phase >= 1 && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.03,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Lock breaking animation */}
      <div className="text-center relative">
        <motion.div
          className="inline-flex p-6 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border border-emerald-500/50 mb-8"
          animate={phase >= 1 ? {
            scale: [1, 1.2, 1],
            borderColor: ['rgba(16, 185, 129, 0.5)', 'rgba(6, 182, 212, 0.8)', 'rgba(16, 185, 129, 0.5)'],
            boxShadow: ['0 0 20px rgba(16, 185, 129, 0.3)', '0 0 60px rgba(6, 182, 212, 0.6)', '0 0 20px rgba(16, 185, 129, 0.3)'],
          } : {}}
          transition={{ duration: 1, repeat: phase < 3 ? Infinity : 0 }}
        >
          <motion.div
            animate={phase >= 2 ? { rotate: 360, scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.8 }}
          >
            {phase < 2 ? (
              <Lock className="w-16 h-16 text-emerald-400" />
            ) : (
              <Sparkles className="w-16 h-16 text-cyan-400" />
            )}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="unlocking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl text-emerald-400 font-medium"
            >
              Verifying access code...
            </motion.p>
          )}
          {phase === 1 && (
            <motion.p
              key="verified"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl text-cyan-400 font-medium"
            >
              Access granted!
            </motion.p>
          )}
          {phase >= 2 && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Secret Lesson Unlocked
              </h2>
              <p className="text-lg text-slate-400">
                Welcome to The Magic Lesson
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Locked message component shown when lesson is not unlocked
function LockedMessage({ onBack, onUnlock }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (code.toUpperCase() === UNLOCK_CODE) {
      setError('')
      unlockLesson8()
      onUnlock()
    } else {
      setError('Invalid code. Try again.')
      setCode('')
    }
  }

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

        {!showCodeInput ? (
          <>
            <p className="text-sm text-slate-500 mb-6">
              Hint: Complete the other lessons and keep an eye out for special announcements.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={() => setShowCodeInput(true)}
                className="w-full"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Enter Unlock Code
              </Button>
              <Button variant="secondary" onClick={onBack} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleCodeSubmit} className="mb-4">
              <div className="mb-4">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase())
                    setError('')
                  }}
                  placeholder="Enter secret code"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-center text-lg font-mono tracking-widest focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  autoFocus
                  maxLength={10}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowCodeInput(false)
                    setCode('')
                    setError('')
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={code.length === 0}
                  className="flex-1"
                >
                  Unlock
                </Button>
              </div>
            </form>

            <p className="text-xs text-slate-500">
              The unlock code will be shared during the live session.
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

function Lesson8Content({ onBack, onNavigateToLesson }) {
  const { currentSection, sectionCompletion, goToSection, completeSection, isUnlocked, refetch } = useLesson8()
  const contentRef = useRef(null)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  // Handle unlock event
  const handleUnlock = useCallback(() => {
    setShowUnlockAnimation(true)
  }, [])

  // Handle unlock animation complete
  const handleUnlockAnimationComplete = useCallback(() => {
    setShowUnlockAnimation(false)
    setJustUnlocked(true)
    refetch() // Refresh the context to pick up the new unlock status
  }, [refetch])

  // Show unlock animation
  if (showUnlockAnimation) {
    return <UnlockRevealAnimation onComplete={handleUnlockAnimationComplete} />
  }

  // If not unlocked, show locked message
  if (!isUnlocked && !justUnlocked) {
    return <LockedMessage onBack={onBack} onUnlock={handleUnlock} />
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

function Lesson8({ onBack, onNavigateToLesson }) {
  return (
    <Lesson8Provider>
      <Lesson8Content onBack={onBack} onNavigateToLesson={onNavigateToLesson} />
    </Lesson8Provider>
  )
}

export default Lesson8
