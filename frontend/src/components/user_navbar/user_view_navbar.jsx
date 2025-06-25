"use client";
import React, { useState } from "react";
import SportSelector from "../userteams/SportSelector";
import SpiderChart from "../user_charts/SpiderChart";
import UserTeamsView from "../userteams/UserTeamsView";
import UserLeaguesView from "../userleagues/UserLeaguesView";

const sportMap = {
  Football: 'fudbal',
  Basketball: 'kosarka',
  Volleyball: 'odbojka',
  Handball: 'rukomet',
};

export default function UserViewNavbar({ userId, userData }) {
  const [activeMenu, setActiveMenu] = useState("leagues");
  const [selectedSport, setSelectedSport] = useState("fudbal");

  const menuItems = [
    { id: "leagues", label: "Leagues" },
    { id: "teams", label: "Teams" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <div>
      <nav>
        <ul className="flex space-x-6 bg-[#032f30] text-white p-4 w-full rounded-xl">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeMenu === item.id 
                  ? "bg-[#0c969c] text-[#031716]" 
                  : "hover:bg-[#0a7075] hover:text-[#031716]"
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sport selector za sve opcije */}
      <div className="mt-4">
        <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
      </div>

      {/* Prikaz sadržaja na temelju aktivne opcije */}
      <div className="mt-6">
        {activeMenu === "leagues" && (
          <div className="bg-[#031716] rounded-lg border border-[#0c969c]/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Leagues</h3>
            <p className="text-[#6ba3be]">Leagues where this player participates in {selectedSport}</p>
            <UserLeaguesView userId={userId} selectedSport={selectedSport} />
          </div>
        )}

        {activeMenu === "teams" && (
          <div className="bg-[#031716] rounded-lg border border-[#0c969c]/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Teams</h3>
            <p className="text-[#6ba3be]">Teams where this player plays {selectedSport}</p>
            <UserTeamsView userId={userId} selectedSport={selectedSport} />
          </div>
        )}

        {activeMenu === "statistics" && (
          <div className="bg-[#031716] rounded-lg border border-[#0c969c]/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Statistics</h3>
            <div className="flex justify-center mb-6">
              {(() => {
                const mappedSport = Object.values(sportMap).includes(selectedSport)
                  ? selectedSport
                  : sportMap[selectedSport] || selectedSport;
                return (
                  <SpiderChart 
                    key={selectedSport}
                    chartData={userData?.charts?.find(chart => chart.sport.toLowerCase() === mappedSport.toLowerCase()) || {
                      napad: 16,
                      odbrana: 16,
                      brzina: 16,
                      snaga: 16,
                      izdrzljivost: 16,
                      dodavanja: 16
                    }} 
                  />
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 