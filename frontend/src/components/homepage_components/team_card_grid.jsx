import React from 'react';
import TeamCard from './team_card';

const TeamsGrid = () => {
  // Simulirani podaci
  const teams = [
    {
      team_id: 1,
      name: 'FK Zvezdara',
      sport: 'Fudbalski klub',
      league_name: 'Amaterska liga Beograd',
      role: 'Moderator tima',
    },
    {
      team_id: 2,
      name: 'KK Orlovi',
      sport: 'Košarkaški klub',
      league_name: 'Rekreativna košarkaška liga',
      role: 'Igrač',
    },
    {
      team_id: 3,
      name: 'OK Mladost',
      sport: 'Odbojkaški klub',
      league_name: 'Prva odbojkaška liga',
      role: 'Trener',
    },
  ];

  return (
    <div className="w-full">
      {teams.slice(0, 2).map((team) => (
        <TeamCard
          key={team.team_id}
          teamName={team.name}
          description={`${team.sport} • ${team.league_name}`}
          role={team.role}
          href={`/team/view/${team.team_id}`}
          canEdit={team.role === 'Moderator tima'}
        />
      ))}
    </div>
  );
};

export default TeamsGrid;
