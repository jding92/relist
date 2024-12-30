import { Button } from '@/components/ui/button';
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Active Listings',
    value: '127',
    change: '12%',
    trend: 'up',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Total Sales',
    value: '$2,847',
    change: '8%',
    trend: 'up',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Total Views',
    value: '3.2K',
    change: '15%',
    trend: 'up',
    icon: EyeIcon,
  },
  {
    name: 'Conversion Rate',
    value: '2.4%',
    change: '0.5%',
    trend: 'up',
    icon: ArrowTrendingUpIcon,
  },
];

const recentActivity = [
  {
    type: 'sale',
    item: 'Vintage Denim Jacket',
    platform: 'Depop',
    price: '$45.00',
    time: '2 hours ago',
  },
  {
    type: 'listing',
    item: 'Summer Dress Collection',
    platform: 'All Platforms',
    time: '4 hours ago',
  },
  {
    type: 'offer',
    item: 'Leather Crossbody Bag',
    platform: 'Poshmark',
    price: '$28.00',
    time: '6 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah! ✨</h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your shop today.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.change} from last month
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 to-purple-200" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.item}</p>
                  <p className="text-sm text-gray-600">
                    {activity.type === 'sale' && '🎉 Sold on '}
                    {activity.type === 'listing' && '📝 Listed on '}
                    {activity.type === 'offer' && '💬 Offer received on '}
                    {activity.platform}
                  </p>
                </div>
                <div className="text-right">
                  {activity.price && (
                    <p className="font-medium text-gray-900">{activity.price}</p>
                  )}
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Platform Performance</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
} 