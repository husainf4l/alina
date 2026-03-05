'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/useAuth';

interface ProfileField {
  key: string;
  label: string;
  completed: boolean;
  href: string;
}

interface ProfileCompletionWidgetProps {
  className?: string;
  compact?: boolean;
}

/**
 * Profile Completion Widget
 * 
 * Displays user's profile completion percentage and encourages them to complete missing fields.
 * Gamification element to improve profile quality and engagement.
 */
export function ProfileCompletionWidget({ className = '', compact = false }: ProfileCompletionWidgetProps) {
  const { data: user } = useCurrentUser();

  const profileFields: ProfileField[] = useMemo(() => {
    if (!user) return [];

    return [
      {
        key: 'avatar',
        label: 'Profile Photo',
        completed: !!user.avatar || !!user.profileImage,
        href: '/settings/profile',
      },
      {
        key: 'bio',
        label: 'Bio/Description',
        completed: !!user.bio && user.bio.length >= 50,
        href: '/settings/profile',
      },
      {
        key: 'phone',
        label: 'Phone Number',
        completed: !!user.phone || !!user.phoneNumber,
        href: '/settings/profile',
      },
      {
        key: 'location',
        label: 'Location',
        completed: !!user.location || !!user.city,
        href: '/settings/profile',
      },
      {
        key: 'skills',
        label: 'Skills',
        completed: !!(user.skills && user.skills.length >= 3),
        href: '/settings/profile',
      },
      {
        key: 'portfolio',
        label: 'Portfolio Items',
        completed: !!(user.portfolio && user.portfolio.length >= 1),
        href: '/settings/profile',
      },
      {
        key: 'verified',
        label: 'Email Verified',
        completed: !!user.isEmailVerified || !!user.emailVerified,
        href: '/settings',
      },
    ];
  }, [user]);

  const completedCount = profileFields.filter((f) => f.completed).length;
  const totalCount = profileFields.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Don't show if profile is 100% complete
  if (completionPercentage === 100) {
    return null;
  }

  // Determine card styling based on completion
  const getCompletionColor = () => {
    if (completionPercentage >= 80) return 'from-green-500 to-emerald-500';
    if (completionPercentage >= 60) return 'from-blue-500 to-cyan-500';
    if (completionPercentage >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getCompletionMessage = () => {
    if (completionPercentage >= 80) return 'Almost there! Just a few more fields.';
    if (completionPercentage >= 60) return 'Good progress! Keep going.';
    if (completionPercentage >= 40) return 'You\'re halfway there!';
    return 'Complete your profile to stand out.';
  };

  const incompletedFields = profileFields.filter((f) => !f.completed);

  if (compact) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Profile Completion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{completionPercentage}% Complete</p>
            </div>
          </div>
          <Link
            href="/settings/profile"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Complete →
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${getCompletionColor()} transition-all duration-500`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getCompletionColor()} rounded-2xl flex items-center justify-center shadow-lg`}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Profile Completion
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {getCompletionMessage()}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {completionPercentage}%
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedCount} of {totalCount}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${getCompletionColor()} transition-all duration-500 relative`}
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Missing Fields */}
      {incompletedFields.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Complete these to boost your profile:
          </h4>
          <div className="space-y-2">
            {incompletedFields.slice(0, 3).map((field) => (
              <Link
                key={field.key}
                href={field.href}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 group border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {field.label}
                  </span>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {incompletedFields.length > 3 && (
            <Link
              href="/settings/profile"
              className="mt-4 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all {incompletedFields.length} missing fields →
            </Link>
          )}
        </div>
      )}

      {/* Benefits */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Benefits of a Complete Profile:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400">Higher visibility</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400">More trust</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400">Better matches</span>
          </div>
        </div>
      </div>
    </div>
  );
}
