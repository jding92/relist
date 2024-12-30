import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  CloudArrowUpIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'List Once, Sell Everywhere',
    description: 'Create a listing once and let ReList share it across all your favorite platforms automatically.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Smart Insights',
    description: 'Get friendly insights about your shop\'s performance and tips to help you grow.',
    icon: ChartBarIcon,
  },
  {
    name: 'Price Like a Pro',
    description: 'Take the guesswork out of pricing with our smart suggestions based on real market data.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'More Time for You',
    description: 'Spend less time on repetitive tasks and more time on what matters to you.',
    icon: ClockIcon,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="text-pink-600 font-medium">Why sellers love ReList</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your perfect selling companion
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            We've thought of everything you need to make selling a breeze. ✨
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="relative group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-600 text-white transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 