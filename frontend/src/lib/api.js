
import apiClient from './apiClient';

// Auth API calls
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

// Donations API calls
export const createDonation = async (donationData) => {
  try {
    const response = await apiClient.post('/donations', donationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create donation');
  }
};

export const getAllDonations = async (status = null) => {
  try {
    const params = status ? { status } : {};
    const response = await apiClient.get('/donations', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch donations');
  }
};

export const getDonationById = async (donationId) => {
  try {
    const response = await apiClient.get(`/donations/${donationId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch donation');
  }
};

export const getDonationsByDonor = async () => {
  try {
    const response = await apiClient.get('/donations/user/donor');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch donations by donor');
  }
};

export const getReservedDonations = async () => {
  try {
    const response = await apiClient.get('/donations/user/reserved');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reserved donations');
  }
};

export const reserveDonation = async (donationId) => {
  try {
    const response = await apiClient.put(`/donations/${donationId}/reserve`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reserve donation');
  }
};

export const completeDonation = async (donationId) => {
  try {
    const response = await apiClient.put(`/donations/${donationId}/complete`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to complete donation');
  }
};

export const updateDonation = async (donationId, updateData) => {
  try {
    const response = await apiClient.put(`/donations/${donationId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update donation');
  }
};

export const deleteDonation = async (donationId) => {
  try {
    const response = await apiClient.delete(`/donations/${donationId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete donation');
  }
};
