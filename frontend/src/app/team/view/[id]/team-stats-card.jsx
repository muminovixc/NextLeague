"use client"

export default function TeamStatsCard({ statistics }) {
  const winPercentage =
    statistics?.number_of_matches_played > 0
      ? ((statistics.number_of_wins / statistics.number_of_matches_played) * 100).toFixed(1)
      : 0

  return (
    <div
      className="rounded-2xl border-2 overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-500"
      style={{ backgroundColor: "#032f30", borderColor: "#0a7075" }}
    >
      {/* Statistics Header */}
      <div
        className="p-6 text-center border-b"
        style={{
          borderColor: "#0a7075",
          background: "linear-gradient(to bottom, rgba(10, 112, 117, 0.2), transparent)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0c969c, #6ba3be)" }}
          >
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "#0c969c" }}>
            Team Statistics
          </h2>
        </div>
        {statistics && <p style={{ color: "#6ba3be" }}>Season Performance Overview</p>}
      </div>

      {statistics ? (
        <div className="p-6">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Matches Played */}
            <div
              className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div
                className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: "#0c969c" }}
              >
                {statistics.number_of_matches_played}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6ba3be" }}>
                Matches Played
              </div>
            </div>

            {/* Win Percentage */}
            <div
              className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div
                className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: "#0c969c" }}
              >
                {winPercentage}%
              </div>
              <div className="text-sm font-medium" style={{ color: "#6ba3be" }}>
                Win Rate
              </div>
            </div>

            {/* Total Points */}
            <div
              className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div
                className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: "#0c969c" }}
              >
                {statistics.points}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6ba3be" }}>
                Total Points
              </div>
            </div>

            {/* Point Difference */}
            <div
              className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div
                className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{
                  color: statistics.difference_points >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                {statistics.difference_points >= 0 ? "+" : ""}
                {statistics.difference_points}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6ba3be" }}>
                Goal Difference
              </div>
            </div>
          </div>

          {/* Match Results */}
          <div className="space-y-3">
            <h3
              className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2"
              style={{ color: "#0c969c" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: "#0c969c" }}
              >
                📈
              </span>
              Match Results
            </h3>

            {/* Wins */}
            <div
              className="group flex items-center justify-between p-4 rounded-xl border hover:border-green-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                >
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="font-medium" style={{ color: "#6ba3be" }}>
                  Wins
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: "#10b981" }}>
                {statistics.number_of_wins}
              </span>
            </div>

            {/* Draws */}
            <div
              className="group flex items-center justify-between p-4 rounded-xl border hover:border-yellow-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}
                >
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="font-medium" style={{ color: "#6ba3be" }}>
                  Draws
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: "#eab308" }}>
                {statistics.number_of_draws}
              </span>
            </div>

            {/* Losses */}
            <div
              className="group flex items-center justify-between p-4 rounded-xl border hover:border-red-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                borderColor: "rgba(10, 112, 117, 0.5)",
              }}
            >
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
                >
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-medium" style={{ color: "#6ba3be" }}>
                  Losses
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: "#ef4444" }}>
                {statistics.number_of_losses}
              </span>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "#0a7075" }}>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                  borderColor: "rgba(10, 112, 117, 0.5)",
                }}
              >
                <div
                  className="text-xl font-bold group-hover:scale-110 transition-transform duration-300"
                  style={{ color: "#0c969c" }}
                >
                  {statistics.win_points}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "#6ba3be" }}>
                  Win Points
                </div>
              </div>
              <div
                className="group text-center p-4 rounded-xl border hover:border-opacity-50 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #031716, rgba(10, 112, 117, 0.2))",
                  borderColor: "rgba(10, 112, 117, 0.5)",
                }}
              >
                <div
                  className="text-xl font-bold group-hover:scale-110 transition-transform duration-300"
                  style={{ color: "#0c969c" }}
                >
                  {statistics.lose_points}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "#6ba3be" }}>
                  Lose Points
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #0a7075, #274d60)" }}
          >
            <span className="text-3xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold mb-3" style={{ color: "#0c969c" }}>
            No Statistics Available
          </h3>
          <p className="leading-relaxed" style={{ color: "#6ba3be" }}>
            Statistics will appear here once the team starts playing matches.
          </p>
        </div>
      )}
    </div>
  )
}
