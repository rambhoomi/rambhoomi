import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/lib/types/database';

export async function getUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<{ profile: Profile | null; error: any }> {
  const supabase = createClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { profile, error };
}

export async function requireAdmin() {
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { profile, error } = await getUserProfile(user.id);
  if (error || !profile || !['admin', 'super_admin'].includes(profile.role)) {
    throw new Error('Admin access required');
  }

  return { user, profile };
}