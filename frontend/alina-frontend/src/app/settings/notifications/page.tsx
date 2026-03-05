'use client';

import { useNotificationSettings } from '@/hooks/useSettings';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

export default function NotificationSettingsPage() {
  const toast = useToast();
  const {
    notifications: settings,
    toggleEmailNotification,
    togglePushNotification,
    toggleSmsNotification,
    isSaving,
  } = useNotificationSettings();

  const handleToggle = async (category: 'email' | 'push' | 'sms', key: string) => {
    try {
      if (category === 'email') {
        await toggleEmailNotification(key as any);
      } else if (category === 'push') {
        await togglePushNotification(key as any);
      } else if (category === 'sms') {
        await toggleSmsNotification(key as any);
      }
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Notification Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage how you receive notifications</p>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Notifications</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get email updates about your account</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    orderUpdates: 'Order updates and delivery confirmations',
                    messages: 'New messages from buyers and sellers',
                    promotions: 'Promotional offers and platform updates',
                    weeklyDigest: 'Weekly summary of your activity',
                    newOffers: 'New bids and offers on your tasks',
                    reviews: 'Reviews and ratings notifications',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <span className="text-gray-900 dark:text-white font-medium">{label}</span>
                      <button
                        onClick={() => handleToggle('email', key)}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          settings.email[key as keyof typeof settings.email] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.email[key as keyof typeof settings.email] ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get push notifications on your devices</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    orderUpdates: 'Order status changes',
                    messages: 'New messages',
                    promotions: 'Special offers',
                    newOffers: 'New bids on your tasks',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <span className="text-gray-900 dark:text-white font-medium">{label}</span>
                      <button
                        onClick={() => handleToggle('push', key)}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          settings.push[key as keyof typeof settings.push] ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.push[key as keyof typeof settings.push] ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SMS Notifications</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get text message notifications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries({
                    orderUpdates: 'Order delivery notifications',
                    urgentOnly: 'Urgent alerts only',
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <span className="text-gray-900 dark:text-white font-medium">{label}</span>
                      <button
                        onClick={() => handleToggle('sms', key)}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          settings.sms[key as keyof typeof settings.sms] ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          settings.sms[key as keyof typeof settings.sms] ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                  <div className="flex gap-2">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      SMS notifications may incur charges from your mobile carrier.
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
