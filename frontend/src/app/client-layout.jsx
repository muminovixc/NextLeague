'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';
import Footer from '../components/footer/footer';

export default function ClientLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));

    // Proveri da li je trenutna stranica homepage (rutu '/')
    if (typeof window !== 'undefined') {
      setIsHomePage(window.location.pathname === '/');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isHomePage && <Navbar />}
      <div className="flex flex-1">
      {!isHomePage && <Sidebar />}
        <main className={`flex-grow bg-[#031716] ${!isHomePage ? 'md:pl-64' : ''} `}>
          {children}
        </main>
      </div>

      
    </div>
  );
}
