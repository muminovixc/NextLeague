"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserViewNavbar from "../../../../components/user_navbar/user_view_navbar";
import { get_user_profile, get_user_teams } from "../../../../lib/user";

export default function ProfileViewPage() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalGoals: 0,
    bestPlayer: 0, // Placeholder, treba backend podršku
    matchesPlayed: 0,
    wins: 0,
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await get_user_profile(userId);
        setUser(data);
        // Dohvati sve timove korisnika
        const teams = await get_user_teams(userId);
        console.log('USER TEAMS:', teams);
        let totalGoals = 0;
        let matchesPlayed = 0;
        let wins = 0;
        // let bestPlayer = 0; // Placeholder
        for (const team of teams) {
          // Dohvati statistiku tima
          const res = await fetch(`http://localhost:8000/statistics/team/${team.team_id}`, { credentials: "include" });
          if (res.ok) {
            const stat = await res.json();
            console.log('STAT FOR TEAM', team.team_id, stat);
            totalGoals += stat.win_points || 0;
            matchesPlayed += stat.number_of_matches_played || 0;
            wins += stat.number_of_wins || 0;
            // bestPlayer += 0; // Dodaj logiku kad budeš imao podatak
          }
        }
        setStats({
          totalGoals,
          bestPlayer: 0, // Placeholder dok ne bude backend podrške
          matchesPlayed,
          wins,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#031716] text-white">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#031716] text-white">Error: {error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#031716] text-white">No profile data</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031716]">
      <div className="bg-[#032f30] rounded-lg p-8 max-w-6xl w-full min-h-[750px] h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <div className="flex-1 flex flex-col">
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 h-full flex flex-col">
              {user.profile_picture ? (
                <img
                  src={`http://localhost:8000/${user.profile_picture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
                />
              ) : (
                <div className="w-32 h-32 bg-[#0a7075] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {user.name} {user.surname}
              </h3>
              <p className="text-[#6ba3be] text-center mb-4">{user.phone_number}</p>
              <p className="text-[#6ba3be] text-center mb-4">{user.email}</p>
              {/* 4 polja statistike */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#032f30] rounded-xl p-4 text-center border border-[#0a7075]">
                  <div className="text-2xl font-bold text-[#0c969c]">{stats.totalGoals}</div>
                  <div className="text-[#6ba3be] text-sm mt-1">Total Goals</div>
                </div>
                <div className="bg-[#032f30] rounded-xl p-4 text-center border border-[#0a7075]">
                  <div className="text-2xl font-bold text-[#0c969c]">{stats.bestPlayer}</div>
                  <div className="text-[#6ba3be] text-sm mt-1">Best Player</div>
                </div>
                <div className="bg-[#032f30] rounded-xl p-4 text-center border border-[#0a7075]">
                  <div className="text-2xl font-bold text-[#0c969c]">{stats.matchesPlayed}</div>
                  <div className="text-[#6ba3be] text-sm mt-1">Matches Played</div>
                </div>
                <div className="bg-[#032f30] rounded-xl p-4 text-center border border-[#0a7075]">
                  <div className="text-2xl font-bold text-[#0c969c]">{stats.wins}</div>
                  <div className="text-[#6ba3be] text-sm mt-1">Wins</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <UserViewNavbar userId={userId} userData={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
