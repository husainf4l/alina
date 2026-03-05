'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type SettingsTab = 'general' | 'fees' | 'features' | 'security';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Alina Marketplace',
      siteDescription: 'Professional freelance services marketplace',
      contactEmail: 'support@alina.com',
      maintenanceMode: false,
    },
    fees: {
      serviceFee: 5,
      sellerCommission: 10,
      withdrawalFee: 2,
      minimumWithdrawal: 20,
    },
    features: {
      gigMarketplace: true,
      taskMarketplace: true,
      disputes: true,
      chat: true,
      analytics: true,
      subscriptions: false,
    },
    security: {
      twoFactorRequired: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (section: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // TODO: Map settings to backend API format
      // Backend expects: { platformFee, minWithdrawal, maxWithdrawal, maintenanceMode, allowNewSignups }
      // Frontend has: { general, fees, features, security }
      // Need to create a mapping function or update backend to accept nested format
      
      console.log('Settings saved successfully');
      setHasChanges(false);
      
      // For now, just save to local state
      // In a real implementation, would:
      // const { adminService } = await import('@/lib/api/services/admin.service');
      // await adminService.updateSettings(mappedSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
      // Error handling would show toast notification
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      try {
        // Reset to default settings
        const defaultSettings = {
          general: {
            siteName: 'Alina Marketplace',
            siteDescription: 'Professional freelance services marketplace',
            contactEmail: 'support@alina.com',
            maintenanceMode: false,
          },
          fees: {
            serviceFee: 5,
            sellerCommission: 10,
            withdrawalFee: 2,
            minimumWithdrawal: 20,
          },
          features: {
            gigMarketplace: true,
            taskMarketplace: true,
            disputes: true,
            chat: true,
            analytics: true,
            subscriptions: false,
          },
          security: {
            twoFactorRequired: false,
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            passwordMinLength: 8,
          },
        };
        
        setSettings(defaultSettings);
        setHasChanges(false);
        console.log('Settings reset to default');
      } catch (error) {
        console.error('Failed to reset settings:', error);
        // Error handling would show toast notification
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-5xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
                ← Back to Admin Dashboard
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Platform Settings</h1>
                  <p className="text-gray-600 dark:text-gray-400">Configure platform-wide settings and features</p>
                </div>
                {hasChanges && (
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-2 mb-6">
              <div className="flex gap-2">
                {([
                  { key: 'general', label: 'General', icon: '🔧' },
                  { key: 'fees', label: 'Fees & Pricing', icon: '💰' },
                  { key: 'features', label: 'Features', icon: '⚡' },
                  { key: 'security', label: 'Security', icon: '🔒' },
                ] as const).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-3 rounded-2xl font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Content */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">General Settings</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Site Description
                    </label>
                    <textarea
                      rows={3}
                      value={settings.general.siteDescription}
                      onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                    <div>
                      <h3 className="font-bold text-yellow-900 dark:text-yellow-100">Maintenance Mode</h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Enable to temporarily disable access to the platform
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.general.maintenanceMode}
                        onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Fees & Pricing */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fees & Pricing</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Configure platform fees and commission rates
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Service Fee (%)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="0.5"
                        value={settings.fees.serviceFee}
                        onChange={(e) => updateSetting('fees', 'serviceFee', parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-16 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center font-bold">
                        {settings.fees.serviceFee}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Fee charged to buyers on each transaction
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Seller Commission (%)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={settings.fees.sellerCommission}
                        onChange={(e) => updateSetting('fees', 'sellerCommission', parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-16 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center font-bold">
                        {settings.fees.sellerCommission}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Commission taken from seller&apos;s earnings
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Withdrawal Fee ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={settings.fees.withdrawalFee}
                      onChange={(e) => updateSetting('fees', 'withdrawalFee', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Fixed fee for each withdrawal
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Minimum Withdrawal ($)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={settings.fees.minimumWithdrawal}
                      onChange={(e) => updateSetting('fees', 'minimumWithdrawal', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum amount required to withdraw funds
                    </p>
                  </div>
                </div>
              )}

              {/* Features */}
              {activeTab === 'features' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Features</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enable or disable platform features
                    </p>
                  </div>

                  {Object.entries(settings.features).map(([key, enabled]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'gigMarketplace' && 'Enable gig marketplace for sellers to offer services'}
                          {key === 'taskMarketplace' && 'Enable task marketplace for buyers to post jobs'}
                          {key === 'disputes' && 'Allow users to open disputes for order issues'}
                          {key === 'chat' && 'Enable direct messaging between users'}
                          {key === 'analytics' && 'Provide analytics dashboard for users'}
                          {key === 'subscriptions' && 'Enable subscription-based services (beta)'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => updateSetting('features', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Configure security and authentication policies
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <div>
                      <h3 className="font-bold text-blue-900 dark:text-blue-100">
                        Require Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Enforce 2FA for all user accounts
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorRequired}
                        onChange={(e) => updateSetting('security', 'twoFactorRequired', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1440"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Automatically log users out after this period of inactivity
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Lock account after this many failed login attempts
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      min="6"
                      max="32"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Required minimum password length for all accounts
                    </p>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {hasChanges && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={handleSave}>
                      Save All Changes
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Reset to Defaults
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
