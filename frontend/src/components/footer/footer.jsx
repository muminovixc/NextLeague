'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#031716] py-12 border-t border-[#0c969c]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">NextLeague</h2>
        <p className="text-[#6ba3be] max-w-xl text-sm md:text-base">
          Building better sports communities through modern technology. Empowering teams, leagues, and players.
        </p>
        <div className="w-full h-px bg-[#0c969c]/20 my-4" />
        <p className="text-[#6ba3be] text-sm tracking-wide">
          © {new Date().getFullYear()} NextLeague. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
