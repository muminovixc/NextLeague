import { useState, useEffect } from 'react';
import { getMyLeagues } from '../../../lib/league';

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

export default function UserLeagues({ selectedSport }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        setLoading(true);
        const response = await getMyLeagues();
        const filteredLeagues = (response || []).filter((league) => {
          const mapped = sportMap[league.sport] || league.sport.trim().toLowerCase();
          return mapped === selectedSport.trim().toLowerCase();
        });
        setLeagues(filteredLeagues);
        setError(null);
      } catch (error) {
        console.error('Error fetching leagues:', error);
        setError('Failed to load leagues. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (selectedSport) {
      fetchLeagues();
    }
  }, [selectedSport]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-[#0c969c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-[#032f30] text-center">
        <p className="text-[#f87171] font-medium">{error}</p>
      </div>
    );
  }

  if (leagues.length === 0) {
    const icon = sportIcons[selectedSport] || '❓';
    return (
      <div className="p-8 text-center rounded-xl bg-[#032f30]">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#0a7075]">
          <span className="text-3xl text-white">{icon}</span>
        </div>
        <p className="text-lg font-medium text-[#6ba3be]">
          No leagues found for <span className="text-[#0c969c]">{selectedSport}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      {leagues.map((league) => (
        <div
          key={league.league_id}
          className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[#0a7075] bg-[#031716] shadow-md hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">{sportIcons[selectedSport]}</div>
            <div>
              <h3 className="text-lg font-bold text-[#0c969c]">{league.name}</h3>
              <p className="text-sm text-[#6ba3be]">{league.country}</p>
              <p className="text-xs text-[#476b7c] mt-1 italic">{league.sport}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = `/league/view/${league.league_id}`}
            className="bg-[#0c969c] hover:bg-[#10b9c2] text-[#031716] font-semibold py-2 px-4 rounded-lg transition-all"
          >
            View League
          </button>
        </div>
      ))}
    </div>
  );
}
