'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

export default function ClientLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLandingpage, setIsLandingPage] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    if (typeof window !== 'undefined') {
      setIsLandingPage(window.location.pathname === '/');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isLandingpage && <Navbar />}
      <div className="flex flex-1">
      {!isLandingpage && <Sidebar />}
        <main className={`flex-grow bg-[#031716] ${!isLandingpage ? 'md:pl-64' : ''} `}>
          {children}
        </main>
      </div>

      
    </div>
  );
}
