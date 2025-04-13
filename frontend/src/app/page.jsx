'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#031716]">
      <main className="flex flex-col items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-20 gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              Build Your Own Sports Leagues & Clubs
            </h2>
            <p className="text-[#6ba3be] text-xl mb-8">
              Create, manage, and grow your sports community with NextLeague. 
              The all-in-one platform for league organizers and club managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#0c969c] text-white px-8 py-3 rounded-md hover:bg-[#0a7075] font-medium">
                Start Your League
              </button>
              <button className="border border-[#0c969c] text-white px-8 py-3 rounded-md hover:bg-[#032f30] font-medium">
                Explore Features
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 aspect-video bg-[#032f30] rounded-lg flex items-center justify-center p-4">
            <img 
              src="/images/hero.png"
              alt="Hero Image"
              className="max-w-full max-h-full rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="w-full bg-[#032f30] py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <p className="text-[#6ba3be] mb-4">Why Choose NextLeague</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything You Need to Run Your League
              </h2>
              <p className="text-[#6ba3be] text-xl">
                Our platform provides all the tools you need to create and manage successful sports leagues and clubs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Cards */}
              {[{
                title: "League Management",
                description: "Create tournaments, manage schedules, and track standings all in one place.",
              }, {
                title: "Team Building",
                description: "Easily create and manage teams, invite players, and track participation.",
              }, {
                title: "Scheduling",
                description: "Automated scheduling tools to create fair and balanced game calendars.",
              }].map((feature, i) => (
                <div key={i} className="bg-[#031716] p-8 rounded-lg border border-[#0c969c]/20">
                  <div className="w-12 h-12 bg-[#0a7075] rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-[#6ba3be]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="w-full bg-[#031716] py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <p className="text-[#6ba3be] mb-4">Powerful Analytics</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Data-Driven Insights</h2>
                <p className="text-[#6ba3be] text-xl mb-8">
                  Get detailed analytics on player performance, team statistics, and league trends to make informed decisions.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-[#6ba3be]">
                    <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5..." />
                    </svg>
                    Performance tracking for players and teams
                  </li>
                  <li className="flex items-center text-[#6ba3be]">
                    <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="..." />
                    </svg>
                    Attendance and participation reports
                  </li>
                  <li className="flex items-center text-[#6ba3be]">
                    <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="..." />
                    </svg>
                    Financial tracking and budget management
                  </li>
                </ul>
                <button className="bg-[#0c969c] text-white px-8 py-3 rounded-md hover:bg-[#0a7075] font-medium">
                  Explore Analytics
                </button>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-[#032f30] rounded-lg flex items-center justify-center border border-[#0c969c]/20">
                <div className="text-[#6ba3be] text-sm">Analytics Dashboard Preview</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-[#274d60] py-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your League?</h2>
            <p className="text-[#6ba3be] mb-8">
              Join thousands of league organizers who trust NextLeague to power their sports communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0c969c] text-white px-8 py-3 rounded-md hover:bg-[#0a7075] font-medium">
                Get Started for Free
              </button>
              <button className="border border-[#0c969c] text-white px-8 py-3 rounded-md hover:bg-[#032f30] font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
