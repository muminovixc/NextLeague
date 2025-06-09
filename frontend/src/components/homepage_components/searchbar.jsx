import React, { useState, useEffect } from "react";
import { Search, User, Users, Trophy } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const combined = [
          ...data.players.map((p) => ({ ...p, type: "player" })),
          ...data.teams.map((t) => ({ ...t, type: "team" })),
          ...data.leagues.map((l) => ({ ...l, type: "league" })),
        ];

        setFiltered(combined);
      } catch (error) {
        console.error("Search error:", error);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const getIcon = (type) => {
    switch (type) {
      case "player":
        return <User className="text-cyan-400 w-5 h-5" />;
      case "team":
        return <Users className="text-green-400 w-5 h-5" />;
      case "league":
        return <Trophy className="text-yellow-400 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#011414] z-40 py-5 px-4 shadow-md border-b border-[#022626]">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for players, teams, or leagues..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#134444] bg-[#022626] text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400 transition"
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>

        {loading && <div className="text-white mt-2 text-sm">Searching...</div>}

        {filtered.length > 0 && (
          <ul className="absolute w-full mt-3 rounded-xl border border-[#123333] bg-[#032222] shadow-xl max-h-64 overflow-y-auto z-50">
            {filtered.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#0f2f2f] text-white transition-colors duration-150 cursor-pointer"
              >
                {getIcon(item.type)}
                <div className="flex flex-col">
                  <span className="font-medium text-base">{item.name}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{item.type}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
