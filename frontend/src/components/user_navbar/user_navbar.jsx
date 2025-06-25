"use client";
import React, { useState } from "react";
import SportSelector from "../userteams/SportSelector";
import UserTeams from "../userteams/UserTeams";
import UserLeagues from "../userleagues/UserLeagues";
import FootballCalendar from "../user_calendar/FootballCalendar";

export default function UserNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSport, setSelectedSport] = useState("Football");

  const topMenu = [
    { id: "moje_lige", label: "My leagues" },
    { id: "moji_timovi", label: "My teams" },
    { id: "svi_mecevi", label: "All matches" },
    { id: "obavijesti", label: "Notifications" },
  ];

  return (
    <div>
      <nav>
        <ul className="flex space-x-6 bg-[#032f30] text-white p-4 w-full rounded-xl">
          {topMenu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeMenu === item.id 
                  ? "bg-[#0c969c] text-[#031716]" 
                  : "hover:bg-[#0a7075] hover:text-[#031716]"
              }`}
              onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      {/* Prikaz sportova i timova kada je aktivan 'My teams' */}
      {activeMenu === "moji_timovi" && (
        <div className="mt-6">
          <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
          <UserTeams selectedSport={selectedSport} />
        </div>
      )}

      {activeMenu === "moje_lige" && (
        <div className="mt-6">
          <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
          <UserLeagues selectedSport={selectedSport} />
        </div>
      )}

      {activeMenu === "svi_mecevi" && (
        <div className="mt-6">
          <FootballCalendar />
        </div>
      )}
    </div>
  );
}



