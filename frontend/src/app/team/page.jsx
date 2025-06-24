'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FootballFieldVisualization from './FootballFieldVisualization';
import TeamCreateForm from './TeamCreateForm';
import { getMyTeam , getTeamMembers, getAllTeams,deleteTeam} from '../../lib/team';
import Search from './Search'; 

export default function TeamPage() {
  const router = useRouter();
  const [myTeams, setMyTeams] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showAllTeams, setShowAllTeams] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const response = await getMyTeam();

        setMyTeams(response.teams);
        setCurrentUser(response.user_id);

        setError(null);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  useEffect(() => {
    async function fetching(){
      try {
        const response = await getAllTeams();
        setAllTeams(response); 
        setError(null);
      } catch (error) {
        console.error('Error fetching all teams:', error);
        setError('Failed to load all teams.');
      } finally {
        setLoading(false);
      }
    }

    fetching(); 
  }, []);

  const handleViewMembers = async (team) => {
    try {
      setSelectedTeam(team);
      setShowMembers(true);
      
      const members = await getTeamMembers(team.team_id);
      setTeamMembers(members);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setTeamMembers([]);
    }
  };

  const handleViewTeam = (teamId) => {
    router.push(`/team/view/${teamId}`);
  };

  const handleDeleteTeam = async (teamId) => {
  try {
    await deleteTeam(teamId);
    const updatedTeams = myTeams.filter(team => team.team_id !== teamId);
    setMyTeams(updatedTeams);
  } catch (error) {
    console.error("Failed to delete team:", error);
    setError("Greška prilikom brisanja tima.");
  }
};


  const closeMembers = () => {
    setShowMembers(false);
    setSelectedTeam(null);
  };

  const toggleAllTeams = () => {
    setShowAllTeams(!showAllTeams);
  };

  const handleCreateTeam = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleSearch = (query) => {
  setSearchQuery(query);
  const filtered = allTeams.filter(team =>
    team.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredTeams(filtered);
};

  const handleTeamCreated = async (newTeam) => {
    try {
      const response = await getMyTeam();
      setMyTeams(response.teams);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error refreshing teams:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#031716' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6" 
               style={{ borderColor: '#0c969c' }}></div>
          <p className="text-xl font-medium" style={{ color: '#6ba3be' }}>Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#031716' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#0c969c' }}>
            Team Dashboard
          </h1>
          <p className="text-lg" style={{ color: '#6ba3be' }}>
            Manage and explore teams
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 rounded-xl border-l-4" 
               style={{ 
                 backgroundColor: '#032f30', 
                 color: '#6ba3be',
                 borderLeftColor: '#0c969c'
               }}>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* My Teams Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center flex-1">
              <div className="h-1 flex-1 rounded-full mr-6" style={{ backgroundColor: '#0a7075' }}></div>
              <h2 className="text-3xl font-bold whitespace-nowrap" style={{ color: '#0c969c' }}>
                My Teams
              </h2>
              <div className="h-1 flex-1 rounded-full ml-6" style={{ backgroundColor: '#0a7075' }}></div>
            </div>
            {/* Create Team Button */}
            <button
              onClick={handleCreateTeam}
              className="ml-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
              style={{ backgroundColor: '#0c969c', color: '#031716' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Team
            </button>
          </div>

          {myTeams.length === 0 ? (
            <div className="text-center py-16 rounded-2xl" 
                 style={{ backgroundColor: '#032f30' }}>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: '#0a7075' }}>
                <span className="text-3xl" style={{ color: '#6ba3be' }}>⚽</span>
              </div>
              <p className="text-xl font-medium mb-4" style={{ color: '#6ba3be' }}>
                No teams found
              </p>
             
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myTeams.map((team) => (
                <div 
                  key={team.team_id} 
                  className="group rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl border"
                  style={{ 
                    backgroundColor: '#032f30', 
                    borderColor: '#0a7075',
                    borderWidth: '2px'
                  }}
                >
                  <div className="p-6">
                    {/* Team Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-colors" 
                            style={{ color: '#0c969c' }}>
                          {team.name}
                        </h3>
                        <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                             style={{ backgroundColor: '#0a7075', color: '#6ba3be' }}>
                          {team.team_sport}
                        </div>
                        <p className="text-sm flex items-center" style={{ color: '#6ba3be' }}>
                          <span className="mr-2">🌍</span>
                          {team.country}
                        </p>
                      </div>
                      {team.team_logo && (
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center ml-4" 
                             style={{ backgroundColor: '#0a7075' }}>
                          <img 
                            src="/api/placeholder/64/64" 
                            alt={`${team.name} logo`} 
                            className="w-12 h-12 object-contain rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Team ID */}
                    <div className="mb-6 p-3 rounded-lg" style={{ backgroundColor: '#031716' }}>
                      <p className="text-xs font-mono" style={{ color: '#6ba3be' }}>
                        ID: {team.team_id}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <div className='space-y-4'>
                    <button
                      onClick={() => handleViewMembers(team)}
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-lg"
                      style={{ 
                        backgroundColor: '#0c969c', 
                        color: '#031716',
                      }}
                    >
                      View Members
                    </button>

                    <button
                        onClick={() => handleViewTeam(team.team_id || team.id)}
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-lg"
                      style={{ 
                        backgroundColor: '#0c969c', 
                        color: '#031716',
                      }}
                    >
                      View Statistic
                    </button>
                   {team.moderator_user_id === currentUser && (
                          <button
                            onClick={() => handleDeleteTeam(team.team_id)}
                            className="w-full py-3 rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:translate-y-1 hover:shadow-lg"
                            style={{ backgroundColor: '#FF5C5C', color: '#031716' }}
                          >
                            Delete Team
                          </button>
                        )}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

          <Search onSearch={handleSearch} />

        {/* All Teams Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center flex-1">
              <div className="h-1 flex-1 rounded-full mr-6" style={{ backgroundColor: '#0a7075' }}></div>
              <h2 className="text-3xl font-bold whitespace-nowrap" style={{ color: '#0c969c' }}>
                All Teams
              </h2>
              <div className="h-1 flex-1 rounded-full ml-6" style={{ backgroundColor: '#0a7075' }}></div>
            </div>
            <button
              onClick={toggleAllTeams}
              className="ml-6 p-3 rounded-xl transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: '#032f30', color: '#0c969c' }}
            >
              <svg 
                className={`w-6 h-6 transform transition-transform duration-300 ${showAllTeams ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={`transition-all duration-500 ease-in-out ${showAllTeams ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            {allTeams.length === 0 ? (
              <div className="text-center py-16 rounded-2xl" 
                   style={{ backgroundColor: '#032f30' }}>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: '#0a7075' }}>
                  <span className="text-3xl" style={{ color: '#6ba3be' }}>🏆</span>
                </div>
                <p className="text-xl font-medium" style={{ color: '#6ba3be' }}>
                  No teams available
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {(searchQuery ? filteredTeams : allTeams).map((team) => (
                  <div 
                    key={team.team_id || team.id} 
                    className="group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl border"
                    style={{ 
                      backgroundColor: '#032f30', 
                      borderColor: '#0a7075',
                      borderWidth: '1px'
                    }}
                  >
                    <div className="p-5">
                      {/* Team Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2" 
                              style={{ color: '#0c969c' }}>
                            {team.name}
                          </h3>
                          <div className="inline-block px-2 py-1 rounded-md text-xs font-medium mb-2"
                               style={{ backgroundColor: '#0a7075', color: '#6ba3be' }}>
                            {team.team_sport}
                          </div>
                          <p className="text-sm" style={{ color: '#6ba3be' }}>
                            {team.country}
                          </p>
                        </div>
                        {team.team_logo && (
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center ml-3" 
                               style={{ backgroundColor: '#0a7075' }}>
                            <img 
                              src={team.team_logo} 
                              alt={`${team.name} logo`} 
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <div className='flex flex-col gap-y-3'>
                      <button
                        onClick={() => handleViewTeam(team.team_id || team.id)}
                        className="w-full py-2 rounded-lg font-medium transition-all duration-200 hover:transform hover:translate-y-0.5"
                        style={{ 
                          backgroundColor: '#0a7075', 
                          color: '#6ba3be',
                        }}
                      >
                        View Team
                      </button>

                       <button    //                      
                        className="w-full py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:translate-y-0.5"
                        style={{ 
                          backgroundColor: '#0a7075', 
                          color: '#6ba3be',
                        }}
                      >
                       Send a join request
                      </button>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Members Modal */}
        {showMembers && selectedTeam && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
            <div 
              className="rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2"
              style={{ backgroundColor: '#031716', borderColor: '#0c969c' }}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2" style={{ color: '#0c969c' }}>
                      {selectedTeam.name}
                    </h3>
                    <p className="text-lg" style={{ color: '#6ba3be' }}>Team Members</p>
                  </div>
                  <button 
                    onClick={closeMembers}
                    className="text-2xl font-bold p-2 rounded-xl w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: '#032f30', color: '#6ba3be' }}
                  >
                    ×
                  </button>
                </div>
                
                {!teamMembers || teamMembers.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: '#0a7075' }}>
                      <span className="text-2xl" style={{ color: '#6ba3be' }}>👥</span>
                    </div>
                    <p className="text-xl font-medium" style={{ color: '#6ba3be' }}>
                      No team members found
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Members List */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4" style={{ color: '#0c969c' }}>
                        Squad ({teamMembers.length} players)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.map((member, index) => (
                          <div key={member.id} 
                               className="flex items-center p-4 rounded-xl border transition-all hover:transform hover:scale-105"
                               style={{ backgroundColor: '#032f30', borderColor: '#0a7075' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                                 style={{ backgroundColor: '#0a7075' }}>
                              <span className="text-lg font-bold" style={{ color: '#6ba3be' }}>
                                {member.name ? member.name.charAt(0).toUpperCase() : index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-lg" style={{ color: '#0c969c' }}>
                                {member.name || `Player ${index + 1}`}
                              </p>
                              <p className="text-sm" style={{ color: '#6ba3be' }}>
                                {member.position || 'No position assigned'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Field Visualization */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4" style={{ color: '#0c969c' }}>
                        Field Formation
                      </h4>
                      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#032f30' }}>
                        <FootballFieldVisualization members={teamMembers} />
                      </div>
                    </div>
                  </>
                )}
                
                {/* Modal Footer */}
                <div className="text-center pt-6 border-t" style={{ borderColor: '#0a7075' }}>
                  <button
                    onClick={closeMembers}
                    className="px-8 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
                    style={{ backgroundColor: '#0c969c', color: '#031716' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Team Form Modal */}
        {showCreateForm && (
          <TeamCreateForm 
            onClose={handleCloseCreateForm}
            onTeamCreated={handleTeamCreated}
          />
        )}
      </div>
    </div>
  );
}