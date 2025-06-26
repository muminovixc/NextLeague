"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getMyLeagues, getAllLeagues, deleteMyLeague } from "../../lib/league"
import CreateLeagueModal from "./CreateLeagueForm"
import LeagueCard from "./LeagueCard"
import RequestModal from "./RequestModal"
import SentRequestModal from "./SentRequestsModal"
import { Trophy, Plus, Filter, Calendar, Users, Search, Trash2, X, AlertTriangle, Mail, Loader2 } from "lucide-react"

function sortLeagues(leagues, dateOrder, teamsOrder) {
  const sorted = [...leagues]
  if (dateOrder === "asc") {
    sorted.sort((a, b) => new Date(a.starting) - new Date(b.starting))
  } else if (dateOrder === "desc") {
    sorted.sort((a, b) => new Date(b.starting) - new Date(a.starting))
  }

  if (teamsOrder === "asc") {
    sorted.sort((a, b) => a.number_of_teams - b.number_of_teams)
  } else if (teamsOrder === "desc") {
    sorted.sort((a, b) => b.number_of_teams - a.number_of_teams)
  }

  return sorted
}

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

const LIMIT = 2

export default function LeaguePage() {
  const [mySport, setMySport] = useState("All")
  const [myDate, setMyDate] = useState("")
  const [myTeams, setMyTeams] = useState("")
  const [myLeagues, setMyLeagues] = useState([])

  const [allSport, setAllSport] = useState("All")
  const [allDate, setAllDate] = useState("")
  const [allTeams, setAllTeams] = useState("")
  const [allLeagues, setAllLeagues] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showRequests, setShowRequests] = useState(false)
  const [showSentRequests, setShowSentRequests] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [deletingLeagueId, setDeletingLeagueId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const observer = useRef()
  const lastLeagueRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  const fetchInitialLeagues = async () => {
    const [my, firstAll] = await Promise.all([getMyLeagues(), getAllLeagues(LIMIT, 0)])
    setMyLeagues(my)
    setAllLeagues(firstAll)
    setHasMore(firstAll.length === LIMIT)
  }

  const fetchMoreAllLeagues = async () => {
    setLoading(true)
    try {
      const newLeagues = await getAllLeagues(LIMIT, page * LIMIT)
      setAllLeagues((prev) => [...prev, ...newLeagues])
      setHasMore(newLeagues.length === LIMIT)
    } catch (error) {
      console.error("Failed to load more leagues:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialLeagues()
  }, [])
  useEffect(() => {
    if (page > 0) fetchMoreAllLeagues()
  }, [page])

  const confirmDelete = async () => {
    if (deletingLeagueId) {
      await deleteMyLeague(deletingLeagueId)
      setShowDeleteConfirm(false)
      setDeletingLeagueId(null)
      fetchInitialLeagues()
    }
  }

  const FilterControls = ({ sport, setSport, sports, date, setDate, teams, setTeams, title }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-[#6ba3be]" />
        <h3 className="text-lg font-semibold text-[#6ba3be]">Filter {title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#032f30] to-[#0a7075] text-white border border-[#0c969c]/30 focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
          >
            {sports.map((s, i) => (
              <option key={i} value={s} className="bg-[#032f30] text-white">
                {s === "All" ? "🏆 All Sports" : `${getEmojiForSport(s)} ${s}`}
              </option>
            ))}
          </select>
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6ba3be] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#032f30] to-[#0a7075] text-white border border-[#0c969c]/30 focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#032f30] text-white">
              📅 Sort by Date
            </option>
            <option value="asc" className="bg-[#032f30] text-white">
              📅 Date ↑ (Oldest First)
            </option>
            <option value="desc" className="bg-[#032f30] text-white">
              📅 Date ↓ (Newest First)
            </option>
          </select>
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6ba3be] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#032f30] to-[#0a7075] text-white border border-[#0c969c]/30 focus:border-[#0c969c] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#032f30] text-white">
              👥 Sort by Teams
            </option>
            <option value="asc" className="bg-[#032f30] text-white">
              👥 Teams ↑ (Fewer First)
            </option>
            <option value="desc" className="bg-[#032f30] text-white">
              👥 Teams ↓ (More First)
            </option>
          </select>
          <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6ba3be] pointer-events-none" />
        </div>
      </div>
    </div>
  )

  const mySports = ["All", ...new Set(myLeagues.map((l) => l.sport))]
  const allSports = ["All", ...new Set(allLeagues.map((l) => l.sport))]

  let filteredMy = mySport === "All" ? myLeagues : myLeagues.filter((l) => l.sport === mySport)
  filteredMy = sortLeagues(filteredMy, myDate, myTeams)

  let filteredAll = allSport === "All" ? allLeagues : allLeagues.filter((l) => l.sport === allSport)
  filteredAll = sortLeagues(filteredAll, allDate, allTeams)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#031716] via-[#032f30] to-[#031716]">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] rounded-2xl p-6 shadow-2xl border border-[#6ba3be]/30">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">League Management</h1>
                  <p className="text-white/80 text-lg">Manage your leagues and discover new competitions</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRequests(true)}
                  className="inline-flex items-center gap-2 bg-[#274d60] hover:bg-[#6ba3be] text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5" />
                  Join Requests
                </button>
                <button
                  onClick={() => setShowSentRequests(true)}
                  className="inline-flex items-center gap-2 bg-[#274d60] hover:bg-[#6ba3be] text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5" />
                  Show Sent Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-6 rounded-xl border border-[#0c969c]/30 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-[#0c969c] p-3 rounded-full">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">My Leagues</p>
                <p className="text-white text-2xl font-bold">{myLeagues.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-6 rounded-xl border border-[#0c969c]/30 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-[#6ba3be] p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">Available Leagues</p>
                <p className="text-white text-2xl font-bold">{allLeagues.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#032f30] to-[#0a7075] p-6 rounded-xl border border-[#0c969c]/30 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-[#274d60] p-3 rounded-full">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#6ba3be] text-sm font-medium">Sports Available</p>
                <p className="text-white text-2xl font-bold">{allSports.length - 1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Leagues Section */}
        <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl p-6 shadow-2xl border border-[#0a7075] mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#0c969c] p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">My Leagues</h2>
            <div className="bg-[#274d60] px-3 py-1 rounded-full">
              <span className="text-[#6ba3be] text-sm font-medium">{filteredMy.length} leagues</span>
            </div>
          </div>

          <FilterControls
            sport={mySport}
            setSport={setMySport}
            sports={mySports}
            date={myDate}
            setDate={setMyDate}
            teams={myTeams}
            setTeams={setMyTeams}
            title="My Leagues"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMy.length > 0 ? (
              filteredMy.map((league) => (
                <LeagueCard
                  key={league.league_id}
                  league={league}
                  showRequest={false}
                  onDelete={(id) => {
                    setDeletingLeagueId(id)
                    setShowDeleteConfirm(true)
                  }}
                />
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-12 bg-[#031716] rounded-xl border border-[#0a7075]/30">
                  <Trophy className="w-16 h-16 text-[#0c969c] mx-auto mb-4 opacity-60" />
                  <p className="text-[#6ba3be] text-lg font-medium">No leagues found for selected filters</p>
                  <p className="text-[#0a7075] text-sm mt-2">Try adjusting your filters or create a new league</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create League Section */}
        <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] rounded-2xl p-6 shadow-2xl border border-[#6ba3be]/30 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Create Your Own League</h3>
                <p className="text-white/80 text-lg">Start a brand new league with your own rules and teams</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-white text-[#0c969c] px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Create League
            </button>
          </div>
        </div>

        {/* All Leagues Section */}
        <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl p-6 shadow-2xl border border-[#0a7075]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#6ba3be] p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">All Leagues</h2>
            <div className="bg-[#274d60] px-3 py-1 rounded-full">
              <span className="text-[#6ba3be] text-sm font-medium">{filteredAll.length} leagues</span>
            </div>
          </div>

          <FilterControls
            sport={allSport}
            setSport={setAllSport}
            sports={allSports}
            date={allDate}
            setDate={setAllDate}
            teams={allTeams}
            setTeams={setAllTeams}
            title="All Leagues"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAll.map((league, index) => {
              if (filteredAll.length === index + 1) {
                return (
                  <div key={league.league_id} ref={lastLeagueRef}>
                    <LeagueCard league={league} showRequest={true} />
                  </div>
                )
              }
              return <LeagueCard key={league.league_id} league={league} showRequest={true} />
            })}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3 bg-[#274d60] px-6 py-3 rounded-lg">
                <Loader2 className="w-5 h-5 text-[#6ba3be] animate-spin" />
                <span className="text-[#6ba3be] font-medium">Loading more leagues...</span>
              </div>
            </div>
          )}

          {!hasMore && filteredAll.length > 0 && (
            <div className="text-center py-8">
              <div className="bg-[#031716] px-6 py-3 rounded-lg border border-[#0a7075]/30 inline-block">
                <span className="text-[#6ba3be] font-medium">{"You've reached the end of all leagues"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create League Modal */}
      <CreateLeagueModal isOpen={showModal} onClose={() => setShowModal(false)} onLeagueCreated={fetchInitialLeagues} />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#032f30] to-[#031716] p-6 rounded-2xl border border-[#0a7075] w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Delete League</h2>
            </div>
            <p className="text-[#6ba3be] mb-6">
              Are you sure you want to delete this league? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeletingLeagueId(null)
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0a7075] text-[#6ba3be] hover:bg-[#0a7075]/20 transition-all duration-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequests && <RequestModal onClose={() => setShowRequests(false)} />}

      {/* Sent Request Modal */}
      {showSentRequests && <SentRequestModal onClose={() => setShowSentRequests(false)} />}
    </div>
  )
}
