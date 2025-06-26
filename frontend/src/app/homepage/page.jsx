"use client";
import Sidebar from '../../components/sidebar/sidebar';
import Footer from '../../components/footer/footer';
import Button from '../../components/button/button';
import { useEffect, useState } from 'react';
import CardsGrid from '../../components/homepage_components/homepage_card_grid';
import LeagueGrid from '../../components/homepage_components/leagueCard_grid';
import SearchBar from '../../components/homepage_components/searchbar';
import TeamsGrid from '../../components/homepage_components/team_card_grid';
import Link from 'next/link';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/user-info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("you are not logged in");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User data:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Greška:", err);
      });
  }, []);

  const getUserTypeLabel = (typeId) => {
    switch (typeId) {
      case 1:
        return "Basic";
      case 2:
        return "Premium";
      case 3:
        return "Premium Plus";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <SearchBar />
      <div className="p-6 pt-10">
        <title>Homepage</title>
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
          {user ? (
            <>
              Welcome, {user.name}
              <span className="text-sm bg-cyan-700 text-white px-3 py-1 rounded-full font-medium">
                {getUserTypeLabel(user.user_type_id)}
              </span>
            </>
          ) : (
            "Loading..."
          )}
        </h1>
        <p className="text-gray-300 mt-2">Overview of your league and team activities</p>

        {/* Cards */}
        <div className="mt-6">
          <CardsGrid />
        </div>

        {/* Leagues & Teams Section */}
        <div className="flex flex-col md:flex-row w-full h-auto pt-5 rounded">
          {/* Left - Leagues */}
          <div className="w-full md:w-1/2 p-4 bg-[#0a7075] rounded">
            <div className="flex justify-between items-center mt-5 px-5">
              <p className="text-3xl font-semibold text-white">Your leagues</p>
              <Link href="/league" className="text-blue-400 hover:underline">view all leagues</Link>
            </div>
            <div className="flex flex-col md:flex-row w-auto">
              {<LeagueGrid /> || "No leagues found"}
            </div>
          </div>

          {/* Right - Teams */}
          <div className="w-full md:w-1/2 p-4 bg-[#0a7075] rounded lg:ml-4 mt-4 md:mt-0">
            <div className="flex justify-between items-center mt-5 px-5 pb-5">
              <p className="text-3xl font-semibold text-white">Your teams</p>
              <Link href="/team" className="text-blue-400 hover:underline">view all leagues</Link>

            </div>
            <TeamsGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
