export default function SportSelector({ selectedSport, onSportSelect }) {
  const sports = [
    { id: 'fudbal', name: 'fudbal', displayName: 'Fudbal', icon: '⚽' },
    { id: 'kosarka', name: 'kosarka', displayName: 'Košarka', icon: '🏀' },
    { id: 'odbojka', name: 'odbojka', displayName: 'Odbojka', icon: '🏐' },
    { id: 'rukomet', name: 'rukomet', displayName: 'Rukomet', icon: '🤾' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sports.map((sport) => (
        <button
          key={sport.id}
          onClick={() => onSportSelect(sport.name)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 text-sm font-medium ${
            selectedSport === sport.name 
              ? 'scale-105 shadow-lg' 
              : 'hover:scale-105 hover:shadow-md'
          }`}
          style={{ 
            backgroundColor: selectedSport === sport.name ? '#0c969c' : '#032f30',
            color: selectedSport === sport.name ? '#031716' : '#6ba3be',
            border: '1px solid',
            borderColor: '#0a7075',
            minWidth: '80px',
            minHeight: '32px',
            padding: '2px 8px',
            lineHeight: 1.1
          }}
        >
          <span className="text-base">{sport.icon}</span>
          <span>{sport.displayName}</span>
        </button>
      ))}
    </div>
  );
}
