'use client';
import React, { useEffect, useState } from 'react';
import { getRequestsForTeam } from '../../lib/team';
const API_URL = 'http://localhost:8000'

export default function RequestTeamModal({ onClose }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequestsForTeam();
        setRequests(data);
      } catch (err) {
        console.error('Error loading team requests:', err);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    await fetch(`${API_URL}/request/acceptRequest`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ request_id: id }),
});

  };

  const handleDecline = async (id) => {
  try {
    const res = await fetch(`${API_URL}/request/declineRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ request_id: id }),
    });

    if (!res.ok) {
      throw new Error("Failed to decline request");
    }

    setRequests(prev => prev.filter(req => req.id !== id));
    console.log("❌ Request declined:", id);
  } catch (err) {
    console.error("Error declining request:", err);
    alert("Greška prilikom odbijanja zahtjeva.");
  }
};


  return (
    <div className="fixed top-20 right-10 bg-[#031716] text-white border border-[#0c969c] rounded-lg shadow-lg p-6 w-full max-w-md z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Team Join Requests</h2>
        <button onClick={onClose} className="text-[#6ba3be] hover:text-red-500 text-xl font-bold">✕</button>
      </div>

      {requests.length === 0 ? (
        <p className="text-[#6ba3be]">No pending requests.</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {requests.map((req) => (
            <li key={req.id} className="p-4 bg-[#072222] rounded-lg border border-[#0c969c]/30">
              <p className="text-sm mb-1">Team ID: <strong>{req.team_id}</strong></p>
              <p className="text-sm mb-1">Sender ID: <strong>{req.sender_id}</strong></p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleAccept(req.id)} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Accept</button>
                <button onClick={() => handleDecline(req.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Decline</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
