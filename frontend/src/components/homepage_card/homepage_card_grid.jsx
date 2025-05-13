import React, { useEffect, useState } from 'react';
import Card from './homepage_card';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';

const CardsGrid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8000/user-counts", {
  method: "GET",
  credentials: "include",
})
  .then((res) => {
    console.log('Status:', res.status);  // Provjeri status kod odgovora
    if (!res.ok) {
      throw new Error("Niste prijavljeni");
    }
    return res.json();
  })
  .then((data) => {
    console.log("Broj liga i timova:", data);
    setCards(data);
  })
  .catch((err) => {
    console.error("Greška u fetchu:", err);
  });

}, []);

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <Card
      icon={TrophyIcon}
      title="Number of leagues"
      number={cards.leagues || "loading..."} 
    />
    <Card
      icon={UsersIcon}
      title="Number of teams"
      number={cards.teams || "loading..."} 
    />
  </div>
);
};

export default CardsGrid;
