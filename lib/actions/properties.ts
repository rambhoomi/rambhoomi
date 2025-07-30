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

export async function createProperty(formData: FormData) {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const propertyData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    property_type: formData.get('property_type') as string,
    bedrooms: parseInt(formData.get('bedrooms') as string),
    bathrooms: parseInt(formData.get('bathrooms') as string),
    max_guests: parseInt(formData.get('max_guests') as string),
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    country: formData.get('country') as string,
    postal_code: formData.get('postal_code') as string,
    price_per_night: parseFloat(formData.get('price_per_night') as string),
    cleaning_fee: parseFloat(formData.get('cleaning_fee') as string) || 0,
    security_deposit: parseFloat(formData.get('security_deposit') as string) || 0,
    owner_id: user.id,
    status: 'pending'
  };

  const { data: property, error } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create property: ' + error.message);
  }

  // Handle image uploads
  const imageCount = parseInt(formData.get('image_count') as string) || 0;
  const imageRecords = [];

  for (let i = 0; i < imageCount; i++) {
    const imageFile = formData.get(`image_${i}`) as File;
    if (imageFile && imageFile.size > 0) {
      try {
        // Generate unique filename
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${property.id}/${Date.now()}_${i}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          continue; // Skip this image but continue with others
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        // Create image record
        imageRecords.push({
          property_id: property.id,
          image_url: publicUrl,
          image_alt: `${property.title} - Image ${i + 1}`,
          display_order: i,
          is_primary: i === 0
        });
      } catch (err) {
        console.error('Error processing image:', err);
        // Continue with other images
      }
    }
  }

  // Insert image records
  if (imageRecords.length > 0) {
    const { error: imageError } = await supabase
      .from('property_images')
      .insert(imageRecords);

    if (imageError) {
      console.error('Failed to save image records:', imageError);
      // Don't fail the entire operation, just log the error
    }
  }

  // Log admin action
  await supabase.from('admin_actions').insert({
    admin_id: user.id,
    action_type: 'property_created',
    target_type: 'property',
    target_id: property.id,
    notes: `Property created by admin with ${imageRecords.length} images`
  });

  revalidatePath('/admin/properties');
  return { success: true, property };
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