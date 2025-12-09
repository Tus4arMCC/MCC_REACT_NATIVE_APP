/**
 * Form Field Validators
 * Centralized validation functions for common form fields
 */

/**
 * Validates email address format
 * @param email - Email string to validate
 * @returns true if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validates mobile/phone number (10 digits)
 * @param mobile - Mobile number string to validate
 * @returns true if mobile is 10 digits, false otherwise
 */
export const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

/**
 * Validates if string is not empty after trim
 * @param value - String value to validate
 * @returns true if not empty, false otherwise
 */
export const validateNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates required field (not empty)
 * @param value - Value to check
 * @param fieldName - Field name for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateRequired = (value: string, fieldName: string): string => {
  if (!value.trim()) {
    return `${fieldName} is required.`;
  }
  return "";
};

/**
 * Validates email with error message
 * @param email - Email to validate
 * @param fieldName - Field name for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateEmailField = (email: string, fieldName: string = "Email"): string => {
  if (!email.trim()) {
    return `${fieldName} is required.`;
  }
  if (!validateEmail(email)) {
    return "Invalid email address.";
  }
  return "";
};

/**
 * Validates mobile with error message
 * @param mobile - Mobile to validate
 * @param fieldName - Field name for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateMobileField = (mobile: string, fieldName: string = "Mobile number"): string => {
  if (!mobile.trim()) {
    return `${fieldName} is required.`;
  }
  if (!validateMobile(mobile)) {
    return `${fieldName} must be 10 digits.`;
  }
  return "";
};
