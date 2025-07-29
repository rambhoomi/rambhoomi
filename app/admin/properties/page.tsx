import { getProperties } from '@/lib/actions/properties';
import PropertyCard from '@/components/admin/PropertyCard';
import { Building, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

interface PropertiesPageProps {
  searchParams: {
    page?: string;
    status?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const statusFilter = searchParams.status || 'all';
  
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-2">
            Manage property listings and approval workflows
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statusOptions.slice(1).map((status) => {
          const count = properties.filter(p => p.status === status.value).length;
          return (
            <div key={status.value} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
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
            return (
              <Link
                key={status.value}
                href={`/admin/properties?status=${status.value}`}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {status.label}
                {status.count && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'
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
          {properties.map((property) => (
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