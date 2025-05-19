'use client';

import { useEffect, useState } from 'react';
import FootballFieldVisualization from './FootballFieldVisualization';
import { getMyTeam , getTeamMembers} from '../../lib/team';

export default function TeamPage() {
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const teams = await getMyTeam();
        setMyTeams(teams);
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

  const closeMembers = () => {
    setShowMembers(false);
    setSelectedTeam(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50" style={{ backgroundColor: '#031716' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: '#0c969c' }}></div>
          <p className="text-lg font-medium" style={{ color: '#6ba3be' }}>Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-12" style={{ backgroundColor: '#031716' }}>
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#0c969c' }}>My Teams</h1>
        
        {error && (
  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#032f30', color: '#6ba3be' }}>
    <p>{error}</p>
  </div>
)}

        {myTeams.length === 0 ? (
          <div className="bg-white bg-opacity-5 rounded-lg p-12 text-center" style={{ backgroundColor: '#032f30' }}>
            <p className="text-xl" style={{ color: '#6ba3be' }}>No teams found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myTeams.map((team) => (
              <div 
                key={team.team_id} 
                className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
                style={{ backgroundColor: '#032f30', borderColor: '#0a7075', borderWidth: '1px' }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: '#0c969c' }}>
                        {team.name}
                      </h2>
                      <h3 className="text-xl font-bold" style={{ color: '#0c969c' }}>
                        {team.team_sport}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: '#6ba3be' }}>{team.country}</p>
                    </div>
                    {team.team_logo && (
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0a7075' }}>
                        <img 
                          src="/api/placeholder/64/64" 
                          alt={`${team.team_sport} logo`} 
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs" style={{ color: '#6ba3be' }}>ID: {team.team_id}</p>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => handleViewMembers(team)}
                      className="w-full py-2 rounded-md font-medium transition duration-200 ease-in-out"
                      style={{ 
                        backgroundColor: '#0a7075', 
                        color: '#6ba3be',
                      }}
                    >
                      View Members
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Team Members modal */}
        {showMembers && selectedTeam && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div 
      className="rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto"
      style={{ backgroundColor: '#031716', borderColor: '#0a7075', borderWidth: '2px' }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold" style={{ color: '#0c969c' }}>
            {selectedTeam.name} Team Members
          </h3>
          <button 
            onClick={closeMembers}
            className="text-lg font-bold p-1 rounded-full w-8 h-8 flex items-center justify-center"
            style={{ backgroundColor: '#032f30', color: '#6ba3be' }}
          >
            ×
          </button>
        </div>
        
        {!teamMembers || teamMembers.length === 0 ? (
          <p className="text-center py-8" style={{ color: '#6ba3be' }}>No team members found.</p>
        ) : (
          <>
            {/* Lista članova (možeš ostaviti ili ukloniti ako želiš samo vizualizaciju) */}
            <ul className="divide-y mb-6" style={{ borderColor: '#0a7075' }}>
              {teamMembers.map((member) => (
                <li key={member.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0a7075' }}>
                      <span className="text-lg font-bold" style={{ color: '#6ba3be' }}>
                        {member.name ? member.name.charAt(0) : '?'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#0c969c' }}>{member.name || 'Unknown'}</p>
                      <p className="text-sm" style={{ color: '#6ba3be' }}>{member.position || 'No position'}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Poziv FootballFieldVisualization komponente */}
            <FootballFieldVisualization members={teamMembers} />
          </>
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={closeMembers}
            className="px-6 py-2 rounded-md font-medium"
            style={{ backgroundColor: '#0a7075', color: '#6ba3be' }}
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
  );
}