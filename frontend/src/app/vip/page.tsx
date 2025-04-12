export default function VIPPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">VIP Membership</h1>
      <div className="bg-[#032f30] rounded-lg p-8">
        <p className="text-[#6ba3be] text-xl mb-8">
          Exclusive features and benefits for VIP members.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Premium Features</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced Analytics
              </li>
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority Support
              </li>
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom Branding
              </li>
            </ul>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              Upgrade Now
            </button>
          </div>
          <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
            <h3 className="text-2xl font-bold text-white mb-4">VIP Benefits</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Early Access to Features
              </li>
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exclusive Events
              </li>
              <li className="flex items-center text-[#6ba3be]">
                <svg className="w-5 h-5 mr-3 text-[#0c969c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Member Discounts
              </li>
            </ul>
            <button className="bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 