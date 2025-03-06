const API_URL = "https://food-call.onrender.com/";

// Auth API calls
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to register");
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to login");
  return data;
};

// Donations API calls
export const createDonation = async (donationData, token) => {
  const response = await fetch(`${API_URL}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationData),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to create donation");
  return data;
};

export const getAllDonations = async () => {
  const response = await fetch(`${API_URL}/donations`);
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch donations");
  return data;
};

export const getDonationsByDonor = async (token) => {
  const response = await fetch(`${API_URL}/donations/user/donor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch donations");
  return data;
};

export const getReservedDonations = async (token) => {
  const response = await fetch(`${API_URL}/donations/user/reserved`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to fetch donations");
  return data;
};

export const reserveDonation = async (donationId, token) => {
  const response = await fetch(`${API_URL}/donations/${donationId}/reserve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to reserve donation");
  return data;
};

export const completeDonation = async (donationId, token) => {
  const response = await fetch(`${API_URL}/donations/${donationId}/complete`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Failed to complete donation");
  return data;
};
