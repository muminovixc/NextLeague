import { useEffect, useState } from "react";
import SportSelector from "../userteams/SportSelector";
import { getMyTeam } from "../../../lib/team";
import { getMyLeagues, getCalendarForLeague } from "../../../lib/league";

const sportMap = {
  Football: "football",
  Basketball: "basketball",
  Volleyball: "volleyball",
  Handball: "handball",
  football: "football",
  basketball: "basketball",
  volleyball: "volleyball",
  handball: "handball",
};

export default function UserNotification() {
  const [selectedSport, setSelectedSport] = useState("football");
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const teamData = await getMyTeam();
        const filteredTeams = (teamData.teams || []).filter(
          (team) => sportMap[team.team_sport] === selectedSport
        );
        setTeams(filteredTeams);

        const leagueData = await getMyLeagues();
        const filteredLeagues = (leagueData || []).filter(
          (league) => sportMap[league.sport] === selectedSport
        );
        setLeagues(filteredLeagues);

        let allMatches = [];
        for (const team of filteredTeams) {
          for (const league of filteredLeagues) {
            const leagueMatches = await getCalendarForLeague(league.league_id);
            const teamMatches = leagueMatches
              .filter(
                (match) =>
                  (match.team_one.id === team.team_id || match.team_two.id === team.team_id) &&
                  match.statistic &&
                  match.status &&
                  match.status.toUpperCase() !== "SCHEDULED"
              )
              .map((match) => ({
                ...match,
                _userTeamId: team.team_id,
                _userTeamName: team.name,
                _leagueName: league.name,
                _leagueId: league.league_id,
              }));
            allMatches = allMatches.concat(teamMatches);
          }
        }
        setMatches(allMatches);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedSport]);

  let notifications = [];

  for (const team of teams) {
    notifications.push({
      type: "team_created",
      date: team.created_at || team.createdAt || null,
      text: `Team created: ${team.name}`,
      team,
    });
  }

  for (const league of leagues) {
    notifications.push({
      type: "league_created",
      date: league.created_at || league.createdAt || null,
      text: `League created: ${league.name}`,
      league,
    });
  }

  for (const match of matches) {
    const isUserTeamOne = match.team_one.id === match._userTeamId;
    const userTeam = isUserTeamOne ? match.team_one : match.team_two;
    const opponent = isUserTeamOne ? match.team_two : match.team_one;
    const userScore = isUserTeamOne ? match.statistic.win_points : match.statistic.lose_points;
    const opponentScore = isUserTeamOne ? match.statistic.lose_points : match.statistic.win_points;
    let resultType = "draw";
    if (match.statistic.winner_id === userTeam.id) resultType = "win";
    else if (match.statistic.looser_id === userTeam.id) resultType = "loss";
    notifications.push({
      type: "match_result",
      date: match.date,
      resultType,
      league: match._leagueName,
      leagueId: match._leagueId,
      userTeam: userTeam.name,
      opponent: opponent.name,
      userScore,
      opponentScore,
    });
  }

  notifications = notifications.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} />
      <div className="space-y-4 mt-6">
        {loading && <div className="text-[#0c969c] text-center text-lg">Loading notifications...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && notifications.length === 0 && (
          <div className="text-[#6ba3be] text-center text-base">No notifications for this sport.</div>
        )}
        {notifications.map((notif, idx) => {
          if (notif.type === "team_created") {
            return (
              <div
                key={idx}
                className="rounded-xl p-5 bg-[#032f30] border-l-4 border-[#0c969c] text-[#c6e6f1] shadow-md hover:shadow-lg transition"
              >
                <div className="font-semibold text-lg text-[#0c969c]">Team Created</div>
                <div className="mt-1">{notif.text}</div>
                {notif.date && (
                  <div className="text-xs mt-2 text-[#99c1d0]">
                    {new Date(notif.date).toLocaleString()}
                  </div>
                )}
              </div>
            );
          }
          if (notif.type === "league_created") {
            return (
              <div
                key={idx}
                className="rounded-xl p-5 bg-[#031716] border-l-4 border-[#0a7075] text-[#bde0e6] shadow-md hover:shadow-lg transition"
              >
                <div className="font-semibold text-lg text-[#0a7075]">League Created</div>
                <div className="mt-1">{notif.text}</div>
                {notif.date && (
                  <div className="text-xs mt-2 text-[#86b1bb]">
                    {new Date(notif.date).toLocaleString()}
                  </div>
                )}
              </div>
            );
          }
          if (notif.type === "match_result") {
            let bg =
              "bg-[#032f30] border-l-4 border-[#0a7075]";
            if (notif.resultType === "win") bg = "bg-green-800/40 border-l-4 border-green-500";
            if (notif.resultType === "loss") bg = "bg-red-800/40 border-l-4 border-red-500";
            if (notif.resultType === "draw") bg = "bg-yellow-800/40 border-l-4 border-yellow-500";
            return (
              <div
                key={idx}
                className={`rounded-xl p-5 ${bg} text-white shadow-md hover:shadow-lg transition flex flex-col gap-2`}
              >
                <div className="font-semibold text-lg">
                  {notif.league ? `League: ${notif.league}` : "Match Result"}
                </div>
                <div className="text-base">
                  {notif.userTeam}{" "}
                  <span className="font-bold">
                    {notif.userScore} - {notif.opponentScore}
                  </span>{" "}
                  {notif.opponent}
                </div>
                {notif.date && (
                  <div className="text-xs text-[#c9e7f5]">
                    {new Date(notif.date).toLocaleString()}
                  </div>
                )}
                {notif.resultType === "win" && (
                  <div className="text-green-300 font-medium">Your team won!</div>
                )}
                {notif.resultType === "loss" && (
                  <div className="text-red-300 font-medium">Your team lost.</div>
                )}
                {notif.resultType === "draw" && (
                  <div className="text-yellow-300 font-medium">Draw match.</div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
