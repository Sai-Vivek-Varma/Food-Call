import User from "../models/userModel.js";

/**
 * Add a notification to a user by userId.
 * @param {string} userId - The user's MongoDB ObjectId
 * @param {string} message - The notification message
 */
export async function addNotification(userId, message) {
  await User.findByIdAndUpdate(userId, {
    $push: {
      notifications: {
        message,
        read: false,
        createdAt: new Date(),
      },
    },
  });
}

/**
 * Mark all notifications as read for a user.
 * @param {string} userId
 */
export async function markNotificationsRead(userId) {
  await User.findByIdAndUpdate(userId, {
    $set: { "notifications.$[].read": true },
  });
}
