"use client"

import { useState } from "react"
import { createTeam } from "../../lib/team"
import { X, Trophy, Globe, ImageIcon, Tag, CheckCircle, AlertCircle, Info, Sparkles, Crown, Plus } from "lucide-react"

export default function TeamCreateForm({ onClose, onTeamCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    team_sport: "",
    country: "",
    team_logo: "",
    team_identification: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Popular sports options with icons
  const sportsOptions = [
    { value: "Football", icon: "⚽", color: "#0c969c" },
    { value: "Basketball", icon: "🏀", color: "#6ba3be" },
    { value: "Volleyball", icon: "🏐", color: "#274d60" },
    { value: "Handball", icon: "🤾", color: "#0a7075" },
    { value: "Gaming", icon: "🎮", color: "#0c969c" },
  ]

  // Popular countries
  const countryOptions = [
    "Bosnia and Herzegovina",
    "Croatia",
    "Serbia",
    "Montenegro",
    "Slovenia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "England",
    "Netherlands",
    "Belgium",
    "Portugal",
    "Brazil",
    "Argentina",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setError("Team name is required")
      return
    }

    if (!formData.team_sport.trim()) {
      setError("Team sport is required")
      return
    }

    if (!formData.country.trim()) {
      setError("Country is required")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const teamData = {
        name: formData.name.trim(),
        team_sport: formData.team_sport.trim(),
        country: formData.country.trim(),
        team_logo: formData.team_logo.trim() || null,
        team_identification: formData.team_identification.trim() || null,
      }

      const newTeam = await createTeam(teamData)
      setSuccess(true)

      // Call parent callback to refresh teams list
      if (onTeamCreated) {
        onTeamCreated(newTeam)
      }

      // Close form after success
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      console.error("Error creating team:", err)
      setError(err.message || "Failed to create team. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (onClose) {
      onClose()
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
        <div className="rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 p-8 text-center bg-[#031716] border-[#0c969c] animate-in fade-in-0 zoom-in-95 duration-500">
          {/* Success Animation */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0c969c] to-[#6ba3be] animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-[#0c969c] flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white animate-bounce" />
            </div>
            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-[#6ba3be] animate-spin" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-4 h-4 text-[#0c969c] animate-pulse" />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#0c969c]">Team Created Successfully!</h3>
          <p className="text-lg text-[#6ba3be] mb-4">
            Your team <span className="font-semibold text-[#0c969c]">"{formData.name}"</span> has been created and added
            to your teams list.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#274d60]">
            <Crown className="w-4 h-4" />
            <span>You are now the team moderator</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2 bg-[#031716] border-[#0c969c] animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c969c]/5 to-[#6ba3be]/5 rounded-2xl"></div>

        <div className="relative p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0c969c] to-[#6ba3be] flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-[#0c969c]">Create New Team</h2>
                <p className="text-lg text-[#6ba3be]">Build your dream team from scratch</p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="text-2xl font-bold p-2 rounded-xl w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 bg-[#032f30] text-[#6ba3be] border border-[#0a7075] hover:border-[#0c969c]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 rounded-xl border-l-4 bg-red-900/20 text-red-300 border-red-500 animate-in slide-in-from-left-5 duration-300">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <Trophy className="w-4 h-4" />
                Team Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your team name"
                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0c969c]/50 focus:border-[#0c969c] bg-[#032f30] border-[#0a7075] text-[#6ba3be] placeholder-[#274d60] hover:border-[#0c969c]/50"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Sport Selection */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <Trophy className="w-4 h-4" />
                Sport *
              </label>
              <div className="relative">
                <select
                  name="team_sport"
                  value={formData.team_sport}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0c969c]/50 focus:border-[#0c969c] bg-[#032f30] border-[#0a7075] text-[#6ba3be] hover:border-[#0c969c]/50 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#032f30]">
                    Select a sport
                  </option>
                  {sportsOptions.map((sport) => (
                    <option key={sport.value} value={sport.value} className="bg-[#032f30]">
                      {sport.icon} {sport.value}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-[#6ba3be] transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Country Selection */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <Globe className="w-4 h-4" />
                Country *
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0c969c]/50 focus:border-[#0c969c] bg-[#032f30] border-[#0a7075] text-[#6ba3be] hover:border-[#0c969c]/50 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#032f30]">
                    Select a country
                  </option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country} className="bg-[#032f30]">
                      {country}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-[#6ba3be] transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Team Logo URL */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <ImageIcon className="w-4 h-4" />
                Team Logo URL
                <span className="text-sm font-normal text-[#6ba3be]">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="team_logo"
                  value={formData.team_logo}
                  onChange={handleInputChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0c969c]/50 focus:border-[#0c969c] bg-[#032f30] border-[#0a7075] text-[#6ba3be] placeholder-[#274d60] hover:border-[#0c969c]/50"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Team Identification */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <Tag className="w-4 h-4" />
                Team Identification Code
                <span className="text-sm font-normal text-[#6ba3be]">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="team_identification"
                  value={formData.team_identification}
                  onChange={handleInputChange}
                  placeholder="e.g., FCB, MUN, etc."
                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0c969c]/50 focus:border-[#0c969c] bg-[#032f30] border-[#0a7075] text-[#6ba3be] placeholder-[#274d60] hover:border-[#0c969c]/50"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 bg-transparent border-[#0a7075] text-[#6ba3be] hover:border-[#0c969c] hover:bg-[#0c969c]/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#0c969c]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-[#0c969c] text-[#031716] hover:bg-[#6ba3be]"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-[#031716]"></div>
                    Creating Team...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Team
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-6 rounded-xl border bg-[#032f30] border-[#0a7075] hover:border-[#0c969c]/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0c969c] to-[#6ba3be] flex-shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 text-[#0c969c] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Team Creation Guidelines
                </p>
                <div className="text-sm space-y-2 text-[#6ba3be]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0c969c]"></div>
                    Team name should be unique and descriptive
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0c969c]"></div>
                    You will be set as the team moderator
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0c969c]"></div>
                    You can add members after creating the team
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0c969c]"></div>
                    Logo URL should be a direct link to an image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
