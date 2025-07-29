import { Settings, Shield, Bell, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure platform settings and administrative preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-gray-500">Security</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
          <p className="text-gray-600 text-sm">
            Manage authentication, access controls, and security policies.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Bell className="h-8 w-8 text-green-600" />
            <span className="text-sm text-gray-500">Notifications</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Settings</h3>
          <p className="text-gray-600 text-sm">
            Configure email alerts, push notifications, and admin alerts.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Globe className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-gray-500">Platform</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Settings</h3>
          <p className="text-gray-600 text-sm">
            General platform configuration, branding, and localization.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Database className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-gray-500">Database</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Management</h3>
          <p className="text-gray-600 text-sm">
            Database backups, maintenance, and performance monitoring.
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-12">
        <Settings className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Settings Management</h3>
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
          Detailed settings configuration is coming soon. Basic platform operations are ready.
        </p>
      </div>
    </div>
  );
}