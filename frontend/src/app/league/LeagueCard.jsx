'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const getEmojiForSport = (sport) => {
  switch (sport) {
    case 'Basketball': return '🏀';
    case 'Volleyball': return '🏐';
    case 'Handball': return '🤾';
    case 'Gaming': return '🎮';
    case 'Football': return '⚽';
    default: return '❓';
  }
};

const getImageForSport = (sport) => {
  switch (sport) {
    case 'Basketball': return '/images/basketball.png';
    case 'Volleyball': return '/images/volleyball.png';
    case 'Handball': return '/images/handball.png';
    case 'Gaming': return '/images/gaming.png';
    case 'Football': return '/images/football.png';
    default: return '';
  }
};


const LeagueCard = ({ league, showRequest, onDelete }) => {
  const router = useRouter();
  const bgImage = getImageForSport(league.sport);
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [simulatedTeams, setSimulatedTeams] = useState([]);

  const handleRequestClick = async () => {
    console.log("Selected sport:", league.sport);

    // Simulacija poziva getMyTeamsModerator(league.sport)
    // const teams = await getMyTeamsModerator(league.sport);

    const teams = [
      {
        team_id: 1,
        name: "Team A",
        team_logo: "/images/logo1.png",
        team_sport: "Football"
      },
      {
        team_id: 2,
        name: "Team B",
        team_logo: "/images/logo2.png",
        team_sport: "Basketball"
      },
      {
        team_id: 3,
        name: "Team C",
        team_logo: "/images/logo3.png",
        team_sport: "Gaming"
      }
    ];

    setSimulatedTeams(teams);
    setShowTeamOptions(true);
  };

  const handleSendRequest = (team_id) => {
    console.log("Sending request for league", league.league_id, "with team", team_id);
    alert("Request sent successfully for Team ID: " + team_id);
  };

  return (
    <div
      className="relative p-6 rounded-lg border border-[#0c969c]/20 overflow-hidden"
      style={{
        backgroundColor: '#032f30',
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 bg-black/60 p-4 rounded-lg">
        <div className="flex items-center mb-4 gap-4">
          <div className="text-3xl">{getEmojiForSport(league.sport)}</div>
          <div>
            <h4 className="text-xl font-bold text-white">{league.name}</h4>
            <p className="text-[#6ba3be]">{league.sport}</p>
          </div>
        </div>
        <p className="text-[#6ba3be] mb-1">Teams: {league.number_of_teams}</p>
        <p className="text-[#6ba3be] mb-4">Players: {league.number_of_players_in_team}</p>
        <p className="text-[#6ba3be] mb-4">Country: {league.country}</p>
        <div className="flex gap-4 flex-wrap">
          {showRequest && (
            <button
              className="bg-[#0c969c] text-white px-4 py-2 rounded-md hover:bg-[#0a7075]"
              onClick={handleRequestClick}
            >
              Send Request
            </button>
          )}

          <Link href={`/league/view/${league.league_id}`}>
            <button className="border border-[#0c969c] text-[#0c969c] px-4 py-2 rounded-md hover:bg-[#0c969c]/10 w-full text-left">
              View
            </button>
          </Link>

          {!showRequest && (
            <button
              onClick={() => onDelete(league.league_id)}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500/10"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {showTeamOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c] w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Select a Team to Send Request</h2>
            {simulatedTeams.length === 0 ? (
              <p className="text-[#6ba3be]">No Created Teams</p>
            ) : (
              <div className="space-y-3">
                {simulatedTeams.map(team => (
                  <div key={team.team_id} className="flex items-center justify-between bg-[#032f30] px-4 py-2 rounded-md border border-[#0c969c]">
                    <div className="flex items-center gap-4">
                      <img src={team.team_logo} alt={team.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-white font-semibold">{team.name}</p>
                        <p className="text-[#6ba3be] text-sm">{team.team_sport}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSendRequest(team.team_id)}
                      className="bg-[#0c969c] text-white px-4 py-1 rounded-md hover:bg-[#0a7075]"
                    >
                      Send Request
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowTeamOptions(false)}
                className="text-white border border-gray-500 px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueCard;
