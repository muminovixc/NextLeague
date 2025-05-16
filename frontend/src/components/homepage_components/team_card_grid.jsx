import React, { useEffect, useState } from 'react';
import TeamCard from './team_card';

const TeamsGrid = () => {
  const [team, setTeam] = useState([]);
      useEffect(() => {
      fetch("http://localhost:8000/my-teams", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setTeam(data))
        .catch((err) => console.error("Greška:", err));
    }, []);
  
    console.log(team);
  return (
    <div className="w-full">
      {team.slice(0, 2).map((team) => (
        <a href={`/team/view/${team.team_id}`} key={team.team_id}> 
      <TeamCard
          key={team.team_id}
          teamName={team.name}
          description={`${team.team_sport} • ${team.country}`}
          
          teamImage={team.team_logo}
        /></a>
      ))}
    </div>
  );
};

export default TeamsGrid;
