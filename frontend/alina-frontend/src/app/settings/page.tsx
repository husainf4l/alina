'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

export default function SettingsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced web developer specializing in React and Node.js',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
  });

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailOrders: true,
    emailMessages: true,
    emailMarketing: false,
    pushOrders: true,
    pushMessages: true,
    pushPromotions: false,
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (!/[A-Z]/.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one number');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one special character (!@#$%^&*)');
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully!');
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Notification preferences saved!');
  };

  const handleSavePrivacy = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Privacy settings updated!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'privacy', label: 'Privacy', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <ProtectedRoute>
      <PageTransition>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Tabs Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-3xl p-4 border border-gray-100 space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all
                          ${
                            activeTab === tab.id
                              ? 'bg-gray-900 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                        </svg>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                          <p className="text-gray-600">Update your personal information</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="First Name"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          />
                          <Input
                            label="Last Name"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          />
                        </div>

                        <Input
                          label="Email Address"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />

                        <Input
                          label="Phone Number"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea
                            rows={4}
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 outline-none transition-all resize-none"
                          />
                        </div>

                        <Input
                          label="Location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />

                        <Input
                          label="Website"
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        />

                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleSaveProfile} isLoading={isSaving}>
                            Save Changes
                          </Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h2>
                          <p className="text-gray-600">Update your password to keep your account secure</p>
                        </div>

                        <Input
                          label="Current Password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        />

                        <Input
                          label="New Password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          helperText="Must be at least 8 characters"
                        />

                        <Input
                          label="Confirm New Password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        />

                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleChangePassword} isLoading={isSaving}>
                            Update Password
                          </Button>
                          <Button variant="outline">Cancel</Button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                          <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                          <Button variant="secondary">Enable 2FA</Button>
                        </div>
                      </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                          <p className="text-gray-600">Choose how you want to be notified</p>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-4">Email Notifications</h3>
                            <div className="space-y-3">
                              {[
                                { key: 'emailOrders', label: 'Order updates', description: 'Notifications about your orders and sales' },
                                { key: 'emailMessages', label: 'New messages', description: 'When you receive a new message' },
                                { key: 'emailMarketing', label: 'Marketing emails', description: 'Tips, offers, and promotions' },
                              ].map((item) => (
                                <label key={item.key} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">{item.label}</div>
                                    <div className="text-sm text-gray-600">{item.description}</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                                    onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                                    className="w-5 h-5 text-gray-900 rounded focus:ring-2 focus:ring-gray-900"
                                  />
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Push Notifications</h3>
                            <div className="space-y-3">
                              {[
                                { key: 'pushOrders', label: 'Order updates', description: 'Push notifications for order status' },
                                { key: 'pushMessages', label: 'New messages', description: 'Instant message notifications' },
                                { key: 'pushPromotions', label: 'Promotions', description: 'Special offers and deals' },
                              ].map((item) => (
                                <label key={item.key} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">{item.label}</div>
                                    <div className="text-sm text-gray-600">{item.description}</div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                                    onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                                    className="w-5 h-5 text-gray-900 rounded focus:ring-2 focus:ring-gray-900"
                                  />
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleSaveNotifications} isLoading={isSaving}>
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Privacy Tab */}
                    {activeTab === 'privacy' && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h2>
                          <p className="text-gray-600">Control who can see your information</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                            <select
                              value={privacySettings.profileVisibility}
                              onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 outline-none"
                            >
                              <option value="public">Public - Anyone can see your profile</option>
                              <option value="registered">Registered users only</option>
                              <option value="private">Private - Only you can see your profile</option>
                            </select>
                          </div>

                          <div className="space-y-3 pt-4">
                            {[
                              { key: 'showEmail', label: 'Show email address', description: 'Display your email on your profile' },
                              { key: 'showPhone', label: 'Show phone number', description: 'Display your phone on your profile' },
                              { key: 'allowMessages', label: 'Allow messages', description: 'Let others send you messages' },
                            ].map((item) => (
                              <label key={item.key} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{item.label}</div>
                                  <div className="text-sm text-gray-600">{item.description}</div>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                                  onChange={(e) => setPrivacySettings({ ...privacySettings, [item.key]: e.target.checked })}
                                  className="w-5 h-5 text-gray-900 rounded focus:ring-2 focus:ring-gray-900"
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button onClick={handleSavePrivacy} isLoading={isSaving}>
                            Save Settings
                          </Button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-4 text-red-600">Danger Zone</h3>
                          <p className="text-gray-600 mb-4">Permanently delete your account and all your data</p>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
