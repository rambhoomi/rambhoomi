import { getBookings } from '@/lib/actions/bookings';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface BookingsPageProps {
  searchParams: {
    page?: string;
    status?: string;
  };
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const statusFilter = searchParams.status || 'all';
  
  const { bookings, totalCount, totalPages } = await getBookings(
    currentPage, 
    20, 
    statusFilter
  );

  const statusOptions = [
    { value: 'all', label: 'All Bookings', icon: Calendar, color: 'text-gray-600' },
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-600' },
    { value: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-red-600' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-blue-600' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      refunded: 'bg-gray-100 text-gray-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage property bookings and reservations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statusOptions.slice(1).map((status) => {
          const count = bookings.filter(b => b.status === status.value).length;
          const Icon = status.icon;
          return (
            <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                </div>
                <Icon className={`h-8 w-8 ${status.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {statusOptions.map((status) => {
            const isActive = statusFilter === status.value;
            const Icon = status.icon;
            return (
              <a
                key={status.value}
                href={`/admin/bookings?status=${status.value}`}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {status.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      #{booking.id.slice(-8)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(booking.created_at)}
                    </div>
                  </td>
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
                    <div className="text-sm font-medium text-gray-900">
                      {booking.properties?.title || 'Unknown Property'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.properties?.city}, {booking.properties?.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {calculateNights(booking.check_in_date, booking.check_out_date)} nights, 
                      {booking.guests_count} guests
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(Number(booking.total_amount))}
                    </div>
                    {booking.cleaning_fee > 0 && (
                      <div className="text-sm text-gray-500">
                        +{formatCurrency(Number(booking.cleaning_fee))} cleaning
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPaymentStatusColor(booking.payment_status)}`}>
                      {booking.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === 'all' 
              ? 'No bookings have been made yet.'
              : `No bookings with status "${statusFilter}" found.`
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href={`/admin/bookings?page=${currentPage - 1}&status=${statusFilter}`}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </a>
            <a
              href={`/admin/bookings?page=${currentPage + 1}&status=${statusFilter}`}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 20, totalCount)}
                </span>{' '}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/admin/bookings?page=${page}&status=${statusFilter}`}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}