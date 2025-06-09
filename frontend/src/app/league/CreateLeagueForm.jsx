'use client';
import React, { useState } from 'react';
import { createMyLeague } from '../../lib/league';


export default function CreateLeagueModal({ isOpen, onClose, onLeagueCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    number_of_teams: '',
    number_of_players_in_team: '',
    country: '',
    access: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const parsedData = {
    ...formData,
    number_of_teams: Number(formData.number_of_teams),
    number_of_players_in_team: Number(formData.number_of_players_in_team),
  };
  try {
    await createMyLeague(formData);
    alert('League created successfully!');
    onClose();
    if (onLeagueCreated) {
        onLeagueCreated();  
      }
  } catch (err) {
    console.error(err);
    if (err.message === "PREMIUM_REQUIRED") {
      alert("To create more leagues, you need to subscribe to the VIP plan.");
      window.location.href = "/vip";
    } else {
      alert("Failed to create league");
    }
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-[#032f30] p-6 rounded-xl border border-[#0c969c] w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">Create New League</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-[#6ba3be] block mb-1">League Name</label>
            <input
              name="name"
              placeholder="e.g. Balkan League"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            />
          </div>

          <div>
            <label className="text-[#6ba3be] block mb-1">Sport</label>
            <select
              name="sport"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            >
              <option value="">Select Sport</option>
              <option value="Football">⚽ Football</option>
              <option value="Basketball">🏀 Basketball</option>
              <option value="Volleyball">🏐 Volleyball</option>
              <option value="Handball">🤾 Handball</option>
              <option value="Gaming">🎮 Gaming</option>
            </select>
          </div>

          <div>
            <label className="text-[#6ba3be] block mb-1">Number of Teams (Max: 30)</label>
            <select
              name="number_of_teams"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            >
              <option value="">Select Number of Teams</option>
              {Array.from({ length: 29 }, (_, i) => i + 2).map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[#6ba3be] block mb-1">Players per Team (Max: 30)</label>
            <select
              name="number_of_players_in_team"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            >
              <option value="">Select Players per Team</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[#6ba3be] block mb-1">Country</label>
            <input
              name="country"
              placeholder="e.g. Bosnia"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            />
          </div>

          <div>
            <label className="text-[#6ba3be] block mb-1">Access</label>
            <select
              name="access"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white placeholder:text-[#6ba3be] border border-[#0c969c]"
            >
              <option value="">Select Access</option>
              <option value="PUBLIC">🌍 PUBLIC</option>
              <option value="PRIVATE">🔒 PRIVATE</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-[#0c969c] text-[#0c969c] hover:bg-[#0c969c]/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#0c969c] text-white hover:bg-[#0a7075]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
