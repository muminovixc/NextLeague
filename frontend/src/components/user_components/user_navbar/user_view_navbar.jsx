"use client";
import React, { useState } from "react";
import SportSelector from "../userteams/SportSelector";
import SpiderChart from "../user_charts/SpiderChart";
import UserTeamsView from "../userteams/UserTeamsView";
import UserLeaguesView from "../userleagues/UserLeaguesView";

const sportMap = {
  Football: 'football',
  Basketball: 'basketball',
  Volleyball: 'volleyball',
  Handball: 'handball',
};

export default function UserViewNavbar({ userId, userData }) {
  const [activeMenu, setActiveMenu] = useState("leagues");
  const [selectedSport, setSelectedSport] = useState("football");

  const menuItems = [
    { id: "leagues", label: "Leagues" },
    { id: "teams", label: "Teams" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <div className="w-full">
      <nav className="bg-[#031716] rounded-xl border border-[#0c969c]/20 p-4">
        <ul className="flex justify-center gap-4 flex-wrap">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
                activeMenu === item.id
                  ? "bg-[#0c969c] text-[#031716]"
                  : "bg-[#032f30] text-white hover:bg-[#0a7075] hover:text-white"
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4">
        <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
      </div>

      <div className="mt-6">
        {activeMenu === "leagues" && (
          <div className="bg-[#031716] rounded-xl border border-[#0c969c]/20 p-6 max-h-[400px] overflow-y-auto shadow">
            <h3 className="text-xl font-bold text-[#0c969c] mb-3">Leagues</h3>
            <p className="text-sm text-[#6ba3be] mb-4">
              Leagues where this player participates in <strong>{selectedSport}</strong>
            </p>
            <UserLeaguesView userId={userId} selectedSport={selectedSport} />
          </div>
        )}

        {activeMenu === "teams" && (
          <div className="bg-[#031716] rounded-xl border border-[#0c969c]/20 p-6 max-h-[400px] overflow-y-auto shadow">
            <h3 className="text-xl font-bold text-[#0c969c] mb-3">Teams</h3>
            <p className="text-sm text-[#6ba3be] mb-4">
              Teams where this player plays <strong>{selectedSport}</strong>
            </p>
            <UserTeamsView userId={userId} selectedSport={selectedSport} />
          </div>
        )}

        {activeMenu === "statistics" && (
          <div className="bg-[#031716] rounded-xl border border-[#0c969c]/20 p-6">
            <h3 className="text-xl font-bold text-[#0c969c] mb-6 text-center">Player Statistics</h3>
            <div className="flex justify-center">
              <SpiderChart
                key={selectedSport}
                chartData={
                  userData?.charts?.find(
                    (chart) =>
                      chart.sport.toLowerCase() ===
                      (sportMap[selectedSport] || selectedSport).toLowerCase()
                  ) || {
                    napad: 16,
                    odbrana: 16,
                    brzina: 16,
                    snaga: 16,
                    izdrzljivost: 16,
                    dodavanja: 16,
                  }
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
