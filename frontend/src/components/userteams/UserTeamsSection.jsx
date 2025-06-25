import { useState } from 'react';
import SportSelector from './SportSelector';
import UserTeams from './UserTeams';

export default function UserTeamsSection() {
  const [selectedSport, setSelectedSport] = useState('fudbal');

  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#031716' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0c969c' }}>
        My Teams
      </h2>
      
      <SportSelector 
        selectedSport={selectedSport}
        onSportSelect={setSelectedSport}
      />
      
      <UserTeams selectedSport={selectedSport} />
    </div>
  );
} 