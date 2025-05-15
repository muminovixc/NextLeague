'use client';
import { useEffect, useState } from 'react';

export default function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        // Using the correct endpoint from your API
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

    fetchTeams();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Teams</h1>
      
      {loading && <p className="text-white-600">Loading teams...</p>}
      
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {!loading && !error && teams.length === 0 && (
        <p className="text-white-600">No teams found.</p>
      )}
      
      {teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div 
              key={team.team_id} 
              className="border border-white-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                {team.team_logo && (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white-100 flex-shrink-0">
                    <img 
                      src={team.team_logo} 
                      alt={`${team.team_identification || 'Team'} logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-team-logo.png"; // Fallback image
                      }}
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    {team.team_identification || `Team ${team.team_id}`}
                  </h2>
                  <div className="flex gap-2 text-sm text-white-600">
                    <span>{team.team_sport}</span>
                    <span>•</span>
                    <span>{team.country}</span>
                  </div>
                </div>
              </div>
              
              {/* You can expand this to show team members if you fetch that data */}
              <div className="mt-3 pt-3 border-t border-white-100">
                <p className="text-sm text-white-600">
                  <span className="font-medium">Moderator ID:</span> {team.moderator_user_id || 'No moderator assigned'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}