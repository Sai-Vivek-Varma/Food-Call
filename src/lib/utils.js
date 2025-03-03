
/**
 * Merges class names into a single string, removing duplicates and falsy values
 * @param  {...string} classes - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a date to a string representation
 * @param {Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(date).toLocaleDateString('en-US', mergedOptions);
}

/**
 * Formats a time to a string representation
 * @param {Date} date - Date containing the time to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted time string
 */
export function formatTime(date, options = {}) {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(date).toLocaleTimeString('en-US', mergedOptions);
}

/**
 * Checks if a date is in the past (expired)
 * @param {Date} date - Date to check
 * @returns {boolean} - True if the date is in the past
 */
export function isExpired(date) {
  return new Date(date) < new Date();
}

/**
 * Truncates a string to a maximum length and adds an ellipsis if needed
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated string
 */
export function truncateString(str, maxLength) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
