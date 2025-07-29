export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: 'user' | 'owner' | 'admin' | 'super_admin';
  status: 'active' | 'suspended' | 'pending_approval';
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  price_per_night: number;
  cleaning_fee: number;
  security_deposit: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  amenities: string[];
  house_rules: string | null;
  cancellation_policy: string;
  check_in_time: string;
  check_out_time: string;
  minimum_stay: number;
  maximum_stay: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  image_alt: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  guests_count: number;
  total_amount: number;
  booking_fee: number;
  cleaning_fee: number;
  security_deposit: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  is_read: boolean;
  message_type: 'text' | 'system' | 'image';
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewee_id: string;
  property_id: string;
  rating: number;
  review_text: string | null;
  review_type: 'property' | 'guest' | 'host';
  is_visible: boolean;
  created_at: string;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  action_type: string;
  target_type: string;
  target_id: string;
  details: Record<string, any> | null;
  notes: string | null;
  created_at: string;
}