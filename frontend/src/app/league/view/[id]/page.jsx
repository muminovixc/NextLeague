"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getLeaguesStatistic, getLeagueById, getUserId, startLeague } from "../../../../lib/league"
import { ArrowLeft, Trophy, Calendar, Play, ChevronUp, ChevronDown, Medal, Target, Users } from "lucide-react"
import LeagueSchedule from "./LeagueSchedule"

export default function ViewLeaguePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [statistics, setStatistics] = useState([])
  const [leagueName, setLeagueName] = useState("")
  const [moderatorId, setModeratorId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")
  const [showSchedule, setShowSchedule] = useState(false)

  const [sortConfig, setSortConfig] = useState({ key: "points", direction: "desc" })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statData, leagueData, userId] = await Promise.all([
          getLeaguesStatistic(id),
          getLeagueById(id),
          getUserId(),
        ])

        setStatistics(statData)
        setLeagueName(leagueData.name)
        setModeratorId(leagueData.moderator_user_id)
        setUserId(userId)

        console.log("User ID:", userId)
        console.log("Moderator ID:", leagueData.moderator_user_id)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [id])

  const sortedTeams = [...statistics].sort((a, b) => {
    const { key, direction } = sortConfig
    let aValue = a[key]
    let bValue = b[key]

    if (key === "goal_diff") {
      aValue = a.win_points - a.lose_points
      bValue = b.win_points - b.lose_points
    }

    if (aValue < bValue) return direction === "asc" ? -1 : 1
    if (aValue > bValue) return direction === "asc" ? 1 : -1
    return 0
  })

  const onSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      })
    } else {
      setSortConfig({ key, direction: "asc" })
    }
  }

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    )
  }

  const getRowClass = (index, length) => {
    if (index === 0)
      return "bg-gradient-to-r from-[#0c969c]/20 to-[#6ba3be]/20 hover:from-[#0c969c]/30 hover:to-[#6ba3be]/30 border-l-4 border-l-[#0c969c] transition-all duration-300 cursor-pointer"
    if (index === length - 1)
      return "bg-gradient-to-r from-red-900/20 to-red-800/20 hover:from-red-900/30 hover:to-red-800/30 border-l-4 border-l-red-500 transition-all duration-300 cursor-pointer"
    return "hover:bg-gradient-to-r hover:from-[#032f30] hover:to-[#0a7075]/20 transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-[#0a7075]"
  }

  const getPositionIcon = (index, length) => {
    if (index === 0) return <Medal className="w-5 h-5 text-[#0c969c]" />
    if (index === 1) return <Medal className="w-5 h-5 text-[#6ba3be]" />
    if (index === 2) return <Medal className="w-5 h-5 text-[#274d60]" />
    if (index === length - 1) return <Target className="w-5 h-5 text-red-500" />
    return null
  }

  const handleRowClick = (teamId) => {
    router.push(`/team/view/${teamId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#031716] via-[#032f30] to-[#031716] text-white">
      <div className="container mx-auto px-4 py-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] rounded-2xl p-6 shadow-2xl border border-[#0c969c]/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#0c969c] p-3 rounded-full">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {leagueName || `League #${id}`}
                  </h1>
                  <p className="text-[#6ba3be] text-lg font-medium">League Standings</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 bg-[#274d60] hover:bg-[#6ba3be] text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={() => setShowSchedule(!showSchedule)}
                >
                  <Calendar className="w-4 h-4" />
                  {showSchedule ? "Hide Schedule" : "Show Schedule"}
                </button>

                {userId && moderatorId && Number.parseInt(userId) === Number.parseInt(moderatorId) && (
                  <button
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0c969c] to-[#6ba3be] hover:from-[#6ba3be] hover:to-[#0c969c] text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={async () => {
                      try {
                        const res = await startLeague(id)
                        setMessage("League successfully started.")
                        setMessageType("success")
                        setTimeout(() => setMessage(null), 4000)
                      } catch (error) {
                        console.error("Error starting league:", error)
                        setMessage("Error: " + (error?.message || "Unable to start league"))
                        setMessageType("error")
                        setTimeout(() => setMessage(null), 4000)
                      }
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Start League
                  </button>
                )}

                <button
                  onClick={() => router.push("/league")}
                  className="inline-flex items-center gap-2 bg-[#031716] hover:bg-[#032f30] text-[#6ba3be] hover:text-white px-4 py-2.5 rounded-lg border border-[#0a7075] hover:border-[#0c969c] transition-all duration-300 font-medium shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Leagues
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mb-6">
            <div
              className={`max-w-md mx-auto px-6 py-4 rounded-xl text-center font-medium shadow-lg border-l-4 ${
                messageType === "success"
                  ? "bg-gradient-to-r from-[#0c969c]/20 to-[#6ba3be]/20 text-[#6ba3be] border-l-[#0c969c]"
                  : "bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-400 border-l-red-500"
              }`}
            >
              {message}
            </div>
          </div>
        )}

        {/* Statistics Summary */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-4 rounded-xl border border-[#0c969c]/30">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#6ba3be]" />
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">Total Teams</p>
                <p className="text-white text-xl font-bold">{statistics.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-4 rounded-xl border border-[#0c969c]/30">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#0c969c]" />
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">Leader</p>
                <p className="text-white text-xl font-bold">{sortedTeams[0]?.team_name || "TBD"}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-4 rounded-xl border border-[#0c969c]/30">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">Bottom Team</p>
                <p className="text-white text-xl font-bold">
                  {sortedTeams[sortedTeams.length - 1]?.team_name || "TBD"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Standings Table */}
        <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl shadow-2xl border border-[#0a7075] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-[#0a7075] to-[#0c969c]">
                <tr>
                  <th className="px-4 py-4 text-left text-white font-bold uppercase tracking-wider text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Pos
                    </div>
                  </th>
                  <th
                    className="px-4 py-4 text-left text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => onSort("team_name")}
                  >
                    <div className="flex items-center gap-2">Team {getSortArrow("team_name")}</div>
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden sm:table-cell"
                    onClick={() => onSort("number_of_matches_played")}
                  >
                    MP {getSortArrow("number_of_matches_played")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden md:table-cell"
                    onClick={() => onSort("number_of_wins")}
                  >
                    W {getSortArrow("number_of_wins")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden md:table-cell"
                    onClick={() => onSort("number_of_draws")}
                  >
                    D {getSortArrow("number_of_draws")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden md:table-cell"
                    onClick={() => onSort("number_of_losses")}
                  >
                    L {getSortArrow("number_of_losses")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden lg:table-cell"
                    onClick={() => onSort("goal_diff")}
                  >
                    GF-GA {getSortArrow("goal_diff")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors hidden lg:table-cell"
                    onClick={() => onSort("difference_points")}
                  >
                    +/- {getSortArrow("difference_points")}
                  </th>
                  <th
                    className="px-4 py-4 text-center text-white font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => onSort("points")}
                  >
                    Pts {getSortArrow("points")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0a7075]/30">
                {sortedTeams.map((team, index) => (
                  <tr
                    key={team.team_id}
                    className={getRowClass(index, sortedTeams.length)}
                    onClick={() => handleRowClick(team.team_id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleRowClick(team.team_id)
                      }
                    }}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {getPositionIcon(index, sortedTeams.length)}
                        <span className="font-bold text-lg text-[#6ba3be]">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={team.team_logo?.replace("./frontend/public", "") || "/placeholder.svg"}
                            alt="Team Logo"
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#0c969c] shadow-lg"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-white text-lg">{team.team_name || "Unnamed Team"}</span>
                          <div className="sm:hidden text-[#6ba3be] text-sm">
                            {team.number_of_matches_played} MP • {team.points} pts
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-[#6ba3be] hidden sm:table-cell">
                      {team.number_of_matches_played}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-green-400 hidden md:table-cell">
                      {team.number_of_wins}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-yellow-400 hidden md:table-cell">
                      {team.number_of_draws}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-red-400 hidden md:table-cell">
                      {team.number_of_losses}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-[#6ba3be] hidden lg:table-cell">
                      <span className="bg-[#274d60] px-2 py-1 rounded-md">
                        {team.win_points}-{team.lose_points}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center font-medium hidden lg:table-cell">
                      <span
                        className={`px-2 py-1 rounded-md ${
                          team.difference_points > 0
                            ? "text-green-400 bg-green-900/30"
                            : team.difference_points < 0
                              ? "text-red-400 bg-red-900/30"
                              : "text-[#6ba3be] bg-[#274d60]"
                        }`}
                      >
                        {team.difference_points > 0 ? "+" : ""}
                        {team.difference_points}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="bg-gradient-to-r from-[#0c969c] to-[#6ba3be] text-white font-bold text-lg px-3 py-1.5 rounded-lg shadow-lg">
                        {team.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-[#032f30] px-3 py-2 rounded-lg border border-[#0a7075]">
            <div className="w-3 h-3 bg-[#0c969c] rounded"></div>
            <span className="text-[#6ba3be]">Champion</span>
          </div>
          <div className="flex items-center gap-2 bg-[#032f30] px-3 py-2 rounded-lg border border-[#0a7075]">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-[#6ba3be]">Relegation</span>
          </div>
        </div>
      </div>

      {showSchedule && <LeagueSchedule leagueId={id} />}
    </div>
  )
}
