import { useState, useEffect } from 'react';
import { getMyLeagues } from '../../lib/league';

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

export default function UserLeagues({ selectedSport }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        setLoading(true);

        const response = await getMyLeagues();
        console.log('Sve lige:', response);

        // ✅ response je niz liga, ne objekat sa .leagues
        const filteredLeagues = (response || []).filter(league => {
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
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent"
             style={{ borderColor: '#0c969c' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl" style={{ backgroundColor: '#032f30' }}>
        <p className="text-center" style={{ color: '#6ba3be' }}>{error}</p>
      </div>
    );
  }

  if (leagues.length === 0) {
    const icon = sportIcons[selectedSport] || '❓';
    return (
      <div className="p-8 text-center rounded-xl" style={{ backgroundColor: '#032f30' }}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
             style={{ backgroundColor: '#0a7075' }}>
          <span className="text-2xl" style={{ color: '#6ba3be' }}>{icon}</span>
        </div>
        <p className="text-lg font-medium" style={{ color: '#6ba3be' }}>
          No leagues found for {selectedSport}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((league) => (
        <div 
          key={league.league_id} 
          className="group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl border"
          style={{ 
            backgroundColor: '#032f30', 
            borderColor: '#0a7075',
            borderWidth: '1px'
          }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0c969c' }}>
                  {league.name}
                </h3>
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                     style={{ backgroundColor: '#0a7075', color: '#6ba3be' }}>
                  {league.sport}
                </div>
                <p className="text-sm" style={{ color: '#6ba3be' }}>
                  {league.country}
                </p>
              </div>
              {league.league_logo && (
                <div className="w-16 h-16 rounded-xl flex items-center justify-center ml-4" 
                     style={{ backgroundColor: '#0a7075' }}>
                  <img 
                    src={league.league_logo} 
                    alt={`${league.name} logo`} 
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = `/league/view/${league.league_id}`}
                className="w-full py-2 rounded-lg font-medium transition-all duration-200 hover:transform hover:translate-y-0.5"
                style={{ 
                  backgroundColor: '#0c969c', 
                  color: '#031716',
                }}
              >
                View League
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
