
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusClasses = (status) => {
  const statusClasses = {
    available: 'bg-green-100 text-green-700',
    reserved: 'bg-blue-100 text-blue-700',
    completed: 'bg-sage-100 text-sage-700',
    expired: 'bg-red-100 text-red-700',
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-700';
};

// Mock user authentication functions
// In a real app, these would be API calls to the backend
export const loginUser = (email, password) => {
  // This is a mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful login for specific credentials
      if (email === 'donor@example.com' && password === 'password') {
        const user = {
          id: 'user-1',
          email: 'donor@example.com',
          name: 'John Donor',
          role: 'donor',
          organization: 'City Bakery',
          address: '123 Baker Street, City Center',
          phone: '(555) 123-4567',
          createdAt: new Date(),
        };
        
        // Store user in localStorage
        localStorage.setItem('foodCallUser', JSON.stringify(user));
        resolve(user);
      } else if (email === 'orphanage@example.com' && password === 'password') {
        const user = {
          id: 'user-2',
          email: 'orphanage@example.com',
          name: 'Hope Children\'s Home',
          role: 'orphanage',
          organization: 'Hope Children\'s Home',
          address: '789 Hope Street, City Center',
          phone: '(555) 987-6543',
          createdAt: new Date(),
        };
        
        // Store user in localStorage
        localStorage.setItem('foodCallUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const registerUser = (userData) => {
  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      // In real app, this would make an API call to register the user
      const user = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        organization: userData.organization,
        createdAt: new Date(),
      };
      
      // Store user in localStorage
      localStorage.setItem('foodCallUser', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

export const logoutUser = () => {
  // Remove user from localStorage
  localStorage.removeItem('foodCallUser');
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('foodCallUser');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};
