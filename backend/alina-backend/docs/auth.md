# Frontend Authentication Integration Guide (Alina Project)

The Alina backend implements a robust JWT-based authentication system tailored for Single Page Applications (SPAs). It uses a hybrid approach:
1. **Short-lived access tokens** returned in the JSON response body.
2. **Long-lived refresh tokens** stored securely in `HttpOnly`, `Secure` cookies.

This guide outlines exactly how the frontend should handle authentication, session management, and user onboarding.

## Core Security Concepts

1. **Access Token Management**: The `access_token` is returned in the API response payload when you log in or register. You must store this in memory (e.g., Redux store, React State, or a module variable). **Do not** store it in `localStorage` or `sessionStorage` to prevent XSS theft.
2. **Authorization Header**: For authenticated requests, you must manually attach the `access_token` as a Bearer token: `Authorization: Bearer <token>`.
3. **Refresh Token Management**: You **never directly handle** the `refresh_token`. The backend sends it wrapped in `Secure`, `HttpOnly`, and `SameSite` cookies.
4. **Credentials flag**: To ensure the `refresh_token` cookie is sent during refresh requests or logout, your HTTP client (e.g., Axios or `fetch`) must be configured to include credentials.

---

## 1. Global HTTP Client Setup

You must configure your default API client to attach the `access_token` when available, and to consistently send credentials (cookies).

**Using Axios:**
```javascript
import axios from 'axios';

// Store the token in memory
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const apiClient = axios.create({
  // Use production URL for live, or your local network IP (e.g. 192.168.1.66) for testing on mobile devices
  baseURL: 'http://192.168.1.66:5602', // Local Dev Server
  withCredentials: true // CRITICAL: Ensures the HttpOnly refresh cookie is sent
});

// Automatically attach the access token to requests
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;
```

---

## 2. Authentication Endpoints (Web Specific)

Always use the `/web/*` endpoints for the frontend web application.

### Registration
Creates a new account and returns the tokens. By default, new users have the `buyer` role.

- **Endpoint**: `POST /api/auth/web/register`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```
- **Response**: Upon success (200 OK), sets the `refresh_token` cookie and returns:
  ```json
  {
    "access_token": "eyJhbG...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user_id": "...",
    "user_full_name": "John Doe",
    "user_email": "...",
    "user_role": "buyer",
    "message": "User registered and logged in successfully"
  }
  ```

### Login
Authenticates a user.

- **Endpoint**: `POST /api/auth/web/login`
- **Body**: `{ "email": "john@example.com", "password": "Password123!" }`
- **Response**: `200 OK` + `access_token` JSON payload + sets `refresh_token` cookie.

### Google Sign-In (Web)

To integrate Google Sign-In in a React frontend, we recommend using the `@react-oauth/google` package to easily handle the Google Identity Services popup and extract the Google JWT `id_token`.

**1) Wrap your App:**
```javascript
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="<YOUR_GOOGLE_CLIENT_ID>">
  <App />
</GoogleOAuthProvider>
```

**2) Implement the Login Component:**
```javascript
import { GoogleLogin } from '@react-oauth/google';

const handleGoogleSuccess = async (credentialResponse) => {
  try {
    // 1. You receive the Google id_token from the popup
    const googleToken = credentialResponse.credential;

    // 2. Send it to our backend to authenticate or register the user
    const { data } = await apiClient.post('/api/auth/web/google', {
      id_token: googleToken
    });

    // 3. Store the Alina backend access token in memory
    setAccessToken(data.access_token);
    
    // The backend automatically handled the Secure HttpOnly cookie for the refresh_token.
    console.log("Google Login Success! Role:", data.user_role);

  } catch (error) {
    console.error("Google Login failed:", error);
  }
};

// ... inside your JSX ...
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log('Login Failed')}
/>
```

- **Endpoint**: `POST /api/auth/web/google`
- **Body**: `{ "id_token": "<token-received-from-google-sdk>" }`
- **Response**: `200 OK` + `access_token` JSON payload + sets `refresh_token` cookie.

---

## 3. Session Management & Refreshing Tokens

The `access_token` expires in **1 hour**. When it expires, the backend returns `401 Unauthorized`. You should implement an interceptor to cleanly handle silent token refreshing by calling `/api/auth/web/refresh`.

- **Endpoint**: `POST /api/auth/web/refresh`
- **Body**: None required (it reads the `refresh_token` from the HTTP-only cookie).
- **Response**: Returns a new `access_token` payload.

**Example Axios Interceptor for Silent Refresh:**
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized, and we haven't already tried to refresh, and it's not the refresh endpoint itself
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/web/refresh') {
      originalRequest._retry = true;

      try {
        // Attempt to refresh
        const { data } = await apiClient.post('/api/auth/web/refresh');
        
        // Update the in-memory access token
        setAccessToken(data.access_token);
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed or expired. User must log in again.
        setAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

## 4. User Onboarding & Roles (Buyer vs Seller)

Every user has a `Profile` containing their marketplace information.

1. **Default Role**: Upon registration or Google Sign-In, the user's `UserRole` defaults to `"buyer"`.
2. **Checking Roles**: The `user_role` is returned during login/registration payload. You can also fetch the full profile using:
   - `GET /api/auth/me` (requires Bearer token)
3. **Becoming a Seller (Onboarding)**:
   To switch a user to a `"seller"` (or `"both"`), the frontend must update their profile. However, the backend enforces a rule (`VAL-07`): **A user cannot become a seller until their Display Name and Bio are completed.**

**Step 1: Complete the Profile**
```javascript
await apiClient.put('/api/auth/me', {
  displayName: "Creative John",
  bio: "I am a professional designer with 5 years of experience."
});
```

**Step 2: Upgrade Role**
```javascript
await apiClient.put('/api/auth/me', {
  userRole: "seller" // or "both"
});
```
*(Note: You can combine Step 1 and Step 2 into a single API call if you have all the data at once).*

### Onboarding Flow Best Practices

When building the frontend, you need a strategy for **when** to show the onboarding screens. Here is the recommended SPA approach:

1. **Lazy Onboarding (Recommended)**: 
   Do not force users through onboarding immediately after they sign up. Let them browse the platform as a `buyer` (which is the default role).
   - **Trigger**: Only navigate them to the `/onboarding` route when they attempt to perform a seller action (e.g., clicking "Become a Seller" or "Create a Gig").
   
2. **Post-Login Routing Logic**:
   If you want to force onboarding, you must check their profile completion percentage right after a successful login/register.
   
```javascript
// Example Next.js/React Router logic after successful login
const handleLoginSuccess = async (data) => {
  setAccessToken(data.access_token);
  
  // Fetch the full profile to check completion
  const profileResponse = await apiClient.get('/api/auth/me');
  const profile = profileResponse.data;

  // If they want to be a seller but haven't finished their profile
  if (profile.profileCompletionPercentage < 50 && /* some condition */) {
    router.push('/onboarding');
  } else {
    router.push('/dashboard');
  }
};
```

3. **Progressive Profiling**:
   Break the onboarding into steps:
   - **Step 1**: Basic Info (Name, Bio) -> Required for `VAL-07` validation.
   - **Step 2**: Avatar/Cover Image Upload (`POST /api/auth/me/avatar`).
   - **Step 3**: Skills & Languages (`POST /api/auth/me/skills`).
   
   Once Step 1 is done, you can safely send `{"userRole": "seller"}`.

---

## 5. Logout

To sign out, you must call the backend to clear the backend session and the HttpOnly cookies, AND clear your in-memory token.

- **Endpoint**: `POST /api/auth/logout`

```javascript
const handleLogout = async () => {
  try {
    await apiClient.post('/api/auth/logout');
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    // Clear in-memory token
    setAccessToken(null);
    // Redirect to login
    window.location.href = '/login';
  }
}
```

## Summary Checklist for Frontend Devs
- [ ] Store `access_token` strictly in memory (Variables, Context, Redux).
- [ ] Attach `Authorization: Bearer <token>` to all authenticated outbound requests.
- [ ] Ensure Axios/fetch uses `withCredentials: true` so the `refresh_token` cookie is transmitted.
- [ ] Implement a `401` HTTP interceptor to call `/api/auth/web/refresh`, extract the new `access_token`, and retry requests.
- [ ] For seller onboarding, ensure you `PUT` the user's `displayName` and `bio` before attempting to `PUT` `userRole: "seller"`.
- [ ] Call `/api/auth/logout` and clear the in-memory token on sign-out.
