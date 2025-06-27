"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getTeamById } from "../../../../lib/team"
import TeamSchedule from "./TeamSchedule"
import TeamInfoCard from "./team-info-card"
import TeamStatsCard from "./team-stats-card"

export default function TeamView() {
  const router = useRouter()
  const params = useParams()
  const teamId = params.id

  const [teamData, setTeamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeam() {
      if (!teamId) return

      try {
        setLoading(true)
        const data = await getTeamById(teamId)
        console.log("Received team data:", data)
        setTeamData(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching team:", error)
        setError("Failed to load team information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [teamId])

  const handleGoBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#031716" }}>
        <div className="text-center">
          <div className="relative">
            <div
              className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6"
              style={{ borderColor: "#0c969c" }}
            ></div>
            <div
              className="absolute inset-0 rounded-full h-16 w-16 border-4 border-t-transparent mx-auto animate-ping"
              style={{ borderColor: "rgba(12, 150, 156, 0.3)" }}
            ></div>
          </div>
          <p className="text-xl font-medium animate-pulse" style={{ color: "#6ba3be" }}>
            Loading team information...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#031716" }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full border flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))",
              borderColor: "rgba(239, 68, 68, 0.3)",
            }}
          >
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#ef4444" }}>
            Error
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: "#6ba3be" }}>
            {error}
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105 text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0c969c, #6ba3be)" }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!teamData || !Array.isArray(teamData) || teamData.length === 0 || !teamData[0]) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#031716" }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #0a7075, #274d60)" }}
          >
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0c969c" }}>
            Team Not Found
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: "#6ba3be" }}>
            The requested team could not be found.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105 text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0c969c, #6ba3be)" }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const team = teamData[0]
  const statistics = teamData[1] || null
  const league = teamData[2] || null

  if (!team || typeof team !== "object") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#031716" }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #0a7075, #274d60)" }}
          >
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0c969c" }}>
            Invalid Data
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: "#6ba3be" }}>
            Team data is not in the expected format.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105 text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0c969c, #6ba3be)" }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ background: "linear-gradient(135deg, #031716, #032f30, #031716)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="group mb-6 flex items-center px-6 py-3 rounded-xl transition-all hover:transform hover:scale-105 border shadow-lg"
            style={{
              background: "linear-gradient(135deg, #032f30, #0a7075)",
              color: "#6ba3be",
              borderColor: "#0a7075",
            }}
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Team and League Information */}
        {league && (
          <div
            className="mt-6 text-center p-6 rounded-2xl shadow-lg mb-8 border"
            style={{
              background: "linear-gradient(135deg, #032f30, #0a7075)",
              borderColor: "#0a7075",
            }}
          >
            <p className="text-lg mb-3" style={{ color: "#6ba3be" }}>
              🏆 Participating in:
            </p>
            <button
              onClick={() => router.push(`/league/view/${league.league_id}`)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:transform hover:scale-105 text-white font-bold shadow-lg"
              style={{ background: "linear-gradient(135deg, #0c969c, #6ba3be)" }}
            >
              {league.name}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TeamInfoCard team={team} />
          <TeamStatsCard statistics={statistics} />
        </div>

        {/* Team Schedule */}
        <div className="mt-8">
          <TeamSchedule teamId={team.team_id} />
        </div>
      </div>
    </div>
  )
}
