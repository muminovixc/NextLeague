import { useState, useEffect } from 'react';

export default function FootballFieldVisualization({ members = [] }) {
  // Positions on the field
  const positions = {
    goalkeeper: { name: 'Goalkeeper', abbreviation: 'GK', defaultCount: 1 },
    defender: { name: 'Defender', abbreviation: 'DEF', defaultCount: 4 },
    midfielder: { name: 'Midfielder', abbreviation: 'MID', defaultCount: 4 },
    forward: { name: 'Forward', abbreviation: 'FWD', defaultCount: 2 },
  };

  // State to track assigned positions
  const [assignedPlayers, setAssignedPlayers] = useState({
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: [],
    unassigned: []
  });

  // Assign players to positions based on data or randomly
  useEffect(() => {
    if (!members || members.length === 0) return;

    const newAssignedPlayers = {
      goalkeeper: [],
      defender: [],
      midfielder: [],
      forward: [],
      unassigned: []
    };

    // First, use any existing position data
    const assignedMemberIds = new Set();
    members.forEach(member => {
      const position = member.position?.toLowerCase();
      if (position && positions[position]) {
        newAssignedPlayers[position].push(member);
        assignedMemberIds.add(member.id);
      }
    });

    // Then randomly assign remaining members
    const unassignedMembers = members.filter(member => !assignedMemberIds.has(member.id));
    
    // Assign goalkeeper first (only one)
    if (newAssignedPlayers.goalkeeper.length === 0 && unassignedMembers.length > 0) {
      newAssignedPlayers.goalkeeper.push(unassignedMembers.shift());
    }
    
    // Distribute remaining players to positions
    const remainingPositions = ['defender', 'midfielder', 'forward'];
    
    unassignedMembers.forEach(member => {
      // Find position with fewest players relative to default count
      const targetPosition = remainingPositions.reduce((bestPos, pos) => {
        const currentRatio = newAssignedPlayers[pos].length / positions[pos].defaultCount;
        const bestRatio = newAssignedPlayers[bestPos].length / positions[bestPos].defaultCount;
        return currentRatio < bestRatio ? pos : bestPos;
      }, remainingPositions[0]);
      
      newAssignedPlayers[targetPosition].push(member);
    });
    
    setAssignedPlayers(newAssignedPlayers);
  }, [members]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="relative w-full rounded-lg overflow-hidden aspect-[1.5/1]"
        style={{ 
          backgroundColor: '#256e33', 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '25px 25px'
        }}
      >
        {/* Field markings */}
        <div className="absolute inset-0 border-2 border-white border-opacity-30 m-4 rounded-lg"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white bg-opacity-30"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white bg-opacity-30"></div>
        <div className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full border-2 border-white border-opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Penalty areas */}
        <div className="absolute left-0 top-1/2 w-1/5 h-2/5 border-r-2 border-t-2 border-b-2 border-white border-opacity-30 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-1/5 h-2/5 border-l-2 border-t-2 border-b-2 border-white border-opacity-30 transform -translate-y-1/2"></div>
        
        {/* Goal areas */}
        <div className="absolute left-0 top-1/2 w-1/12 h-1/4 border-r-2 border-t-2 border-b-2 border-white border-opacity-30 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-1/12 h-1/4 border-r-0 border-l-2 border-t-2 border-b-2 border-white border-opacity-30 transform -translate-y-1/2"></div>
        
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full border-2 border-white border-opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Players section */}
        {/* Goalkeeper */}
        <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          {assignedPlayers.goalkeeper.slice(0, 1).map((player, index) => (
            <div key={player.id} className="my-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {player.name?.charAt(0) || '?'}
              </div>
              <div className="mt-1 text-xs font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full whitespace-nowrap">
                {player.name?.split(' ')[0] || 'GK'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Defenders */}
        <div className="absolute left-[25%] top-0 bottom-0 w-[10%] flex flex-col justify-evenly items-center">
          {assignedPlayers.defender.slice(0, 4).map((player, index) => (
            <div key={player.id} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {player.name?.charAt(0) || '?'}
              </div>
              <div className="mt-1 text-xs font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full whitespace-nowrap">
                {player.name?.split(' ')[0] || 'DEF'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Midfielders */}
        <div className="absolute left-[50%] top-0 bottom-0 w-[10%] flex flex-col justify-evenly items-center transform -translate-x-1/2">
          {assignedPlayers.midfielder.slice(0, 4).map((player, index) => (
            <div key={player.id} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {player.name?.charAt(0) || '?'}
              </div>
              <div className="mt-1 text-xs font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full whitespace-nowrap">
                {player.name?.split(' ')[0] || 'MID'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Forwards */}
        <div className="absolute left-[75%] top-0 bottom-0 w-[10%] flex flex-col justify-evenly items-center">
          {assignedPlayers.forward.slice(0, 2).map((player, index) => (
            <div key={player.id} className="flex flex-col items-center" style={{ marginTop: index === 0 ? '20%' : '60%' }}>
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {player.name?.charAt(0) || '?'}
              </div>
              <div className="mt-1 text-xs font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full whitespace-nowrap">
                {player.name?.split(' ')[0] || 'FWD'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-400 mr-1"></div>
          <span className="text-xs" style={{ color: '#6ba3be' }}>GK</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-xs" style={{ color: '#6ba3be' }}>DEF</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs" style={{ color: '#6ba3be' }}>MID</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-1"></div>
          <span className="text-xs" style={{ color: '#6ba3be' }}>FWD</span>
        </div>
      </div>
    </div>
  );
}