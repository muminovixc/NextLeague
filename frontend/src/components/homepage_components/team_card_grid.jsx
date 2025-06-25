import React, { useEffect, useState } from 'react';
import TeamCard from './team_card';
import Link from 'next/link';
const TeamsGrid = () => {

  const [TeamModerator, setTeamModerator] = useState([]);
      useEffect(() => {
      fetch("http://localhost:8000/my-teams-moderator", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setTeamModerator(data))
        .catch((err) => console.error("Greška:", err));
    }, []);
  
   console.log(TeamModerator);
  return (
    <div className="w-full">
      {TeamModerator.slice(0, 1).map((team) => (
        <Link href={`/team/view/${team.team_id}`} key={team.team_id}> 
      <TeamCard
          key={team.team_id}
          teamName={team.name}
          description={`${team.team_sport} • ${team.country}`}
          role="Moderator"
          teamImage={team.team_logo || 'https://via.placeholder.com/150'}
        /></Link>
      ))}
    </div>
  );
};

export default TeamsGrid;
