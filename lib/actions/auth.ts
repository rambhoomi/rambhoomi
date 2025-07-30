'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error);
    return { error: error.message };
  }

  if (data.user) {
    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return { error: 'Unable to fetch user profile. Please try again.' };
    }

    console.log('User profile:', profile);
    
    if (profile && ['admin', 'super_admin'].includes(profile.role)) {
      console.log('Redirecting to admin dashboard');
      redirect('/admin');
    } else {
      console.log('Redirecting to home page');
      redirect('/');
    }
  }

  return { success: true };
}

export async function signUp(formData: {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  role?: 'user' | 'owner';
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName || '',
        phone: formData.phone || '',
        role: formData.role || 'user',
      },
    },
  });

  if (error) {
    console.error('Signup error:', error);
    return { error: error.message };
  }

  return { success: true, user: data.user };
}

export async function signOut() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Signout error:', error);
    return { error: error.message };
  }

  redirect('/');
}