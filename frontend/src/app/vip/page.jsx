"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const createCheckoutSession = async (priceId) => {
  const res = await fetch("http://localhost:8000/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  return await res.json(); // očekuješ { sessionId: "..." }
};

export default function VipCard() {

    {/* FUNKCIJA ZA CHECKOUT*/}
    const handleCheckout = async (priceId) => {
  try {
    const stripe = await loadStripe("pk_test_51RPq3WQbnCtu5rm4a0BrGVUFhZv9oNvRF11H1UeMDTAH2fSeswyGYpJJegQDn6eKyE4b8WCSB8bLsDfCSa2JfZYv00FdTXrG3q"); 
    const data = await createCheckoutSession(priceId);

    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (err) {
    console.error("Checkout error:", err);
  }
};
{/* KRAJ FUNKCIJE ZA CHECKOUT*/}


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/* Možeš ovdje ubaciti navigaciju ako je budeš imao */}

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-[#6ba3be] text-lg">
            Pick the perfect package for your league or club.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Basic",
              price: "Free",
              features: [
                "Create 1 league",
                "Up to 2 teams",
                "Basic support",
                "League and group chat",
              ],
              bg: "bg-[#032f30]",
            },
            {
              title: "Premium",
              price: "$5/mo",
              features: [
                "Create up to 5 leagues",
                "Up to 5 teams",
                "Priority support",
                "League and group chat",
              ],
              bg: "bg-[#0a7075]",
              priceId: "price_1RPq6YQbnCtu5rm4fQEj3Unx",
            },
             
            {
              title: "Premium Plus",
              price: "$10/mo",
              features: [
                "Create up to 10 leagues",
                "Up to 10 teams",
                "All Premium features",
                "VIP badge",
                "Chat with everyone",
              ],
              bg: "bg-[#0c969c]",
              priceId: "price_1RPqGOQbnCtu5rm4KrVrLTjM",
            },
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
              <button onClick={() => handleCheckout(plan.priceId)} className="w-full bg-white text-[#031716] font-medium py-2 px-4 rounded-md hover:bg-gray-200">
                Choose {plan.title}
              </button>
            </div>
          ))}
   </div>
      </section>

    </div>
  );
}