'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getBookings(page: number = 1, limit: number = 10, status?: string) {
  await requireAdmin();
  const supabase = await createClient();
  
  const offset = (page - 1) * limit;
  let query = supabase
    .from('bookings')
    .select(`
      *,
      properties(title, city, state),
      profiles!bookings_guest_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data: bookings, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error('Failed to fetch bookings');
  }

  // Get total count
  const { count } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  return {
    bookings: bookings || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export async function updateBookingStatus(
  bookingId: string, 
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  notes?: string
) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookings')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId);

  if (error) {
    throw new Error('Failed to update booking status');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: `booking_${status}`,
    target_type: 'booking',
    target_id: bookingId,
    notes
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function getBookingDetails(bookingId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      properties(*),
      profiles!bookings_guest_id_fkey(full_name, email, phone),
      messages(*)
    `)
    .eq('id', bookingId)
    .single();

  if (error) {
    throw new Error('Booking not found');
  }

  return booking;
}