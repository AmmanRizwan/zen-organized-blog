const BASE_URL = import.meta.env.VITE_URL;

async function customFetch(endpoint: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };
  const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

  if (response.status === 401) {
    // Clear local storage
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const api = {
  get: (endpoint: string, options?: RequestInit) => 
    customFetch(endpoint, { ...options, method: 'GET' }),
  
  post: <T = unknown>(endpoint: string, body: Record<string, unknown>, options?: RequestInit) =>
    customFetch(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(body)
    }) as Promise<T>,
  
  put: <T = unknown>(endpoint: string, body: Record<string, unknown>, options?: RequestInit) =>
    customFetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    }) as Promise<T>,
  
  delete: (endpoint: string, options?: RequestInit) =>
    customFetch(endpoint, { ...options, method: 'DELETE' }),
};
