'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building, 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Properties', href: '/admin/properties', icon: Building },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Rambhoomi</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {profile?.full_name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}