const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Common API request helper.
 * Pass { auth: true } to automatically attach the stored JWT as a Bearer token.
 */
export async function fetchFromAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (options.auth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Health check service
 */
export const checkHealth = () => fetchFromAPI('/health');

/**
 * Auth services
 */
export const registerUser = (payload) =>
  fetchFromAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const loginUser = (payload) =>
  fetchFromAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getCurrentUser = () =>
  fetchFromAPI('/auth/me', {
    method: 'GET',
    auth: true,
  });

export default {
  fetchFromAPI,
  checkHealth,
  registerUser,
  loginUser,
  getCurrentUser,
};
