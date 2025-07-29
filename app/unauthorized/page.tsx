import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">
            You don't have permission to access the admin dashboard. 
            Please contact an administrator if you believe this is an error.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Login
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}