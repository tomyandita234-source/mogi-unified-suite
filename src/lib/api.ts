// API configuration and utility functions

const API_BASE_URL = '/api';

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Blog API
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  body: string;
  image: string;
  images_alt: string;
  images_source: string;
  createdBy: string;
  source: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export const BlogAPI = {
  getAll: () => fetchAPI<Blog[]>('/blogs'),
  getById: (id: string) => fetchAPI<Blog>(`/blogs/${id}`),
  getBySlug: (slug: string) => fetchAPI<Blog>(`/blogs/slug/${slug}`),
  create: (data: Partial<Blog>) => 
    fetchAPI<Blog>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Blog>) => 
    fetchAPI<Blog>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchAPI<{ success: boolean }>(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};

// Product API
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  features: string[];
  benefits: string[];
  pricing: {
    basic: {
      price: string;
      period: string;
      features: string[];
    };
    pro: {
      price: string;
      period: string;
      features: string[];
    };
    enterprise: {
      price: string;
      period: string;
      features: string[];
    };
  };
  isActive: boolean;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const ProductAPI = {
  getAll: () => fetchAPI<Product[]>('/products'),
  getById: (id: string) => fetchAPI<Product>(`/products/${id}`),
  getBySlug: (slug: string) => fetchAPI<Product>(`/products/slug/${slug}`),
  getByCategory: (category: string) => fetchAPI<Product[]>(`/products/category/${category}`),
  create: (data: Partial<Product>) => 
    fetchAPI<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Product>) => 
    fetchAPI<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchAPI<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// User API
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export const UserAPI = {
  login: (username: string, password: string) => 
    fetchAPI<{ token: string; user: User }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (username: string, email: string, password: string) => 
    fetchAPI<{ token: string; user: User }>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
  getProfile: () => fetchAPI<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => 
    fetchAPI<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Contact API
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactAPI = {
  send: (data: ContactForm) => 
    fetchAPI<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default {
  blog: BlogAPI,
  product: ProductAPI,
  user: UserAPI,
  contact: ContactAPI,
};