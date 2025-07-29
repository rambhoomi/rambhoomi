'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getUsers(page: number = 1, limit: number = 10, role?: string) {
  await requireAdmin();
  const supabase = await createClient();
  
  const offset = (page - 1) * limit;
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (role && role !== 'all') {
    query = query.eq('role', role);
  }

  const { data: users, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error('Failed to fetch users');
  }

  // Get total count
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  return {
    users: users || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export async function updateUserRole(
  userId: string, 
  newRole: 'user' | 'owner' | 'admin' | 'super_admin'
) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    throw new Error('Failed to update user role');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: 'user_role_updated',
    target_type: 'user',
    target_id: userId,
    details: { new_role: newRole }
  });

  revalidatePath('/admin/users');
  return { success: true };
}

export async function updateUserStatus(
  userId: string, 
  status: 'active' | 'suspended' | 'pending_approval',
  reason?: string
) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', userId);

  if (error) {
    throw new Error('Failed to update user status');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: `user_${status}`,
    target_type: 'user',
    target_id: userId,
    notes: reason
  });

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(userId: string) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    throw new Error('Failed to delete user');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: 'user_deleted',
    target_type: 'user',
    target_id: userId
  });

  revalidatePath('/admin/users');
  return { success: true };
}