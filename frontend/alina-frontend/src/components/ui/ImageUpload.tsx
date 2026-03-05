'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

interface ImageUploadProps {
  onUpload: (files: File[]) => void | Promise<void>;
  multiple?: boolean;
  maxSize?: number; // in MB
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  multiple = false,
  maxSize = 5,
  accept = 'image/*',
  maxFiles = 5,
  className = '',
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File ${file.name} is too large. Maximum size is ${maxSize}MB`);
      return false;
    }

    // Check file type against accept pattern
    const acceptedTypes = accept.split(',').map(t => t.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    const isAccepted = acceptedTypes.some(acceptType => {
      if (acceptType.startsWith('.')) {
        // Extension-based check
        return fileExtension === acceptType.toLowerCase();
      } else if (acceptType.includes('*')) {
        // Wildcard check (e.g., image/*)
        const [type] = acceptType.split('/');
        return mimeType.startsWith(type);
      } else {
        // Exact MIME type check
        return mimeType === acceptType;
      }
    });

    if (!isAccepted) {
      toast.error(`File type not allowed. Accepted: ${accept}`);
      return false;
    }

    // Additional security: Check for script files
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.js', '.vbs'];
    if (dangerousExtensions.some(ext => fileExtension === ext)) {
      toast.error('Executable files are not allowed');
      return false;
    }

    // Check minimum file size (prevent empty files)
    if (file.size < 100) {
      toast.error(`File ${file.name} is too small or empty`);
      return false;
    }

    return true;
  };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).filter(validateFile);

    if (!multiple && newFiles.length > 1) {
      toast.warning('Only one file can be uploaded at a time');
      return;
    }

    if (files.length + newFiles.length > maxFiles) {
      toast.warning(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    
    setPreviews((prev) => [...prev, ...newPreviews]);
    setFiles((prev) => {
      const updated = [...prev, ...newFiles];
      onUpload(updated);
      return updated;
    });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onUpload(updated);
      return updated;
    });
  };

  const clearAll = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews([]);
    setFiles([]);
    onUpload([]);
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-3xl p-8 transition-all cursor-pointer
          ${isDragging 
            ? 'border-gray-900 bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-center">
          {/* Upload Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop your {multiple ? 'images' : 'image'} here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Max {maxSize}MB • {accept.replace('image/', '').toUpperCase()}
            {multiple && ` • Up to ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              {previews.length} {previews.length === 1 ? 'file' : 'files'} selected
            </h4>
            <button
              onClick={clearAll}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-2xl border-2 border-gray-100"
                />
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* File Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white truncate">
                    {files[index]?.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {(files[index]?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
