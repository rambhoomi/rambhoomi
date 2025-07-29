'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export async function getAnalyticsData() {
  await requireAdmin();
  const supabase = await createClient();

  try {
    // Get monthly revenue data for the last 12 months
    const { data: bookings } = await supabase
      .from('bookings')
      .select('total_amount, created_at, status')
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true });

    // Get property status distribution
    const { data: properties } = await supabase
      .from('properties')
      .select('status');

    // Get user growth data
    const { data: users } = await supabase
      .from('profiles')
      .select('created_at, role')
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true });

    // Process monthly revenue data
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      const month = date.toISOString().slice(0, 7); // YYYY-MM format
      
      const monthlyTotal = bookings
        ?.filter(booking => 
          booking.created_at.startsWith(month) && 
          booking.status === 'confirmed'
        )
        .reduce((sum, booking) => sum + Number(booking.total_amount), 0) || 0;

      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: monthlyTotal
      };
    });

    // Process monthly bookings data
    const monthlyBookings = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      const month = date.toISOString().slice(0, 7);
      
      const monthlyCount = bookings
        ?.filter(booking => booking.created_at.startsWith(month))
        .length || 0;

      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        bookings: monthlyCount
      };
    });

    // Process property status distribution
    const statusCounts = properties?.reduce((acc: any, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {}) || {};

    // Process user growth data
    const monthlyUsers = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      const month = date.toISOString().slice(0, 7);
      
      const monthlyCount = users
        ?.filter(user => user.created_at.startsWith(month))
        .length || 0;

      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        users: monthlyCount
      };
    });

    return {
      monthlyRevenue,
      monthlyBookings,
      propertyStatusDistribution: statusCounts,
      monthlyUsers,
      totalRevenue: bookings?.reduce((sum, booking) => 
        booking.status === 'confirmed' ? sum + Number(booking.total_amount) : sum, 0
      ) || 0,
      totalBookings: bookings?.length || 0,
      totalProperties: properties?.length || 0,
      totalUsers: users?.length || 0
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {
      monthlyRevenue: [],
      monthlyBookings: [],
      propertyStatusDistribution: {},
      monthlyUsers: [],
      totalRevenue: 0,
      totalBookings: 0,
      totalProperties: 0,
      totalUsers: 0
    };
  }
}