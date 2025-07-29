-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'owner', 'admin', 'super_admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_approval')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties Table
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type VARCHAR(50) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price_per_night DECIMAL(10, 2) NOT NULL,
  cleaning_fee DECIMAL(10, 2) DEFAULT 0,
  security_deposit DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  amenities JSONB DEFAULT '[]',
  house_rules TEXT,
  cancellation_policy VARCHAR(50) DEFAULT 'moderate',
  check_in_time TIME DEFAULT '15:00',
  check_out_time TIME DEFAULT '11:00',
  minimum_stay INTEGER DEFAULT 1,
  maximum_stay INTEGER DEFAULT 365,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Images Table
CREATE TABLE property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_alt TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests_count INTEGER NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  booking_fee DECIMAL(10, 2) DEFAULT 0,
  cleaning_fee DECIMAL(10, 2) DEFAULT 0,
  security_deposit DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'image')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_type VARCHAR(20) NOT NULL CHECK (review_type IN ('property', 'guest', 'host')),
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Actions Table
CREATE TABLE admin_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id UUID NOT NULL,
  details JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Properties Policies
CREATE POLICY "Owners can manage their properties" ON properties
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Public can view approved properties" ON properties
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can manage all properties" ON properties
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Property Images Policies
CREATE POLICY "Property images follow property access" ON property_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_id AND (
        owner_id = auth.uid() OR 
        status = 'approved' OR
        EXISTS (
          SELECT 1 FROM profiles 
          WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
        )
      )
    )
  );

-- Bookings Policies
CREATE POLICY "Users can manage their bookings" ON bookings
  FOR ALL USING (
    auth.uid() = guest_id OR 
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all bookings" ON bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Messages Policies
CREATE POLICY "Users can manage their messages" ON messages
  FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Admins can view all messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Reviews Policies
CREATE POLICY "Users can view visible reviews" ON reviews
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Users can manage their reviews" ON reviews
  FOR ALL USING (auth.uid() = reviewer_id);

CREATE POLICY "Admins can manage all reviews" ON reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Admin Actions Policies
CREATE POLICY "Admins can manage admin actions" ON admin_actions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_messages_booking_id ON messages(booking_id);
CREATE INDEX idx_reviews_property_id ON reviews(property_id);
CREATE INDEX idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_target_type_id ON admin_actions(target_type, target_id);

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();