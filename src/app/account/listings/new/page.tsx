'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ImageUpload } from '@/components/listings/image-upload';

const platforms = [
  { id: 'depop', name: 'Depop', icon: '🛍️' },
  { id: 'poshmark', name: 'Poshmark', icon: '👗' },
  { id: 'ebay', name: 'eBay', icon: '🏪' },
  { id: 'etsy', name: 'Etsy', icon: '🎨' },
  { id: 'mercari', name: 'Mercari', icon: '📦' },
];

export default function NewListingPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const removePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => prev.filter(id => id !== platformId));
  };

  const handleImagesChange = (files: File[]) => {
    setImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for image upload
    const formData = new FormData();
    images.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    try {
      // Upload images first
      const uploadResponse = await fetch('/api/listings/images', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        console.error('Failed to upload images', uploadResponse);
        throw new Error('Failed to upload images');
      }
      
      const { imageUrls } = await uploadResponse.json();

      // Create listing with image URLs
      const listingResponse = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platforms: selectedPlatforms,
          listing: {
            // ... other form data
            images: imageUrls,
          },
        }),
      });

      if (!listingResponse.ok) throw new Error('Failed to create listing');

      // Handle success (redirect or show message)
    } catch (error) {
      // Handle error
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Listing</h1>
        <p className="mt-1 text-gray-600">
          Fill out the details below to create a listing across your favorite platforms.
        </p>
      </header>

      <div className="space-y-6">
        {/* Platform Selection */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Platforms
          </label>
          <div className="space-y-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {selectedPlatforms.length === 0 
                      ? 'Choose platforms' 
                      : `${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} selected`
                    }
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedPlatforms.includes(platform.id) ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Platforms Tags */}
            {selectedPlatforms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map(platformId => {
                  const platform = platforms.find(p => p.id === platformId);
                  return (
                    <div
                      key={platformId}
                      className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-sm text-pink-600"
                    >
                      <span>{platform?.icon}</span>
                      <span>{platform?.name}</span>
                      <button
                        type="button"
                        onClick={() => removePlatform(platformId)}
                        className="ml-1 rounded-full p-0.5 hover:bg-pink-100"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </div>
                  )})}
              </div>
            )}
          </div>
        </div>

        {/* Images Section */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Images
          </h3>
          <ImageUpload onChange={handleImagesChange} />
        </div>

        {/* Listing Details */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter listing title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Describe your item..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative mt-1 rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button>
                Create Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 