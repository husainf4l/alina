/**
 * Secure Storage Utilities
 * Encrypted and secure client-side storage
 */

/**
 * Check if storage is available
 */
function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const storage = window[type];
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Simple XOR encryption for client-side storage
 * Note: This is NOT cryptographically secure, only obfuscation
 * Sensitive data should NEVER be stored client-side
 */
function simpleEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

function simpleDecrypt(encrypted: string, key: string): string {
  try {
    const text = atob(encrypted);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch {
    return '';
  }
}

/**
 * Secure storage wrapper
 */
export class SecureStorage {
  private storageType: 'localStorage' | 'sessionStorage';
  private encryptionKey: string;
  private available: boolean;

  constructor(
    type: 'local' | 'session' = 'local',
    encryptionKey: string = 'alina-default-key'
  ) {
    this.storageType = type === 'local' ? 'localStorage' : 'sessionStorage';
    this.encryptionKey = encryptionKey;
    this.available = isStorageAvailable(this.storageType);
  }

  /**
   * Set item with optional encryption
   */
  setItem(key: string, value: any, encrypt: boolean = false): boolean {
    if (!this.available) return false;

    try {
      const stringValue = JSON.stringify(value);
      const finalValue = encrypt 
        ? simpleEncrypt(stringValue, this.encryptionKey)
        : stringValue;

      window[this.storageType].setItem(key, finalValue);
      
      // Store metadata about encryption
      if (encrypt) {
        window[this.storageType].setItem(`${key}__encrypted`, 'true');
      }

      return true;
    } catch (error) {
      console.error('SecureStorage: Failed to set item', error);
      return false;
    }
  }

  /**
   * Get item with automatic decryption
   */
  getItem<T = any>(key: string): T | null {
    if (!this.available) return null;

    try {
      const encrypted = window[this.storageType].getItem(`${key}__encrypted`) === 'true';
      const value = window[this.storageType].getItem(key);

      if (!value) return null;

      const decrypted = encrypted
        ? simpleDecrypt(value, this.encryptionKey)
        : value;

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('SecureStorage: Failed to get item', error);
      return null;
    }
  }

  /**
   * Remove item
   */
  removeItem(key: string): void {
    if (!this.available) return;

    window[this.storageType].removeItem(key);
    window[this.storageType].removeItem(`${key}__encrypted`);
  }

  /**
   * Clear all items
   */
  clear(): void {
    if (!this.available) return;
    window[this.storageType].clear();
  }

  /**
   * Check if key exists
   */
  hasItem(key: string): boolean {
    if (!this.available) return false;
    return window[this.storageType].getItem(key) !== null;
  }
}

/**
 * Default instances
 */
export const secureLocalStorage = new SecureStorage('local');
export const secureSessionStorage = new SecureStorage('session');

/**
 * Token storage utilities
 */
export const tokenStorage = {
  /**
   * Store access token (NOT recommended - use HTTP-only cookies instead)
   */
  setAccessToken(token: string): void {
    // Store in memory only, never localStorage
    if (typeof window !== 'undefined') {
      (window as any).__accessToken = token;
    }
  },

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return (window as any).__accessToken || null;
  },

  /**
   * Clear access token
   */
  clearAccessToken(): void {
    if (typeof window !== 'undefined') {
      delete (window as any).__accessToken;
    }
  },

  /**
   * Store refresh token expiry (safe to store)
   */
  setTokenExpiry(expiresIn: number): void {
    const expiryTime = Date.now() + expiresIn * 1000;
    secureLocalStorage.setItem('token-expiry', expiryTime);
  },

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    const expiry = secureLocalStorage.getItem<number>('token-expiry');
    if (!expiry) return true;
    return Date.now() > expiry;
  },

  /**
   * Clear all auth tokens
   */
  clearAll(): void {
    this.clearAccessToken();
    secureLocalStorage.removeItem('token-expiry');
  },
};

/**
 * Sensitive data warnings
 */
export const STORAGE_WARNINGS = {
  // NEVER store these client-side:
  FORBIDDEN: [
    'Credit card numbers',
    'CVV codes',
    'Social Security Numbers',
    'Full passwords',
    'Private keys',
    'API secrets',
    'Access tokens (use HTTP-only cookies)',
  ],

  // OK to store with encryption:
  SAFE_WITH_ENCRYPTION: [
    'User preferences',
    'Non-sensitive settings',
    'UI state',
    'Theme preferences',
  ],

  // OK to store without encryption:
  SAFE_PLAIN: [
    'Language preference',
    'Theme (light/dark)',
    'Cached public data',
    'Analytics IDs',
  ],
} as const;
