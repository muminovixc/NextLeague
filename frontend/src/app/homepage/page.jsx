// src/app/homepage/page.jsx
"use client";
import Sidebar from '../../components/sidebar/sidebar';
import Footer from '../../components/footer/footer';
import Button from '../../components/button/button';
import { useEffect, useState } from 'react';
import CardsGrid from '../../components/homepage_card/homepage_card';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  fetch("http://localhost:8000/user-info", {
    method: "GET",
    credentials: "include", // ⚠️ bitno!
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Niste prijavljeni");
      }
      return res.json();
    })
    .then((data) => {
      console.log("User data:", data);
      setUser(data);  // Postavljamo podatke korisnika u stanje
    })
    .catch((err) => {
      console.error("Greška:", err);
    });
}, []);


  return (
  <div className="p-6 mt-6">
  <h1 className="text-3xl font-semibold text-white-900">Welcome, {user.name}</h1>
  <p className="text-white-500 mt-2">Overview of your league and team activities</p>
 <CardsGrid />
</div>
);
}