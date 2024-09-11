import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const publicAxios: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
});

const protectedAxios: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
});

const getToken = () => getCookie('token');
const setToken = (token: string) => setCookie('token', token, { maxAge: 30 * 24 * 60 * 60 }); // 30 days
const removeToken = () => deleteCookie('token');

protectedAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

protectedAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log('401 Error from Strapi');
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const handleRegistration = async (username: string, email: string, password: string) => {
  try {
    const response = await publicAxios.post('/api/auth/local/register', {
      username,
      email,
      password,
    });

    const { jwt, user } = response.data;

    setToken(jwt);

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);

    if (axios.isAxiosError(error) && error.response) {
      const strapiError = error.response.data?.error;

      if (strapiError) {
        const errorMessage = Array.isArray(strapiError.details?.errors)
          ? strapiError.details.errors.map((err: any) => err.message).join(', ')
          : strapiError.message || strapiError;

        return {
          success: false,
          error: errorMessage,
        };
      }
    }

    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const handleAuthentication = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${STRAPI_URL}/api/auth/local`, {
      identifier,
      password,
    });

    const { jwt, user } = response.data;

    // Set the token in a cookie
    setCookie('token', jwt, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { success: true, user };
  } catch (error) {
    // console.error("Authentication error:", error);
    if (axios.isAxiosError(error) && error.response) {
      const strapiError = error.response.data?.error;
      if (strapiError) {
        const errorMessage = Array.isArray(strapiError.details?.errors)
          ? strapiError.details.errors.map((err: any) => err.message).join(', ')
          : strapiError.message || strapiError;
        return { success: false, error: errorMessage };
      }
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const logout = () => {
  removeToken();
};

// Function to check authentication on the client-side
export const isAuthenticatedClient = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await axios.get(`${STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Client-side token validation error:', error);
    return false;
  }
};

// Function to check authentication on the server-side
export const isAuthenticatedServer = async (token: string | undefined): Promise<boolean> => {
  if (!token) return false;

  let response;
  try {
    response = await axios.get(`${STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Server-side token validation error:');
    // console.log(response);
    return false;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await publicAxios.post('/api/auth/forgot-password', {
      email,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const strapiError = error.response.data?.error;
      if (strapiError) {
        const errorMessage = Array.isArray(strapiError.details?.errors)
          ? strapiError.details.errors.map((err: any) => err.message).join(', ')
          : strapiError.message || strapiError;
        return { success: false, error: errorMessage };
      }
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    const response = await publicAxios.post('/api/auth/reset-password', {
      code: code,
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

export const changePassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    const response = await protectedAxios.post('/api/auth/change-password', {
      currentPassword,
      password,
      passwordConfirmation,
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const strapiError = error.response.data?.error;
      if (strapiError) {
        const errorMessage = Array.isArray(strapiError.details?.errors)
          ? strapiError.details.errors.map((err: any) => err.message).join(', ')
          : strapiError.message || strapiError;
        return { success: false, error: errorMessage };
      }
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Generic function to make authenticated requests to Strapi
export const makeAuthenticatedRequest = async <T = any>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  data?: any,
  params?: any
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    // Get the token from cookies
    const token = getCookie('token');
    console.log('🚀 ~ token:', token);

    if (!token) {
      return { success: false, error: 'Authentication token is missing' };
    }

    // Axios configuration
    const config: AxiosRequestConfig = {
      method,
      url: `${STRAPI_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data, // For POST, PUT, PATCH requests
      params, // For GET, DELETE requests with query parameters
    };

    // Make the request
    const response: AxiosResponse<T> = await axios(config);

    // Return the response data
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const strapiError = error.response.data?.error;
      const errorMessage = strapiError?.message || 'An unexpected error occurred';
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
