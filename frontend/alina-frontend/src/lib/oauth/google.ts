/**
 * Google OAuth Configuration
 * 
 * Handles Google Sign-In integration for authentication.
 * 
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com/apis/credentials
 * 2. Create OAuth 2.0 Client ID
 * 3. Add authorized JavaScript origins: http://localhost:3001, https://yourdomain.com
 * 4. Add authorized redirect URIs: http://localhost:3001/auth/callback/google
 * 5. Copy Client ID to NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local
 * 6. Copy Client Secret to GOOGLE_CLIENT_SECRET in .env.local
 */

export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  redirectUri: typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/callback/google`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback/google`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ].join(' '),
  responseType: 'code',
  accessType: 'offline',
  prompt: 'consent',
};

/**
 * Check if Google OAuth is enabled
 */
export function isGoogleOAuthEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_OAUTH === 'true' &&
    !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  );
}

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    response_type: GOOGLE_OAUTH_CONFIG.responseType,
    scope: GOOGLE_OAUTH_CONFIG.scope,
    access_type: GOOGLE_OAUTH_CONFIG.accessType,
    prompt: GOOGLE_OAUTH_CONFIG.prompt,
  });

  if (state) {
    params.append('state', state);
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Initiate Google OAuth flow
 * Opens Google Sign-In in a popup or redirects to Google
 */
export function initiateGoogleOAuth(options: {
  /** Callback after successful authentication */
  onSuccess?: (response: any) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Use popup instead of redirect (default: false) */
  usePopup?: boolean;
  /** Custom state parameter for CSRF protection */
  state?: string;
} = {}) {
  const {
    onSuccess,
    onError,
    usePopup = false,
    state = generateState(),
  } = options;

  if (!isGoogleOAuthEnabled()) {
    const error = new Error('Google OAuth is not enabled. Please configure NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.');
    console.error(error);
    onError?.(error);
    return;
  }

  const authUrl = getGoogleAuthUrl(state);

  // Store state in sessionStorage for CSRF validation
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('google_oauth_state', state);
  }

  if (usePopup) {
    // Open in popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},popup=1,noopener=1`
    );

    if (!popup) {
      onError?.(new Error('Failed to open popup. Please allow popups for this site.'));
      return;
    }

    // Monitor popup
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        // Check if authentication succeeded
        const authResult = sessionStorage.getItem('google_oauth_result');
        if (authResult) {
          sessionStorage.removeItem('google_oauth_result');
          try {
            const result = JSON.parse(authResult);
            if (result.success) {
              onSuccess?.(result.data);
            } else {
              onError?.(new Error(result.error || 'Authentication failed'));
            }
          } catch (err) {
            onError?.(err as Error);
          }
        }
      }
    }, 500);
  } else {
    // Redirect to Google
    window.location.href = authUrl;
  }
}

/**
 * Generate random state for CSRF protection
 */
function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate OAuth state parameter
 */
export function validateOAuthState(receivedState: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const storedState = sessionStorage.getItem('google_oauth_state');
  sessionStorage.removeItem('google_oauth_state');
  
  return storedState === receivedState;
}

/**
 * Load Google OAuth script
 * 
 * Alternative to manual OAuth flow - uses Google's official library
 */
export async function loadGoogleOAuthScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'));
      return;
    }

    // Check if already loaded
    if ((window as any).google?.accounts) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google One Tap Sign-In
 * Shows Google's one-tap sign in dialog
 */
export async function initializeGoogleOneTap(options: {
  /** Callback when user signs in */
  onSuccess: (credential: string) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Auto-select if user has only one Google account */
  autoSelect?: boolean;
}) {
  const { onSuccess, onError, autoSelect = true } = options;

  if (!isGoogleOAuthEnabled()) {
    onError?.(new Error('Google OAuth is not enabled'));
    return;
  }

  try {
    await loadGoogleOAuthScript();

    const google = (window as any).google;
    if (!google?.accounts?.id) {
      throw new Error('Google OAuth library not loaded');
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      callback: (response: any) => {
        if (response.credential) {
          onSuccess(response.credential);
        } else {
          onError?.(new Error('No credential received'));
        }
      },
      auto_select: autoSelect,
      cancel_on_tap_outside: false,
    });

    // Display the One Tap prompt
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One Tap not displayed
        console.log('Google One Tap not displayed:', notification.getNotDisplayedReason());
      }
    });
  } catch (error) {
    onError?.(error as Error);
  }
}

/**
 * Render Google Sign-In Button
 * 
 * @param elementId - ID of the HTML element to render button into
 * @param options - Customization options
 */
export async function renderGoogleSignInButton(
  elementId: string,
  options: {
    onSuccess: (credential: string) => void;
    onError?: (error: Error) => void;
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    width?: number;
  }
) {
  const {
    onSuccess,
    onError,
    theme = 'outline',
    size = 'large',
    text = 'signin_with',
    shape = 'rectangular',
  } = options;

  if (!isGoogleOAuthEnabled()) {
    onError?.(new Error('Google OAuth is not enabled'));
    return;
  }

  try {
    await loadGoogleOAuthScript();

    const google = (window as any).google;
    if (!google?.accounts?.id) {
      throw new Error('Google OAuth library not loaded');
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      callback: (response: any) => {
        if (response.credential) {
          onSuccess(response.credential);
        } else {
          onError?.(new Error('No credential received'));
        }
      },
    });

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    google.accounts.id.renderButton(element, {
      theme,
      size,
      text,
      shape,
      width: options.width,
    });
  } catch (error) {
    onError?.(error as Error);
  }
}
