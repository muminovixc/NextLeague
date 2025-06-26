"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, Trophy, Users } from "lucide-react"
import { getCalendarForLeague } from "../../../../lib/league"
import InsertStatisticModal from "./InsertStatistic"

export default function LeagueSchedule({ leagueId }) {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [showStatisticModal, setShowStatisticModal] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getCalendarForLeague(leagueId)
        console.log("Schedule data:", data) // Debug: Proverite šta sadrži match objekat
        setSchedule(data)
      } catch (error) {
        console.error("Error fetching schedule:", error)
      } finally {
        setLoading(false)
      }
    }

    if (leagueId) fetchSchedule()
  }, [leagueId])

  const isMatchFinished = (matchDate) => {
    return new Date() > new Date(matchDate)
  }

  if (loading) {
    return (
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#032f30] to-[#0a7075] px-6 py-4 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#6ba3be] border-t-transparent"></div>
            <span className="text-[#6ba3be] font-medium text-lg">Loading schedule...</span>
          </div>
        </div>
      </div>
    )
  }

  if (schedule.length === 0) {
    return (
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#031716] to-[#032f30] border border-[#0a7075] rounded-xl p-8 shadow-xl">
            <Calendar className="w-16 h-16 text-[#0c969c] mx-auto mb-4 opacity-60" />
            <p className="text-[#6ba3be] text-lg font-medium">No matches scheduled</p>
            <p className="text-[#0c969c] text-sm mt-2">Check back later for upcoming fixtures</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0a7075] to-[#0c969c] px-6 py-3 rounded-full shadow-lg">
          <Trophy className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">League Schedule</h2>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((match, index) => {
          const date = new Date(match.date).toLocaleString("bs-BA", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })

          let result = "- : -"
          let isCompleted = false
          if (match.status !== "SCHEDULED" && match.statistic) {
            const teamOneScore = match.statistic.winner_id === match.team_one.id ? 1 : 0
            const teamTwoScore = match.statistic.winner_id === match.team_two.id ? 1 : 0
            result = `${teamOneScore} : ${teamTwoScore}`
            isCompleted = true
          }

          return (
            <div
              key={match.id}
              className="group bg-gradient-to-r from-[#031716] via-[#032f30] to-[#031716] rounded-xl shadow-lg border border-[#0a7075] hover:border-[#0c969c] transition-all duration-300 hover:shadow-xl hover:shadow-[#0a7075]/20 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                {/* Teams and Score Section */}
                <div className="flex items-center justify-center gap-4 flex-1">
                  {/* Team One */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <span className="text-white font-semibold text-lg group-hover:text-[#6ba3be] transition-colors">
                      {match.team_one.name}
                    </span>
                    <div className="relative">
                      <img
                        src={match.team_one.logo?.replace("./frontend/public", "") || "/placeholder.svg"}
                        alt={match.team_one.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0a7075] group-hover:border-[#0c969c] transition-colors shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 px-4">
                    <div
                      className={`px-4 py-2 rounded-lg font-bold text-xl ${
                        isCompleted
                          ? "bg-gradient-to-r from-[#0c969c] to-[#6ba3be] text-white shadow-lg"
                          : "bg-[#274d60] text-[#6ba3be] border border-[#0a7075]"
                      }`}
                    >
                      {result}
                    </div>
                  </div>

                  {/* Team Two */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <img
                        src={match.team_two.logo?.replace("./frontend/public", "") || "/placeholder.svg"}
                        alt={match.team_two.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0a7075] group-hover:border-[#0c969c] transition-colors shadow-lg"
                      />
                    </div>
                    <span className="text-white font-semibold text-lg group-hover:text-[#6ba3be] transition-colors">
                      {match.team_two.name}
                    </span>
                  </div>
                </div>

                {/* Date and Status Section */}
                <div className="flex flex-col items-center sm:items-end gap-2 min-w-[140px]">
                  <div className="flex items-center gap-2 bg-[#274d60] px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-[#6ba3be]" />
                    <span className="text-[#6ba3be] font-medium text-sm">{date}</span>
                  </div>
                  {isMatchFinished(match.date) && match.status === "SCHEDULED" && (
                    <button
                      onClick={() => {
                        // Dodajemo dodatne podatke u selectedMatch objekat
                        const matchWithIds = {
                          ...match,
                          team_one_id: match.team_one.id,
                          team_two_id: match.team_two.id,
                          league_id: leagueId, // Dodajemo i league_id ako nije već u match objektu
                        }
                        console.log("Selected match with IDs:", matchWithIds) // Debug
                        setSelectedMatch(matchWithIds)
                        setShowStatisticModal(true)
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0c969c] to-[#6ba3be] text-white px-4 py-2 rounded-lg hover:from-[#6ba3be] hover:to-[#0c969c] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                    >
                      <Trophy className="w-4 h-4" />
                      Insert Statistic
                    </button>
                  )}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isCompleted ? "bg-[#0c969c] text-white" : "bg-[#0a7075] text-[#6ba3be]"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Scheduled"}
                  </div>
                </div>
              </div>

              {/* Hover Effect Bar */}
              <div className="h-1 bg-gradient-to-r from-[#0a7075] via-[#0c969c] to-[#6ba3be] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-[#0c969c] text-sm">
          <Users className="w-4 h-4" />
          <span>{schedule.length} matches in schedule</span>
        </div>
      </div>

      {/* Insert Statistic Modal */}
      {showStatisticModal && selectedMatch && (
        <InsertStatisticModal
          match={selectedMatch}
          teamOneId={selectedMatch.team_one_id}
          teamTwoId={selectedMatch.team_two_id}
          leagueId={selectedMatch.league_id || leagueId}
          onClose={() => {
            setShowStatisticModal(false)
            setSelectedMatch(null)
          }}
          onStatisticInserted={() => {
            setShowStatisticModal(false)
            setSelectedMatch(null)
            // Refresh schedule data if needed
          }}
        />
      )}
    </div>
  )
}
