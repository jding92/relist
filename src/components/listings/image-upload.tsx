'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  isUploading?: boolean;
  uploadProgress?: number;
}

export function ImageUpload({ 
  onChange, 
  maxFiles = 8,
  isUploading = false,
  uploadProgress = 0
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setError(null);
      const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
      
      // Validate file sizes (e.g., max 5MB each)
      const invalidFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (invalidFiles.length > 0) {
        throw new Error('Some files are too large. Maximum size is 5MB.');
      }

      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setFiles(prev => [...prev, ...newFiles]);
      setPreviews(prev => [...prev, ...newPreviews]);
      onChange([...files, ...newFiles]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process images');
    }
  }, [files, maxFiles, onChange]);

  const removeImage = (index: number) => {
    if (isUploading) return;
    
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Cleanup old preview URL
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - files.length,
    disabled: isUploading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        <PhotoIcon className={`mx-auto h-12 w-12 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
          {error ? error : (
            isDragActive
              ? "Drop your images here..."
              : isUploading
                ? "Uploading..."
                : "Drag 'n' drop images here, or click to select"
          )}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Up to {maxFiles} images. JPEG, PNG or WebP (max 5MB each)
        </p>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-1 bg-gray-100">
              <div 
                className="h-full bg-pink-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={preview} className="group relative aspect-square">
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className={`absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md 
                  transition-opacity hover:bg-gray-100
                  ${isUploading ? 'opacity-0' : 'group-hover:opacity-100 opacity-0'}`}
                disabled={isUploading}
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-pink-600 px-2 py-0.5 
                  text-xs text-white shadow-sm">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 