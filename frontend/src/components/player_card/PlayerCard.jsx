"use client";
import Image from "next/image";

export default function PlayerCard({
  user = null,
  sport = null,
  name = "Amer Ćesko",
  image = "/igrac.png",
  stats = { NAP: 92, ODB: 88, STA: 95, BRZ: 97, SNG: 93, DOD: 90 },
}) {
  let displayName = name;
  let displayImage = image;
  let displayStats = stats;

  if (user && sport) {
    displayName = `${user.name} ${user.surname}`;
    displayImage = user.profile_picture
      ? `http://localhost:8000/${user.profile_picture}`
      : "/igrac.png";
    const chart = user.charts?.find(
      (c) => c.sport.toLowerCase() === sport.toLowerCase()
    );
    displayStats = chart
      ? {
          NAP: chart.napad,
          ODB: chart.odbrana,
          STA: chart.izdrzljivost,
          BRZ: chart.brzina,
          SNG: chart.snaga,
          DOD: chart.dodavanja,
        }
      : { NAP: 0, ODB: 0, STA: 0, BRZ: 0, SNG: 0, DOD: 0 };
  }

  return (
    <div className="w-64 h-96 mx-auto">
      <div
        className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-2xl border-2 border-yellow-500"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 65%, 95% 78%, 85% 88%, 70% 96%, 50% 100%, 30% 96%, 15% 88%, 5% 78%, 0% 65%)",
          borderRadius: "24px 24px 0 0",
        }}
      >
        {/* Player image*/}
        <Image
          src={displayImage}
          alt={displayName}
          width={256}
          height={192}
          className="absolute top-0 left-0 w-full h-48 object-cover z-10"
          style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
          priority
        />
        {/* Player name -*/}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-11/12 z-20">
          <div className="text-lg font-bold text-amber-900 bg-yellow-200 bg-opacity-80 px-3 py-1 rounded shadow text-center">
            {displayName}
          </div>
        </div>
        {/* Stats */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full px-6 z-10">
          <div className="grid grid-cols-6 gap-1 text-center">
            {Object.entries(displayStats).map(([abbr, value]) => (
              <div className="flex flex-col" key={abbr}>
                <span className="text-xs font-bold text-amber-800">{abbr}</span>
                <span className="text-lg font-black text-amber-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Card shine effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10"
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 65%, 95% 78%, 85% 88%, 70% 96%, 50% 100%, 30% 96%, 15% 88%, 5% 78%, 0% 65%)",
            borderRadius: "24px 24px 0 0",
          }}
        ></div>
      </div>
    </div>
  );
} 