'use client';

import { useState } from 'react';
import { Eye, MoreVertical, MapPin, Users, Bed, Bath, Calendar } from 'lucide-react';
import { updatePropertyStatus, deleteProperty } from '@/lib/actions/properties';
import { Property } from '@/lib/types/database';

interface PropertyCardProps {
  property: any; // Extended property with profile data
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status: 'approved' | 'rejected' | 'suspended') => {
    setLoading(true);
    try {
      await updatePropertyStatus(property.id, status);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to update property status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this property?')) {
      setLoading(true);
      try {
        await deleteProperty(property.id);
      } catch (error) {
        console.error('Failed to delete property:', error);
      } finally {
        setLoading(false);
      }
    }
  };

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="aspect-video bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
            property.status === 'approved' ? 'bg-green-100 text-green-800' :
            property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            property.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              disabled={loading}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {/* Navigate to property details */}}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="mr-3 h-4 w-4" />
                    View Details
                  </button>
                  {property.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate('approved')}
                        className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                        disabled={loading}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate('rejected')}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        disabled={loading}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleStatusUpdate('suspended')}
                    className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                    disabled={loading}
                  >
                    Suspend
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {property.title}
          </h3>
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(property.price_per_night)}/night
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.state}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {property.max_guests} guests
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.bedrooms} bed
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.bathrooms} bath
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Owner</p>
              <p className="font-medium text-gray-900">
                {property.profiles?.full_name || 'Unknown Owner'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Created</p>
              <p className="font-medium text-gray-900">
                {formatDate(property.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}