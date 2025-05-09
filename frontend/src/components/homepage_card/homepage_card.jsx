import React from 'react';

const Card = ({ number, title, description }) => {
  return (
    <div className="bg-[#032f30] text-white rounded-xl shadow-md p-6 border-l-4 border-[#0a7075] hover:shadow-lg transition-shadow hover:border-[#0c969c]">
      <span className="text-3xl font-bold text-[#6ba3be] mb-2 block">{number}</span>
      <h3 className="text-xl font-semibold text-[#0c969c] mb-1">{title}</h3>
      <p className="text-[#d0e4ea]">{description}</p>
    </div>
  );
};

const CardsGrid = () => {
  const cards = [
    { number: '#3', title: 'Alcivine lige', description: 'Lorem ipsum dolor sit amet' },
    { number: '#2', title: 'Timoni', description: 'Consectetur adipiscing elit' },
    { number: '#5', title: 'Preestigidia utalimica', description: 'Sed do eiusmod tempor' },
    { number: '#12', title: 'Diligente utalimica', description: 'Incididunt ut labore et dolore' },
  ];

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
  {cards.map((card, index) => (
    <div key={index}>
      <Card number={card.number} title={card.title} description={card.description} />
    </div>
  ))}
</div>

  );
};

export default CardsGrid;
