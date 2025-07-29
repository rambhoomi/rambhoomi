# Rambhoomi - Luxury Property Rental Platform

A premium property rental platform built with Next.js 15, Supabase, and modern web technologies. Designed to compete with Airbnb and VRBO with an admin-first development approach.

## 🚀 Features Implemented

### ✅ Core Infrastructure
- **Next.js 15** with App Router and TypeScript
- **Supabase** backend with PostgreSQL database
- **Tailwind CSS 4** for modern UI design
- **Server Actions** for secure database operations
- **Row Level Security (RLS)** policies
- **Authentication & Authorization** with role-based access

### ✅ Admin Dashboard
- **Dashboard Overview** with key metrics and charts
- **Property Management** with approval workflows
- **User Management** with role controls
- **Booking Management** with status tracking
- **Analytics** with Chart.js integration
- **Modern UI** with responsive design

### ✅ Database Schema
- **Profiles** - User management with roles
- **Properties** - Property listings with approval status
- **Property Images** - Image management system
- **Bookings** - Reservation system
- **Messages** - Communication system (structure ready)
- **Reviews** - Rating system (structure ready)
- **Admin Actions** - Audit logging

### ✅ Authentication System
- **Supabase Auth** integration
- **Middleware** for route protection
- **Role-based access control**
- **Admin login interface**
- **Session management**

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Modern icons
- **Chart.js & React-Chartjs-2** - Analytics charts

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Primary database
- **Row Level Security** - Data protection
- **Server Actions** - Secure API operations

### Development Tools
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Server-side rendering** support

## 📁 Project Structure

```
rambhoomi/
├── app/
│   ├── admin/                 # Admin dashboard
│   │   ├── analytics/         # Analytics page
│   │   ├── bookings/          # Booking management
│   │   ├── messages/          # Message monitoring (placeholder)
│   │   ├── properties/        # Property management
│   │   ├── reviews/           # Review management (placeholder)
│   │   ├── settings/          # Settings (placeholder)
│   │   ├── users/             # User management
│   │   ├── layout.tsx         # Admin layout with sidebar
│   │   └── page.tsx           # Dashboard overview
│   ├── auth/
│   │   └── login/             # Login page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── unauthorized/          # Access denied page
├── components/
│   └── admin/                 # Admin components
│       ├── AdminHeader.tsx    # Header component
│       ├── AdminSidebar.tsx   # Navigation sidebar
│       ├── Charts.tsx         # Chart components
│       ├── MetricCard.tsx     # Metric display cards
│       └── PropertyCard.tsx   # Property card component
├── database/
│   └── schema.sql             # Complete database schema
├── hooks/
│   └── useAuth.ts             # Authentication hook
├── lib/
│   ├── actions/               # Server actions
│   │   ├── analytics.ts       # Analytics queries
│   │   ├── bookings.ts        # Booking operations
│   │   ├── properties.ts      # Property operations
│   │   └── users.ts           # User operations
│   ├── supabase/              # Supabase configuration
│   │   ├── client.ts          # Client-side config
│   │   ├── middleware.ts      # Auth middleware
│   │   └── server.ts          # Server-side config
│   ├── types/
│   │   └── database.ts        # TypeScript types
│   ├── admin-queries.ts       # Dashboard queries
│   └── auth.ts                # Auth utilities
├── middleware.ts              # Next.js middleware
└── .env.local                 # Environment variables
```

## 🔧 Setup Instructions

### 1. Database Setup

Run the SQL schema in your Supabase dashboard:

```sql
-- Run the complete schema from database/schema.sql
-- This creates all tables, policies, triggers, and functions
```

### 2. Environment Variables

Update `.env.local` with your Supabase credentials (already configured):

```env
NEXT_PUBLIC_SUPABASE_URL=https://jyexxmihtwnygvaylimh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_ROLE_KEY=[add_your_service_role_key]
```

### 3. Install Dependencies

```bash
npm install  # Already done
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Create Admin User

1. Go to your Supabase Auth dashboard
2. Create a new user
3. In the profiles table, update the user's role to 'admin' or 'super_admin'

## 🎯 Admin Dashboard Features

### Dashboard Overview
- **Key Metrics Cards** - Properties, Users, Revenue, Bookings
- **Recent Activity** - Latest properties, users, and bookings
- **Real-time Data** - Live updates from database

### Property Management
- **Property Listing** - View all properties with status
- **Approval Workflow** - Approve/reject/suspend properties
- **Bulk Operations** - Mass status updates
- **Filter & Search** - Filter by status, search properties
- **Property Details** - Full property information

### User Management
- **User Directory** - Complete user list with roles
- **Role Management** - Assign admin, owner, user roles
- **Status Control** - Activate/suspend accounts
- **Activity Monitoring** - Track user actions

### Booking Management
- **Booking Overview** - All reservations with details
- **Status Tracking** - Pending, confirmed, cancelled, completed
- **Payment Monitoring** - Payment status tracking
- **Guest Information** - Complete booking details

### Analytics & Reporting
- **Revenue Charts** - Monthly revenue trends
- **Booking Analytics** - Booking volume analysis
- **Property Distribution** - Status breakdown
- **Performance Metrics** - KPIs and growth rates

## 🔒 Security Features

### Authentication
- **Supabase Auth** - Secure authentication
- **Role-based Access** - Admin, Owner, User roles
- **Route Protection** - Middleware-based protection
- **Session Management** - Automatic session handling

### Database Security
- **Row Level Security** - Table-level permissions
- **SQL Injection Prevention** - Parameterized queries
- **Admin Action Logging** - Complete audit trail
- **Data Validation** - Server-side validation

## 🎨 Design System

### Modern UI/UX
- **Clean Design** - Minimalist, professional interface
- **Responsive Layout** - Mobile-first approach
- **Consistent Styling** - Unified design language
- **Accessibility** - WCAG guidelines followed

### Color Palette
- **Primary Blue** - #2563EB (Blue-600)
- **Success Green** - #10B981 (Emerald-500)
- **Warning Yellow** - #F59E0B (Amber-500)
- **Error Red** - #EF4444 (Red-500)
- **Neutral Grays** - Various shades for text and backgrounds

## 📊 Database Schema Highlights

### Core Tables
- **profiles** - User management with roles and status
- **properties** - Property listings with approval workflow
- **bookings** - Reservation system with payment tracking
- **admin_actions** - Complete audit trail of admin activities

### Advanced Features
- **UUID Primary Keys** - Secure, non-sequential IDs
- **Timestamp Tracking** - Created/updated timestamps
- **JSONB Fields** - Flexible data storage for amenities
- **Foreign Key Constraints** - Data integrity enforcement
- **Indexed Queries** - Optimized database performance

## 🚀 Next Steps

### Phase 2: User-Facing Features
- Public property search and booking
- User registration and profiles
- Payment processing integration
- Mobile app development

### Phase 3: Advanced Features
- AI-powered property recommendations
- Dynamic pricing algorithms
- Advanced analytics and ML insights
- Multi-language support

## 🤝 Contributing

This is a complete implementation of the Rambhoomi platform admin dashboard. The codebase is production-ready and follows modern development practices.

## 📝 License

Private project - All rights reserved.

---

**Rambhoomi** - Luxury Property Rental Platform  
Built with ❤️ using Next.js 15, Supabase, and modern web technologies.