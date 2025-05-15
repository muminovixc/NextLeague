'use client';
import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import TeamCreateForm from './TeamCreateForm';

export default function TeamDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/team/');
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Teams data:', data);
      setTeams(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamCreated = () => {
    fetchTeams();
    setShowCreateForm(false);
  };

  const handleTeamDelete = async (teamId) => {
    if (!confirm('Are you sure you want to delete this team?')) return;
    
    try {
      const res = await fetch(`http://localhost:8000/team/${teamId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }
      
      // Refresh teams list
      fetchTeams();
    } catch (err) {
      console.error('Error deleting team:', err);
      alert('Failed to delete team. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto" style={{ backgroundColor: '#031716', color: '#fff', minHeight: '100vh' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#6ba3be' }}>Team Management</h1>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0a7075', color: '#fff' }}
          className="hover:bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'Create New Team'}
        </button>
      </div>
      
      {showCreateForm && (
        <div className="mb-8 p-5 rounded-lg shadow-sm" style={{ backgroundColor: '#032f30', borderColor: '#0c969c' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#6ba3be' }}>Create New Team</h2>
          <TeamCreateForm onTeamCreated={handleTeamCreated} onCancel={() => setShowCreateForm(false)} />
        </div>
      )}
      
      {loading && <p style={{ color: '#6ba3be' }}>Loading teams...</p>}
      
      {error && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#ff6b6b', border: '1px solid #ff6b6b' }}>
          {error}
        </div>
      )}
      
      {!loading && !error && teams.length === 0 && (
        <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#032f30' }}>
          <p style={{ color: '#6ba3be' }} className="mb-4">No teams found. Create your first team to get started!</p>
          {!showCreateForm && (
            <button 
              onClick={() => setShowCreateForm(true)}
              style={{ backgroundColor: '#0a7075', color: '#fff' }}
              className="hover:bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Create Team
            </button>
          )}
        </div>
      )}
      
      {teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard 
              key={team.team_id} 
              team={team} 
              onDelete={() => handleTeamDelete(team.team_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}