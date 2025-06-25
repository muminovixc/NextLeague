"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FootballFieldVisualization from "./FootballFieldVisualization"
import TeamCreateForm from "./TeamCreateForm"
import Search from "./Search"
import RequestTeamModal from "./RequestTeamModal"
import { createRequestForTeam } from "../../lib/team"
import { Users, Trophy, MapPin, Settings, Trash2, Eye, Plus, UserPlus, Hash } from "lucide-react"

import { getMyTeam, getTeamMembers, getAllTeams, deleteTeam } from "../../lib/team"

export default function TeamPage() {
  const [showMyTeams, setShowMyTeams] = useState(true);
  const router = useRouter()
  const [myTeams, setMyTeams] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [showMembers, setShowMembers] = useState(false)
  const [showAllTeams, setShowAllTeams] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showRequestsModal, setShowRequestsModal] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTeams, setFilteredTeams] = useState([])

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true)
        const response = await getMyTeam()
        setMyTeams(response.teams)
        setCurrentUser(response.user_id)
        setError(null)
      } catch (error) {
        console.error("Error fetching teams:", error)
        setError("Failed to load teams. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    async function fetching() {
      try {
        const response = await getAllTeams()
        setAllTeams(response)
        setError(null)
      } catch (error) {
        console.error("Error fetching all teams:", error)
        setError("Failed to load all teams.")
      } finally {
        setLoading(false)
      }
    }
    fetching()
  }, [])

  const handleViewMembers = async (team) => {
    try {
      setSelectedTeam(team)
      setShowMembers(true)
      const members = await getTeamMembers(team.team_id)
      setTeamMembers(members)
    } catch (error) {
      console.error("Error fetching team members:", error)
      setTeamMembers([])
    }
  }

  const handleViewTeam = (teamId) => {
    router.push(`/team/view/${teamId}`)
  }

  const handleDeleteTeam = async (teamId) => {
    try {
      await deleteTeam(teamId)
      const updatedTeams = myTeams.filter((team) => team.team_id !== teamId)
      setMyTeams(updatedTeams)
    } catch (error) {
      console.error("Failed to delete team:", error)
      setError("Greška prilikom brisanja tima.")
    }
  }

  const closeMembers = () => {
    setShowMembers(false)
    setSelectedTeam(null)
  }

  const toggleAllTeams = () => {
    setShowAllTeams(!showAllTeams)
  }

  const handleCreateTeam = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

 const handleSearch = ({ name, sport, country }) => {
  setSearchQuery(name);

  const filtered = allTeams.filter((team) => {
    const matchName = team.name.toLowerCase().includes(name.toLowerCase());
    const matchSport = sport ? team.team_sport === sport : true;
    const matchCountry = country ? team.country === country : true;
    return matchName && matchSport && matchCountry;
  });

  setFilteredTeams(filtered);
};


  const handleTeamCreated = async () => {
    try {
      const response = await getMyTeam()
      setMyTeams(response.teams)
      setShowCreateForm(false)
    } catch (error) {
      console.error("Error refreshing teams:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#031716]">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6"
            style={{ borderColor: "#0c969c" }}
          ></div>
          <p className="text-xl font-medium text-[#6ba3be]">Loading teams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-[#031716]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#0c969c]">Team Dashboard</h1>
          <p className="text-lg text-[#6ba3be]">Manage and explore teams</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-[#032f30] text-[#6ba3be] border-l-4 border-[#0c969c]">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* My Teams */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center flex-1 cursor-pointer" onClick={() => setShowMyTeams(!showMyTeams)}>
  <div className="h-1 flex-1 rounded-full mr-6 bg-[#0a7075]"></div>
  <h2 className="text-3xl font-bold whitespace-nowrap text-[#0c969c]">My Teams</h2>
  <div className="ml-4 text-[#0c969c] transform transition-transform duration-300" style={{ transform: showMyTeams ? "rotate(90deg)" : "rotate(0deg)" }}>
             ▶
  </div>  <div className="h-1 flex-1 rounded-full ml-6 bg-[#0a7075]"></div>

            </div>
            <button
              onClick={handleCreateTeam}
              className="ml-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0c969c]/25 flex items-center gap-2 bg-[#0c969c] text-[#031716]"
            >
              <Plus className="w-5 h-5" />
              Create Team
            </button>
          </div>
           <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowRequestsModal(true)}
            className="bg-[#274d60] px-6 py-3 rounded-xl text-[#6ba3be] font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#0c969c]/25 flex items-center gap-2 border border-[#0a7075] hover:border-[#0c969c] hover:bg-[#0a7075]"
          >
            <Settings className="w-4 h-4" />
            Show All Join Requests
          </button>
        </div>


{showMyTeams && (
          myTeams.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#032f30] border border-[#0a7075]">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#0a7075]">
                <Trophy className="w-12 h-12 text-[#6ba3be]" />
              </div>
              <p className="text-xl font-medium text-[#6ba3be]">No teams found</p>
              <p className="text-[#274d60] mt-2">Create your first team to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myTeams.map((team) => (
                <div
                  key={team.team_id}
                  className="group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#0c969c]/20 bg-[#032f30] border border-[#0a7075] hover:border-[#0c969c]"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-[#0c969c] group-hover:text-[#6ba3be] transition-colors duration-300">
                          {team.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-[#0a7075] text-[#6ba3be] border border-[#0c969c]/30">
                            <Trophy className="w-4 h-4" />
                            {team.team_sport}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-[#6ba3be] mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-[#0c969c]" />
                          {team.country}
                        </div>
                      </div>
                      {team.team_logo && (
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center ml-4 bg-[#0a7075] border border-[#274d60]">
                          <img
                            src="/api/placeholder/64/64"
                            alt={`${team.name} logo`}
                            className="w-12 h-12 object-contain rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Team ID */}
                    <div className="mb-6 p-3 rounded-lg bg-[#031716] border border-[#0a7075]">
                      <div className="flex items-center text-xs font-mono text-[#6ba3be]">
                        <Hash className="w-3 h-3 mr-1 text-[#0c969c]" />
                        ID: <span className="text-[#0c969c] ml-1">{team.team_id}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleViewMembers(team)}
                        className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 bg-[#274d60] text-[#6ba3be] hover:bg-[#0a7075] border border-[#0a7075] hover:border-[#0c969c]"
                      >
                        <Users className="w-4 h-4" />
                        View Members
                      </button>

                      <button
                        onClick={() => handleViewTeam(team.team_id)}
                        className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 bg-[#0c969c] text-[#031716] hover:bg-[#6ba3be]"
                      >
                        <Eye className="w-4 h-4" />
                        View Statistics
                      </button>

                      {team.moderator_user_id === currentUser && (
                        <button
                          onClick={() => handleDeleteTeam(team.team_id)}
                          className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Team
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Search & All Teams */}
        {/* Search & All Teams */}
<Search onSearch={handleSearch} />

<div className="flex items-center justify-between mb-6">
  <div
    className="flex items-center gap-2 cursor-pointer select-none"
    onClick={() => setShowAllTeams(!showAllTeams)}
  >
    <h2 className="text-2xl font-bold text-[#0c969c]">All Teams</h2>
    {showAllTeams ? (
      <span className="transform transition-transform rotate-90 text-[#0c969c]">▶</span>
    ) : (
      <span className="transform transition-transform rotate-0 text-[#0c969c]">▶</span>
    )}
  </div>
</div>

{showAllTeams && (
  (searchQuery ? filteredTeams : allTeams).length === 0 ? (
    <div className="text-center py-16 rounded-2xl bg-[#032f30] border border-[#0a7075]">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#0a7075]">
        <Trophy className="w-12 h-12 text-[#6ba3be]" />
      </div>
      <p className="text-xl font-medium text-[#6ba3be]">No teams found</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {(searchQuery ? filteredTeams : allTeams).map((team) => (
        <div
          key={team.team_id}
          className="group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#0c969c]/20 bg-[#032f30] border border-[#0a7075] hover:border-[#0c969c]"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c969c]/5 to-[#6ba3be]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-[#0c969c] group-hover:text-[#6ba3be] transition-colors duration-300">
                  {team.name}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-[#0a7075] text-[#6ba3be] border border-[#0c969c]/30">
                    <Trophy className="w-4 h-4" />
                    {team.team_sport}
                  </div>
                </div>
                <div className="flex items-center text-sm text-[#6ba3be] mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-[#0c969c]" />
                  {team.country}
                </div>
              </div>
              {team.team_logo && (
                <div className="w-16 h-16 rounded-xl flex items-center justify-center ml-4 bg-[#0a7075] border border-[#274d60]">
                  <img
                    src="/api/placeholder/64/64"
                    alt={`${team.name} logo`}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Team ID */}
            <div className="mb-6 p-3 rounded-lg bg-[#031716] border border-[#0a7075]">
              <div className="flex items-center text-xs font-mono text-[#6ba3be]">
                <Hash className="w-3 h-3 mr-1 text-[#0c969c]" />
                ID: <span className="text-[#0c969c] ml-1">{team.team_id}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleViewTeam(team.team_id)}
                className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 bg-[#274d60] text-[#6ba3be] hover:bg-[#0a7075] border border-[#0a7075] hover:border-[#0c969c]"
              >
                <Eye className="w-4 h-4" />
                View Team
              </button>

              {team.moderator_user_id !== currentUser &&
                !myTeams.some((t) => t.team_id === team.team_id) && (
                  <button
                    onClick={async () => {
                      try {
                        await createRequestForTeam(team.team_id)
                        alert("Join request sent!")
                      } catch (err) {
                        console.error("Failed to send request:", err)
                        alert("Failed to send request.")
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 bg-[#0c969c] text-[#031716] hover:bg-[#6ba3be]"
                  >
                    <UserPlus className="w-4 h-4" />
                    Request to Join
                  </button>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
)}


        {/* Show Requests Button */}
       
        {/* Modal za sve requestove */}
        {showRequestsModal && <RequestTeamModal onClose={() => setShowRequestsModal(false)} />}

        {/* Create Team Form Modal */}
        {showCreateForm && <TeamCreateForm onClose={handleCloseCreateForm} onTeamCreated={handleTeamCreated} />}

        {/* Team Members Modal */}
        {showMembers && selectedTeam && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
            <div className="rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-[#031716] border border-[#0c969c]">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-[#0c969c]">{selectedTeam.name}</h3>
                    <p className="text-lg text-[#6ba3be]">Team Members</p>
                  </div>
                  <button
                    onClick={closeMembers}
                    className="text-2xl font-bold p-2 rounded-xl w-12 h-12 flex items-center justify-center bg-[#032f30] text-[#6ba3be] hover:bg-[#0a7075] hover:scale-110 transition-all duration-300"
                  >
                    ×
                  </button>
                </div>

                {teamMembers.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#0a7075] border border-[#0c969c]/30">
                      <Users className="w-10 h-10 text-[#6ba3be]" />
                    </div>
                    <p className="text-xl font-medium text-[#6ba3be]">No team members found</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4 text-[#0c969c]">
                        Squad ({teamMembers.length} players)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map((member, index) => (
                          <div
                            key={member.id}
                            className="flex items-center p-4 rounded-xl bg-[#032f30] border border-[#0a7075] hover:border-[#0c969c]/50 transition-all duration-300"
                          >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-[#0a7075] border border-[#0c969c]/30">
                              <span className="text-lg font-bold text-[#6ba3be]">
                                {member.name ? member.name.charAt(0).toUpperCase() : index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-lg text-[#0c969c]">
                                {member.name || `Player ${index + 1}`}
                              </p>
                              <p className="text-sm text-[#6ba3be]">{member.position || "No position assigned"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4 text-[#0c969c]">Field Formation</h4>
                      <div className="rounded-xl overflow-hidden bg-[#032f30] border border-[#0a7075]">
                        <FootballFieldVisualization members={teamMembers} />
                      </div>
                    </div>
                  </>
                )}

                <div className="text-center pt-6 border-t border-[#0a7075]">
                  <button
                    onClick={closeMembers}
                    className="px-8 py-3 rounded-xl font-semibold bg-[#0c969c] text-[#031716] hover:bg-[#6ba3be] hover:scale-105 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
