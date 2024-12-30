import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="mt-1 text-gray-600">
          Connect your marketplace accounts to start cross-posting.
        </p>
      </header>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Depop</h3>
              <p className="text-sm text-gray-500">Connect your Depop shop to cross-post listings</p>
            </div>
            <Button
              onClick={() => window.location.href = '/api/auth/depop'}
            >
              Connect Depop
            </Button>
          </div>
          {/* Add more platforms here */}
        </div>
      </div>
    </div>
  );
}