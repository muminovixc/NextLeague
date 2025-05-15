import { PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline';

const TeamCard = ({ teamName, description, role, href, canEdit }) => {
  const roleColor =
    role === 'Moderator tima'
      ? 'bg-blue-500'
      : role === 'Igrač'
      ? 'bg-green-500'
      : 'bg-gray-400';

  return (
    <div className="bg-[#002B2E] rounded-lg shadow p-4 mb-4 flex items-center justify-between 
                    transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div>
        <h2 className="text-lg font-semibold text-white">{teamName}</h2>
        <p className="text-sm text-gray-400">{description}</p>
        <span className={`inline-block mt-2 px-3 py-1 text-xs text-white rounded-full ${roleColor}`}>
          {role}
        </span>
      </div>

      <a href={href} className="text-gray-400 hover:text-white">
        {canEdit ? (
          <PencilSquareIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </a>
    </div>
  );
};

export default TeamCard;
