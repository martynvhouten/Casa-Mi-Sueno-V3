/**
 * Phone number validation utility
 * Supports Dutch phone numbers and international E.164 formats
 */

/**
 * Normalize phone number by removing spaces, dashes, parentheses
 */
export const normalizePhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-()]/g, '');
};

/**
 * Validate phone number
 * Supports:
 * - Dutch mobile: 0612345678 (06 + 8 digits)
 * - Dutch landline: 0201234567 (0 + area code + number)
 * - International: +31612345678
 * - International alt: 0031612345678
 * - Other E.164 formats: +<countrycode><number>
 */
export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone || phone.trim() === '') {
    return true; // Optional field
  }

  const normalized = normalizePhoneNumber(phone.trim());

  // Dutch mobile: 06 followed by 8 digits
  const dutchMobilePattern = /^06\d{8}$/;
  
  // Dutch landline: 0 + area code (2-3 digits) + number (6-7 digits)
  const dutchLandlinePattern = /^0[1-9]\d{7,9}$/;
  
  // International format: +31 followed by 9 digits (Dutch)
  const intlDutchPattern = /^\+31[1-9]\d{8}$/;
  
  // International format with leading 00: 0031 followed by 9 digits
  const intlDutch00Pattern = /^0031[1-9]\d{8}$/;
  
  // Generic international E.164: + followed by 1-3 digit country code and 4-14 digits
  const intlGenericPattern = /^\+\d{1,3}\d{4,14}$/;

  return (
    dutchMobilePattern.test(normalized) ||
    dutchLandlinePattern.test(normalized) ||
    intlDutchPattern.test(normalized) ||
    intlDutch00Pattern.test(normalized) ||
    intlGenericPattern.test(normalized)
  );
};

/**
 * Get phone validation error message
 */
export const getPhoneValidationError = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return null; // Optional field
  }

  if (!validatePhoneNumber(phone)) {
    return 'Voer een geldig telefoonnummer in (bijv. 0612345678 of +31612345678)';
  }

  return null;
};

