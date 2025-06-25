import { useEffect, useState } from 'react';
import { get_user_leagues } from '../../lib/user';

const sportIcons = {
  fudbal: '⚽',
  kosarka: '🏀',
  odbojka: '🏐',
  rukomet: '🤾',
};

const sportMap = {
  Football: 'fudbal',
  Basketball: 'kosarka',
  Volleyball: 'odbojka',
  Handball: 'rukomet',
};

export default function UserLeaguesView({ userId, selectedSport }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        setLoading(true);
        const response = await get_user_leagues(userId);
        const filtered = (response || []).filter(league => {
          const mapped = sportMap[league.sport] || league.sport.toLowerCase();
          return mapped === selectedSport.toLowerCase();
        });
        setLeagues(filtered);
        setError(null);
      } catch (e) {
        setError('Failed to load leagues.');
      } finally {
        setLoading(false);
      }
    }
    if (userId && selectedSport) fetchLeagues();
  }, [userId, selectedSport]);

  if (loading) return <div>Loading leagues...</div>;
  if (error) return <div>{error}</div>;
  if (leagues.length === 0) return <div>No leagues found for {selectedSport}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {leagues.map(league => (
        <div key={league.league_id} className="bg-[#032f30] rounded-lg p-4 border border-[#0a7075]">
          <div className="flex items-center gap-2 mb-2">
            <span>{sportIcons[selectedSport]}</span>
            <span className="font-bold text-[#0c969c]">{league.name}</span>
          </div>
          <div className="text-[#6ba3be] text-sm">{league.country}</div>
        </div>
      ))}
    </div>
  );
} 