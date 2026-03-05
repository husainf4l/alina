'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSearchOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
  minChars?: number;
}

export function useSearch<T>({ data, searchKeys, debounceMs = 300, minChars = 0 }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(data);
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.length < minChars) {
      setResults(data);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercaseQuery);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowercaseQuery);
        }
        return false;
      })
    );

    setResults(filtered);
    setIsSearching(false);
  }, [data, searchKeys, minChars]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim() === '') {
      setResults(data);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, performSearch, debounceMs, data]);

  return {
    query,
    setQuery,
    results,
    isSearching,
  };
}
