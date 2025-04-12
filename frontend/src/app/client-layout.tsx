'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
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
              <Link href="/league" className="block text-white hover:text-[#6ba3be] py-2 px-4">League</Link>
              <Link href="/club" className="block text-white hover:text-[#6ba3be] py-2 px-4">Club</Link>
              <Link href="/vip" className="block text-white hover:text-[#6ba3be] py-2 px-4">VIP</Link>
              <Link href="/profile" className="block text-white hover:text-[#6ba3be] py-2 px-4">My Profile</Link>
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
            <Link href="/league" className="text-white hover:text-[#6ba3be]">League</Link>
            <Link href="/club" className="text-white hover:text-[#6ba3be]">Club</Link>
            <Link href="/vip" className="text-white hover:text-[#6ba3be]">VIP</Link>
            <Link href="/profile" className="text-white hover:text-[#6ba3be]">My Profile</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-[#6ba3be]">Sign In</button>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              Get Started
            </button>
          </div>
        </nav>
        {/* Divider Line */}
        <div className="h-[1px] w-full bg-[#0c969c]"></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#031716] py-16 border-t border-[#0c969c]/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">NextLeague</h3>
              <p className="text-[#6ba3be]">Building better sports communities through technology.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Guides</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">About</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-[#6ba3be] hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#0c969c]/20 mt-12 pt-8 text-center">
            <p className="text-[#6ba3be]">© 2025 NextLeague. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 