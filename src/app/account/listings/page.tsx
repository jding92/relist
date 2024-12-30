import Link from "next/link";
import {
  EllipsisHorizontalIcon,
  PlusCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

export default function ListingsPage() {
  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="mt-1 text-gray-600">
            Manage your listings across all platforms
          </p>
        </div>
        <Link 
          href="/account/listings/new"
          className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 inline-flex items-center gap-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          New Listing
        </Link>
      </header>

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option>All Platforms</option>
            <option>Depop</option>
            <option>Poshmark</option>
            <option>eBay</option>
            <option>Etsy</option>
            <option>Mercari</option>
          </select>

          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Draft</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Sample Listing Card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="relative aspect-square mb-4">
              <img
                src="https://placehold.co/400"
                alt="Product"
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-600">
                  🛍️ Depop
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Vintage Denim Jacket</h3>
                <span className="text-green-600 font-medium">$89.00</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  Active
                </span>
                <span className="text-sm text-gray-500">
                  Listed 2 days ago
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-500">
                  3 likes • 12 views
                </div>
                <button className="rounded-lg p-2 hover:bg-gray-50">
                  <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Sample Draft Card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="relative aspect-square mb-4 bg-gray-100 flex items-center justify-center">
              <PhotoIcon className="h-12 w-12 text-gray-400" />
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  Draft
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Summer Dress</h3>
              <div className="text-sm text-gray-500">
                Last edited 1 hour ago
              </div>

              <div className="flex items-center justify-between pt-2">
                <button className="text-sm text-pink-600 hover:text-pink-700">
                  Continue editing
                </button>
                <button className="rounded-lg p-2 hover:bg-gray-50">
                  <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}