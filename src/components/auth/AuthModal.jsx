import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ForgotPasswordForm from './ForgotPasswordForm'

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, authModalMode, setAuthModalMode } = useAuth()
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  if (!showAuthModal) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAuthModal()
    }
  }

  const handleClose = () => {
    setShowForgotPassword(false)
    closeAuthModal()
  }

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10
                       rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden"
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white
                       hover:bg-white/10 rounded-lg transition-all duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* Logo and title */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500
                              flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400
                               bg-clip-text text-transparent">
                  Omar AI Academy
                </span>
              </div>

              <AnimatePresence mode="wait">
                {showForgotPassword ? (
                  <ForgotPasswordForm
                    key="forgot"
                    onBack={() => setShowForgotPassword(false)}
                  />
                ) : (
                  <motion.div key="auth-forms">
                    {/* Tab switcher */}
                    <div className="flex mb-6 p-1 bg-slate-800/50 rounded-xl">
                      <button
                        onClick={() => setAuthModalMode('login')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          authModalMode === 'login'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => setAuthModalMode('signup')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          authModalMode === 'signup'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {authModalMode === 'login' ? (
                        <LoginForm
                          key="login"
                          onForgotPassword={() => setShowForgotPassword(true)}
                        />
                      ) : (
                        <SignupForm key="signup" />
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
