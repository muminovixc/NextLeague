import { UserIcon, LockClosedIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/solid';

const LeagueCard = ({ sport, leagueName, role, teamCount, isPublic }) => {
  const sportColor =
    sport === 'Fudbal'
      ? 'bg-blue-600'
      : sport === 'Košarka'
      ? 'bg-red-600'
      : 'bg-gray-600';

  return (
    <div className="bg-[#002B2E] text-white rounded-xl shadow-md p-3 w-full">
      <span className={`text-white px-3 py-1 text-sm rounded-full ${sportColor}`}>
        {sport}
      </span>

      <h2 className="mt-3 text-lg font-semibold">{leagueName}</h2>

      <div className="flex items-center mt-2 text-sm text-cyan-300 font-medium">
        <UserIcon className="h-4 w-4 mr-1" />
        {role}
      </div>

      <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
        <div className="flex items-center w-auto">
          <UsersIcon className="h-4 w-4 mr-1 max-w-lg w-auto" />
          {teamCount} timova
        </div>
        <div className="flex items-center">
          {isPublic ? (
            <>
              <GlobeAltIcon className="h-4 w-4 mr-1" />
              Javna
            </>
          ) : (
            <>
              <LockClosedIcon className="h-4 w-4 mr-1" />
              Privatna
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default LeagueCard;
