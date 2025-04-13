"use client"
import React from 'react';
import { useEffect } from 'react';

export default function LeaguePage() {
  useEffect(() => {
    fetch('http://localhost:8000/user-data', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Cookie s backend-a:', data.user_data);
      })
      .catch(err => console.error('Greška pri dohvatu cookie:', err));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">League Management</h1>
      <div className="bg-[#032f30] rounded-lg p-8">
        <p className="text-[#6ba3be] text-xl mb-8">
          Manage your leagues, tournaments, and competitions all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Active Leagues</h3>
            <p className="text-[#6ba3be] mb-4">View and manage your current leagues</p>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              View Leagues
            </button>
          </div>
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Create New League</h3>
            <p className="text-[#6ba3be] mb-4">Start a new league or tournament</p>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              Create League
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
