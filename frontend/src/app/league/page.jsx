'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyLeagues, getAllLeagues, deleteMyLeague } from '../../lib/league';
import CreateLeagueModal from './CreateLeagueForm';
import LeagueCard from './LeagueCard';


function sortLeagues(leagues, dateOrder, teamsOrder) {
  let sorted = [...leagues];
  if (dateOrder === 'asc') {
    sorted.sort((a, b) => new Date(a.starting) - new Date(b.starting));
  } else if (dateOrder === 'desc') {
    sorted.sort((a, b) => new Date(b.starting) - new Date(a.starting));
  }

  if (teamsOrder === 'asc') {
    sorted.sort((a, b) => a.number_of_teams - b.number_of_teams);
  } else if (teamsOrder === 'desc') {
    sorted.sort((a, b) => b.number_of_teams - a.number_of_teams);
  }

  return sorted;
}

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

export default function LeaguePage() {
  const [mySport, setMySport] = useState('All');
  const [myDate, setMyDate] = useState('');
  const [myTeams, setMyTeams] = useState('');
  const [myLeagues, setMyLeagues] = useState([]);

  const [allSport, setAllSport] = useState('All');
  const [allDate, setAllDate] = useState('');
  const [allTeams, setAllTeams] = useState('');
  const [allLeagues, setAllLeagues] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [deletingLeagueId, setDeletingLeagueId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchLeagues = async () => {
    const [my, all] = await Promise.all([getMyLeagues(), getAllLeagues()]);
    setMyLeagues(my);
    setAllLeagues(all);
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const confirmDelete = async () => {
    if (deletingLeagueId) {
      await deleteMyLeague(deletingLeagueId);
      setShowDeleteConfirm(false);
      setDeletingLeagueId(null);
      fetchLeagues();
    }
  };

  const FilterControls = ({ sport, setSport, sports, date, setDate, teams, setTeams }) => (
    <div className="flex flex-wrap gap-4 mb-4">
      <select value={sport} onChange={(e) => setSport(e.target.value)} className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]">
        {sports.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>
      <select value={date} onChange={(e) => setDate(e.target.value)} className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]">
        <option value="">Date</option>
        <option value="asc">Date ↑</option>
        <option value="desc">Date ↓</option>
      </select>
      <select value={teams} onChange={(e) => setTeams(e.target.value)} className="px-4 py-2 rounded-md bg-[#032f30] text-[#6ba3be] border border-[#0c969c]">
        <option value="">Teams</option>
        <option value="asc">Teams ↑</option>
        <option value="desc">Teams ↓</option>
      </select>
    </div>
  );

  
  const mySports = ['All', ...new Set(myLeagues.map((l) => l.sport))];
  const allSports = ['All', ...new Set(allLeagues.map((l) => l.sport))];

  let filteredMy = mySport === 'All' ? myLeagues : myLeagues.filter((l) => l.sport === mySport);
  filteredMy = sortLeagues(filteredMy, myDate, myTeams);

  let filteredAll = allSport === 'All' ? allLeagues : allLeagues.filter((l) => l.sport === allSport);
  filteredAll = sortLeagues(filteredAll, allDate, allTeams);

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
            filteredMy.map((league) => (
              <LeagueCard
                key={league.league_id}
                league={league}
                showRequest={false}
                onDelete={(id) => {
                  setDeletingLeagueId(id);
                  setShowDeleteConfirm(true);
                }}
              />
            ))
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
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]"
          >
            Create League
          </button>
        </div>
      </div>

      {/* All Leagues */}
      <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">All Leagues</h2>
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
            filteredAll.map((league) => (
              <LeagueCard key={league.league_id} league={league} showRequest={true} />
            ))
          ) : (
            <p className="text-[#6ba3be]">No leagues found for selected filters.</p>
          )}
        </div>
      </div>

      {/* Modal for Creating League */}
      <CreateLeagueModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLeagueCreated={fetchLeagues}
      />

      {/* Modal for Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 w-full max-w-sm">
            <h2 className="text-xl font-bold text-white mb-4">
              Are you sure you want to delete this league?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingLeagueId(null);
                }}
                className="px-4 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
