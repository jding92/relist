import Link from 'next/link';
import { Button } from '../ui/button';
import { BellIcon } from '@heroicons/react/24/outline';

export function DashboardNav() {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/account" className="text-xl font-bold text-pink-600">
          ReList
        </Link>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-200 to-purple-200" />
        </div>
      </div>
    </nav>
  );
} 