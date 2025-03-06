
# Food Call Backend

This is the backend API for the Food Call application, which connects food donors with orphanages.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

3. Update the `.env` file with your actual configuration values:
   - Set a strong JWT_SECRET
   - Configure your MongoDB connection string
   - Add Cloudinary credentials if you're using image uploads

4. Start the development server:
   ```
   npm run dev
   ```

5. For production:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login and get JWT token
- GET /api/users/profile - Get current user profile (requires authentication)
- PUT /api/users/profile - Update user profile (requires authentication)

### Donations
- POST /api/donations - Create a new donation (donor only)
- GET /api/donations - Get all donations (public)
- GET /api/donations/:id - Get donation details (public)
- PUT /api/donations/:id - Update donation (donor only)
- DELETE /api/donations/:id - Delete donation (donor only)
- PUT /api/donations/:id/reserve - Reserve a donation (orphanage only)
- PUT /api/donations/:id/complete - Mark donation as completed (donor only)
- GET /api/donations/user/donor - Get donations by current donor
- GET /api/donations/user/reserved - Get donations reserved by current orphanage

## Models

### User
- email (String, unique)
- password (String, hashed)
- name (String)
- role (String: donor, orphanage, admin)
- organization (String, optional)
- address (String, optional)
- phone (String, optional)
- createdAt (Date)

### Donation
- title (String)
- description (String)
- quantity (String)
- expiryDate (Date)
- pickupAddress (String)
- pickupTimeStart (Date)
- pickupTimeEnd (Date)
- donorId (ObjectId, ref: User)
- donorName (String)
- status (String: available, reserved, completed, expired)
- reservedBy (ObjectId, ref: User, optional)
- reservedByName (String, optional)
- createdAt (Date)
- imageUrl (String, optional)
