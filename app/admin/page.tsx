import { getDashboardMetrics, getRecentActivity } from '@/lib/admin-queries';
import MetricCard from '@/components/admin/MetricCard';
import { 
  Building, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Eye,
  MoreHorizontal 
} from 'lucide-react';

export default async function AdminDashboard() {
  const metrics = await getDashboardMetrics();
  const recentActivity = await getRecentActivity();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your property rental platform.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Properties"
          value={metrics.totalProperties}
          change="+12% from last month"
          changeType="positive"
          icon={Building}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          change="+8% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          change="Requires attention"
          changeType="neutral"
          icon={Clock}
          iconColor="text-yellow-600"
        />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(metrics.monthlyRevenue)}
          change="+15% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-emerald-600"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {metrics.recentProperties.map((property: any) => (
                <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.city}, {property.state}</p>
                    <p className="text-sm text-gray-500">by {property.profiles?.full_name || 'Unknown Owner'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      property.status === 'approved' ? 'bg-green-100 text-green-800' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(property.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {metrics.recentUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.full_name || 'Unnamed User'}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.recentBookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {booking.profiles?.full_name?.charAt(0) || booking.profiles?.email?.charAt(0) || 'G'}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.profiles?.full_name || 'Unknown Guest'}
                        </div>
                        <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.properties?.title || 'Unknown Property'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(Number(booking.total_amount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}