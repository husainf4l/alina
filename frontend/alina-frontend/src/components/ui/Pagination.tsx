'use client';

import React from 'react';

interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show (default: 7) */
  maxPageButtons?: number;
  /** Show first/last buttons (default: true) */
  showFirstLast?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Pagination Component
 * 
 * Displays pagination controls for navigating through pages of content.
 * 
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 * 
 * <Pagination
 *   currentPage={page}
 *   totalPages={10}
 *   onPageChange={setPage}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 7,
  showFirstLast = true,
  className = '',
}: PaginationProps) {
  // Generate array of page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfMax = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - halfMax);
    let end = Math.min(totalPages, currentPage + halfMax);

    // Adjust if we're near the start or end
    if (currentPage <= halfMax) {
      end = maxPageButtons;
    } else if (currentPage >= totalPages - halfMax) {
      start = totalPages - maxPageButtons + 1;
    }

    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis');
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label="Pagination">
      {/* First Page Button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          className={`
            px-3 py-2 rounded-xl font-semibold transition-all
            ${isFirstPage
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }
          `}
          aria-label="First page"
          title="First page"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`
          px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2
          ${isFirstPage
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
          }
        `}
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500 dark:text-gray-500"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                min-w-[40px] px-3 py-2 rounded-xl font-semibold transition-all
                ${isActive
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 hover:scale-105'
                }
              `}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`
          px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2
          ${isLastPage
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
          }
        `}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
          className={`
            px-3 py-2 rounded-xl font-semibold transition-all
            ${isLastPage
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }
          `}
          aria-label="Last page"
          title="Last page"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
}

/**
 * Simple Pagination
 * Minimal pagination with just prev/next and page info
 */
export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`
          px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
          ${isFirstPage
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Page <span className="font-bold text-gray-900 dark:text-white">{currentPage}</span> of{' '}
        <span className="font-bold text-gray-900 dark:text-white">{totalPages}</span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`
          px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
          ${isLastPage
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
          }
        `}
      >
        Next
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Pagination Info
 * Shows "Showing X to Y of Z results"
 */
export function PaginationInfo({
  currentPage,
  itemsPerPage,
  totalItems,
  className = '',
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      Showing <span className="font-semibold text-gray-900 dark:text-white">{start}</span> to{' '}
      <span className="font-semibold text-gray-900 dark:text-white">{end}</span> of{' '}
      <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> results
    </div>
  );
}

/**
 * Items Per Page Selector
 * Dropdown to select number of items per page
 */
export function ItemsPerPageSelector({
  value,
  onChange,
  options = [10, 25, 50, 100],
  className = '',
}: {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="items-per-page" className="text-sm text-gray-600 dark:text-gray-400">
        Show:
      </label>
      <select
        id="items-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
    </div>
  );
}
