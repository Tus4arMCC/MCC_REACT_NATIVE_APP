/**
 * Date and Time Utilities
 * React Native compatible
 */

// ✅ Base64 encoder replacement for btoa
const encodeBase64 = (value: string): string => {
  return Buffer.from(value, "utf-8").toString("base64");
};

/**
 * Generates an encoded timestamp (base64) for API requests
 */
export const getEncodedTimestamp = (): string => {
  return encodeBase64(new Date().toString());
};

/**
 * Gets current date in formatted string
 */
export const getCurrentDate = (): string => {
  return new Date().toString();
};

/**
 * Gets timestamp in milliseconds
 */
export const getTimestampMs = (): number => {
  return Date.now();
};
