
// User role types: 'donor' | 'orphanage' | 'admin'

// User interface structure
// {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
//   organization?: string;
//   address?: string;
//   phone?: string;
//   createdAt: Date;
// }

// Donation interface structure
// {
//   id: string;
//   title: string;
//   description: string;
//   quantity: string;
//   expiryDate: Date;
//   pickupAddress: string;
//   pickupTimeStart: Date;
//   pickupTimeEnd: Date;
//   donorId: string;
//   donorName: string;
//   status: 'available' | 'reserved' | 'completed' | 'expired';
//   reservedBy?: string;
//   reservedByName?: string;
//   createdAt: Date;
//   imageUrl?: string;
// }

// AuthFormData interface structure
// {
//   email: string;
//   password: string;
//   name?: string;
//   role?: UserRole;
//   organization?: string;
// }
