'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ onChange, maxFiles = 8 }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
    
    // Create preview URLs
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    onChange([...files, ...newFiles]);
  }, [files, maxFiles, onChange]);

  const removeImage = (index: number) => {
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
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-pink-500 bg-pink-50' 
            : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <input {...getInputProps()} />
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop your images here..."
            : "Drag 'n' drop images here, or click to select"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Up to {maxFiles} images. JPEG, PNG or WebP
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={preview} className="group relative aspect-square">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md 
                  opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100"
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