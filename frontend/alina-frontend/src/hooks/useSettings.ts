/**
 * Settings Persistence Hook
 * 
 * Manages user settings with localStorage fallback and backend sync.
 * Provides type-safe settings management with automatic persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { useCurrentUser } from './useAuth';

export interface UserSettings {
  // UI Preferences
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  
  // Notification Preferences
  notifications: {
    email: {
      orderUpdates: boolean;
      messages: boolean;
      promotions: boolean;
      weeklyDigest: boolean;
      newOffers: boolean;
      reviews: boolean;
    };
    push: {
      orderUpdates: boolean;
      messages: boolean;
      promotions: boolean;
      newOffers: boolean;
    };
    sms: {
      orderUpdates: boolean;
      urgentOnly: boolean;
    };
  };
  
  // Privacy Settings
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  };
  
  // Dashboard Preferences
  dashboard: {
    defaultView: 'seller' | 'buyer';
    showWelcomeMessage: boolean;
    compactMode: boolean;
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  
  notifications: {
    email: {
      orderUpdates: true,
      messages: true,
      promotions: false,
      weeklyDigest: true,
      newOffers: true,
      reviews: true,
    },
    push: {
      orderUpdates: true,
      messages: true,
      promotions: false,
      newOffers: false,
    },
    sms: {
      orderUpdates: false,
      urgentOnly: true,
    },
  },
  
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showOnlineStatus: true,
  },
  
  dashboard: {
    defaultView: 'seller',
    showWelcomeMessage: true,
    compactMode: false,
  },
};

/**
 * Hook for managing user settings with persistence
 * Settings are stored in localStorage and synced with backend when available
 */
export function useSettings() {
  const { data: user } = useCurrentUser();
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Storage key based on user ID
  const getStorageKey = () => {
    return user?.id ? `alina_settings_${user.id}` : 'alina_settings_guest';
  };

  // Load settings from localStorage
  const loadLocalSettings = useCallback((): UserSettings => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
    return DEFAULT_SETTINGS;
  }, [user?.id]);

  // Save settings to localStorage
  const saveLocalSettings = useCallback((newSettings: UserSettings) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(newSettings));
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  }, [user?.id]);

  // Load settings on mount or user change
  useEffect(() => {
    setIsLoading(true);
    const loadedSettings = loadLocalSettings();
    setSettings(loadedSettings);
    setIsLoading(false);
  }, [user?.id, loadLocalSettings]);

  // Update settings (deep merge)
  const updateSettings = useCallback(
    async (updates: Partial<UserSettings>) => {
      const newSettings = {
        ...settings,
        ...updates,
        notifications: {
          ...settings.notifications,
          ...(updates.notifications || {}),
          email: {
            ...settings.notifications.email,
            ...(updates.notifications?.email || {}),
          },
          push: {
            ...settings.notifications.push,
            ...(updates.notifications?.push || {}),
          },
          sms: {
            ...settings.notifications.sms,
            ...(updates.notifications?.sms || {}),
          },
        },
        privacy: {
          ...settings.privacy,
          ...(updates.privacy || {}),
        },
        dashboard: {
          ...settings.dashboard,
          ...(updates.dashboard || {}),
        },
      };

      setSettings(newSettings);
      saveLocalSettings(newSettings);

      // TODO: Sync with backend API when available
      // if (user?.id) {
      //   try {
      //     setIsSaving(true);
      //     await apiClient.put('/api/users/settings', newSettings);
      //   } catch (error) {
      //     console.error('Failed to sync settings with backend:', error);
      //   } finally {
      //     setIsSaving(false);
      //   }
      // }

      return newSettings;
    },
    [settings, saveLocalSettings, user?.id]
  );

  // Reset to defaults
  const resetSettings = useCallback(async () => {
    setSettings(DEFAULT_SETTINGS);
    saveLocalSettings(DEFAULT_SETTINGS);
  }, [saveLocalSettings]);

  // Update theme and apply to document
  const updateTheme = useCallback(
    async (theme: 'light' | 'dark' | 'system') => {
      await updateSettings({ theme });
      
      // Apply theme to document
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    },
    [updateSettings]
  );

  // Export settings as JSON
  const exportSettings = useCallback(() => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `alina-settings-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [settings]);

  // Import settings from JSON
  const importSettings = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const imported = JSON.parse(text);
        await updateSettings(imported);
        return true;
      } catch (error) {
        console.error('Failed to import settings:', error);
        return false;
      }
    },
    [updateSettings]
  );

  return {
    settings,
    updateSettings,
    resetSettings,
    updateTheme,
    exportSettings,
    importSettings,
    isLoading,
    isSaving,
    lastSyncTime,
  };
}

/**
 * Hook for managing notification preferences specifically
 */
export function useNotificationSettings() {
  const { settings, updateSettings, isSaving } = useSettings();

  const updateNotifications = useCallback(
    async (updates: Partial<UserSettings['notifications']>) => {
      return updateSettings({ 
        notifications: {
          ...settings.notifications,
          ...updates
        }
      });
    },
    [updateSettings, settings.notifications]
  );

  const toggleEmailNotification = useCallback(
    async (key: keyof UserSettings['notifications']['email']) => {
      const newValue = !settings.notifications.email[key];
      return updateSettings({
        notifications: {
          ...settings.notifications,
          email: {
            ...settings.notifications.email,
            [key]: newValue,
          },
        },
      });
    },
    [settings, updateSettings]
  );

  const togglePushNotification = useCallback(
    async (key: keyof UserSettings['notifications']['push']) => {
      const newValue = !settings.notifications.push[key];
      return updateSettings({
        notifications: {
          ...settings.notifications,
          push: {
            ...settings.notifications.push,
            [key]: newValue,
          },
        },
      });
    },
    [settings, updateSettings]
  );

  const toggleSmsNotification = useCallback(
    async (key: keyof UserSettings['notifications']['sms']) => {
      const newValue = !settings.notifications.sms[key];
      return updateSettings({
        notifications: {
          ...settings.notifications,
          sms: {
            ...settings.notifications.sms,
            [key]: newValue,
          },
        },
      });
    },
    [settings, updateSettings]
  );

  return {
    notifications: settings.notifications,
    updateNotifications,
    toggleEmailNotification,
    togglePushNotification,
    toggleSmsNotification,
    isSaving,
  };
}
