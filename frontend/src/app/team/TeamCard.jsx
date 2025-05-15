'use client';

export default function TeamCard({ team, onDelete }) {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" style={{ backgroundColor: '#032f30', borderColor: '#0c969c', borderWidth: '1px' }}>
      {/* Team header with logo */}
      <div className="relative h-32" style={{ background: 'linear-gradient(to right, #0a7075, #274d60)' }}>
        {team.team_logo ? (
          <img 
            src={team.team_logo} 
            alt={`${team.team_identification || 'Team'} logo`}
            className="w-full h-full object-cover"
            onError={(e) => {
              if(!e.currentTarget.src.includes('placeholder-team-logo.png')) {
                e.currentTarget.src = "/placeholder-team-logo.png"; // Fallback image
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-4xl font-bold" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {team.team_identification ? team.team_identification.charAt(0).toUpperCase() : 'T'}
            </div>
          </div>
        )}
      </div>
      
      {/* Team content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#6ba3be' }}>
          {team.team_identification || `Team ${team.team_id}`}
        </h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#6ba3be">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span style={{ color: '#fff' }}>Sport: <span className="font-medium" style={{ color: '#0c969c' }}>{team.team_sport}</span></span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#6ba3be">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            <span style={{ color: '#fff' }}>Country: <span className="font-medium" style={{ color: '#0c969c' }}>{team.country}</span></span>
          </div>
          
          {team.moderator_user_id && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="#6ba3be">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span style={{ color: '#fff' }}>Moderator ID: <span className="font-medium" style={{ color: '#0c969c' }}>{team.moderator_user_id}</span></span>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between mt-5 pt-4" style={{ borderTopColor: '#0a7075', borderTopWidth: '1px' }}>
          <button 
            style={{ backgroundColor: '#0c969c', color: '#fff', borderRadius: '8px', padding: '8px 16px' }}
            className="hover:bg-opacity-80 text-sm font-medium transition-colors"
            onClick={() => alert(`View team details for ID: ${team.team_id}`)}
          >
            View Details
          </button>

          <button 
            style={{ backgroundColor: '#0c969c', color: '#fff', borderRadius: '8px', padding: '8px 16px' }}
            className="hover:bg-opacity-80 text-sm font-medium transition-colors"
            onClick={() => alert(`Send a request to join team ID: ${team.team_id}`)}
          >
            Send a request to join
          </button>
        </div>
      </div>
    </div>
  );
}