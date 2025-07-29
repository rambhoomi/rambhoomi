'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Property } from '@/lib/types/database';

export async function getProperties(page: number = 1, limit: number = 10, status?: string) {
  await requireAdmin();
  const supabase = await createClient();
  
  const offset = (page - 1) * limit;
  let query = supabase
    .from('properties')
    .select(`
      *,
      profiles!properties_owner_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data: properties, error } = await query
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error('Failed to fetch properties');
  }

  // Get total count
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true });

  return {
    properties: properties || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export async function getProperty(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from('properties')
    .select(`
      *,
      profiles!properties_owner_id_fkey(full_name, email, phone),
      property_images(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Property not found');
  }

  return property;
}

export async function updatePropertyStatus(
  propertyId: string, 
  status: 'pending' | 'approved' | 'rejected' | 'suspended',
  notes?: string
) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('properties')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', propertyId);

  if (error) {
    throw new Error('Failed to update property status');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: `property_${status}`,
    target_type: 'property',
    target_id: propertyId,
    notes
  });

  revalidatePath('/admin/properties');
  return { success: true };
}

export async function bulkUpdatePropertyStatus(
  propertyIds: string[],
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('properties')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .in('id', propertyIds);

  if (error) {
    throw new Error('Failed to bulk update properties');
  }

  // Log admin actions
  const adminActions = propertyIds.map(id => ({
    admin_id: user.id,
    action_type: `property_${status}_bulk`,
    target_type: 'property',
    target_id: id,
    notes: 'Bulk operation'
  }));

  await supabase.from('admin_actions').insert(adminActions);

  revalidatePath('/admin/properties');
  return { success: true };
}

export async function deleteProperty(propertyId: string) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', propertyId);

  if (error) {
    throw new Error('Failed to delete property');
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: 'property_deleted',
    target_type: 'property',
    target_id: propertyId
  });

  revalidatePath('/admin/properties');
  return { success: true };
}