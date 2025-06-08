'use client';

import { useEffect, useState } from 'react';

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query);
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
     <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search teams..."
        className="pl-10 pr-4 py-2 w-full rounded-xl border bg-[#032f30] text-[#6ba3be] border-[#0a7075] focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6ba3be]">

      {/* SVG icona za serach */}
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
  />
</svg>      </div>
    </div>
  );
}
