import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, ChevronDown, BarChart3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function UserMenu() {
  const { user, profile, signOut, openAuthModal } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = getInitials(profile?.full_name)

  if (!user) {
    return (
      <motion.button
        onClick={() => openAuthModal('login')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm
                 font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                 transition-all duration-200"
      >
        Sign In
      </motion.button>
    )
  }

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
      >
        {/* Avatar */}
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-9 h-9 rounded-full object-cover border-2 border-purple-500/50"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500
                        flex items-center justify-center shadow-lg shadow-purple-500/25">
            <span className="text-sm font-semibold text-white">{initials}</span>
          </div>
        )}

        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-white">{displayName}</span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 py-2 bg-slate-800/95 backdrop-blur-xl
                     border border-white/10 rounded-xl shadow-xl shadow-black/20 z-50"
          >
            {/* User info section */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="font-medium text-white truncate">{displayName}</p>
              <p className="text-sm text-slate-400 truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300
                         hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                My Progress
              </button>
            </div>

            {/* Divider and sign out */}
            <div className="border-t border-white/10 pt-2 mt-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400
                         hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
