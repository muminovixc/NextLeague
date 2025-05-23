'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getTeamById } from '../../../../lib/team';

export default function TeamView() {
    const router = useRouter();
    const params = useParams();
    const teamId = params.id;
    
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeam() {
            if (!teamId) return;
            
            try {
                setLoading(true);
                const teamData = await getTeamById(teamId);
                setTeam(teamData);
                setError(null);
            } catch (error) {
                console.error('Error fetching team:', error);
                setError('Failed to load team information. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchTeam();
    }, [teamId]);

    const handleGoBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#031716' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6" 
                         style={{ borderColor: '#0c969c' }}></div>
                    <p className="text-xl font-medium" style={{ color: '#6ba3be' }}>Loading team information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#031716' }}>
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: '#032f30' }}>
                        <span className="text-2xl" style={{ color: '#6ba3be' }}>⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#0c969c' }}>Error</h2>
                    <p className="mb-6" style={{ color: '#6ba3be' }}>{error}</p>
                    <button
                        onClick={handleGoBack}
                        className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
                        style={{ backgroundColor: '#0c969c', color: '#031716' }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!team) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#031716' }}>
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: '#032f30' }}>
                        <span className="text-2xl" style={{ color: '#6ba3be' }}>❌</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#0c969c' }}>Team Not Found</h2>
                    <p className="mb-6" style={{ color: '#6ba3be' }}>The requested team could not be found.</p>
                    <button
                        onClick={handleGoBack}
                        className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
                        style={{ backgroundColor: '#0c969c', color: '#031716' }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8" style={{ backgroundColor: '#031716' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={handleGoBack}
                        className="mb-6 flex items-center px-4 py-2 rounded-xl transition-all hover:transform hover:scale-105"
                        style={{ backgroundColor: '#032f30', color: '#6ba3be' }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Team Information Card */}
                <div className="rounded-2xl border-2 overflow-hidden shadow-2xl"
                     style={{ backgroundColor: '#032f30', borderColor: '#0a7075' }}>
                    
                    {/* Team Header */}
                    <div className="p-8 text-center">
                        <div className="flex flex-col items-center gap-8">
                            
                            {/* Team Logo */}
                            {team.team_logo ? (
                                <div className="w-32 h-32 rounded-2xl flex items-center justify-center"
                                     style={{ backgroundColor: '#0a7075' }}>
                                    <img 
                                        src={team.team_logo} 
                                        alt={`${team.name} logo`} 
                                        className="w-24 h-24 object-contain rounded-xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-2xl flex items-center justify-center"
                                     style={{ backgroundColor: '#0a7075' }}>
                                    <span className="text-4xl" style={{ color: '#6ba3be' }}>⚽</span>
                                </div>
                            )}
                            
                            {/* Team Name */}
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#0c969c' }}>
                                    {team.name}
                                </h1>
                                <div className="inline-block px-6 py-2 rounded-full text-xl font-medium"
                                     style={{ backgroundColor: '#0a7075', color: '#6ba3be' }}>
                                    {team.team_sport}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Details */}
                    <div className="p-8 border-t" style={{ borderColor: '#0a7075' }}>
                        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#0c969c' }}>
                            Team Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Team ID */}
                            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#031716', borderColor: '#0a7075' }}>
                                <div className="flex items-center mb-3">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                         style={{ backgroundColor: '#0a7075' }}>
                                        <span className="text-xl" style={{ color: '#6ba3be' }}>🆔</span>
                                    </div>
                                    <h3 className="text-lg font-semibold" style={{ color: '#0c969c' }}>Team ID</h3>
                                </div>
                                <p className="font-mono text-xl ml-16" style={{ color: '#6ba3be' }}>
                                    {team.team_id}
                                </p>
                            </div>

                            {/* Sport */}
                            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#031716', borderColor: '#0a7075' }}>
                                <div className="flex items-center mb-3">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                         style={{ backgroundColor: '#0a7075' }}>
                                        <span className="text-xl" style={{ color: '#6ba3be' }}>🏆</span>
                                    </div>
                                    <h3 className="text-lg font-semibold" style={{ color: '#0c969c' }}>Sport</h3>
                                </div>
                                <p className="text-xl ml-16" style={{ color: '#6ba3be' }}>
                                    {team.team_sport}
                                </p>
                            </div>

                            {/* Country */}
                            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#031716', borderColor: '#0a7075' }}>
                                <div className="flex items-center mb-3">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                         style={{ backgroundColor: '#0a7075' }}>
                                        <span className="text-xl" style={{ color: '#6ba3be' }}>🌍</span>
                                    </div>
                                    <h3 className="text-lg font-semibold" style={{ color: '#0c969c' }}>Country</h3>
                                </div>
                                <p className="text-xl ml-16" style={{ color: '#6ba3be' }}>
                                    {team.country}
                                </p>
                            </div>

                            {/* Team Identification */}
                            {team.team_identification && (
                                <div className="p-6 rounded-xl border" style={{ backgroundColor: '#031716', borderColor: '#0a7075' }}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                             style={{ backgroundColor: '#0a7075' }}>
                                            <span className="text-xl" style={{ color: '#6ba3be' }}>🏷️</span>
                                        </div>
                                        <h3 className="text-lg font-semibold" style={{ color: '#0c969c' }}>Identification</h3>
                                    </div>
                                    <p className="font-mono text-xl ml-16" style={{ color: '#6ba3be' }}>
                                        {team.team_identification}
                                    </p>
                                </div>
                            )}

                            {/* Moderator ID */}
                            {team.moderator_user_id && (
                                <div className="p-6 rounded-xl border" style={{ backgroundColor: '#031716', borderColor: '#0a7075' }}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                             style={{ backgroundColor: '#0a7075' }}>
                                            <span className="text-xl" style={{ color: '#6ba3be' }}>👨‍💼</span>
                                        </div>
                                        <h3 className="text-lg font-semibold" style={{ color: '#0c969c' }}>Moderator ID</h3>
                                    </div>
                                    <p className="font-mono text-xl ml-16" style={{ color: '#6ba3be' }}>
                                        {team.moderator_user_id}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}