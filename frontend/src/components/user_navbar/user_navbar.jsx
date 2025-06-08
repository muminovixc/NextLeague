"use client";
import React, { useState } from "react";

export default function UserNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const topMenu = [
    { id: "moje_lige", label: "My leagues" },
    { id: "moji_timovi", label: "My teams" },
    { id: "svi_mecevi", label: "All matches" },
    { id: "obavijesti", label: "Notifications" },
  ];

  const sportsSubMenu = [
    { id: "fudbal", label: "Fudbal" },
    { id: "kosarka", label: "Košarka" },
    { id: "rukomet", label: "Rukomet" },
    { id: "odbojka", label: "Odbojka" },
    { id: "gaming", label: "Gaming" },
  ];

  // Koje opcije treba da prikažu sekundarni navbar
  const showSportsSubMenuFor = ["svi_mecevi", "statistika", "moje_lige", "moji_timovi"];

  return (
    <nav>
  <ul className="flex space-x-6 bg-gray-800 text-white p-4 w-full">
    {topMenu.map((item) => (
      <li
        key={item.id}
        className={`cursor-pointer px-3 py-2 rounded whitespace-nowrap ${
          activeMenu === item.id ? "bg-gray-700" : "hover:bg-gray-600"
        }`}
        onClick={() =>
          setActiveMenu(activeMenu === item.id ? null : item.id)
        }
      >
        {item.label}
      </li>
    ))}
  </ul>

  {/* Sekundarni navbar */}
  {activeMenu && showSportsSubMenuFor.includes(activeMenu) && (
    <ul className="flex space-x-4 bg-gray-700 text-white p-3">
      {sportsSubMenu.map((sport) => (
        <li
          key={sport.id}
          className="cursor-pointer px-2 py-1 rounded whitespace-nowrap hover:bg-gray-600"
        >
          {sport.label}
        </li>
      ))}
    </ul>
  )}
</nav>

  );
}



