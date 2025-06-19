
# Food Call - Complete Workflow Testing Guide

## Overview
Food Call is a food redistribution platform that connects food donors with orphanages to reduce food waste and address hunger. The platform integrates delivery services (Swiggy, Dunzo, Porter) for seamless food delivery.

## User Roles
1. **Donors** - Restaurants, bakeries, individuals with surplus food
2. **Orphanages** - Organizations that need food donations

## Complete Workflow Testing Steps

### 1. Initial Setup & Registration

#### Test Donor Registration:
1. Go to `/auth`
2. Click "Sign Up" 
3. Fill form with:
   - Name: "Test Restaurant"
   - Email: "donor@test.com"
   - Password: "test123"
   - Role: "Donor"
   - Organization: "Test Bakery"
4. Click "Sign Up"
5. **Expected**: Success message, redirect to `/dashboard`

#### Test Orphanage Registration:
1. Open new incognito window
2. Go to `/auth`
3. Fill form with:
   - Name: "Test Orphanage"
   - Email: "orphanage@test.com" 
   - Password: "test123"
   - Role: "Orphanage"
   - Organization: "Happy Kids Orphanage"
4. **Expected**: Success message, redirect to `/dashboard`

### 2. Donor Workflow

#### Test Creating Donations:
1. Login as donor
2. Go to `/donate` or click "Create Donation" from dashboard
3. Fill the donation form:
   - Title: "Fresh Bread Surplus"
   - Description: "20 loaves of fresh bread, baked this morning"
   - Quantity: "20 loaves"
   - Expiry Date: Tomorrow's date
   - Address: Use "Current Location" button or type manually
   - Pickup Start Time: Current time + 1 hour
   - Pickup End Time: Current time + 4 hours
   - Upload an image (optional)
4. Click "Create Donation"
5. **Expected**: Success toast, redirect to dashboard with new donation visible

#### Test Managing Donations:
1. From donor dashboard, view created donations
2. Check donation status shows "Available"
3. Test editing donation (if implemented)
4. **Expected**: All donation details correct, status tracking works

### 3. Orphanage Workflow

#### Test Browsing Donations:
1. Login as orphanage
2. Go to `/donations`
3. **Expected**: See list of available donations (not expired ones)
4. Test search functionality with keywords
5. **Expected**: Search filters donations correctly

#### Test Viewing Donation Details:
1. Click on any donation card
2. **Expected**: Modal opens with full donation details
3. Modal should show:
   - Full description and image
   - Pickup address and time
   - Donor information
   - "Reserve This Donation" button

#### Test Reservation Process:
1. From donation detail modal, click "Reserve This Donation"
2. **Expected**: Delivery options modal opens
3. Select delivery option:
   - Self Pickup (Free, Immediate)
   - Swiggy Delivery (₹50-100, 30-45 mins)
   - Dunzo Delivery (₹40-80, 20-30 mins)
   - Porter Delivery (₹60-120, 25-40 mins)
4. Click "Confirm Reservation"
5. **Expected**: 
   - Success message
   - Donation status changes to "Reserved"
   - Donor gets notification (check console logs)
   - Modal closes

### 4. Backend Integration Points

#### Test API Endpoints:
1. **POST** `/api/donations` - Create donation (donor only)
2. **GET** `/api/donations` - List all donations
3. **PUT** `/api/donations/:id/reserve` - Reserve donation (orphanage only)
4. **PUT** `/api/donations/:id/complete` - Mark completed (donor only)

#### Test Authentication:
1. Try accessing protected routes without login
2. **Expected**: Redirect to `/auth`
3. Try accessing donor features as orphanage
4. **Expected**: Access denied messages

### 5. Real-time Features

#### Test Donation Status Updates:
1. When orphanage reserves donation, donor should see status change
2. When donor marks as completed, orphanage should see update
3. **Expected**: Real-time status synchronization

#### Test Notifications:
1. Check browser console for notification logs
2. **Expected**: Proper notification messages when donations are reserved

### 6. Data Validation & Error Handling

#### Test Form Validations:
1. Try submitting empty donation form
2. **Expected**: Validation errors shown
3. Try setting expiry date in past
4. **Expected**: Error message
5. Try setting end time before start time
6. **Expected**: Error message

#### Test Error Handling:
1. Disconnect internet, try submitting form
2. **Expected**: Network error message
3. Try reserving already reserved donation
4. **Expected**: Appropriate error message

### 7. UI/UX Testing

#### Test Responsive Design:
1. Test on mobile devices (375px width)
2. Test on tablets (768px width)
3. Test on desktop (1200px+ width)
4. **Expected**: All elements scale properly

#### Test Color Scheme:
1. Check consistent green color usage (#16a34a)
2. Verify proper contrast ratios
3. Test hover states and transitions
4. **Expected**: Professional, accessible design

#### Test Location Features:
1. Test "Current Location" button
2. **Expected**: Browser asks for location permission
3. If granted, address should auto-populate
4. If denied, should show error message

### 8. Edge Cases

#### Test Expired Donations:
1. Create donation with expiry date in past (modify database directly)
2. **Expected**: Expired donations don't show in orphanage list
3. Expired donations show as "Expired" status for donors

#### Test Time Zone Handling:
1. Create donation with different time zones
2. **Expected**: Times display correctly in user's local time

#### Test Large Data Sets:
1. Create 50+ donations
2. **Expected**: List loads efficiently, pagination works

### 9. Security Testing

#### Test Authorization:
1. Try accessing other users' data
2. **Expected**: Proper access control
3. Try modifying donations you don't own
4. **Expected**: Access denied

#### Test Input Sanitization:
1. Try injecting HTML/scripts in form fields
2. **Expected**: Input properly sanitized

### 10. Performance Testing

#### Test Load Times:
1. Measure page load times
2. **Expected**: Pages load under 3 seconds
3. Test image upload performance
4. **Expected**: Images under 5MB upload successfully

## Key Backend Files That Need Implementation

### Required Backend Routes:
- `backend/routes/donationRoutes.js` ✅ (Already exists)
- `backend/routes/userRoutes.js` ✅ (Already exists)
- `backend/models/donationModel.js` ✅ (Already exists)
- `backend/models/userModel.js` ✅ (Already exists)

### Required Backend Features:
1. **Donation CRUD operations** ✅
2. **User authentication** ✅
3. **Reservation system** ✅
4. **Status tracking** ✅
5. **Notification system** (Console logs implemented)

## Expected Behavior Summary

### For Donors:
- Can register and login
- Can create, edit, view their donations
- Can see reservation notifications
- Can mark donations as completed
- Cannot see other donors' donations
- Cannot reserve donations

### For Orphanages:
- Can register and login
- Can view all available donations
- Can search and filter donations
- Can reserve donations with delivery options
- Can view their reservation history
- Cannot create donations
- Cannot see expired donations

### System Features:
- Real-time status updates
- Delivery integration options
- Location-based services
- Image upload support
- Responsive design
- Professional color scheme

## Troubleshooting Common Issues

1. **Donations not showing**: Check if they're expired or wrong user role
2. **Reservation failing**: Verify user authentication and donation availability
3. **Location not working**: Check browser permissions and HTTPS
4. **Images not uploading**: Verify file size under 5MB
5. **Colors not applying**: Clear browser cache and check CSS

This workflow ensures the complete food redistribution system works end-to-end, connecting donors with orphanages efficiently while providing delivery options and proper status tracking.
