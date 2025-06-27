import { useEffect, useState } from 'react';
import { get_user_leagues } from '../../../lib/user';

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

export default function UserLeaguesView({ userId, selectedSport }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        setLoading(true);
        const response = await get_user_leagues(userId);
        const filtered = (response || []).filter((league) => {
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

  if (loading)
    return <div className="text-center text-[#0c969c] py-4">Loading leagues...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;
  if (leagues.length === 0)
    return (
      <div className="text-center text-[#6ba3be] py-4">
        No leagues found for <span className="font-semibold">{selectedSport}</span>.
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {leagues.map(league => (
        <div
          key={league.league_id}
          className="bg-[#032f30] rounded-lg p-4 border border-[#0a7075] cursor-pointer hover:shadow-lg hover:border-[#0c969c] transition-all"
          onClick={() => window.location.href = `/league/view/${league.league_id}`}
        >
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
