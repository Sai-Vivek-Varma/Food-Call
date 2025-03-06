
// Helper functions for date manipulation and validation

/**
 * Check if a date is in the past
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is in the past
 */
const isDatePast = (date) => {
  const now = new Date();
  return new Date(date) < now;
};

/**
 * Check if a date is today or in the future
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is today or in the future
 */
const isDateValid = (date) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of day for comparison
  return new Date(date) >= now;
};

/**
 * Format a date for display
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a time for display
 * @param {Date} date - The date containing the time to format
 * @returns {string} - Formatted time string
 */
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

module.exports = {
  isDatePast,
  isDateValid,
  formatDate,
  formatTime
};
