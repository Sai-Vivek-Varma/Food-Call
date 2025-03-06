const API_URL = "http://localhost:5000";

// --------------------
// Auth API calls
// --------------------

// Registers a new user. Expects a userData object containing email, password, name, role, and optionally organization.
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    // If the response is not OK, throw an error with the message provided by the server (or a default message).
    throw new Error(data.message || "Failed to register");
  }
  return data;
};

// Logs in a user with provided credentials (email and password).
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }
  return data;
};

// --------------------
// Donations API calls
// --------------------

// Creates a new donation using donationData. Requires a valid JWT token.
export const createDonation = async (donationData, token) => {
  const response = await fetch(`${API_URL}/api/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create donation");
  }
  return data;
};

// Retrieves all donations (public endpoint).
export const getAllDonations = async () => {
  const response = await fetch(`${API_URL}/api/donations`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch donations");
  }
  return data;
};

// Retrieves donations created by the current donor. Requires a valid JWT token.
export const getDonationsByDonor = async (token) => {
  const response = await fetch(`${API_URL}/api/donations/user/donor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch donations by donor");
  }
  return data;
};

// Retrieves donations reserved by the current orphanage. Requires a valid JWT token.
export const getReservedDonations = async (token) => {
  const response = await fetch(`${API_URL}/api/donations/user/reserved`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reserved donations");
  }
  return data;
};

// Reserves a donation by donationId. Requires a valid JWT token.
export const reserveDonation = async (donationId, token) => {
  const response = await fetch(`${API_URL}/api/donations/${donationId}/reserve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to reserve donation");
  }
  return data;
};

// Marks a donation as completed. Requires a valid JWT token.
export const completeDonation = async (donationId, token) => {
  const response = await fetch(`${API_URL}/api/donations/${donationId}/complete`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to complete donation");
  }
  return data;
};
