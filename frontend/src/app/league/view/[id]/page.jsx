'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getLeaguesStatistic, getLeagueById } from '../../../../lib/league';
import { ArrowLeft } from 'lucide-react';

export default function ViewLeaguePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [statistics, setStatistics] = useState([]);
  const [leagueName, setLeagueName] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statData = await getLeaguesStatistic(id);
        const leagueData = await getLeagueById(id);

        setStatistics(statData);
        setLeagueName(leagueData.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const sortedTeams = [...statistics].sort((a, b) => {
    const { key, direction } = sortConfig;
    let aValue = a[key];
    let bValue = b[key];

    if (key === 'goal_diff') {
      aValue = a.win_points - a.lose_points;
      bValue = b.win_points - b.lose_points;
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const onSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const getRowClass = (index, length) => {
    if (index === 0)
      return 'bg-[#0b1f3a] hover:bg-[#244b73] bg-opacity-20 transition-colors cursor-pointer';
    if (index === length - 1)
      return 'bg-[#800020] hover:bg-[#a0313d] bg-opacity-20 transition-colors cursor-pointer';
    return 'hover:bg-[#183533] transition-colors cursor-pointer';
  };

  const handleRowClick = (teamId) => {
    router.push(`/team/view/${teamId}`);
  };

  return (
    <div className="p-4 md:p-8 bg-[#071c1b] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          {leagueName ? `${leagueName} - Standings` : `League #${id} - Standings`}
        </h1>
        <button
          onClick={() => router.push('/league')}
          className="inline-flex items-center gap-2 text-sm bg-[#0e2e2d] text-teal-400 hover:text-white hover:bg-[#183533] px-4 py-2 rounded-md border border-teal-800 transition"
        >
          <ArrowLeft size={18} /> Back to Leagues
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0e2e2d] rounded-xl overflow-hidden shadow-lg border border-teal-800 text-sm md:text-base">
          <thead className="bg-[#0a2423] text-teal-400 uppercase tracking-wide select-none">
            <tr>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => onSort('rank')}>
                #
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => onSort('team_name')}>
                Team {getSortArrow('team_name')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('number_of_matches_played')}>
                MP {getSortArrow('number_of_matches_played')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('number_of_wins')}>
                W {getSortArrow('number_of_wins')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('number_of_draws')}>
                D {getSortArrow('number_of_draws')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('number_of_losses')}>
                L {getSortArrow('number_of_losses')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('goal_diff')}>
                GF-GA {getSortArrow('goal_diff')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('difference_points')}>
                +/- {getSortArrow('difference_points')}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => onSort('points')}>
                Pts {getSortArrow('points')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr
                key={team.team_id}
                className={`${getRowClass(index, sortedTeams.length)} border-b border-teal-800`}
                onClick={() => handleRowClick(team.team_id)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleRowClick(team.team_id);
                  }
                }}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={team.team_logo.replace('./frontend/public', '')}
                    alt="Team Logo"
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <span className="font-medium">{team.team_name || 'Unnamed Team'}</span>
                </td>
                <td className="px-4 py-3 text-center">{team.number_of_matches_played}</td>
                <td className="px-4 py-3 text-center">{team.number_of_wins}</td>
                <td className="px-4 py-3 text-center">{team.number_of_draws}</td>
                <td className="px-4 py-3 text-center">{team.number_of_losses}</td>
                <td className="px-4 py-3 text-center">
                  {team.win_points}-{team.lose_points}
                </td>
                <td className="px-4 py-3 text-center">{team.difference_points}</td>
                <td className="px-4 py-3 text-center font-bold text-teal-400">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
