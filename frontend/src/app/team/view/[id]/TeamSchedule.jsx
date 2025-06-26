"use client"

import { useEffect, useState } from "react"
import { getCalendarForTeam } from "../../../../lib/team"
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  Minus,
  Users,
  Timer,
  Activity,
} from "lucide-react"

export default function TeamSchedule({ teamId }) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all") // all, upcoming, completed

  useEffect(() => {
    if (!teamId) return

    async function fetchSchedule() {
      try {
        const data = await getCalendarForTeam(teamId)
        setMatches(data || [])
      } catch (err) {
        setError("Failed to load schedule")
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [teamId])

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "upcoming":
        return <Clock className="w-5 h-5 text-[#0c969c]" />
      default:
        return <Timer className="w-5 h-5 text-[#6ba3be]" />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "upcoming":
        return "bg-[#0c969c]/20 text-[#0c969c] border-[#0c969c]/30"
      default:
        return "bg-[#6ba3be]/20 text-[#6ba3be] border-[#6ba3be]/30"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredMatches = matches.filter((match) => {
    if (filter === "all") return true
    if (filter === "upcoming") return match.status?.toLowerCase() === "upcoming"
    if (filter === "completed") return match.status?.toLowerCase() === "completed"
    return true
  })

  const upcomingCount = matches.filter((m) => m.status?.toLowerCase() === "upcoming").length
  const completedCount = matches.filter((m) => m.status?.toLowerCase() === "completed").length

  if (loading) {
    return (
      <div className="mt-12 flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4 border-[#0c969c]"></div>
          <p className="text-[#6ba3be] text-lg">Loading schedule...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-12 flex items-center justify-center py-16">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-500/20 border border-red-500/30">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-red-400">Error Loading Schedule</h3>
          <p className="text-[#6ba3be]">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0c969c] to-[#6ba3be] flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0c969c]">Match Schedule</h2>
        </div>
        <p className="text-[#6ba3be] text-lg">Track your team's upcoming and completed matches</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-[#0c969c]/50 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0c969c]/20 flex items-center justify-center border border-[#0c969c]/30">
              <Trophy className="w-6 h-6 text-[#0c969c]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0c969c]">{matches.length}</p>
              <p className="text-[#6ba3be] text-sm">Total Matches</p>
            </div>
          </div>
        </div>

        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-[#0c969c]/50 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6ba3be]/20 flex items-center justify-center border border-[#6ba3be]/30">
              <Clock className="w-6 h-6 text-[#6ba3be]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6ba3be]">{upcomingCount}</p>
              <p className="text-[#6ba3be] text-sm">Upcoming</p>
            </div>
          </div>
        </div>

        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-[#0c969c]/50 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{completedCount}</p>
              <p className="text-[#6ba3be] text-sm">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {[
          { key: "all", label: "All Matches", icon: Trophy },
          { key: "upcoming", label: "Upcoming", icon: Clock },
          { key: "completed", label: "Completed", icon: CheckCircle },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
              filter === key
                ? "bg-[#0c969c] text-[#031716] shadow-lg shadow-[#0c969c]/25"
                : "bg-[#032f30] text-[#6ba3be] border border-[#0a7075] hover:border-[#0c969c]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-16 bg-[#032f30] rounded-2xl border border-[#0a7075]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#0a7075] border border-[#274d60]">
            <Calendar className="w-10 h-10 text-[#6ba3be]" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[#0c969c]">No Matches Found</h3>
          <p className="text-[#6ba3be]">
            {filter === "all" ? "No matches scheduled yet" : `No ${filter} matches found`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMatches.map((match) => {
            const opponent = match.team_one_id === teamId ? match.team_two_name : match.team_one_name
            const isUpcoming = match.status?.toLowerCase() === "upcoming"
            const isCompleted = match.status?.toLowerCase() === "completed"

            return (
              <div
                key={match.id}
                className={`group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 bg-[#032f30] ${
                  isUpcoming
                    ? "border-[#0c969c] hover:shadow-[#0c969c]/20"
                    : isCompleted
                      ? "border-[#0a7075] hover:border-[#6ba3be]/50"
                      : "border-[#0a7075] hover:border-[#274d60]"
                }`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6">
                  {/* Match Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0a7075] flex items-center justify-center border border-[#274d60]">
                        <Users className="w-5 h-5 text-[#6ba3be]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0c969c] group-hover:text-[#6ba3be] transition-colors duration-300">
                          vs {opponent}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#6ba3be]">
                          <Calendar className="w-4 h-4" />
                          {formatDate(match.date)}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                        match.status,
                      )}`}
                    >
                      {getStatusIcon(match.status)}
                      {match.status}
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031716] border border-[#0a7075]">
                      <div className="w-8 h-8 rounded-lg bg-[#0a7075] flex items-center justify-center">
                        <Clock className="w-4 h-4 text-[#6ba3be]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0c969c]">{formatTime(match.date)}</p>
                        <p className="text-sm text-[#6ba3be]">{formatDate(match.date)}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031716] border border-[#0a7075]">
                      <div className="w-8 h-8 rounded-lg bg-[#0a7075] flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#6ba3be]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0c969c]">Location</p>
                        <p className="text-sm text-[#6ba3be]">{match.location || "TBD"}</p>
                      </div>
                    </div>

                    {/* Result */}
                    {match.statistic_after_match_id && match.result ? (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031716] border border-[#0a7075]">
                        <div className="w-8 h-8 rounded-lg bg-[#0a7075] flex items-center justify-center">
                          <Target className="w-4 h-4 text-[#6ba3be]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c969c]">Final Score</p>
                          <p className="text-lg font-bold text-[#6ba3be]">{match.result}</p>
                        </div>
                      </div>
                    ) : isUpcoming ? (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#0c969c]/10 to-[#6ba3be]/10 border border-[#0c969c]/30">
                        <div className="w-8 h-8 rounded-lg bg-[#0c969c]/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#0c969c]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c969c]">Get Ready!</p>
                          <p className="text-sm text-[#6ba3be]">Match starts soon</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031716] border border-[#0a7075]">
                        <div className="w-8 h-8 rounded-lg bg-[#0a7075] flex items-center justify-center">
                          <Minus className="w-4 h-4 text-[#6ba3be]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#274d60]">Result</p>
                          <p className="text-sm text-[#6ba3be]">Not available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Match Actions */}
                  {isUpcoming && (
                    <div className="mt-6 pt-4 border-t border-[#0a7075]">
                      <div className="flex items-center justify-center gap-2 text-sm text-[#0c969c] font-medium">
                        <Activity className="w-4 h-4" />
                        <span>Prepare for battle!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
