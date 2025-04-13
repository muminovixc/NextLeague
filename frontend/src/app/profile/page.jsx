import React from 'react';

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">My Profile</h1>
      <div className="bg-[#032f30] rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
              <div className="w-32 h-32 bg-[#0a7075] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">John Doe</h3>
              <p className="text-[#6ba3be] text-center mb-4">Premium Member</p>
              <button className="w-full bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
                <h4 className="text-lg font-bold text-white mb-2">Active Leagues</h4>
                <p className="text-3xl text-[#6ba3be]">3</p>
              </div>
              <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
                <h4 className="text-lg font-bold text-white mb-2">Teams</h4>
                <p className="text-3xl text-[#6ba3be]">2</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
              <h3 className="text-2xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center text-[#6ba3be]">
                  <div className="w-2 h-2 bg-[#0c969c] rounded-full mr-3"></div>
                  <p>Joined Summer League 2024</p>
                </div>
                <div className="flex items-center text-[#6ba3be]">
                  <div className="w-2 h-2 bg-[#0c969c] rounded-full mr-3"></div>
                  <p>Updated team roster</p>
                </div>
                <div className="flex items-center text-[#6ba3be]">
                  <div className="w-2 h-2 bg-[#0c969c] rounded-full mr-3"></div>
                  <p>Scheduled new match</p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
              <h3 className="text-2xl font-bold text-white mb-4">Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left text-[#6ba3be] hover:text-white py-2">
                  Account Settings
                </button>
                <button className="w-full text-left text-[#6ba3be] hover:text-white py-2">
                  Notification Preferences
                </button>
                <button className="w-full text-left text-[#6ba3be] hover:text-white py-2">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
