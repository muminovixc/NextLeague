import { useState } from 'react';
import SportSelector from './SportSelector';
import UserLeagues from './UserLeagues';

export default function UserLeaguesSection() {
  const [selectedSport, setSelectedSport] = useState('fudbal');

  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#031716' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0c969c' }}>
        My Leagues
      </h2>

      <SportSelector 
        selectedSport={selectedSport}
        onSportSelect={setSelectedSport}
      />

      <UserLeagues selectedSport={selectedSport} />
    </div>
  );
}
