import React, { useEffect, useState } from 'react';
import LeagueCard from './LeagueCard';

const LeaguesGrid = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/my-leagues", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLeagues(data))
      .catch((err) => console.error("Greška:", err));
  }, []);

  return (
     <div className="flex flex-wrap w-full">
    {leagues.slice(0, 2).map((league) => (
      <div className="w-full md:w-1/2 p-4" key={league.league_id}>
        <a href={`/league/view/${league.league_id}`} >
      <LeagueCard
        href={`/league/view/${league.league_id}`}
        sport={league.sport}
        leagueName={league.name}
        role="Moderator"
        teamCount={league.number_of_teams}
        isPublic={league.access === "PUBLIC"}
      /> 
    </a>
      </div>
    ))}
  </div>

  );
};

export default LeaguesGrid;
