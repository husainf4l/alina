import axios from "axios";

// ─── In-memory access token (never stored in localStorage) ────────────────────
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// ─── Axios instance ────────────────────────────────────────────────────────────
// baseURL is intentionally empty — requests go to the same origin.
// Next.js rewrites in next.config.ts proxy /api/* → backend server.
// This ensures the HttpOnly refresh-token cookie is always same-origin
// and the browser sends it correctly (no SameSite/cross-origin issues).
const apiClient = axios.create({
  withCredentials: true,
});

// ─── Request interceptor: attach Bearer token ─────────────────────────────────
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ─── Response interceptor: silent token refresh on 401 ────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/web/refresh"
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await apiClient.post("/api/auth/web/refresh");
        setAccessToken(data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(originalRequest);
      } catch {
        setAccessToken(null);
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
