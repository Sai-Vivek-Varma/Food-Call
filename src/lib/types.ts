
export type UserRole = 'donor' | 'orphanage' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  address?: string;
  phone?: string;
  createdAt: Date;
}

export interface Donation {
  id: string;
  title: string;
  description: string;
  quantity: string;
  expiryDate: Date;
  pickupAddress: string;
  pickupTimeStart: Date;
  pickupTimeEnd: Date;
  donorId: string;
  donorName: string;
  status: 'available' | 'reserved' | 'completed' | 'expired';
  reservedBy?: string;
  reservedByName?: string;
  createdAt: Date;
  imageUrl?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  organization?: string;
}
