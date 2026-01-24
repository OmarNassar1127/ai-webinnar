import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  UserCheck,
  UserX,
  Search
} from 'lucide-react'
import Header from '../components/layout/Header'
import { Card, Button } from '../components/common/'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '../context/NavigationContext'
import { useAdminData } from '../hooks/useAdminData'
import UserProgressDetail from '../components/admin/UserProgressDetail'
import LessonBlockManager from '../components/admin/LessonBlockManager'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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


export default function AdminDashboard() {
  const { isAdmin, user } = useAuth()
  const { navigateTo } = useNavigation()
  const { users, loading, error, toggleUserActive } = useAdminData()
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [userFilter, setUserFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Toggle expanded state for a user
  const toggleUserExpanded = (userId) => {
    setExpandedUserId(prev => prev === userId ? null : userId)
  }

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
  const activeAccountUsers = users.filter(u => u.isActive).length
  const inactiveAccountUsers = users.filter(u => !u.isActive).length
  const learningUsers = users.filter(u => u.lessonsCompleted > 0).length
  const completedUsers = users.filter(u => u.lessonsCompleted === u.totalLessons).length

  // Filter users based on current filter and search
  const filteredUsers = users.filter(u => {
    // Apply status filter
    if (userFilter === 'active' && !u.isActive) return false
    if (userFilter === 'inactive' && u.isActive) return false

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
      )
    }

    return true
  })

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header onLogoClick={() => navigateTo('dashboard')} />

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
                icon={CheckCircle}
                label="Active Accounts"
                value={activeAccountUsers}
                color="cyan"
              />
              <StatCard
                icon={BookOpen}
                label="Learning"
                value={learningUsers}
                color="blue"
              />
              <StatCard
                icon={Award}
                label="Completed Course"
                value={completedUsers}
                color="amber"
              />
            </motion.div>

            {/* Lesson Block Manager */}
            <motion.div variants={itemVariants} className="mb-8">
              <LessonBlockManager />
            </motion.div>

            {/* Users List */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                {/* Header with title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">User Management</h2>
                      <p className="text-sm text-slate-400">Manage user accounts and view progress</p>
                    </div>
                  </div>
                </div>

                {/* Filter tabs and search */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-lg">
                    <button
                      onClick={() => setUserFilter('all')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        userFilter === 'all'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      All ({totalUsers})
                    </button>
                    <button
                      onClick={() => setUserFilter('active')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        userFilter === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      Active ({activeAccountUsers})
                    </button>
                    <button
                      onClick={() => setUserFilter('inactive')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        userFilter === 'inactive'
                          ? 'bg-red-500/20 text-red-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <UserX className="w-4 h-4" />
                      Inactive ({inactiveAccountUsers})
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-900/50 border border-white/5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* Users List */}
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">
                      {searchQuery ? 'No users match your search' : 'No users found'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.map((u) => (
                      <UserProgressDetail
                        key={u.id}
                        user={u}
                        isExpanded={expandedUserId === u.id}
                        onToggle={() => toggleUserExpanded(u.id)}
                        onToggleActive={toggleUserActive}
                      />
                    ))}
                  </div>
                )}

                {/* Results count */}
                {filteredUsers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5 text-center">
                    <span className="text-sm text-slate-500">
                      Showing {filteredUsers.length} of {totalUsers} users
                    </span>
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
