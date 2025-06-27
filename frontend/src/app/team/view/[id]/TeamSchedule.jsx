"use client"

import { useEffect, useState } from "react"
import { getCalendarForTeam } from "../../../../lib/team"
import { Calendar, Clock, Trophy, Target, Zap, CheckCircle, XCircle, Users, Timer, Activity, Star } from "lucide-react"

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
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "FINISHED":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "SCHEDULED":
        return <Clock className="w-5 h-5 text-[#0c969c]" />
      case "LIVE":
      case "IN_PROGRESS":
        return <Activity className="w-5 h-5 text-yellow-500 animate-pulse" />
      default:
        return <Timer className="w-5 h-5 text-[#6ba3be]" />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "FINISHED":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "CANCELLED":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "SCHEDULED":
        return "bg-[#0c969c]/20 text-[#0c969c] border-[#0c969c]/30"
      case "LIVE":
      case "IN_PROGRESS":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-[#6ba3be]/20 text-[#6ba3be] border-[#6ba3be]/30"
    }
  }

  const isMatchCompleted = (status) => {
    return status?.toUpperCase() !== "SCHEDULED" && status?.toUpperCase() !== "CANCELLED"
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
    if (filter === "upcoming") return match.status?.toUpperCase() === "SCHEDULED"
    if (filter === "completed") return isMatchCompleted(match.status)
    return true
  })

  const upcomingCount = matches.filter((m) => m.status?.toUpperCase() === "SCHEDULED").length
  const completedCount = matches.filter((m) => isMatchCompleted(m.status)).length

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

  const getMatchResult = (match, teamId) => {
    if (!match.statistic) return null

    const { winner_id, win_points, lose_points } = match.statistic
    const { team_one, team_two } = match

    // Determine if current team won
    const currentTeamWon = winner_id === teamId

    return {
      score: `${win_points} - ${lose_points}`,
      winner: winner_id === team_one.id ? team_one.name : team_two.name,
      currentTeamWon,
      winPoints: win_points,
      losePoints: lose_points,
    }
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
        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-[#0c969c]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#0c969c]/10">
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

        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-[#6ba3be]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6ba3be]/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6ba3be]/20 flex items-center justify-center border border-[#6ba3be]/30">
              <Clock className="w-6 h-6 text-[#6ba3be]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6ba3be]">{upcomingCount}</p>
              <p className="text-[#6ba3be] text-sm">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-[#032f30] border border-[#0a7075] rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
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
          { key: "upcoming", label: "Scheduled", icon: Clock },
          { key: "completed", label: "Completed", icon: CheckCircle },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
              filter === key
                ? "bg-gradient-to-r from-[#0c969c] to-[#6ba3be] text-white shadow-lg shadow-[#0c969c]/25"
                : "bg-[#032f30] text-[#6ba3be] border border-[#0a7075] hover:border-[#0c969c] hover:text-[#0c969c]"
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
            console.log("Match data:", match) // Add this line for debugging
            const opponent = match.team_one.id === teamId ? match.team_two : match.team_one
            const opponentName = opponent?.name || "TBD"
            const opponentLogo = opponent?.logo
            const isScheduled = match.status?.toUpperCase() === "SCHEDULED"
            const isCompleted = isMatchCompleted(match.status)
            const hasResult = match.statistic && isCompleted

            return (
              <div
                key={match.id}
                className={`group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 bg-gradient-to-br from-[#032f30] to-[#031716] ${
                  isScheduled
                    ? "border-[#0c969c] hover:shadow-[#0c969c]/20"
                    : isCompleted
                      ? "border-green-500/50 hover:shadow-green-500/20"
                      : "border-[#0a7075] hover:border-[#274d60]"
                }`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6">
                  {/* Match Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0a7075] to-[#274d60] flex items-center justify-center border border-[#274d60] shadow-lg overflow-hidden">
                        {opponentLogo ? (
                          <img
                            src={opponentLogo?.replace("./frontend/public", "") || "/placeholder.svg"}
                            alt={opponentName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-5 h-5 text-[#6ba3be]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0c969c] group-hover:text-[#6ba3be] transition-colors duration-300">
                          vs {opponentName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#6ba3be]">
                          <Calendar className="w-4 h-4" />
                          {formatDate(match.date)}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border shadow-lg ${getStatusColor(
                        match.status,
                      )}`}
                    >
                      {getStatusIcon(match.status)}
                      {match.status?.replace("_", " ")}
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#031716] border border-[#0a7075] hover:border-[#274d60] transition-colors duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a7075] to-[#274d60] flex items-center justify-center shadow-md">
                        <Clock className="w-4 h-4 text-[#6ba3be]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0c969c]">{formatTime(match.date)}</p>
                        <p className="text-sm text-[#6ba3be]">{formatDate(match.date)}</p>
                      </div>
                    </div>

                    {/* League Info */}
                    {match.league_name && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#031716] border border-[#0a7075] hover:border-[#274d60] transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a7075] to-[#274d60] flex items-center justify-center shadow-md">
                          <Star className="w-4 h-4 text-[#6ba3be]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c969c]">League</p>
                          <p className="text-sm text-[#6ba3be]">{match.league_name}</p>
                        </div>
                      </div>
                    )}

                    {/* Result or Status */}
                    {hasResult ? (
                      <div className="space-y-3">
                        {/* Match Score */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-[#0c969c]/10 border border-green-500/30 shadow-lg">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-[#0c969c]/20 flex items-center justify-center shadow-md">
                            <Trophy className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-green-400">Final Score</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-2xl font-bold text-[#0c969c]">
                                {(() => {
                                  const result = getMatchResult(match, teamId)
                                  return result?.score || "N/A"
                                })()}
                              </p>
                              {(() => {
                                const result = getMatchResult(match, teamId)
                                return result?.currentTeamWon ? (
                                  <div className="flex items-center gap-1 text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">WIN</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-red-400">
                                    <XCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">LOSS</span>
                                  </div>
                                )
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Best Player */}
                        {match.statistic.best_player_id && (
                          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-[#0c969c]/10 border border-yellow-500/30 shadow-lg">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-[#0c969c]/20 flex items-center justify-center shadow-md">
                              <Star className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-yellow-400">Best Player</p>
                              <p className="text-sm text-[#6ba3be]">Player ID: {match.statistic.best_player_id}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : isScheduled ? (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#0c969c]/10 to-[#6ba3be]/10 border border-[#0c969c]/30 shadow-lg">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c969c]/20 to-[#6ba3be]/20 flex items-center justify-center shadow-md">
                          <Zap className="w-4 h-4 text-[#0c969c]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c969c]">Get Ready!</p>
                          <p className="text-sm text-[#6ba3be]">Match coming up</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#031716] border border-[#0a7075] hover:border-[#274d60] transition-colors duration-300">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a7075] to-[#274d60] flex items-center justify-center shadow-md">
                          <Target className="w-4 h-4 text-[#6ba3be]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0c969c]">Result</p>
                          <p className="text-sm text-[#6ba3be]">
                            {match.status?.toUpperCase() === "CANCELLED" ? "Match Cancelled" : "Pending"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Match Actions */}
                  {isScheduled && (
                    <div className="mt-6 pt-4 border-t border-[#0a7075]">
                      <div className="flex items-center justify-center gap-2 text-sm text-[#0c969c] font-medium">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span>Prepare for battle!</span>
                      </div>
                    </div>
                  )}

                  {hasResult && (
                    <div className="mt-6 pt-4 border-t border-green-500/20">
                      <div className="flex items-center justify-center gap-2 text-sm text-green-400 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Match completed - View full statistics</span>
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
