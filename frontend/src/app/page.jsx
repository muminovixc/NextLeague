"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Footer from "../components/footer/footer"
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Zap,
  Shield,
  Target,
} from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#031716] text-white font-sans overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#0a7075]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#6ba3be]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0c969c]/5 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div
                className={`space-y-8 transform transition-all duration-1000 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#0a7075]/20 border border-[#0a7075]/30 rounded-full px-4 py-2 text-sm font-medium text-[#6ba3be]">
                    <Star className="w-4 h-4" />
                    <span>Trusted by 10,000+ organizers</span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-[#6ba3be] to-white bg-clip-text text-transparent">
                      Build Your Own
                    </span>
                    <br />
                    <span className="text-[#0c969c]">Sports Leagues</span>
                    <br />
                    <span className="text-white">& Clubs</span>
                  </h1>

                  <p className="text-[#6ba3be] text-xl lg:text-2xl leading-relaxed max-w-2xl">
                    Create, manage, and grow your sports community with{" "}
                    <span className="text-[#0c969c] font-semibold">NextLeague</span>. The all-in-one platform for league
                    organizers and club managers.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/homepage">
                    <button className="group bg-gradient-to-r from-[#0c969c] to-[#0a7075] text-white px-8 py-4 rounded-2xl hover:from-[#0a7075] hover:to-[#0c969c] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#0c969c]/25 flex items-center gap-2 font-semibold text-lg">
                      <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Start Your League
                    </button>
                  </Link>
                  <Link href="/homepage">
                    <button className="group border-2 border-[#0c969c] text-white px-8 py-4 rounded-2xl hover:bg-[#0c969c]/10 shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold text-lg backdrop-blur-sm">
                      <Target className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      Explore Features
                    </button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#0a7075]/30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0c969c]">10K+</div>
                    <div className="text-[#6ba3be] text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0c969c]">500+</div>
                    <div className="text-[#6ba3be] text-sm">Leagues Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0c969c]">99%</div>
                    <div className="text-[#6ba3be] text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a7075]/20 to-[#6ba3be]/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#032f30]/80 to-[#0a7075]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#0a7075]/30 shadow-2xl overflow-hidden">
                    <img
                      src="/images/hero.png"
                      alt="NextLeague Platform Preview"
                      className="w-full h-auto rounded-2xl transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/20 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 bg-gradient-to-b from-[#031716] to-[#032f30]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 bg-[#0a7075]/20 border border-[#0a7075]/30 rounded-full px-4 py-2 text-sm font-medium text-[#6ba3be]">
                <Zap className="w-4 h-4" />
                <span>Why Choose NextLeague</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-[#6ba3be] bg-clip-text text-transparent">
                  Everything You Need
                </span>
                <br />
                <span className="text-[#0c969c]">to Run Your League</span>
              </h2>
              <p className="text-[#6ba3be] text-xl max-w-3xl mx-auto leading-relaxed">
                Our platform provides all the tools you need to create and manage successful sports leagues and clubs
                with ease and efficiency.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Trophy className="w-8 h-8" />,
                  title: "League Management",
                  description:
                    "Create tournaments, manage schedules, and track standings all in one intuitive platform.",
                  href: "/league",
                  color: "from-[#0a7075] to-[#0c969c]",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Team Building",
                  description: "Easily create and manage teams, invite players, and track participation seamlessly.",
                  href: "/team",
                  color: "from-[#0c969c] to-[#6ba3be]",
                },
                {
                  icon: <Calendar className="w-8 h-8" />,
                  title: "Smart Scheduling",
                  description: "Automated scheduling tools to create fair and balanced game calendars effortlessly.",
                  href: "/team",
                  color: "from-[#6ba3be] to-[#0a7075]",
                },
              ].map((feature, i) => (
                <Link
                  key={i}
                  href={feature.href}
                  className="group relative bg-gradient-to-br from-[#032f30]/80 to-[#031716]/80 backdrop-blur-sm p-8 rounded-3xl border border-[#0a7075]/30 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6ba3be] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#6ba3be] leading-relaxed mb-6">{feature.description}</p>
                    <div className="flex items-center gap-2 text-[#0c969c] font-semibold group-hover:gap-4 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="relative py-32 bg-gradient-to-b from-[#032f30] to-[#031716]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#0c969c]/20 border border-[#0c969c]/30 rounded-full px-4 py-2 text-sm font-medium text-[#0c969c]">
                    <BarChart3 className="w-4 h-4" />
                    <span>Powerful Analytics</span>
                  </div>

                  <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white to-[#6ba3be] bg-clip-text text-transparent">
                      Data-Driven
                    </span>
                    <br />
                    <span className="text-[#0c969c]">Insights</span>
                  </h2>

                  <p className="text-[#6ba3be] text-xl leading-relaxed">
                    Get detailed analytics on player performance, team statistics, and league trends to make informed
                    decisions that drive success.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-6">
                  {[
                    "Performance tracking for players and teams",
                    "Attendance and participation reports",
                    "Financial tracking and budget management",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#0c969c] to-[#0a7075] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#6ba3be] text-lg group-hover:text-white transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/statistics">
                  <button className="group bg-gradient-to-r from-[#0c969c] to-[#0a7075] text-white px-8 py-4 rounded-2xl hover:from-[#0a7075] hover:to-[#0c969c] shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold text-lg">
                    <BarChart3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Explore Analytics
                  </button>
                </Link>
              </div>

              {/* Right Content - Analytics Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c969c]/20 to-[#6ba3be]/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#032f30]/80 to-[#0a7075]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#0a7075]/30 shadow-2xl overflow-hidden">
                  <img
                    src="/images/analytics.png"
                    alt="Analytics Dashboard Preview"
                    className="w-full h-auto rounded-2xl transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/20 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 bg-gradient-to-r from-[#274d60] via-[#032f30] to-[#274d60]">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#0c969c]/20 border border-[#0c969c]/30 rounded-full px-4 py-2 text-sm font-medium text-[#0c969c]">
                  <Shield className="w-4 h-4" />
                  <span>Join the Community</span>
                </div>

                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-[#6ba3be] to-white bg-clip-text text-transparent">
                    Ready to Start
                  </span>
                  <br />
                  <span className="text-[#0c969c]">Your League?</span>
                </h2>

                <p className="text-[#6ba3be] text-xl max-w-3xl mx-auto leading-relaxed">
                  Join thousands of league organizers who trust NextLeague to power their sports communities and create
                  unforgettable experiences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/homepage">
                  <button className="group bg-gradient-to-r from-[#0c969c] to-[#0a7075] text-white px-10 py-4 rounded-2xl hover:from-[#0a7075] hover:to-[#0c969c] shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-bold text-lg">
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Get Started for Free
                  </button>
                </Link>
                <Link href="/homepage">
                  <button className="group border-2 border-[#0c969c] text-white px-10 py-4 rounded-2xl hover:bg-[#0c969c]/10 shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 font-bold text-lg backdrop-blur-sm">
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Schedule Demo
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-12 border-t border-[#0a7075]/30">
                <p className="text-[#6ba3be] text-sm mb-6">Trusted by organizations worldwide</p>
                <div className="flex items-center justify-center gap-8 opacity-60">
                  <div className="text-2xl font-bold text-[#6ba3be]">NextLeague</div>
                  <div className="text-2xl font-bold text-[#6ba3be]">Sports+</div>
                  <div className="text-2xl font-bold text-[#6ba3be]">LeagueMax</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
