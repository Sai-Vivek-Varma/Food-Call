
// User roles
export const USER_ROLES = {
  DONOR: 'donor',
  ORPHANAGE: 'orphanage',
  ADMIN: 'admin'
};

// Donation statuses
export const DONATION_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  COMPLETED: 'completed',
  EXPIRED: 'expired'
};

// Type validation helpers
export const isValidUserRole = (role) => {
  return Object.values(USER_ROLES).includes(role);
};

export const isValidDonationStatus = (status) => {
  return Object.values(DONATION_STATUS).includes(status);
};

// Donation type structure for reference
export const DonationFields = {
  _id: 'string',
  title: 'string',
  description: 'string',
  foodType: 'string',
  quantity: 'number',
  expiryDate: 'Date',
  pickupLocation: 'string',
  contactInfo: 'string',
  imageUrl: 'string',
  donorId: 'string',
  donorName: 'string',
  status: 'string',
  createdAt: 'Date',
  updatedAt: 'Date'
};
