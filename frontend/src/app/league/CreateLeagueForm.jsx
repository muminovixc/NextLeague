"use client"

import { useState } from "react"
import { createMyLeague } from "../../lib/league"
import { Trophy, X, CheckCircle, AlertCircle, Users, UserPlus, MapPin, Lock, Globe, Plus, Sparkles } from "lucide-react"

export default function CreateLeagueModal({ isOpen, onClose, onLeagueCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    number_of_teams: "",
    number_of_players_in_team: "",
    country: "",
    access: "",
  })

  const [toast, setToast] = useState({ message: "", type: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const parsedData = {
      ...formData,
      number_of_teams: Number(formData.number_of_teams),
      number_of_players_in_team: Number(formData.number_of_players_in_team),
    }
    try {
      await createMyLeague(formData)
      setToast({ message: "League created successfully!", type: "success" })
      setTimeout(() => setToast({ message: "", type: "" }), 3000)
      onClose()
      if (onLeagueCreated) {
        onLeagueCreated()
      }
    } catch (err) {
      console.error(err)
      const msg = err?.message || ""

      console.log("Error message:", msg)

      if (msg === "PREMIUM_REQUIRED") {
        setToast({
          message: "Upgrade to VIP to create more leagues.",
          type: "error",
        })
        setTimeout(() => setToast({ message: "", type: "" }), 3000)
        //window.location.href = "/vip";
      } else {
        setToast({
          message: "Failed to create league.",
          type: "error",
        })
        setTimeout(() => setToast({ message: "", type: "" }), 3000)
      }

      onClose()
    }
  }

  if (!isOpen && !toast.message) return null

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
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6 border-b border-[#0a7075]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Create New League</h2>
                    <p className="text-white/80">Set up your competition</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* League Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                    <Sparkles className="w-4 h-4" />
                    League Name
                  </label>
                  <input
                    name="name"
                    placeholder="e.g. Balkan Championship League"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white placeholder:text-[#6ba3be]/60 border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#0c969c]/20"
                  />
                </div>

                {/* Sport Selection */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                    <Trophy className="w-4 h-4" />
                    Sport
                  </label>
                  <div className="relative">
                    <select
                      name="sport"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer focus:shadow-lg focus:shadow-[#0c969c]/20"
                    >
                      <option value="" className="bg-[#032f30] text-white">
                        Choose your sport
                      </option>
                      <option value="Football" className="bg-[#032f30] text-white">
                        ⚽ Football
                      </option>
                      <option value="Basketball" className="bg-[#032f30] text-white">
                        🏀 Basketball
                      </option>
                      <option value="Volleyball" className="bg-[#032f30] text-white">
                        🏐 Volleyball
                      </option>
                      <option value="Handball" className="bg-[#032f30] text-white">
                        🤾 Handball
                      </option>
                      <option value="Gaming" className="bg-[#032f30] text-white">
                        🎮 Gaming
                      </option>
                    </select>
                  </div>
                </div>

                {/* Teams and Players Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Number of Teams */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                      <Users className="w-4 h-4" />
                      Teams
                    </label>
                    <div className="relative">
                      <select
                        name="number_of_teams"
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer focus:shadow-lg focus:shadow-[#0c969c]/20"
                      >
                        <option value="" className="bg-[#032f30] text-white">
                          Max 30
                        </option>
                        {Array.from({ length: 29 }, (_, i) => i + 2).map((num) => (
                          <option key={num} value={num} className="bg-[#032f30] text-white">
                            {num} teams
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Players per Team */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                      <UserPlus className="w-4 h-4" />
                      Players/Team
                    </label>
                    <div className="relative">
                      <select
                        name="number_of_players_in_team"
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer focus:shadow-lg focus:shadow-[#0c969c]/20"
                      >
                        <option value="" className="bg-[#032f30] text-white">
                          Max 30
                        </option>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num} className="bg-[#032f30] text-white">
                            {num} {num === 1 ? "player" : "players"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                    <MapPin className="w-4 h-4" />
                    Country
                  </label>
                  <input
                    name="country"
                    placeholder="e.g. Bosnia and Herzegovina"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#031716] to-[#032f30] text-white placeholder:text-[#6ba3be]/60 border border-[#0a7075] focus:border-[#0c969c] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#0c969c]/20"
                  />
                </div>

                {/* Access Level */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#6ba3be] font-medium">
                    <Lock className="w-4 h-4" />
                    Access Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="access"
                        value="PUBLIC"
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="bg-gradient-to-r from-[#031716] to-[#032f30] border border-[#0a7075] peer-checked:border-[#0c969c] peer-checked:bg-gradient-to-r peer-checked:from-[#0c969c]/20 peer-checked:to-[#6ba3be]/20 rounded-lg p-4 transition-all duration-300 hover:border-[#0c969c]/50">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-[#6ba3be]" />
                          <div>
                            <p className="text-white font-medium">Public</p>
                            <p className="text-[#6ba3be] text-sm">Anyone can join</p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="access"
                        value="PRIVATE"
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="bg-gradient-to-r from-[#031716] to-[#032f30] border border-[#0a7075] peer-checked:border-[#0c969c] peer-checked:bg-gradient-to-r peer-checked:from-[#0c969c]/20 peer-checked:to-[#6ba3be]/20 rounded-lg p-4 transition-all duration-300 hover:border-[#0c969c]/50">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-[#6ba3be]" />
                          <div>
                            <p className="text-white font-medium">Private</p>
                            <p className="text-[#6ba3be] text-sm">Invite only</p>
                          </div>
                        </div>
                      </div>
                    </label>
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
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0c969c] to-[#6ba3be] hover:from-[#6ba3be] hover:to-[#0c969c] text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  Create League
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
