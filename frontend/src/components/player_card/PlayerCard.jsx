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
      : "http://localhost:8000/users/profile_pictures/no_pic_avatar.png";
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
    <div className="w-40 h-64 mx-auto">
      <div
        className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-xl border border-yellow-500"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 65%, 95% 78%, 85% 88%, 70% 96%, 50% 100%, 30% 96%, 15% 88%, 5% 78%, 0% 65%)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <Image
          src={displayImage}
          alt={displayName}
          width={160}
          height={96}
          className="absolute top-0 left-0 w-full h-24 object-cover z-10"
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          priority
        />
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-11/12 z-20">
          <div className="text-base font-bold text-amber-900 bg-yellow-200 bg-opacity-80 px-2 py-1 rounded shadow text-center">
            {displayName}
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full px-2 z-10">
          <div className="grid grid-cols-6 gap-0.5 text-center">
            {Object.entries(displayStats).map(([abbr, value]) => (
              <div className="flex flex-col" key={abbr}>
                <span className="text-[10px] font-bold text-amber-800">{abbr}</span>
                <span className="text-base font-black text-amber-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10"
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 65%, 95% 78%, 85% 88%, 70% 96%, 50% 100%, 30% 96%, 15% 88%, 5% 78%, 0% 65%)",
            borderRadius: "16px 16px 0 0",
          }}
        ></div>
      </div>
    </div>
  );
} 