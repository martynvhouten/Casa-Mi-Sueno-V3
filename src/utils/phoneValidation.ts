/**
 * Phone number validation utility
 * Supports international phone numbers from any country
 */

/**
 * Normalize phone number by removing spaces, dashes, parentheses
 */
export const normalizePhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-()]/g, '');
};

/**
 * Validate phone number - permissive international format
 * Accepts:
 * - Local numbers: 0612345678, 0201234567
 * - International with +: +31612345678, +1 555 123 4567
 * - International with 00: 0031612345678, 0044123456789
 * - Any format with country code
 */
export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone || phone.trim() === '') {
    return true; // Optional field
  }

  const normalized = normalizePhoneNumber(phone.trim());

  // Must contain at least some digits
  if (!/\d/.test(normalized)) {
    return false;
  }

  // Permissive pattern: optional + or 00 prefix, followed by digits
  // Minimum 7 digits (shortest valid phone numbers)
  // Maximum 15 digits (E.164 standard maximum)
  const permissivePattern = /^(\+|00)?\d{7,15}$/;

  return permissivePattern.test(normalized);
};

/**
 * Get phone validation error message
 */
export const getPhoneValidationError = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return null; // Optional field
  }

  if (!validatePhoneNumber(phone)) {
    return 'Voer een geldig telefoonnummer in';
  }

  return null;
};

