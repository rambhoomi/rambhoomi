import { Star, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600 mt-2">
          Manage property reviews and ratings from guests
        </p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <Star className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Review Management</h3>
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
          This feature is coming soon. You'll be able to moderate reviews and ratings here.
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Flagged Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}