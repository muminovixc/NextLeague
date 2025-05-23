'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyLeagues, getAllLeagues } from '../../lib/team';

const TeamDashboard = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await getMyTeamInfo();
        setTeamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">No team data available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Team Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          {teamData.team_info.team_logo && (
            <img
              src={teamData.team_info.team_logo}
              alt="Team Logo"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{teamData.team_info.name}</h1>
            <p className="text-gray-600">
              {teamData.team_info.team_sport} • {teamData.team_info.country}
            </p>
            <p className="text-sm text-gray-500">
              Moderator: {teamData.team_info.moderator_name} {teamData.team_info.moderator_surname}
            </p>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Team Statistics</h2>
          {teamData.team_statistics.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="text-gray-600">Matches Played</div>
              <div>{stat.number_of_matches_played}</div>
              <div className="text-gray-600">Wins</div>
              <div>{stat.number_of_wins}</div>
              <div className="text-gray-600">Draws</div>
              <div>{stat.number_of_draws}</div>
              <div className="text-gray-600">Losses</div>
              <div>{stat.number_of_losses}</div>
              <div className="text-gray-600">Points</div>
              <div>{stat.points}</div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <div className="space-y-4">
            {teamData.team_members.map((member) => (
              <div key={member.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded">
                {member.profile_picture && (
                  <img
                    src={member.profile_picture}
                    alt={`${member.name} ${member.surname}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {member.name} {member.surname}
                        {member.is_moderator && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Moderator
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>Points: {member.scored_points}</p>
                      <p>Matches: {member.matches_played}</p>
                      <p>MVPs: {member.number_of_mvp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
        <div className="space-y-4">
          {teamData.recent_matches.map((match) => (
            <div key={match.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">
                    {match.team_one_name} vs {match.team_two_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(match.event_time).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {match.win_points} - {match.lose_points}
                  </p>
                  {match.best_player_name && (
                    <p className="text-sm text-gray-500">
                      MVP: {match.best_player_name} {match.best_player_surname}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leagues */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Participating Leagues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamData.leagues.map((league) => (
            <div key={league.league_id} className="border rounded-lg p-4 hover:bg-gray-50">
              <h3 className="font-semibold">{league.name}</h3>
              <p className="text-sm text-gray-500">{league.sport}</p>
              <p className="text-sm text-gray-500">
                {league.number_of_teams} teams • {league.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;