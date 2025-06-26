"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getMyTeamsModerator } from "../../lib/team"
import { createRequestForLeague } from "../../lib/request"
import { Eye, Send, Trash2, Users, MapPin, Trophy, X, CheckCircle, AlertCircle, UserPlus } from "lucide-react"

const getEmojiForSport = (sport) => {
  switch (sport) {
    case "Basketball":
      return "🏀"
    case "Volleyball":
      return "🏐"
    case "Handball":
      return "🤾"
    case "Gaming":
      return "🎮"
    case "Football":
      return "⚽"
    default:
      return "❓"
  }
}

const getImageForSport = (sport) => {
  switch (sport) {
    case "Basketball":
      return "/images/basketball.png"
    case "Volleyball":
      return "/images/volleyball.png"
    case "Handball":
      return "/images/handball.png"
    case "Gaming":
      return "/images/gaming.png"
    case "Football":
      return "/images/football.png"
    default:
      return ""
  }
}

const LeagueCard = ({ league, showRequest, onDelete }) => {
  const router = useRouter()
  const bgImage = getImageForSport(league.sport)
  const [showTeamOptions, setShowTeamOptions] = useState(false)
  const [simulatedTeams, setSimulatedTeams] = useState([])
  const [toast, setToast] = useState({ message: "", type: "" })

  const handleRequestClick = async () => {
    console.log("Selected sport:", league.sport)

    try {
      const teams = await getMyTeamsModerator(league.sport)
      setSimulatedTeams(teams)
    } catch (error) {
      console.error("Failed to fetch teams:", error)
      setSimulatedTeams([])
    }

    setShowTeamOptions(true)
  }

  const handleSendRequest = async (team_id) => {
    try {
      await createRequestForLeague({
        team_id: team_id,
        league_id: league.league_id,
      })

      setToast({ message: "Request sent successfully.", type: "success" })
      setTimeout(() => setToast({ message: "", type: "" }), 3000)
    } catch (err) {
      console.error("Error sending request:", err)
      const msg = err?.message || ""

      if (msg === "Request already sent and awaiting review.") {
        setToast({
          message: "Request already pending for this team.",
          type: "error",
        })
      } else {
        setToast({
          message: "Failed to send request.",
          type: "error",
        })
      }

      setTimeout(() => setToast({ message: "", type: "" }), 3000)
    }
  }

  return (
    <>
      {/* Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-xl shadow-2xl border-l-4 ${
            toast.type === "success"
              ? "bg-gradient-to-r from-[#0c969c]/90 to-[#6ba3be]/90 border-l-[#0c969c] text-white"
              : "bg-gradient-to-r from-red-600/90 to-red-500/90 border-l-red-500 text-white"
          } backdrop-blur-sm animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* League Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-[#0a7075] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#032f30] to-[#031716]"
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#0c969c]/20 backdrop-blur-sm p-3 rounded-full border border-[#0c969c]/30">
                <span className="text-2xl">{getEmojiForSport(league.sport)}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-[#6ba3be] transition-colors">
                  {league.name}
                </h4>
                <p className="text-[#6ba3be] font-medium">{league.sport}</p>
              </div>
            </div>
            <div className="bg-[#274d60]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#6ba3be]/30">
              <Trophy className="w-4 h-4 text-[#6ba3be] inline mr-1" />
              <span className="text-[#6ba3be] text-sm font-medium">League</span>
            </div>
          </div>

          {/* League Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#032f30]/60 backdrop-blur-sm p-3 rounded-lg border border-[#0a7075]/30">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6ba3be]" />
                <div>
                  <p className="text-[#6ba3be] text-xs font-medium">Teams</p>
                  <p className="text-white font-bold">{league.number_of_teams}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#032f30]/60 backdrop-blur-sm p-3 rounded-lg border border-[#0a7075]/30">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#6ba3be]" />
                <div>
                  <p className="text-[#6ba3be] text-xs font-medium">Players</p>
                  <p className="text-white font-bold">{league.number_of_players_in_team}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#032f30]/60 backdrop-blur-sm p-3 rounded-lg border border-[#0a7075]/30 sm:col-span-1 col-span-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6ba3be]" />
                <div>
                  <p className="text-[#6ba3be] text-xs font-medium">Country</p>
                  <p className="text-white font-bold text-sm">{league.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showRequest && (
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0c969c] to-[#6ba3be] text-white px-4 py-3 rounded-lg hover:from-[#6ba3be] hover:to-[#0c969c] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={handleRequestClick}
              >
                <Send className="w-4 h-4" />
                Send Request
              </button>
            )}

            <Link href={`/league/view/${league.league_id}`} className="flex-1">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-[#274d60] hover:bg-[#6ba3be] text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-[#0a7075] hover:border-[#6ba3be] shadow-lg">
                <Eye className="w-4 h-4" />
                View League
              </button>
            </Link>

            {!showRequest && (
              <button
                onClick={() => onDelete(league.league_id)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-red-500/30 hover:border-red-500 shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Team Selection Modal */}
      {showTeamOptions && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] w-full max-w-md shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6 border-b border-[#0a7075]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Select Team</h2>
                </div>
                <button
                  onClick={() => setShowTeamOptions(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-white/80 mt-2">Choose a team to send join request</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {simulatedTeams.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-[#274d60]/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-[#6ba3be]" />
                  </div>
                  <p className="text-[#6ba3be] font-medium">No teams available</p>
                  <p className="text-[#0a7075] text-sm mt-1">Create a team first to join leagues</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {simulatedTeams.map((team) => (
                    <div
                      key={team.team_id}
                      className="bg-gradient-to-r from-[#031716] to-[#032f30] p-4 rounded-xl border border-[#0a7075] hover:border-[#0c969c] transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={team.team_logo || "/placeholder.svg"}
                              alt={team.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-[#0c969c] shadow-lg"
                            />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-lg">{team.name}</p>
                            <p className="text-[#6ba3be] text-sm flex items-center gap-1">
                              <span className="text-lg">{getEmojiForSport(team.team_sport)}</span>
                              {team.team_sport}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSendRequest(team.team_id)}
                          className="inline-flex items-center gap-2 bg-[#0c969c] hover:bg-[#6ba3be] text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Send className="w-4 h-4" />
                          Send
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#0a7075] bg-[#031716]/50">
              <button
                onClick={() => setShowTeamOptions(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#274d60] hover:bg-[#0a7075] text-[#6ba3be] hover:text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-[#0a7075]"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LeagueCard
