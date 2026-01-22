import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function SignupForm() {
  const { signUp, error, clearError, isEmailAllowed } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')
  const [pendingActivation, setPendingActivation] = useState(false)

  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields')
      return false
    }
    if (!isEmailAllowed(email)) {
      setLocalError('Only @vloto.nl and @knsf.nl email addresses are allowed')
      return false
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return false
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    if (!validateForm()) return

    setLoading(true)
    const { error, needsActivation } = await signUp(email, password, fullName)
    setLoading(false)

    if (error) {
      setLocalError(error.message)
    } else if (needsActivation) {
      setPendingActivation(true)
    }
  }

  const displayError = localError || error

  if (pendingActivation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center"
        >
          <Clock className="w-8 h-8 text-amber-400" />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">Account Created!</h3>
        <p className="text-slate-400 mb-4">
          Your account is pending activation. An administrator will review and activate your account shortly.
        </p>
        <p className="text-sm text-slate-500">
          You'll be able to log in once your account has been activated.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{displayError}</p>
        </motion.div>
      )}

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
        <p className="text-xs text-blue-300">
          Only @vloto.nl and @knsf.nl email addresses can register
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/10 rounded-xl
                     text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500
                     focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Work Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@vloto.nl"
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/10 rounded-xl
                     text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500
                     focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-white/10 rounded-xl
                     text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500
                     focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white
                     transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/10 rounded-xl
                     text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500
                     focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full py-3.5 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold
                 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200
                 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          'Request Account'
        )}
      </motion.button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Your account will need to be activated by an administrator before you can log in
      </p>
    </motion.form>
  )
}
