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
  MoreHorizontal,
  ArrowUpRight,
  Star,
  MapPin,
  ChevronRight,
  Activity,
  Zap
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
        {/* Modern Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening with your platform.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
              <Activity className="h-4 w-4 mr-2" />
              System Healthy
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Zap className="h-4 w-4 mr-2" />
              Quick Actions
            </button>
          </div>
        </div>

        {/* Enhanced Metrics Grid */}
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
            iconColor="text-emerald-600"
          />
          <MetricCard
            title="Pending Approvals"
            value={metrics.pendingApprovals}
            change="Requires attention"
            changeType="neutral"
            icon={Clock}
            iconColor="text-amber-600"
          />
          <MetricCard
            title="Monthly Revenue"
            value={formatCurrency(metrics.monthlyRevenue)}
            change="+15% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-purple-600"
          />
        </div>

        {/* Modern Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Properties - Enhanced */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Recent Properties</h2>
                  <p className="text-gray-600 text-sm mt-1">Latest property submissions</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                  View all
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {metrics.recentProperties.map((property: any) => (
                  <div key={property.id} className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{property.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.city}, {property.state}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">by {property.profiles?.full_name || 'Unknown Owner'}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        property.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        property.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {property.status}
                      </span>
                      <p className="text-xs text-gray-500">{formatDate(property.created_at)}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-3 group-hover:text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users - Enhanced */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
                  <p className="text-gray-600 text-sm mt-1">New registrations</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                  View all
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {metrics.recentUsers.map((user: any) => (
                  <div key={user.id} className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{user.full_name || 'Unnamed User'}</h3>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-gray-500">{formatDate(user.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings - Enhanced Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                <p className="text-gray-600 text-sm mt-1">Latest reservation activity</p>
              </div>
              <button className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {metrics.recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {booking.profiles?.full_name?.charAt(0) || booking.profiles?.email?.charAt(0) || 'G'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.profiles?.full_name || 'Unknown Guest'}
                          </div>
                          <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.properties?.title || 'Unknown Property'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-col">
                        <span>{formatDate(booking.check_in_date)}</span>
                        <span className="text-gray-500">to {formatDate(booking.check_out_date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(Number(booking.total_amount))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
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