'use client';
import { useState } from 'react';

export default function TeamCreateForm({ onTeamCreated, onCancel }) {
  const [formData, setFormData] = useState({
    team_sport: '',
    country: '',
    team_identification: '',
    team_logo: '',
    moderator_user_id: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        // Convert moderator_user_id to number if provided
        moderator_user_id: formData.moderator_user_id ? parseInt(formData.moderator_user_id, 10) : null
      };
      
      // Filter out empty values
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '') {
          delete submitData[key];
        }
      });
      
      // Make API call
      const response = await fetch('http://localhost:8000/team/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Error: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Team created:', result);
      
      // Reset form and notify parent
      setFormData({
        team_sport: '',
        country: '',
        team_identification: '',
        team_logo: '',
        moderator_user_id: ''
      });
      
      onTeamCreated();
    } catch (err) {
      console.error('Error creating team:', err);
      setError(err.message || 'Failed to create team. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-md text-sm" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#ff6b6b', border: '1px solid #ff6b6b' }}>
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="team_sport" className="block text-sm font-medium" style={{ color: '#6ba3be' }}>
            Sport <span style={{ color: '#ff6b6b' }}>*</span>
          </label>
          <input
            type="text"
            id="team_sport"
            name="team_sport"
            value={formData.team_sport}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            style={{ backgroundColor: '#031716', color: '#fff', borderColor: '#0c969c', borderWidth: '1px' }}
            placeholder="e.g. Basketball, Football, etc."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium" style={{ color: '#6ba3be' }}>
            Country <span style={{ color: '#ff6b6b' }}>*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            style={{ backgroundColor: '#031716', color: '#fff', borderColor: '#0c969c', borderWidth: '1px' }}
            placeholder="e.g. USA, Spain, etc."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="team_identification" className="block text-sm font-medium" style={{ color: '#6ba3be' }}>
            Team Name
          </label>
          <input
            type="text"
            id="team_identification"
            name="team_identification"
            value={formData.team_identification}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            style={{ backgroundColor: '#031716', color: '#fff', borderColor: '#0c969c', borderWidth: '1px' }}
            placeholder="e.g. Miami Heat, FC Barcelona, etc."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="moderator_user_id" className="block text-sm font-medium" style={{ color: '#6ba3be' }}>
            Moderator ID
          </label>
          <input
            type="number"
            id="moderator_user_id"
            name="moderator_user_id"
            value={formData.moderator_user_id}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none"
            style={{ backgroundColor: '#031716', color: '#fff', borderColor: '#0c969c', borderWidth: '1px' }}
            placeholder="User ID of the moderator"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="team_logo" className="block text-sm font-medium" style={{ color: '#6ba3be' }}>
          Team Logo URL
        </label>
        <input
          type="text"
          id="team_logo"
          name="team_logo"
          value={formData.team_logo}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md focus:outline-none"
          style={{ backgroundColor: '#031716', color: '#fff', borderColor: '#0c969c', borderWidth: '1px' }}
          placeholder="https://example.com/logo.png"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors"
          style={{ backgroundColor: '#031716', color: '#6ba3be', borderColor: '#0c969c', borderWidth: '1px' }}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md hover:bg-opacity-90 focus:outline-none transition-colors"
          style={{ backgroundColor: '#0a7075', color: '#fff' }}
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Team'}
        </button>
      </div>
    </form>
  );
}