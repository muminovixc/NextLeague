import React, { useState } from "react";
import { Search } from "lucide-react"; // Ako ne koristiš ovo, vidi dole

const mockData = [
  "Barcelona", "Bayern Munich", "Borussia Dortmund",
  "Real Madrid", "Roma", "Rijeka", "Rosenborg",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === "") {
      setFiltered([]);
    } else {
      const results = mockData.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      );
      setFiltered(results);
    }
  };

  return (
    <div className="w-full bg-[#001818] z-40 py-4 px-4">
      <div className="max-w-4xl mx-auto relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for teams, leagues, or players"
            className="w-full pl-10 pr-4 py-2 border border-[#123333] bg-[#032222] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        {filtered.length > 0 && (
          <ul className="absolute w-full bg-[#032222] border border-[#123333] mt-2 rounded-xl shadow-md max-h-60 overflow-y-auto z-50">
            {filtered.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-[#0e2d2d] cursor-pointer text-white transition-colors duration-150"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
