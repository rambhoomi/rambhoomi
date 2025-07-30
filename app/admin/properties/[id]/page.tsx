import { getProperty } from '@/lib/actions/properties';
import { ArrowLeft, MapPin, Users, Bed, Bath, DollarSign, Calendar, Shield, Home } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = await params;
  
  try {
    const property = await getProperty(id);
    
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/properties"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-600 mt-1">Property Details</p>
          </div>
          <div className="ml-auto">
            <span className={`inline-flex px-4 py-2 text-sm font-medium rounded-full ${
              property.status === 'approved' ? 'bg-green-100 text-green-800' :
              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              property.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Images</h2>
              </div>
              <div className="p-6">
                {property.property_images && property.property_images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.property_images.map((image: any, index: number) => (
                      <div key={image.id} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={image.image_url} 
                          alt={image.image_alt || `Property image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Home className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-gray-500 mt-2">No images uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-900">{property.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Guests</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{property.max_guests}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Bed className="h-4 w-4 mr-2" />
                      <span className="text-sm">Bedrooms</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{property.bedrooms}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Bath className="h-4 w-4 mr-2" />
                      <span className="text-sm">Bathrooms</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{property.bathrooms}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Home className="h-4 w-4 mr-2" />
                      <span className="text-sm">Type</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{property.property_type}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
                  {property.amenities && property.amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No amenities listed</p>
                  )}
                </div>

                {property.house_rules && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">House Rules</h3>
                    <p className="text-gray-900">{property.house_rules}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Location</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{property.address}</p>
                  <p className="text-gray-600">
                    {property.city}, {property.state} {property.postal_code}
                  </p>
                  <p className="text-gray-600">{property.country}</p>
                  {(property.latitude && property.longitude) && (
                    <p className="text-sm text-gray-500">
                      Coordinates: {property.latitude}, {property.longitude}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per night</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(Number(property.price_per_night))}
                  </span>
                </div>
                {Number(property.cleaning_fee) > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">
                      {formatCurrency(Number(property.cleaning_fee))}
                    </span>
                  </div>
                )}
                {Number(property.security_deposit) > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Security deposit</span>
                    <span className="text-gray-900">
                      {formatCurrency(Number(property.security_deposit))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Rules */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Booking Rules</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Check-in</span>
                  <span className="text-gray-900">{property.check_in_time || '3:00 PM'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Check-out</span>
                  <span className="text-gray-900">{property.check_out_time || '11:00 AM'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minimum stay</span>
                  <span className="text-gray-900">{property.minimum_stay || 1} night(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maximum stay</span>
                  <span className="text-gray-900">{property.maximum_stay || 30} night(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cancellation</span>
                  <span className="text-gray-900 capitalize">{property.cancellation_policy || 'Moderate'}</span>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Owner Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-gray-600 text-sm">Name</span>
                  <p className="text-gray-900 font-medium">
                    {property.profiles?.full_name || 'Unknown Owner'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Email</span>
                  <p className="text-gray-900">{property.profiles?.email || 'No email provided'}</p>
                </div>
                {property.profiles?.phone && (
                  <div>
                    <span className="text-gray-600 text-sm">Phone</span>
                    <p className="text-gray-900">{property.profiles.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Property Info</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-gray-600 text-sm">Created</span>
                  <p className="text-gray-900">{formatDate(property.created_at)}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Last Updated</span>
                  <p className="text-gray-900">{formatDate(property.updated_at)}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Property ID</span>
                  <p className="text-gray-900 font-mono text-sm">{property.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}