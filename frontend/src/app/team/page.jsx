
'use client';
import { useEffect, useState } from 'react';
import TeamDashboard from './TeamDashboard';

export default function TeamsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/user-data', {
        credentials: 'include',
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      
      // data.user_data je JSON string, pa parsiramo:
      const user = JSON.parse(data.user_data);

      setUser(user);
    } catch (err) {
      console.error("User fetch failed", err);
    }
  };

  fetchUser();
}, []);


  return (
    <div className="min-h-screen bg-white-50">
      <div className="py-8">
        <h1 className="text-center text-3xl font-bold text-white-800 mb-2">Team Management</h1>
        <p className="text-center text-white-600 mb-8">View and manage your sports teams</p>

        {user ? (
          <div className="text-center text-white-700 mb-6">
            Welcome, {user.name} {user.surname} ({user.email})
          </div>
        ) : (
          <div className="text-center text-white-500 mb-6">Loading user info...</div>
        )}

        <TeamDashboard />
      </div>
    </div>
  );
}
