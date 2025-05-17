'use client';

import { useEffect, useState } from 'react';
import { getMyTeam } from '../../lib/team';

export default function TeamPage() {
  const [myTeams, setMyTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teams = await getMyTeam();
        setMyTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Teams</h1>
      {myTeams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul className="space-y-2">
          {myTeams.map((team) => (
            <li key={team.team_id} className="border p-3 rounded shadow">
              <p><strong>{team.team_sport}</strong> - {team.country}</p>
              <p>ID: {team.team_id}</p>
              {team.team_logo && (
                <img src={team.team_logo} alt="Team Logo" className="w-16 h-16 mt-2" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
