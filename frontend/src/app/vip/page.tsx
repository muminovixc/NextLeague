'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#031716]">
      {/* Navigation */}
       <nav className="relative flex items-center justify-between px-8 py-4 border-b border-[#0c969c]">
        <div className="flex items-center">
          <img src="/pictures/logo.jpg" alt="Logo" className="h-8 mr-2" />
          <h1 className="text-2xl font-bold text-white">NextLeague</h1>
        </div>
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
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#032f30] md:hidden p-4 space-y-4 z-50">
            <a href="#league" className="block text-white hover:text-[#6ba3be] py-2 px-4">League</a>
            <a href="#club" className="block text-white hover:text-[#6ba3be] py-2 px-4">Club</a>
            <a href="#vip" className="block text-white hover:text-[#6ba3be] py-2 px-4">VIP</a>
            <a href="#profile" className="block text-white hover:text-[#6ba3be] py-2 px-4">My Profile</a>
            <div className="pt-4 border-t border-[#0c969c]">
              <button className="w-full text-white hover:text-[#6ba3be] py-2 px-4 text-left">Sign In</button>
              <button className="w-full bg-[#0c969c] text-white py-2 px-4 rounded-md hover:bg-[#0a7075] mt-2">Get Started</button>
            </div>
          </div>
        )}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#league" className="text-white hover:text-[#6ba3be]">League</a>
          <a href="#club" className="text-white hover:text-[#6ba3be]">Club</a>
          <a href="#vip" className="text-white hover:text-[#6ba3be]">VIP</a>
          <a href="#profile" className="text-white hover:text-[#6ba3be]">My Profile</a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white hover:text-[#6ba3be]">Sign In</button>
          <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">Get Started</button>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-[#6ba3be] text-lg">Pick the perfect package for your league or club.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Basic', price: 'Free', features: ['Create 1 league', 'Up to 2 teams', 'Basic support','League and group chat'], bg: 'bg-[#032f30]' },
            { title: 'Premium', price: '$5/mo', features: ['Create up to 5 leagues', 'Up to 5 teams', 'Priority support', 'League and group chat'], bg: 'bg-[#0a7075]' },
            { title: 'Premium Plus', price: '$10/mo', features: ['Create up to 10 leagues','Up to 10 teams','All Premium features', 'VIP badge','Chat with everyone'], bg: 'bg-[#0c969c]' }
          ].map((plan, index) => (
            <div key={index} className={`rounded-xl p-8 text-white ${plan.bg} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <p className="text-3xl font-semibold mb-6">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#6ba3be]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-[#031716] font-medium py-2 px-4 rounded-md hover:bg-gray-200">
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#021110] text-white text-center py-6 mt-20">
        <p>&copy; {new Date().getFullYear()} NextLeague. All rights reserved.</p>
      </footer>
    </div>
  );
}
