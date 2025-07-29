import { MessageSquare, Clock, User } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Monitor communications between guests and property owners
        </p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <MessageSquare className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Message Management</h3>
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
          This feature is coming soon. You'll be able to monitor and moderate user communications here.
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Flagged Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Active Conversations</div>
          </div>
        </div>
      </div>
    </div>
  );
}