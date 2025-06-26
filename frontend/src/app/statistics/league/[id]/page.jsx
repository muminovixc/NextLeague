'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LeagueStatsPage() {
  const params = useParams();
  const leagueId = params.id;

  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:8000/league/getLeaguesStatistic/${leagueId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        console.log('League statistics:', data); // 📦 Log rezultat ovdje
        setStats(data);
      } catch (err) {
        console.error('Error fetching league stats:', err);
        setError(err.message);
      }
    };

    if (leagueId) {
      fetchStats();
    }
  }, [leagueId]);

  if (error) {
    return <div className="p-6 text-red-500">Greška: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">Statistika za ligu #{leagueId}</h1>
      {stats.length === 0 ? (
        <p className="text-gray-300">Nema podataka.</p>
      ) : (
        <table className="min-w-full bg-gray-800 text-white rounded">
          <thead>
            <tr className="bg-cyan-700 text-left">
              <th className="p-3">Tim ID</th>
              <th className="p-3">Utakmice</th>
              <th className="p-3">Pobjede</th>
              <th className="p-3">Neriješeno</th>
              <th className="p-3">Porazi</th>
              <th className="p-3">Poeni</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((team, idx) => (
              <tr key={idx} className="border-b border-gray-600">
                <td className="p-3">{team.team_id}</td>
                <td className="p-3">{team.number_of_matches_played}</td>
                <td className="p-3">{team.number_of_wins}</td>
                <td className="p-3">{team.number_of_draws}</td>
                <td className="p-3">{team.number_of_losses}</td>
                <td className="p-3">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
