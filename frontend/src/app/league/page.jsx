'use client';
import React, { useState } from 'react';

const myLeagues = [
  {
    id: 101,
    logo: '🏆',
    name: 'Sigma Cup',
    sport: 'Football',
    teams: 8,
    starting: '2025-04-25',
  },
  {
    id: 102,
    logo: '🏀',
    name: 'Balkan Ballers',
    sport: 'Basketball',
    teams: 6,
    starting: '2025-05-03',
  },
];

const allLeagues = [
  {
    id: 1,
    logo: '🎮',
    name: 'Grand Slam Gaming',
    sport: 'Gaming',
    teams: 8,
    starting: '2025-07-15',
  },
  {
    id: 2,
    logo: '⚽',
    name: 'Europa League',
    sport: 'Football',
    teams: 12,
    starting: '2025-06-20',
  },
  {
    id: 3,
    logo: '🏐',
    name: 'Handball Nations',
    sport: 'Handball',
    teams: 10,
    starting: '2025-08-05',
  },
  {
    id: 4,
    logo: '🏐',
    name: 'Volleyball Masters',
    sport: 'Volleyball',
    teams: 8,
    starting: '2025-09-01',
  },
  {
    id: 5,
    logo: '🎮',
    name: 'Global Offensive Masters',
    sport: 'Gaming',
    teams: 16,
    starting: '2025-10-12',
  },
];

function sortLeagues(leagues, dateOrder, teamsOrder) {
  let sorted = [...leagues];
  if (dateOrder === 'asc') {
    sorted.sort((a, b) => new Date(a.starting) - new Date(b.starting));
  } else if (dateOrder === 'desc') {
    sorted.sort((a, b) => new Date(b.starting) - new Date(a.starting));
  }

  if (teamsOrder === 'asc') {
    sorted.sort((a, b) => a.teams - b.teams);
  } else if (teamsOrder === 'desc') {
    sorted.sort((a, b) => b.teams - a.teams);
  }

  return sorted;
}

const getImageForSport = (sport) => {
  switch (sport) {
    case 'Basketball':
      return '/images/basketball.png';
    case 'Volleyball':
      return '/images/volleyball.png';
    case 'Handball':
      return '/images/handball.png';
    case 'Gaming':
      return '/images/gaming.png';
    case 'Football':
      return '/images/football.png';
    default:
      return '';
  }
};

export default function LeaguePage() {
  const [mySport, setMySport] = useState('All');
  const [myDate, setMyDate] = useState('');
  const [myTeams, setMyTeams] = useState('');

  const [allSport, setAllSport] = useState('All');
  const [allDate, setAllDate] = useState('');
  const [allTeams, setAllTeams] = useState('');

  const mySports = ['All', ...new Set(myLeagues.map((l) => l.sport))];
  const allSports = ['All', ...new Set(allLeagues.map((l) => l.sport))];

  let filteredMy = mySport === 'All' ? myLeagues : myLeagues.filter((l) => l.sport === mySport);
  filteredMy = sortLeagues(filteredMy, myDate, myTeams);

  let filteredAll = allSport === 'All' ? allLeagues : allLeagues.filter((l) => l.sport === allSport);
  filteredAll = sortLeagues(filteredAll, allDate, allTeams);

  const FilterControls = ({ sport, setSport, sports, date, setDate, teams, setTeams }) => (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]"
      >
        {sports.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]"
      >
        <option value="">Date</option>
        <option value="asc">Date ↑</option>
        <option value="desc">Date ↓</option>
      </select>
      <select
        value={teams}
        onChange={(e) => setTeams(e.target.value)}
        className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]"
      >
        <option value="">Teams</option>
        <option value="asc">Teams ↑</option>
        <option value="desc">Teams ↓</option>
      </select>
    </div>
  );

  const LeagueCard = ({ league, showRequest }) => {
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
            <div className="text-3xl">{league.logo}</div>
            <div>
              <h4 className="text-xl font-bold text-white">{league.name}</h4>
              <p className="text-[#6ba3be]">{league.sport}</p>
            </div>
          </div>
          <p className="text-[#6ba3be] mb-1">Teams: {league.teams}</p>
          <p className="text-[#6ba3be] mb-4">Starting: {league.starting}</p>
          <div className="flex gap-4">
            {showRequest && (
              <button className="bg-[#0c969c] text-white px-4 py-2 rounded-md hover:bg-[#0a7075]">
                Send Request
              </button>
            )}
            <button className="border border-[#0c969c] text-[#0c969c] px-4 py-2 rounded-md hover:bg-[#0c969c]/10">
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">League Management</h1>

      {/* My Leagues */}
      <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">My Leagues</h2>
        </div>
        <FilterControls
          sport={mySport}
          setSport={setMySport}
          sports={mySports}
          date={myDate}
          setDate={setMyDate}
          teams={myTeams}
          setTeams={setMyTeams}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMy.length > 0 ? (
            filteredMy.map((league) => <LeagueCard key={league.id} league={league} showRequest={false} />)
          ) : (
            <p className="text-[#6ba3be]">No leagues found for selected filters.</p>
          )}
        </div>
      </div>

      {/* Create League */}
      <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">+ Create Your Own League</h3>
            <p className="text-[#6ba3be]">Start a brand new league with your own rules and teams.</p>
          </div>
          <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
            Create League
          </button>
        </div>
      </div>

      {/* All Leagues */}
      <h2 className="text-3xl font-bold text-white mb-4">Leagues</h2>
      <div className="bg-[#031716] rounded-lg p-6 border border-[#0c969c]/20 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">All Leagues</h3>
        </div>
        <FilterControls
          sport={allSport}
          setSport={setAllSport}
          sports={allSports}
          date={allDate}
          setDate={setAllDate}
          teams={allTeams}
          setTeams={setAllTeams}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAll.length > 0 ? (
            filteredAll.map((league) => <LeagueCard key={league.id} league={league} showRequest={true} />)
          ) : (
            <p className="text-[#6ba3be]">No leagues found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
