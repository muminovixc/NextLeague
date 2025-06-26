import { useEffect, useState } from 'react';
import { get_user_teams } from '../../lib/user';

const sportIcons = {
  football: '⚽',
  basketball: '🏀',
  volleyball: '🏐',
  handball: '🤾',
};

const sportMap = {
  Football: 'football',
  Basketball: 'basketball',
  Volleyball: 'volleyball',
  Handball: 'handball',
};

export default function UserTeamsView({ userId, selectedSport }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const response = await get_user_teams(userId);
        const filtered = (response || []).filter(team => {
          const mapped = sportMap[team.team_sport] || team.team_sport.toLowerCase();
          return mapped === selectedSport.toLowerCase();
        });
        setTeams(filtered);
        setError(null);
      } catch (e) {
        setError('Failed to load teams.');
      } finally {
        setLoading(false);
      }
    }
    if (userId && selectedSport) fetchTeams();
  }, [userId, selectedSport]);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>{error}</div>;
  if (teams.length === 0) return <div>No teams found for {selectedSport}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {teams.map(team => (
        <div key={team.team_id} className="bg-[#032f30] rounded-lg p-4 border border-[#0a7075]">
          <div className="flex items-center gap-2 mb-2">
            <span>{sportIcons[selectedSport]}</span>
            <span className="font-bold text-[#0c969c]">{team.name}</span>
          </div>
          <div className="text-[#6ba3be] text-sm">{team.country}</div>
        </div>
      ))}
    </div>
  );
} 