"use client"

import { useState } from "react"
import { createTeam } from "../../lib/team"
import { X, Trophy, Globe, ImageIcon, Tag, CheckCircle, AlertCircle, Info, Sparkles, Crown, Plus } from "lucide-react"

export default function TeamCreateForm({ onClose, onTeamCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    team_sport: "",
    country: "",
    team_identification: "",
  })
  const [logoFile, setLogoFile] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const sportsOptions = [
    { value: "Football", icon: "⚽" },
    { value: "Basketball", icon: "🏀" },
    { value: "Volleyball", icon: "🏐" },
    { value: "Handball", icon: "🤾" },
    { value: "Gaming", icon: "🎮" },
  ]

  const countryOptions = [
    "Bosnia and Herzegovina", "Croatia", "Serbia", "Montenegro",
    "Slovenia", "Germany", "France", "Italy", "Spain",
    "England", "Netherlands", "Belgium", "Portugal", "Brazil", "Argentina"
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.team_sport || !formData.country) {
      setError("Please fill all required fields.")
      return
    }

    const data = new FormData()
    data.append("name", formData.name)
    data.append("team_sport", formData.team_sport)
    data.append("country", formData.country)
    data.append("team_identification", formData.team_identification || "")
    if (logoFile) {
      data.append("team_logo", logoFile)
    }

    setLoading(true)
    try {
      const newTeam = await createTeam(data)
      setSuccess(true)
      if (onTeamCreated) onTeamCreated(newTeam)
      setTimeout(() => onClose(), 2000)
    } catch (err) {
      console.error(err)
      setError("Failed to create team. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => onClose?.()

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
        <div className="rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 p-8 text-center bg-[#031716] border-[#0c969c] animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0c969c] to-[#6ba3be] animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-[#0c969c] flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#0c969c]">Team Created Successfully!</h3>
          <p className="text-lg text-[#6ba3be] mb-4">
            Your team <span className="font-semibold text-[#0c969c]">"{formData.name}"</span> has been created.
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
        <div className="relative p-8">
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
            <button onClick={handleCancel} className="text-2xl font-bold p-2 rounded-xl w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 bg-[#032f30] text-[#6ba3be] border border-[#0a7075] hover:border-[#0c969c]">
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border-l-4 bg-red-900/20 text-red-300 border-red-500">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <InputField name="name" value={formData.name} onChange={handleInputChange} label="Team Name" icon={<Trophy />} required />

            {/* Sport */}
            <SelectField name="team_sport" value={formData.team_sport} onChange={handleInputChange} label="Sport" icon={<Trophy />} options={sportsOptions.map(o => o.value)} required />

            {/* Country */}
            <SelectField name="country" value={formData.country} onChange={handleInputChange} label="Country" icon={<Globe />} options={countryOptions} required />

            {/* Logo Upload */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">
                <ImageIcon className="w-4 h-4" />
                Upload Team Logo (optional)
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="text-[#6ba3be]" />
            </div>

            {/* ID code */}
            <InputField name="team_identification" value={formData.team_identification} onChange={handleInputChange} label="Team ID Code (optional)" icon={<Tag />} />

            {/* Submit buttons */}
            <div className="flex gap-4 pt-6">
              <button type="button" onClick={handleCancel} className="flex-1 py-4 rounded-xl font-semibold border-2 bg-transparent border-[#0a7075] text-[#6ba3be] hover:border-[#0c969c] hover:bg-[#0c969c]/10">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex-1 py-4 rounded-xl font-semibold bg-[#0c969c] text-[#031716] hover:bg-[#6ba3be]">
                {loading ? "Creating..." : "Create Team"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function InputField({ name, value, onChange, label, icon, required }) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">{icon} {label} {required && "*"}</label>
      <input type="text" name={name} value={value} onChange={onChange} required={required} className="w-full p-4 rounded-xl border-2 bg-[#032f30] border-[#0a7075] text-[#6ba3be]" />
    </div>
  )
}

function SelectField({ name, value, onChange, label, icon, options, required }) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-[#0c969c]">{icon} {label} {required && "*"}</label>
      <select name={name} value={value} onChange={onChange} required={required} className="w-full p-4 rounded-xl border-2 bg-[#032f30] border-[#0a7075] text-[#6ba3be]">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
