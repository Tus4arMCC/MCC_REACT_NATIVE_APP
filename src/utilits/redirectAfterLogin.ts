/**
 * ✅ Production-Level Redirect After Login Utility (React Native)
 * Saves & restores the previous route before login
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Cryptic storage key (x_redirect_from_page)
 */
const REDIRECT_KEY = "x_rf_p";
const REDIRECT_EXP_KEY = "x_rf_p_exp";

/* ------------------------------------------------------------------
   BASE64 HELPERS (RN-SAFE)
------------------------------------------------------------------ */
const encodeBase64 = (value: string) =>
  Buffer.from(value, "utf-8").toString("base64");

const decodeBase64 = (value: string) =>
  Buffer.from(value, "base64").toString("utf-8");

/* ------------------------------------------------------------------
   SET REDIRECT
------------------------------------------------------------------ */
/**
 * Save the route user is coming from before redirecting to login
 * @param path - Route name or path (e.g. "Cart", "/wishlist")
 */
export const setRedirectAfterLogin = async (path: string) => {
  try {
    const encodedPath = encodeBase64(path);
    const expiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes

    await AsyncStorage.multiSet([
      [REDIRECT_KEY, encodedPath],
      [REDIRECT_EXP_KEY, expiryTime.toString()],
    ]);
  } catch {
    // silent fail (safe by design)
  }
};

/* ------------------------------------------------------------------
   GET REDIRECT
------------------------------------------------------------------ */
/**
 * Get saved route and clear it immediately
 * @returns Route string or "/" fallback
 */
export const getRedirectAfterLogin = async (): Promise<string> => {
  try {
    const [[, encodedPath], [, expiry]] =
      await AsyncStorage.multiGet([REDIRECT_KEY, REDIRECT_EXP_KEY]);

    if (!encodedPath || !expiry) return "/";

    // Expired → cleanup
    if (Date.now() > Number(expiry)) {
      await clearRedirectAfterLogin();
      return "/";
    }

    const decodedPath = decodeBase64(encodedPath);
    await clearRedirectAfterLogin();
    return decodedPath || "/";
  } catch {
    await clearRedirectAfterLogin();
    return "/";
  }
};

/* ------------------------------------------------------------------
   CLEAR REDIRECT
------------------------------------------------------------------ */
export const clearRedirectAfterLogin = async () => {
  await AsyncStorage.multiRemove([REDIRECT_KEY, REDIRECT_EXP_KEY]);
};
