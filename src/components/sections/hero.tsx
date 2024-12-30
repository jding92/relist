import { Button } from '../ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="text-pink-600 font-medium mb-4">Your listing assistant</span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sell more with less work
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Let ReList handle the busy work while you focus on the fun stuff: shopping, styling, and selling. 
              We'll help you manage listings across all your favorite platforms with ease. ✨
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Start your journey
              </Button>
              <Button variant="outline" size="lg" className="hover:bg-pink-50">
                See how it works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
              {/* Placeholder for dashboard preview image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 to-purple-100/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 