import React from 'react';


const Card = ({ icon: Icon, title, number }) => {
  return (
    <div className="bg-[#032f30] text-white rounded-2xl shadow-md p-5 w-full hover:shadow-xl border border-[#0a7075] hover:border-[#0c969c] transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#0a7075] p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[#6ba3be]">{title}</h3>
      </div>
      <div className="text-3xl font-bold text-[#d0e4ea]">{number}</div>
    </div>
  );
};

export default Card;
