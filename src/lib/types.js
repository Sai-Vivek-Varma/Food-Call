
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
