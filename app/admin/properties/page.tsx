import { getProperties } from '@/lib/actions/properties';
import PropertyCard from '@/components/admin/PropertyCard';
import { Building, Plus, Filter, Search, Grid, List } from 'lucide-react';
import Link from 'next/link';

interface PropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const statusFilter = params.status || 'all';
  
  const { properties, totalCount, totalPages } = await getProperties(
    currentPage, 
    12, 
    statusFilter
  );

  const statusOptions = [
    { value: 'all', label: 'All Properties', count: totalCount },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'suspended', label: 'Suspended' }
  ];

  return (
      <div className="space-y-8">
        {/* Enhanced Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Properties</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage property listings and approval workflows
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusOptions.slice(1).map((status, index) => {
            const count = properties.filter((p: any) => p.status === status.value).length;
            const colors = [
              { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600' },
              { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'text-emerald-600' },
              { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600' },
              { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'text-gray-600' }
            ];
            const color = colors[index] || colors[0];
            
            return (
              <div key={status.value} className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{status.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{count}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${color.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Building className={`h-6 w-6 ${color.icon}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
          <nav className="flex space-x-1">
            {statusOptions.map((status) => {
              const isActive = statusFilter === status.value;
              return (
                <Link
                  key={status.value}
                  href={`/admin/properties?status=${status.value}`}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {status.label}
                  {status.count && (
                    <span className={`ml-2 py-1 px-2 rounded-lg text-xs font-semibold ${
                      isActive ? 'bg-blue-500 text-blue-100' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {status.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === 'all' 
              ? 'No properties have been created yet.'
              : `No properties with status "${statusFilter}" found.`
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Link
              href={`/admin/properties?page=${currentPage - 1}&status=${statusFilter}`}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/properties?page=${currentPage + 1}&status=${statusFilter}`}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </Link>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * 12 + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 12, totalCount)}
                </span>{' '}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/admin/properties?page=${page}&status=${statusFilter}`}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        )}
      </div>
  );
}