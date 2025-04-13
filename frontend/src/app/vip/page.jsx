'use client';
import React, { useState } from "react";

export default function VIPPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/* Možeš ovdje ubaciti navigaciju ako je budeš imao */}

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-[#6ba3be] text-lg">
            Pick the perfect package for your league or club.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Basic',
              price: 'Free',
              features: ['Create 1 league', 'Up to 2 teams', 'Basic support', 'League and group chat'],
              bg: 'bg-[#032f30]'
            },
            {
              title: 'Premium',
              price: '$5/mo',
              features: ['Create up to 5 leagues', 'Up to 5 teams', 'Priority support', 'League and group chat'],
              bg: 'bg-[#0a7075]'
            },
            {
              title: 'Premium Plus',
              price: '$10/mo',
              features: ['Create up to 10 leagues', 'Up to 10 teams', 'All Premium features', 'VIP badge', 'Chat with everyone'],
              bg: 'bg-[#0c969c]'
            }
          ].map((plan, index) => (
            <div key={index} className={`rounded-xl p-8 text-white ${plan.bg} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <p className="text-3xl font-semibold mb-6">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#6ba3be]">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-[#031716] font-medium py-2 px-4 rounded-md hover:bg-gray-200">
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
