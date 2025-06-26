"use client"

import { useState, useEffect } from "react"
import { InsertStatisticAfterMatch } from "../../../../lib/league"
import { getTeamMembers } from "../../../../lib/team"
import { Trophy, X, Plus, Minus, CheckCircle, AlertCircle, Users, Target, Award, Loader2, Calendar } from "lucide-react"

export default function InsertStatisticModal({ match, teamOneId, teamTwoId, leagueId, onClose, onStatisticInserted }) {
  const [formData, setFormData] = useState({
    winner_id: "",
    looser_id: "",
    win_points: "",
    lose_points: "",
    best_player_id: "",
    match_date: "", // Dodano polje za datum
  })

  const [playerStats, setPlayerStats] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingPlayers, setLoadingPlayers] = useState(true)
  const [toast, setToast] = useState({ message: "", type: "" })

  // Real team players data
  const [teamOnePlayers, setTeamOnePlayers] = useState([])
  const [teamTwoPlayers, setTeamTwoPlayers] = useState([])

  // Debug: Proverite dostupne podatke
  useEffect(() => {
    console.log("Match object:", match)
    console.log("Team One ID:", teamOneId)
    console.log("Team Two ID:", teamTwoId)
    console.log("League ID:", leagueId)

    // Postaviti trenutni datum kao default
    const now = new Date()
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    setFormData((prev) => ({
      ...prev,
      match_date: localDateTime,
    }))
  }, [match, teamOneId, teamTwoId, leagueId])

  // Fetch real team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoadingPlayers(true)
      try {
        console.log("Fetching team members for teams:", teamOneId, teamTwoId)

        const [teamOneMembers, teamTwoMembers] = await Promise.all([
          getTeamMembers(teamOneId),
          getTeamMembers(teamTwoId),
        ])

        console.log("Team One Members:", teamOneMembers)
        console.log("Team Two Members:", teamTwoMembers)

        // Transform data to match our component structure
        const transformedTeamOne = teamOneMembers.map((member) => ({
          id: member.id, // This is the user_id from schema
          name: member.name,
          surname: member.surname,
          fullName: `${member.name} ${member.surname}`,
          team_id: teamOneId,
        }))

        const transformedTeamTwo = teamTwoMembers.map((member) => ({
          id: member.id, // This is the user_id from schema
          name: member.name,
          surname: member.surname,
          fullName: `${member.name} ${member.surname}`,
          team_id: teamTwoId,
        }))

        setTeamOnePlayers(transformedTeamOne)
        setTeamTwoPlayers(transformedTeamTwo)
      } catch (error) {
        console.error("Error fetching team members:", error)
        setToast({
          message: "Failed to load team members. Please try again.",
          type: "error",
        })
        setTimeout(() => setToast({ message: "", type: "" }), 3000)
      } finally {
        setLoadingPlayers(false)
      }
    }

    if (teamOneId && teamTwoId) {
      fetchTeamMembers()
    }
  }, [teamOneId, teamTwoId])

  const allPlayers = [...teamOnePlayers, ...teamTwoPlayers]

  useEffect(() => {
    // Initialize player stats when players are loaded
    if (allPlayers.length > 0) {
      const initialStats = allPlayers.map((player) => ({
        player_id: player.id, // user_id from schema
        player_name: player.fullName,
        team_id: player.team_id,
        number_of_points: 0,
      }))
      setPlayerStats(initialStats)
    }
  }, [teamOnePlayers, teamTwoPlayers])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Handle winner/loser logic
    if (name === "winner_id") {
      if (value === "0") {
        // Draw case - no winner or loser
        setFormData((prev) => ({
          ...prev,
          looser_id: "0",
        }))
      } else {
        // Regular win case - auto-set looser
        const winnerId = Number.parseInt(value)
        const looserId = winnerId === teamOneId ? teamTwoId : teamOneId
        setFormData((prev) => ({
          ...prev,
          looser_id: looserId.toString(),
        }))
      }
    }
  }

  const updatePlayerPoints = (playerId, change) => {
    setPlayerStats((prev) =>
      prev.map((player) =>
        player.player_id === playerId
          ? { ...player, number_of_points: Math.max(0, player.number_of_points + change) }
          : player,
      ),
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const statisticData = {
        league_id: leagueId,
        team_one_id: teamOneId,
        team_two_id: teamTwoId,
        team_one_moderator_id: match.team_one.moderator_id || null,
        team_two_moderator_id: match.team_two.moderator_id || null,
        winner_id: Number.parseInt(formData.winner_id),
        looser_id: Number.parseInt(formData.looser_id),
        win_points: Number.parseInt(formData.win_points),
        lose_points: Number.parseInt(formData.lose_points),
        best_player_id: Number.parseInt(formData.best_player_id),
        match_date: formData.match_date, // Dodano datum u podatke
        scored_points: playerStats.filter((player) => player.number_of_points > 0),
      }

      console.log("Sending statistic data:", statisticData)
      await InsertStatisticAfterMatch(statisticData)

      setToast({ message: "Match statistics inserted successfully!", type: "success" })
      setTimeout(() => {
        onStatisticInserted()
      }, 2000)
    } catch (error) {
      console.error("Error inserting statistics:", error)
      setToast({ message: "Failed to insert statistics. Please try again.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  const getTeamName = (teamId) => {
    return teamId === teamOneId ? match.team_one.name : match.team_two.name
  }

  // Loading state for players
  if (loadingPlayers) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <Loader2 className="w-8 h-8 text-[#6ba3be] animate-spin" />
            <div>
              <h3 className="text-xl font-bold text-white">Loading Team Members</h3>
              <p className="text-[#6ba3be]">Fetching player data...</p>
            </div>
          </div>
        </div>
      </div>
    )
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

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6 border-b border-[#0a7075]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Insert Match Statistics</h2>
                  <p className="text-white/80">
                    {match.team_one.name} vs {match.team_two.name}
                  </p>
                  <p className="text-white/60 text-sm">
                    League ID: {leagueId} | Team IDs: {teamOneId} vs {teamTwoId}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Match Result Section */}
              <div className="bg-gradient-to-r from-[#031716] to-[#032f30] p-6 rounded-xl border border-[#0a7075]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#6ba3be]" />
                  Match Result
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Match Date */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[#6ba3be] font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Match Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="match_date"
                      value={formData.match_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Winner Selection */}
                  <div className="space-y-2">
                    <label className="text-[#6ba3be] font-medium">Match Result</label>
                    <select
                      name="winner_id"
                      value={formData.winner_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 [&>option]:bg-[#032f30] [&>option]:text-[#6ba3be] [&>option:checked]:bg-[#0c969c] [&>option:checked]:text-white"
                    >
                      <option value="" className="bg-[#032f30] text-[#6ba3be]">
                        Select Match Result
                      </option>
                      <option value="0" className="bg-[#032f30] text-[#6ba3be] hover:bg-[#0a7075] hover:text-white">
                        🤝 Draw / Tie
                      </option>
                      <option
                        value={teamOneId}
                        className="bg-[#032f30] text-[#6ba3be] hover:bg-[#0a7075] hover:text-white"
                      >
                        {match.team_one.name} (ID: {teamOneId})
                      </option>
                      <option
                        value={teamTwoId}
                        className="bg-[#032f30] text-[#6ba3be] hover:bg-[#0a7075] hover:text-white"
                      >
                        {match.team_two.name} (ID: {teamTwoId})
                      </option>
                    </select>
                  </div>

                  {/* Score Input */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[#6ba3be] font-medium">Team One Points</label>
                      <input
                        type="number"
                        name="win_points"
                        value={formData.win_points}
                        onChange={handleInputChange}
                        min="0"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[#6ba3be] font-medium">Team Two Points</label>
                      <input
                        type="number"
                        name="lose_points"
                        value={formData.lose_points}
                        onChange={handleInputChange}
                        min="0"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Player Section */}
              <div className="bg-gradient-to-r from-[#031716] to-[#032f30] p-6 rounded-xl border border-[#0a7075]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#6ba3be]" />
                  Best Player
                </h3>

                <select
                  name="best_player_id"
                  value={formData.best_player_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 [&>option]:bg-[#032f30] [&>option]:text-[#6ba3be] [&>option:checked]:bg-[#0c969c] [&>option:checked]:text-white"
                >
                  <option value="" className="bg-[#032f30] text-[#6ba3be]">
                    Select Best Player
                  </option>
                  {allPlayers.map((player) => (
                    <option
                      key={player.id}
                      value={player.id}
                      className="bg-[#032f30] text-[#6ba3be] hover:bg-[#0a7075] hover:text-white"
                    >
                      {player.fullName} ({getTeamName(player.team_id)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Player Statistics Section */}
              <div className="bg-gradient-to-r from-[#031716] to-[#032f30] p-6 rounded-xl border border-[#0a7075]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#6ba3be]" />
                  Player Goals/Points
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Team One Players */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#6ba3be] mb-3">
                      {match.team_one.name} (ID: {teamOneId})
                    </h4>
                    {teamOnePlayers.length === 0 ? (
                      <div className="text-center py-4 text-[#6ba3be]">No players found for this team</div>
                    ) : (
                      <div className="space-y-3">
                        {teamOnePlayers.map((player) => {
                          const playerStat = playerStats.find((p) => p.player_id === player.id)
                          return (
                            <div
                              key={player.id}
                              className="flex items-center justify-between bg-[#274d60]/30 p-3 rounded-lg border border-[#0a7075]/30 hover:border-[#0c969c]/50 transition-all duration-300"
                            >
                              <div className="flex flex-col">
                                <span className="text-white font-medium">{player.fullName}</span>
                                <span className="text-[#6ba3be] text-xs">ID: {player.id}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updatePlayerPoints(player.id, -1)}
                                  className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors shadow-lg hover:shadow-xl"
                                >
                                  <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white font-bold w-8 text-center bg-[#0a7075] py-1 rounded">
                                  {playerStat?.number_of_points || 0}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updatePlayerPoints(player.id, 1)}
                                  className="p-1 bg-gradient-to-r from-[#0c969c] to-[#6ba3be] hover:from-[#6ba3be] hover:to-[#0c969c] rounded transition-colors shadow-lg hover:shadow-xl"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Team Two Players */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#6ba3be] mb-3">
                      {match.team_two.name} (ID: {teamTwoId})
                    </h4>
                    {teamTwoPlayers.length === 0 ? (
                      <div className="text-center py-4 text-[#6ba3be]">No players found for this team</div>
                    ) : (
                      <div className="space-y-3">
                        {teamTwoPlayers.map((player) => {
                          const playerStat = playerStats.find((p) => p.player_id === player.id)
                          return (
                            <div
                              key={player.id}
                              className="flex items-center justify-between bg-[#274d60]/30 p-3 rounded-lg border border-[#0a7075]/30 hover:border-[#0c969c]/50 transition-all duration-300"
                            >
                              <div className="flex flex-col">
                                <span className="text-white font-medium">{player.fullName}</span>
                                <span className="text-[#6ba3be] text-xs">ID: {player.id}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updatePlayerPoints(player.id, -1)}
                                  className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors shadow-lg hover:shadow-xl"
                                >
                                  <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white font-bold w-8 text-center bg-[#0a7075] py-1 rounded">
                                  {playerStat?.number_of_points || 0}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updatePlayerPoints(player.id, 1)}
                                  className="p-1 bg-gradient-to-r from-[#0c969c] to-[#6ba3be] hover:from-[#6ba3be] hover:to-[#0c969c] rounded transition-colors shadow-lg hover:shadow-xl"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button Section - VISIBLE */}
              <div className="bg-gradient-to-r from-[#0c969c] to-[#6ba3be] p-6 rounded-xl border border-[#0c969c] shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Ready to Submit?</h3>
                      <p className="text-white/80">Save all match statistics and player data</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 font-medium"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={
                        loading ||
                        allPlayers.length === 0 ||
                        !formData.winner_id ||
                        !formData.best_player_id ||
                        !formData.match_date
                      }
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white hover:bg-white/90 text-[#0c969c] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#0c969c]/30 border-t-[#0c969c] rounded-full animate-spin" />
                          Saving Statistics...
                        </>
                      ) : (
                        <>
                          <Trophy className="w-5 h-5" />
                          SAVE MATCH STATISTICS
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-[#0a7075] bg-[#031716]/50">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#0a7075] text-[#6ba3be] hover:bg-[#0a7075]/20 hover:border-[#0c969c] transition-all duration-300 font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  allPlayers.length === 0 ||
                  !formData.winner_id ||
                  !formData.best_player_id ||
                  !formData.match_date
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0c969c] to-[#6ba3be] hover:from-[#6ba3be] hover:to-[#0c969c] text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4" />
                    Save Statistics
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
