'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Proveri da li je window objekat dostupan (to znači da je na klijentu)
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('user'));
    }
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-[#031716]">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-[#031716]">
        <nav className="relative flex items-center justify-between px-8 py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">NextLeague</Link>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#032f30] md:hidden p-4 space-y-4 z-50 border-t border-[#0c969c]">
              <div className="pt-4 border-t border-[#0c969c]">
                <button className="w-full text-white hover:text-[#6ba3be] py-2 px-4 text-left">Sign In</button>
                <button className="w-full bg-[#0c969c] text-white py-2 px-4 rounded-md hover:bg-[#0a7075] mt-2">
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-[#6ba3be]">Login</Link>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              Get Started
            </button>
          </div>
        </nav>  
      </div>
    </div>
  );
}
