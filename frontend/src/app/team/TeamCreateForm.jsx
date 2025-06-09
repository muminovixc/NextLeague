import { useState } from 'react';
import { createTeam } from '../../lib/team';

export default function TeamCreateForm({ onClose, onTeamCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    team_sport: '',
    country: '',
    team_logo: '',
    team_identification: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Popular sports options
  const sportsOptions = [
    'Football', 'Basketball', 'Volleyball', 'Tennis', 'Handball',
    'Swimming', 'Athletics', 'Cycling', 'Boxing', 'Wrestling'
  ];

  // Popular countries
  const countryOptions = [
    'Bosnia and Herzegovina', 'Croatia', 'Serbia', 'Montenegro',
    'Slovenia', 'Germany', 'France', 'Italy', 'Spain', 'England',
    'Netherlands', 'Belgium', 'Portugal', 'Brazil', 'Argentina'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Team name is required');
      return;
    }
    
    if (!formData.team_sport.trim()) {
      setError('Team sport is required');
      return;
    }
    
    if (!formData.country.trim()) {
      setError('Country is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const teamData = {
        name: formData.name.trim(),
        team_sport: formData.team_sport.trim(),
        country: formData.country.trim(),
        team_logo: formData.team_logo.trim() || null,
        team_identification: formData.team_identification.trim() || null
      };

      const newTeam = await createTeam(teamData);
      setSuccess(true);
      
      // Call parent callback to refresh teams list
      if (onTeamCreated) {
        onTeamCreated(newTeam);
      }
      
      // Close form after success
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error('Error creating team:', err);
      setError(err.message || 'Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
        <div 
          className="rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 p-8 text-center"
          style={{ backgroundColor: '#031716', borderColor: '#0c969c' }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
               style={{ backgroundColor: '#0c969c' }}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#0c969c' }}>
            Team Created Successfully!
          </h3>
          <p className="text-lg" style={{ color: '#6ba3be' }}>
            Your team has been created and added to your teams list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
      <div 
        className="rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2"
        style={{ backgroundColor: '#031716', borderColor: '#0c969c' }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#0c969c' }}>
                Create New Team
              </h2>
              <p className="text-lg" style={{ color: '#6ba3be' }}>
                Fill in the details below to create your team
              </p>
            </div>
            <button 
              onClick={handleCancel}
              className="text-2xl font-bold p-2 rounded-xl w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: '#032f30', color: '#6ba3be' }}
            >
              ×
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 rounded-xl border-l-4" 
                 style={{ 
                   backgroundColor: '#4a1a1a', 
                   color: '#ff6b6b',
                   borderLeftColor: '#ff4757'
                 }}>
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0c969c' }}>
                Team Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter team name"
                className="w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#032f30', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
                required
              />
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0c969c' }}>
                Sport *
              </label>
              <select
                name="team_sport"
                value={formData.team_sport}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#032f30', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
                required
              >
                <option value="">Select a sport</option>
                {sportsOptions.map((sport) => (
                  <option key={sport} value={sport} style={{ backgroundColor: '#032f30' }}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0c969c' }}>
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#032f30', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
                required
              >
                <option value="">Select a country</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country} style={{ backgroundColor: '#032f30' }}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Logo URL */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0c969c' }}>
                Team Logo URL
                <span className="text-sm font-normal ml-2" style={{ color: '#6ba3be' }}>
                  (optional)
                </span>
              </label>
              <input
                type="url"
                name="team_logo"
                value={formData.team_logo}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
                className="w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#032f30', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
              />
            </div>

            {/* Team Identification */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0c969c' }}>
                Team Identification Code
                <span className="text-sm font-normal ml-2" style={{ color: '#6ba3be' }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                name="team_identification"
                value={formData.team_identification}
                onChange={handleInputChange}
                placeholder="e.g., FCB, MUN, etc."
                className="w-full p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ 
                  backgroundColor: '#032f30', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-4 rounded-xl font-semibold transition-all duration-200 hover:transform hover:scale-105 border-2"
                style={{ 
                  backgroundColor: 'transparent', 
                  borderColor: '#0a7075',
                  color: '#6ba3be'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-4 rounded-xl font-semibold transition-all duration-200 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#0c969c', 
                  color: '#031716'
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent mr-2" 
                         style={{ borderColor: '#031716' }}></div>
                    Creating...
                  </div>
                ) : (
                  'Create Team'
                )}
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 rounded-xl border" 
               style={{ backgroundColor: '#032f30', borderColor: '#0a7075' }}>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5"
                   style={{ backgroundColor: '#0c969c' }}>
                <span className="text-xs font-bold text-white">i</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: '#0c969c' }}>
                  Team Creation Guidelines
                </p>
                <div className="text-sm space-y-1" style={{ color: '#6ba3be' }}>
                  <div>• Team name should be unique and descriptive</div>
                  <div>• You will be set as the team moderator</div>
                  <div>• You can add members after creating the team</div>
                  <div>• Logo URL should be a direct link to an image</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}