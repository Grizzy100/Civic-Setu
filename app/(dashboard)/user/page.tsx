'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ChevronDown, Settings } from 'lucide-react';
// A hook to fetch user profile data - you would need to create this
// import { useUserProfile } from '@/lib/hooks/useUserProfile';

export default function FeedNav() {
  const pathname = usePathname();
  // const { data: userProfile, isLoading } = useUserProfile(); // Example hook

  // Mock data until the hook is created
  const isLoading = false;
  const userProfile = {
    city: 'Ranchi',
    state: 'Jharkhand',
    country: 'India',
  };

  const isCommunityActive = pathname === '/';
  const isMyReportsActive = pathname === '/my-reports';

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
      {/* Top section with Location and Settings */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-400" size={20} />
          <div>
            {isLoading ? (
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <h3 className="font-bold text-gray-800 flex items-center gap-1">
                {userProfile?.city || 'Location'}
                <ChevronDown size={16} className="text-gray-500" />
              </h3>
            )}
            <p className="text-xs text-gray-500">
              {userProfile ? `${userProfile.state}, ${userProfile.country}` : '...'}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings className="text-gray-500" size={20} />
        </button>
      </div>

      {/* Bottom section with Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
        <Link href="/">
          <div
            className={`
              w-full text-center py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300
              ${isCommunityActive ? 'bg-white shadow text-orange-500' : 'text-gray-600 hover:bg-gray-200'}
            `}
          >
            Community Feed
          </div>
        </Link>
        <Link href="/my-reports">
          <div
            className={`
              w-full text-center py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300
              ${isMyReportsActive ? 'bg-white shadow text-orange-500' : 'text-gray-600 hover:bg-gray-200'}
            `}
          >
            My Reports
          </div>
        </Link>
      </div>
    </div>
  );
}

