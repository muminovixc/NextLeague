'use client';
import React from 'react';
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
        <div className="flex gap-4">
          {showRequest && (
            <button className="bg-[#0c969c] text-white px-4 py-2 rounded-md hover:bg-[#0a7075]">
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
    </div>
  );
};

export default LeagueCard;
