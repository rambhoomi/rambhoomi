import { getAnalyticsData } from '@/lib/actions/analytics';
import { RevenueChart, BookingsChart, PropertyStatusChart } from '@/components/admin/Charts';
import MetricCard from '@/components/admin/MetricCard';
import { DollarSign, Calendar, Building, Users, TrendingUp, TrendingDown } from 'lucide-react';

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Prepare chart data
  const revenueChartData = {
    labels: analytics.monthlyRevenue.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: analytics.monthlyRevenue.map(item => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const bookingsChartData = {
    labels: analytics.monthlyBookings.map(item => item.month),
    datasets: [
      {
        label: 'Bookings',
        data: analytics.monthlyBookings.map(item => item.bookings),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const propertyStatusData = {
    labels: Object.keys(analytics.propertyStatusDistribution).map(status => 
      status.charAt(0).toUpperCase() + status.slice(1)
    ),
    datasets: [
      {
        data: Object.values(analytics.propertyStatusDistribution).map(value => Number(value) || 0),
        backgroundColor: [
          '#10B981', // approved - green
          '#F59E0B', // pending - yellow
          '#EF4444', // rejected - red
          '#6B7280', // suspended - gray
        ],
        borderColor: [
          '#059669',
          '#D97706',
          '#DC2626',
          '#4B5563',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Calculate period-over-period changes (mock data for demo)
  const revenueChange = '+15.2%';
  const bookingChange = '+8.7%';
  const propertyChange = '+12.1%';
  const userChange = '+25.3%';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Insights and performance metrics for your property rental platform
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          change={`${revenueChange} from last month`}
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <MetricCard
          title="Total Bookings"
          value={analytics.totalBookings.toLocaleString()}
          change={`${bookingChange} from last month`}
          changeType="positive"
          icon={Calendar}
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Total Properties"
          value={analytics.totalProperties.toLocaleString()}
          change={`${propertyChange} from last month`}
          changeType="positive"
          icon={Building}
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Total Users"
          value={analytics.totalUsers.toLocaleString()}
          change={`${userChange} from last month`}
          changeType="positive"
          icon={Users}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart data={revenueChartData} />
        <BookingsChart data={bookingsChartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PropertyStatusChart data={propertyStatusData} />
        
        {/* Additional Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Booking Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(analytics.totalRevenue / (analytics.totalBookings || 1))}
                </p>
              </div>
              <div className="text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Property Approval Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    ((analytics.propertyStatusDistribution.approved || 0) / 
                    (analytics.totalProperties || 1)) * 100
                  )}%
                </p>
              </div>
              <div className="text-blue-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">+18.5%</p>
              </div>
              <div className="text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Booking Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.monthlyRevenue.map((month, index) => {
                const bookingCount = analytics.monthlyBookings[index]?.bookings || 0;
                const avgValue = bookingCount > 0 ? month.revenue / bookingCount : 0;
                const prevRevenue = index > 0 ? analytics.monthlyRevenue[index - 1].revenue : 0;
                const growth = prevRevenue > 0 ? ((month.revenue - prevRevenue) / prevRevenue * 100) : 0;
                
                return (
                  <tr key={month.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(month.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bookingCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(avgValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center ${
                        growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {Math.abs(growth).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}