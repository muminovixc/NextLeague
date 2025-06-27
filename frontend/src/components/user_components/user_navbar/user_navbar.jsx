"use client";
import React, { useState } from "react";
import SportSelector from "../userteams/SportSelector";
import UserTeams from "../userteams/UserTeams";
import UserLeagues from "../userleagues/UserLeagues";
import FootballCalendar from "../user_calendar/FootballCalendar";

export default function UserNavbar({ activeMenu, setActiveMenu }) {
  const [selectedSport, setSelectedSport] = useState("Football");

  const topMenu = [
    { id: "moje_lige", label: "My leagues" },
    { id: "moji_timovi", label: "My teams" },
    { id: "svi_mecevi", label: "All matches" },
    { id: "obavijesti", label: "Notifications" },
  ];

  return (
    <div className="w-full">
      <nav className="bg-[#032f30] rounded-xl p-3 shadow-md">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {topMenu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 
                ${activeMenu === item.id
                  ? "bg-[#0c969c] text-[#031716] shadow-md"
                  : "bg-[#031716] text-white hover:bg-[#0a7075] hover:text-[#e0f7fa]"}`}
              onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {activeMenu === "moji_timovi" && (
        <div className="mt-6">
          <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
          <div className="mt-4 bg-[#031716] rounded-xl p-4 border border-[#0c969c]/20 shadow">
            <UserTeams selectedSport={selectedSport} />
          </div>
        </div>
      )}

      {activeMenu === "moje_lige" && (
        <div className="mt-6">
          <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
          <div className="mt-4 bg-[#031716] rounded-xl p-4 border border-[#0c969c]/20 shadow">
            <UserLeagues selectedSport={selectedSport} />
          </div>
        </div>
      )}

      {activeMenu === "svi_mecevi" && (
        <div className="mt-6 bg-[#031716] rounded-xl p-4 border border-[#0c969c]/20 shadow">
          <FootballCalendar />
        </div>
      )}
    </div>
  );
}
