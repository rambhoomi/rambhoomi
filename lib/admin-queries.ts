import { createClient } from '@/lib/supabase/server';

export async function getDashboardMetrics() {
  const supabase = await createClient();

  try {
    // Get all metrics in parallel
    const [
      { count: totalProperties },
      { count: activeUsers },
      { count: pendingApprovals },
      { count: totalBookings },
      { data: bookingData },
      { data: recentProperties },
      { data: recentUsers },
      { data: recentBookings }
    ] = await Promise.all([
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('total_amount, created_at').eq('status', 'confirmed').order('created_at', { ascending: false }).limit(30),
      supabase.from('properties').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(5),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('bookings').select('*, properties(title), profiles!bookings_guest_id_fkey(full_name, email)').order('created_at', { ascending: false }).limit(5)
    ]);

    // Calculate monthly revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = bookingData?.reduce((sum, booking) => {
      const bookingDate = new Date(booking.created_at);
      if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
        return sum + Number(booking.total_amount);
      }
      return sum;
    }, 0) || 0;

    return {
      totalProperties: totalProperties || 0,
      activeUsers: activeUsers || 0,
      pendingApprovals: pendingApprovals || 0,
      totalBookings: totalBookings || 0,
      monthlyRevenue,
      recentProperties: recentProperties || [],
      recentUsers: recentUsers || [],
      recentBookings: recentBookings || []
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      totalProperties: 0,
      activeUsers: 0,
      pendingApprovals: 0,
      totalBookings: 0,
      monthlyRevenue: 0,
      recentProperties: [],
      recentUsers: [],
      recentBookings: []
    };
  }
}

export async function getRecentActivity() {
  const supabase = await createClient();

  try {
    const { data: adminActions } = await supabase
      .from('admin_actions')
      .select(`
        *,
        profiles!admin_actions_admin_id_fkey(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    return adminActions || [];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}