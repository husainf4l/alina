'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 0.8,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef);
      }
    };
  }, [handleObserver, threshold]);

  return { loadMoreRef };
}

interface InfiniteScrollProps {
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  loader,
  endMessage,
}: InfiniteScrollProps) {
  const { loadMoreRef } = useInfiniteScroll({ 
    onLoadMore, 
    hasMore, 
    isLoading 
  });

  const defaultLoader = (
    <div className="flex justify-center items-center py-8">
      <svg className="w-8 h-8 animate-spin text-gray-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-8 text-gray-500">
      <p>That's all for now!</p>
    </div>
  );

  return (
    <div ref={loadMoreRef} className="w-full">
      {isLoading && (loader || defaultLoader)}
      {!hasMore && !isLoading && (endMessage || defaultEndMessage)}
    </div>
  );
}
