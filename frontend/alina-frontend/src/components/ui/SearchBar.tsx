'use client';

import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Input } from '@/components/ui/Input';

interface SearchBarProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  onResultsChange: (results: T[]) => void;
  placeholder?: string;
  debounceMs?: number;
  minChars?: number;
}

export function SearchBar<T>({
  data,
  searchKeys,
  onResultsChange,
  placeholder = 'Search...',
  debounceMs = 300,
  minChars = 0,
}: SearchBarProps<T>) {
  const { query, setQuery, results, isSearching } = useSearch({
    data,
    searchKeys,
    debounceMs,
    minChars,
  });

  React.useEffect(() => {
    onResultsChange(results);
  }, [results, onResultsChange]);

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        icon={
          isSearching ? (
            <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )
        }
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
