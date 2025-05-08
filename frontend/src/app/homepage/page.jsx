// src/app/homepage/page.jsx
"use client";
import Sidebar from '../../components/sidebar/sidebar';
import Footer from '../../components/footer/footer';

export default function HomePage() {
  return (
    <div className="homepage min-h-screen flex flex-col">
      <Sidebar/>
      <main className={`flex-grow bg-[#031716] 'md:pl-64'`}>
          <h1>homepage</h1>

          
        </main>
        <Footer/>
    </div>
  );
}