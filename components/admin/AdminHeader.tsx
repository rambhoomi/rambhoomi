'use client';

import { Bell, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminHeader() {
  const { profile } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search properties, users, bookings..."
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">
              Welcome, {profile?.full_name?.split(' ')[0] || 'Admin'}
            </span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}