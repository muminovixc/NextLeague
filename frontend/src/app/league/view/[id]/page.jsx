// app/league/view/[id]/page.jsx
import Link from "next/link";
import { getLeaguesStatistic } from "../../../../lib/league";
import { ArrowLeft } from "lucide-react";

export default async function ViewLeaguePage({ params }) {
  const { id } = params;
  const statistics = await getLeaguesStatistic(id);

  const sortedTeams = statistics.sort((a, b) => b.points - a.points);

  const getRowClass = (index, length) => {
  if (index === 0)
    return "bg-[#0b1f3a] hover:bg-[#244b73] bg-opacity-20 transition-colors"; // tamno plava + svetlija plava na hover
  if (index === length - 1)
    return "bg-[#800020] hover:bg-[#a0313d] bg-opacity-20 transition-colors"; // bordo + svetlija bordo na hover
  return "hover:bg-[#183533] transition-colors"; // ostali redovi sa hover tamnozelenom
  };

  return (
    <div className="p-4 md:p-8 bg-[#071c1b] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          League #{id} - Standings
        </h1>
        <Link
          href="/league"
          className="inline-flex items-center gap-2 text-sm bg-[#0e2e2d] text-teal-400 hover:text-white hover:bg-[#183533] px-4 py-2 rounded-md border border-teal-800 transition"
        >
          <ArrowLeft size={18} /> Back to Leagues
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0e2e2d] rounded-xl overflow-hidden shadow-lg border border-teal-800 text-sm md:text-base">
          <thead className="bg-[#0a2423] text-teal-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-center">MP</th>
              <th className="px-4 py-3 text-center">W</th>
              <th className="px-4 py-3 text-center">D</th>
              <th className="px-4 py-3 text-center">L</th>
              <th className="px-4 py-3 text-center">GF-GA</th>
              <th className="px-4 py-3 text-center">+/-</th>
              <th className="px-4 py-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr
                key={team.team_id}
                className={`${getRowClass(index, sortedTeams.length)} border-b border-teal-800 transition-colors`}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={team.team_logo.replace("./frontend/public", "")}
                    alt="Team Logo"
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <span className="font-medium">
                    {team.team_name || "Unnamed Team"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{team.number_of_matches_played}</td>
                <td className="px-4 py-3 text-center">{team.number_of_wins}</td>
                <td className="px-4 py-3 text-center">{team.number_of_draws}</td>
                <td className="px-4 py-3 text-center">{team.number_of_losses}</td>
                <td className="px-4 py-3 text-center">
                  {team.win_points}-{team.lose_points}
                </td>
                <td className="px-4 py-3 text-center">{team.difference_points}</td>
                <td className="px-4 py-3 text-center font-bold text-teal-400">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
