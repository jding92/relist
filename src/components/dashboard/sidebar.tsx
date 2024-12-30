'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  HomeIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/account', icon: HomeIcon },
  { name: 'Listings', href: '/account/listings', icon: ShoppingBagIcon },
  { name: 'Analytics', href: '/account/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'flex-shrink-0 border-r border-gray-100 bg-white transition-all duration-300 ease-in-out',
        {
          'w-24': !isExpanded,
          'w-55': isExpanded,
        }
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-4">
          <Link
            href="/account/new-listing"
            className={clsx(
              'flex items-center gap-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-all duration-200',
              {
                'h-10 w-10 justify-center': !isExpanded,
                'px-4 py-2': isExpanded,
              }
            )}
          >
            <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
            <span
              className={clsx('text-sm font-medium transition-all duration-100', {
                'opacity-0 w-0 invisible': !isExpanded,
                'opacity-100 visible': isExpanded,
              })}
            >
              Create Listing
            </span>
          </Link>

          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-2 rounded-lg transition-all duration-200',
                  {
                    'h-10 w-10 justify-center': !isExpanded,
                    'px-3 py-2': isExpanded,
                    'bg-pink-50 text-pink-600': isActive,
                    'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !isActive,
                  }
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={clsx('text-sm font-medium whitespace-nowrap transition-all duration-100', {
                    'opacity-0 w-0 invisible': !isExpanded,
                    'opacity-100 visible': isExpanded,
                  })}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 