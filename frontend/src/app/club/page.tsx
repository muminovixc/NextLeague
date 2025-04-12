export default function ClubPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">Club Management</h1>
      <div className="bg-[#032f30] rounded-lg p-8">
        <p className="text-[#6ba3be] text-xl mb-8">
          Manage your club, teams, and members efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Teams</h3>
            <p className="text-[#6ba3be] mb-4">Manage your club's teams</p>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              View Teams
            </button>
          </div>
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Members</h3>
            <p className="text-[#6ba3be] mb-4">Manage club membership</p>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              View Members
            </button>
          </div>
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Facilities</h3>
            <p className="text-[#6ba3be] mb-4">Manage club facilities</p>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              View Facilities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 