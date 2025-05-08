'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#031716] py-16 border-t border-[#0c969c]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">NextLeague</h3>
            <p className="text-[#6ba3be]">Building better sports communities through technology.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Features</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Documentation</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Guides</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">About</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Blog</Link></li>
              <li><Link href="#" className="text-[#6ba3be] hover:text-white">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#0c969c]/20 mt-12 pt-8 text-center">
          <p className="text-[#6ba3be]">© 2025 NextLeague. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
