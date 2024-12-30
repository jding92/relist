import Link from 'next/link';
import { Button } from './button';

export function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-pink-600">
          ReList
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/features" className="text-gray-600 hover:text-pink-600 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-pink-600 transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
            Get started free
          </Button>
        </div>
      </div>
    </nav>
  );
} 