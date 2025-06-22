"use client";
import Footer from '../components/footer/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#031716] text-white font-sans">
      <main className="flex flex-col items-center justify-between">
        {/* Hero Section */}
       {/* Hero Section */}
<div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-24 gap-16">
  <div className="w-full md:w-1/2 space-y-6">
    <h2 className="text-5xl font-extrabold leading-tight">
      Build Your Own Sports Leagues & Clubs
    </h2>
    <p className="text-[#6ba3be] text-lg md:text-xl">
      Create, manage, and grow your sports community with NextLeague.
      The all-in-one platform for league organizers and club managers.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="bg-[#0c969c] text-white px-8 py-3 rounded-lg hover:bg-[#0a7075] shadow-md transition">
        Start Your League
      </button>
      <button className="border border-[#0c969c] text-white px-8 py-3 rounded-lg hover:bg-[#032f30] shadow-md transition">
        Explore Features
      </button>
    </div>
  </div>

  <div className="w-full md:w-1/2 flex items-center justify-center">
  <div className="w-full h-auto max-h-[500px] bg-[#032f30] rounded-xl flex items-center justify-center shadow-md border border-[#0c969c]/10 overflow-hidden group">
    <img
      src="/images/hero.png"
      alt="Hero"
      className="w-full h-full object-contain rounded-xl transition-all duration-500 ease-in-out group-hover:opacity-80 group-hover:scale-105"
    />
  </div>
</div>
</div>

        {/* Features Section */}
        <section className="w-full bg-[#032f30] py-24">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center space-y-4 mb-16">
      <p className="text-[#6ba3be] text-lg">Why Choose NextLeague</p>
      <h2 className="text-4xl md:text-5xl font-bold">
        Everything You Need to Run Your League
      </h2>
      <p className="text-[#6ba3be] text-lg md:text-xl max-w-2xl mx-auto">
        Our platform provides all the tools you need to create and manage
        successful sports leagues and clubs.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "League Management",
          description:
            "Create tournaments, manage schedules, and track standings all in one place.",
          href: "/league",
        },
        {
          title: "Team Building",
          description:
            "Easily create and manage teams, invite players, and track participation.",
          href: "/team",
        },
        {
          title: "Scheduling",
          description:
            "Automated scheduling tools to create fair and balanced game calendars.",
          href: "/team",
        },
      ].map((feature, i) => (
        <Link
          key={i}
          href={feature.href}
          className="group bg-[#031716] p-8 rounded-xl border border-[#0c969c]/20 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-[#0a7075] group-hover:bg-[#0c969c] transition rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-[#6ba3be]">{feature.description}</p>
        </Link>
      ))}
    </div>
  </div>
</section>

        {/* Analytics Section */}
        <section className="w-full bg-[#031716] py-24">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
    
    {/* Text Section */}
    <div className="w-full md:w-1/2 space-y-6">
      <p className="text-[#0c969c] text-sm uppercase tracking-wide font-medium">
        Powerful Analytics
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        Data-Driven Insights
      </h2>
      <p className="text-[#6ba3be] text-lg">
        Get detailed analytics on player performance, team statistics, and
        league trends to make informed decisions.
      </p>

      <ul className="space-y-4">
        {[
          "Performance tracking for players and teams",
          "Attendance and participation reports",
          "Financial tracking and budget management",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[#6ba3be]">
            <span className="w-5 h-5 mt-1 flex items-center justify-center bg-[#0c969c] rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button className="bg-[#0c969c] text-white px-8 py-3 rounded-lg hover:bg-[#0a7075] shadow-lg transition-all">
        Explore Analytics
      </button>
    </div>

    <div className="w-full md:w-1/2 flex items-center">
  <div className="w-full h-auto max-h-[500px] bg-[#032f30]/50 backdrop-blur-md rounded-2xl shadow-lg border border-[#0c969c]/20 group">
    <img
      src="/images/analytics.png"
      alt="Analytics Preview"
      className="w-full h-full object-contain rounded-xl transition-all duration-500 ease-in-out group-hover:opacity-90 group-hover:scale-105"
    />
  </div>
</div>

  </div>
</section>


        {/* CTA Section */}

<section className="w-full bg-[#274d60] py-24">
  <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
    <h2 className="text-4xl md:text-5xl font-bold">
      Ready to Start Your League?
    </h2>
    <p className="text-[#6ba3be] text-lg">
      Join thousands of league organizers who trust NextLeague to power
      their sports communities.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/homepage">
        <button className="bg-[#0c969c] text-white px-8 py-3 rounded-lg hover:bg-[#0a7075] shadow-md transition">
          Get Started for Free
        </button>
      </Link>
      <Link href="/homepage">
        <button className="border border-[#0c969c] text-white px-8 py-3 rounded-lg hover:bg-[#032f30] shadow-md transition">
          Schedule Demo
        </button>
      </Link>
    </div>
  </div>
</section>


      </main>
      <Footer />
    </div>
  );
}
