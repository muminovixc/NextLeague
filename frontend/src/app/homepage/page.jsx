"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Footer from "../../components/footer/footer"
import CardsGrid from "../../components/homepage_components/homepage_card_grid"
import LeagueGrid from "../../components/homepage_components/leagueCard_grid"
import SearchBar from "../../components/homepage_components/searchbar"
import TeamsGrid from "../../components/homepage_components/team_card_grid"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/user/my_profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("you are not logged in")
        }
        return res.json()
      })
      .then((data) => {
        console.log("User data:", data)
        setUser(data)
      })
      .catch((err) => {
        console.error("Greška:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const getUserTypeLabel = (typeId) => {
    switch (typeId) {
      case 1:
        return "Basic"
      case 2:
        return "Premium"
      case 3:
        return "Premium Plus"
      default:
        return "Unknown"
    }
  }

  const getUserTypeBadgeStyle = (typeId) => {
    switch (typeId) {
      case 1:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
      case 2:
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      case 3:
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#031716] via-[#032f30] to-[#031716]">
      <title>Homepage</title>

      {/* Search Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#031716]/80 border-b border-[#0a7075]/30">
        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#0a7075]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#6ba3be]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-[#032f30]/80 to-[#0a7075]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#0a7075]/30 shadow-2xl">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-[#0a7075]/30 rounded-lg w-64 mb-4"></div>
                  <div className="h-4 bg-[#0a7075]/20 rounded w-96"></div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6ba3be] to-white bg-clip-text text-transparent mb-2">
                        {user ? (
                          <>
                            Welcome back, {user.name}
                            {user.user_type_id > 1 && <span className="ml-3 text-2xl">👋</span>}
                          </>
                        ) : (
                          "Welcome"
                        )}
                      </h1>
                      <p className="text-[#6ba3be] text-lg sm:text-xl font-medium">
                        Overview of your league and team activities
                      </p>
                    </div>
                    {user && (
                      <div className="flex-shrink-0">
                        <div
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getUserTypeBadgeStyle(
                            user.user_type_id,
                          )}`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          {getUserTypeLabel(user.user_type_id)}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0a7075] to-[#6ba3be] rounded-full"></div>
                Quick Stats
              </h2>
              <p className="text-[#6ba3be]">Your league and team overview at a glance</p>
            </div>
            <CardsGrid />
          </div>

          {/* Leagues & Teams Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Leagues Section */}
            <div className="group">
              <div className="bg-gradient-to-br from-[#032f30]/90 to-[#0a7075]/30 backdrop-blur-sm rounded-2xl border border-[#0a7075]/40 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-[#6ba3be]/50">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Your Leagues</h3>
                        <p className="text-white/80 text-sm">Manage and track your competitions</p>
                      </div>
                    </div>
                    <Link
                      href="/league"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <LeagueGrid />
                </div>
              </div>
            </div>

            {/* Teams Section */}
            <div className="group">
              <div className="bg-gradient-to-br from-[#032f30]/90 to-[#0a7075]/30 backdrop-blur-sm rounded-2xl border border-[#0a7075]/40 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-[#6ba3be]/50">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Your Teams</h3>
                        <p className="text-white/80 text-sm">Connect with your squad</p>
                      </div>
                    </div>
                    <Link
                      href="/team"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <TeamsGrid />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-[#032f30]/50 to-[#0a7075]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#0a7075]/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-[#0a7075] to-[#6ba3be] rounded-full"></div>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link
                  href="/league"
                  className="flex flex-col items-center gap-2 p-4 bg-[#0a7075]/20 hover:bg-[#0a7075]/40 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-8 h-8 bg-[#0a7075] rounded-full flex items-center justify-center group-hover:bg-[#0c969c] transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Create League</span>
                </Link>
                <Link
                  href="/team"
                  className="flex flex-col items-center gap-2 p-4 bg-[#0a7075]/20 hover:bg-[#0a7075]/40 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-8 h-8 bg-[#0a7075] rounded-full flex items-center justify-center group-hover:bg-[#0c969c] transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Create Team</span>
                </Link>
                <Link
                  href="/statistics"
                  className="flex flex-col items-center gap-2 p-4 bg-[#0a7075]/20 hover:bg-[#0a7075]/40 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-8 h-8 bg-[#0a7075] rounded-full flex items-center justify-center group-hover:bg-[#0c969c] transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Statistics</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex flex-col items-center gap-2 p-4 bg-[#0a7075]/20 hover:bg-[#0a7075]/40 rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-8 h-8 bg-[#0a7075] rounded-full flex items-center justify-center group-hover:bg-[#0c969c] transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
