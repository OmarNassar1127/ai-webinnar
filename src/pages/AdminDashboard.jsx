import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react'
import Header from '../components/layout/Header'
import { Card, Button } from '../components/common/'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '../context/NavigationContext'
import { useAdminData } from '../hooks/useAdminData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function formatLastActive(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

function StatCard({ icon: Icon, label, value, color }) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-400',
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-400',
    cyan: 'from-cyan-500/20 to-cyan-600/20 text-cyan-400',
    amber: 'from-amber-500/20 to-amber-600/20 text-amber-400',
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-slate-400">{label}</p>
        </div>
      </div>
    </Card>
  )
}

function UserRow({ user }) {
  const progressPercent = Math.round((user.lessonsCompleted / user.totalLessons) * 100)
  const avgQuizScore = user.quizScores.length > 0
    ? Math.round(user.quizScores.reduce((sum, q) => sum + q.percentage, 0) / user.quizScores.length)
    : null

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-4 hover:bg-slate-800/70 transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-white">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-white truncate">{user.name}</p>
            <p className="text-sm text-slate-400 truncate">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 md:gap-8 text-sm">
          {/* Lessons Completed */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium">{user.lessonsCompleted}</span>
            <span className="text-slate-500">/ {user.totalLessons}</span>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-400 text-xs w-8">{progressPercent}%</span>
          </div>

          {/* Quiz Score */}
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-white font-medium">
              {avgQuizScore !== null ? `${avgQuizScore}%` : '-'}
            </span>
          </div>

          {/* Last Active */}
          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{formatLastActive(user.lastActive)}</span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5">
            {user.lessonsCompleted === user.totalLessons ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : user.lessonsCompleted > 0 ? (
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-slate-500" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const { isAdmin, user } = useAuth()
  const { navigateTo } = useNavigation()
  const { users, loading, error } = useAdminData()

  // Redirect non-admins to dashboard
  useEffect(() => {
    if (!isAdmin && user !== undefined) {
      navigateTo('dashboard')
    }
  }, [isAdmin, user, navigateTo])

  // Don't render if not admin
  if (!isAdmin) {
    return null
  }

  // Calculate summary stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.lessonsCompleted > 0).length
  const completedUsers = users.filter(u => u.lessonsCompleted === u.totalLessons).length
  const totalLessonsCompleted = users.reduce((sum, u) => sum + u.lessonsCompleted, 0)

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigateTo('dashboard')}
            className="mb-6"
          >
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-slate-400">Monitor user progress and manage lessons</p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-red-500/20">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p>Failed to load admin data. Please try again.</p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div variants={itemVariants} className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <p className="text-slate-400">Loading user data...</p>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <StatCard
                icon={Users}
                label="Total Users"
                value={totalUsers}
                color="purple"
              />
              <StatCard
                icon={BookOpen}
                label="Active Learners"
                value={activeUsers}
                color="blue"
              />
              <StatCard
                icon={Award}
                label="Completed Course"
                value={completedUsers}
                color="amber"
              />
              <StatCard
                icon={CheckCircle}
                label="Lessons Completed"
                value={totalLessonsCompleted}
                color="cyan"
              />
            </motion.div>

            {/* Users List */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">All Users</h2>
                  <span className="text-sm text-slate-400">{users.length} users</span>
                </div>

                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">No users found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </main>
    </motion.div>
  )
}
