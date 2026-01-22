import { motion } from 'framer-motion'
import { Brain, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { user, loading, openAuthModal } = useAuth()

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500
                      flex items-center justify-center shadow-lg shadow-purple-500/25"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </motion.div>
      </div>
    )
  }

  // If auth is required but user is not logged in, show prompt
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500
                      flex items-center justify-center shadow-lg shadow-purple-500/25"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Sign in to continue
          </h2>
          <p className="text-slate-400 mb-6">
            Create an account or sign in to track your progress and access all lessons.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => openAuthModal('signup')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white
                       font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                       transition-all duration-200"
            >
              Create Account
            </motion.button>
            <motion.button
              onClick={() => openAuthModal('login')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/5 text-white font-semibold rounded-xl
                       border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return children
}
