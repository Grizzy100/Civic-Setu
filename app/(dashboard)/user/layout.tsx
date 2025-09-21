'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPin, ChevronDown, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// --- Type Definition ---
interface UserProfile {
  city: string | null;
  state: string | null;
  country: string | null;
}

/**
 * FeedNav Component
 * This is the shared navigation block for the dashboard content area.
 * It displays the user's location and provides tabs to switch between
 * the community and personal report feeds by navigating to different pages.
 */
export default function FeedNav() {
  const pathname = usePathname();

  const { data: userProfile, isLoading } = useQuery<UserProfile>({
    queryKey: ['userProfileLocation'],
    queryFn: async () => {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return response.json();
    },
  });

  const locationText = isLoading 
    ? "Loading..." 
    : `${userProfile?.city || 'Unknown'}, ${userProfile?.state || 'Location'}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Row 1: Location and Settings */}
        <div className="flex justify-between items-center mb-4">
            <div className="relative group">
                <button className="flex items-center gap-2 text-left">
                    <MapPin className="text-red-500 flex-shrink-0" size={20} />
                    <div>
                        <p className="font-semibold text-gray-800">{locationText}</p>
                        <p className="text-xs text-gray-500">{userProfile?.country || '...'}</p>
                    </div>
                    <ChevronDown className="text-gray-400 group-hover:rotate-180 transition-transform" size={16} />
                </button>
                <div className="absolute hidden group-hover:block top-full mt-2 w-48 bg-white border rounded-lg shadow-xl z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Change District</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Analytics</a>
                </div>
            </div>
            <button className="text-gray-500 hover:text-gray-800">
                <Settings size={20} />
            </button>
        </div>

        {/* Row 2: Tab Navigation using Links */}
        <div className="flex items-center border-t border-gray-200 pt-4">
            <TabLink 
                href="/dashboard" // Or your main dashboard route
                label="Community Feed"
                isActive={pathname === '/dashboard'}
            />
            <TabLink 
                href="/dashboard/my-reports"
                label="My Reports"
                isActive={pathname === '/dashboard/my-reports'}
            />
        </div>
    </div>
  );
}

// Helper component for Tab Links
const TabLink = ({ label, href, isActive }: { label: string; href: string; isActive: boolean }) => {
    return (
        <Link
            href={href}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors
                ${isActive 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100'
                }`}
        >
            {label}
        </Link>
    )
}
