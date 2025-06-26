"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTeamById } from "../../../../lib/team";
import TeamSchedule from "./TeamSchedule";

export default function TeamView() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.id;

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      if (!teamId) return;

      try {
        setLoading(true);
        const data = await getTeamById(teamId);
        console.log("Received team data:", data); // Debug log
        setTeamData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching team:", error);
        setError("Failed to load team information. Please try again later.");
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
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#031716" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-6"
            style={{ borderColor: "#0c969c" }}
          ></div>
          <p className="text-xl font-medium" style={{ color: "#6ba3be" }}>
            Loading team information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#031716" }}
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#032f30" }}
          >
            <span className="text-2xl" style={{ color: "#6ba3be" }}>
              ⚠️
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0c969c" }}>
            Error
          </h2>
          <p className="mb-6" style={{ color: "#6ba3be" }}>
            {error}
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
            style={{ backgroundColor: "#0c969c", color: "#031716" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (
    !teamData ||
    !Array.isArray(teamData) ||
    teamData.length === 0 ||
    !teamData[0]
  ) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#031716" }}
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#032f30" }}
          >
            <span className="text-2xl" style={{ color: "#6ba3be" }}>
              ❌
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0c969c" }}>
            Team Not Found
          </h2>
          <p className="mb-6" style={{ color: "#6ba3be" }}>
            The requested team could not be found.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
            style={{ backgroundColor: "#0c969c", color: "#031716" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const team = teamData[0];
  const statistics = teamData[1] || null;
  const league = teamData[2] || null;

  const winPercentage =
    statistics?.number_of_matches_played > 0
      ? (
          (statistics.number_of_wins / statistics.number_of_matches_played) *
          100
        ).toFixed(1)
      : 0;

  // Additional safety check for team object
  if (!team || typeof team !== "object") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#031716" }}
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#032f30" }}
          >
            <span className="text-2xl" style={{ color: "#6ba3be" }}>
              ⚠️
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0c969c" }}>
            Invalid Data
          </h2>
          <p className="mb-6" style={{ color: "#6ba3be" }}>
            Team data is not in the expected format.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:transform hover:scale-105"
            style={{ backgroundColor: "#0c969c", color: "#031716" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#031716" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="mb-6 flex items-center px-4 py-2 rounded-xl transition-all hover:transform hover:scale-105"
            style={{ backgroundColor: "#032f30", color: "#6ba3be" }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Team and League Information */}
        {league && (
          <div className="mt-6 text-center bg-[#032f30] p-2 rounded-2xl shadow-lg mb-8">
            <p className="text-lg text-[#6ba3be]">
              Participating in:
              <button
                onClick={() => router.push(`/league/view/${league.league_id}`)}
                className="ml-2 px-4 py-2 rounded-lg transition-all hover:transform hover:scale-105"
                style={{
                  textDecoration: "underline",
                  color: "#0c969c",
                  fontWeight: "bold",
                }}
              >
                {league.name}
              </button>
            </p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Information Card */}
          <div
            className="rounded-2xl border-2 overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#032f30", borderColor: "#0a7075" }}
          >
            {/* Team Header */}
            <div className="p-8 text-center">
              <div className="flex flex-col items-center gap-6">
                {/* Team Logo */}
                {team.team_logo ? (
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#0a7075" }}
                  >
            <img
  src={`http://localhost:8000/${team.team_logo.replace(/^\/+/, '')}`}
  alt={`${team.name} logo`}
  style={{
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid white",
  }}
/>


                  </div>
                ) : (
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#0a7075" }}
                  >
                    <span className="text-3xl" style={{ color: "#6ba3be" }}>
                      ⚽
                    </span>
                  </div>
                )}

                {/* Team Name */}
                <div>
                  <h1
                    className="text-3xl font-bold mb-3"
                    style={{ color: "#0c969c" }}
                  >
                    {team.name}
                  </h1>
                  <div
                    className="inline-block px-4 py-2 rounded-full text-lg font-medium"
                    style={{ backgroundColor: "#0a7075", color: "#6ba3be" }}
                  >
                    {team.team_sport}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Details */}
            <div className="p-6 border-t" style={{ borderColor: "#0a7075" }}>
              <h2
                className="text-xl font-bold mb-4 text-center"
                style={{ color: "#0c969c" }}
              >
                Team Information
              </h2>

              <div className="space-y-4">
                {/* Team ID */}
                <div
                  className="p-4 rounded-xl border"
                  style={{ backgroundColor: "#031716", borderColor: "#0a7075" }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: "#0a7075" }}
                    >
                      <span className="text-lg" style={{ color: "#6ba3be" }}>
                        🆔
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "#0c969c" }}
                      >
                        Team ID
                      </h3>
                      <p className="font-mono" style={{ color: "#6ba3be" }}>
                        {team.team_id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div
                  className="p-4 rounded-xl border"
                  style={{ backgroundColor: "#031716", borderColor: "#0a7075" }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: "#0a7075" }}
                    >
                      <span className="text-lg" style={{ color: "#6ba3be" }}>
                        🌍
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "#0c969c" }}
                      >
                        Country
                      </h3>
                      <p style={{ color: "#6ba3be" }}>{team.country}</p>
                    </div>
                  </div>
                </div>

                {/* Team Identification */}
                {team.team_identification && (
                  <div
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "#031716",
                      borderColor: "#0a7075",
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: "#0a7075" }}
                      >
                        <span className="text-lg" style={{ color: "#6ba3be" }}>
                          🏷️
                        </span>
                      </div>
                      <div>
                        <h3
                          className="font-semibold"
                          style={{ color: "#0c969c" }}
                        >
                          Identification
                        </h3>
                        <p className="font-mono" style={{ color: "#6ba3be" }}>
                          {team.team_identification}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Statistics Card */}
          <div
            className="rounded-2xl border-2 overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#032f30", borderColor: "#0a7075" }}
          >
            {/* Statistics Header */}
            <div
              className="p-6 text-center border-b"
              style={{ borderColor: "#0a7075" }}
            >
              <h2 className="text-2xl font-bold" style={{ color: "#0c969c" }}>
                Team Statistics
              </h2>
              {statistics && (
                <p className="mt-2" style={{ color: "#6ba3be" }}>
                  Season Performance Overview
                </p>
              )}
            </div>

            {statistics ? (
              <div className="p-6">
                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Matches Played */}
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#0c969c" }}
                    >
                      {statistics.number_of_matches_played}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#6ba3be" }}
                    >
                      Matches Played
                    </div>
                  </div>

                  {/* Win Percentage */}
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#0c969c" }}
                    >
                      {winPercentage}%
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#6ba3be" }}
                    >
                      Win Rate
                    </div>
                  </div>

                  {/* Total Points */}
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#0c969c" }}
                    >
                      {statistics.points}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#6ba3be" }}
                    >
                      Total Points
                    </div>
                  </div>

                  {/* Point Difference */}
                  <div
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div
                      className={`text-3xl font-bold mb-1 ${
                        statistics.difference_points >= 0 ? "" : ""
                      }`}
                      style={{
                        color:
                          statistics.difference_points >= 0
                            ? "#0c969c"
                            : "#dc2626",
                      }}
                    >
                      {statistics.difference_points >= 0 ? "+" : ""}
                      {statistics.difference_points}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#6ba3be" }}
                    >
                      Goal Difference
                    </div>
                  </div>
                </div>

                {/* Match Results */}
                <div className="space-y-3">
                  <h3
                    className="text-lg font-bold text-center mb-4"
                    style={{ color: "#0c969c" }}
                  >
                    Match Results
                  </h3>

                  {/* Wins */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        <span className="text-white font-bold">W</span>
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: "#6ba3be" }}
                      >
                        Wins
                      </span>
                    </div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#0c969c" }}
                    >
                      {statistics.number_of_wins}
                    </span>
                  </div>

                  {/* Draws */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: "#eab308" }}
                      >
                        <span className="text-white font-bold">D</span>
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: "#6ba3be" }}
                      >
                        Draws
                      </span>
                    </div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#0c969c" }}
                    >
                      {statistics.number_of_draws}
                    </span>
                  </div>

                  {/* Losses */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "#031716" }}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: "#dc2626" }}
                      >
                        <span className="text-white font-bold">L</span>
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: "#6ba3be" }}
                      >
                        Losses
                      </span>
                    </div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#0c969c" }}
                    >
                      {statistics.number_of_losses}
                    </span>
                  </div>
                </div>

                {/* Additional Stats */}
                <div
                  className="mt-6 pt-6 border-t"
                  style={{ borderColor: "#0a7075" }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="text-center p-3 rounded-xl"
                      style={{ backgroundColor: "#031716" }}
                    >
                      <div
                        className="text-lg font-bold"
                        style={{ color: "#0c969c" }}
                      >
                        {statistics.win_points}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "#6ba3be" }}
                      >
                        Win Points
                      </div>
                    </div>
                    <div
                      className="text-center p-3 rounded-xl"
                      style={{ backgroundColor: "#031716" }}
                    >
                      <div
                        className="text-lg font-bold"
                        style={{ color: "#0c969c" }}
                      >
                        {statistics.lose_points}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "#6ba3be" }}
                      >
                        Lose Points
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#0a7075" }}
                >
                  <span className="text-2xl" style={{ color: "#6ba3be" }}>
                    📊
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#0c969c" }}
                >
                  No Statistics Available
                </h3>
                <p style={{ color: "#6ba3be" }}>
                  Statistics will appear here once the team starts playing
                  matches.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <TeamSchedule teamId={team.team_id} />
    </div>
  );
}
