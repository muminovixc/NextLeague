"use client"

import React, { useEffect, useState } from 'react';

export default function ClubPage() {
  const [teams, setTeams] = useState([]);
  const [joinCode, setJoinCode] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Simulacija fetch-a (kasnije zamijeni s API pozivom)
  useEffect(() => {
    // Dummy podaci umjesto fetch-a
    setTeams([
      { id: 1, name: 'Red Dragons', description: 'Seniors Team', code: 'RD123' },
      { id: 2, name: 'Blue Sharks', description: 'Juniors Team', code: 'BS456' },
    ]);
  }, []);

  const handleJoin = () => {
    if (!selectedTeamId || !joinCode) {
      alert('Please enter a validthe Team Code');
      return;
    }
    // Tu će ići fetch prema backendu
   // alert(`Poslat zahtjev za učlanjenje u tim ID: ${selectedTeamId} s kodom: ${joinCode}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8">Join a team</h1>


      <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
        <label className="block mb-2 text-lg text-[#6ba3be]">Enter the Team code here:</label>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="w-full p-3 rounded-md text-white mb-4"
          placeholder="Example: RD123"
        />
        <button
          onClick={handleJoin}
          className="bg-[#0c969c] text-white px-6 py-3 p-6 rounded-md hover:bg-[#0a7075]"
        >
          Send a join request
        </button>
      </div>

      <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-6 mb-8">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeamId(team.id)}
            className={`p-6 rounded-lg cursor-pointer border transition ${
              selectedTeamId === team.id
                ? 'bg-[#0c969c] border-[#0c969c]'
                : 'bg-[#031716] border-[#0c969c]/30 hover:border-[#0c969c]'
            }`}
          >
            <h2 className="text-2xl font-semibold">{team.name}</h2>
            <p className="text-[#6ba3be]">{team.description}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
}
