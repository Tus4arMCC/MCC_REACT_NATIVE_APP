import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

/* ------------------------------------------------------------------ */
/* JWT HELPERS (NO atob IN RN)                                         */
/* ------------------------------------------------------------------ */

const base64Decode = (str: string) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = Buffer.from(str, "base64").toString("utf8");
  return decoded;
};

// Minimal JWT decode (no verification)
export const decodeJwt = (token: string | null) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    return JSON.parse(base64Decode(payload));
  } catch {
    return null;
  }
};

export const isJwtValid = (token: string | null) => {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false;
  return payload.exp > Math.floor(Date.now() / 1000);
};

/* ------------------------------------------------------------------ */
/* AUTH TOKEN STORAGE (SECURE)                                         */
/* ------------------------------------------------------------------ */

export const saveAuthTokens = async (
  jwt: string,
  pksoftToken: string,
  username: string,
  userId: string
) => {
  await SecureStore.setItemAsync("JWT", jwt);
  await SecureStore.setItemAsync("x-auth", pksoftToken);
  await SecureStore.setItemAsync("username", username);
  await SecureStore.setItemAsync("user_id", userId);
};

export const clearAuthTokens = async () => {
  await SecureStore.deleteItemAsync("JWT");
  await SecureStore.deleteItemAsync("x-auth");
  await SecureStore.deleteItemAsync("username");
  await SecureStore.deleteItemAsync("user_id");
};

export const readAuthFromStorage = async () => {
  return {
    jwt: await SecureStore.getItemAsync("JWT"),
    pksoft: await SecureStore.getItemAsync("x-auth"),
    username: await SecureStore.getItemAsync("username"),
    userid: await SecureStore.getItemAsync("user_id"),
  };
};

/* ------------------------------------------------------------------ */
/* GUEST ID                                                           */
/* ------------------------------------------------------------------ */

export const saveGuestId = async (guestId: string) => {
  await AsyncStorage.setItem("guest_id", guestId);
  console.log("[AUTH RN] Guest ID saved");
};

export const getGuestId = async (): Promise<string | null> => {
  const guestId = await AsyncStorage.getItem("guest_id");
  if (guestId) console.log("[AUTH RN] Guest ID recovered");
  return guestId;
};

export const deleteGuestId = async () => {
  await AsyncStorage.removeItem("guest_id");
  console.log("[AUTH RN] Guest ID deleted");
};

/* ------------------------------------------------------------------ */
/* USER ID                                                            */
/* ------------------------------------------------------------------ */

export const saveUserId = async (userId: string) => {
  await AsyncStorage.setItem("user_id", userId);
  console.log("[AUTH RN] User ID saved");
};

export const getUserId = async (): Promise<string | null> => {
  const userId = await AsyncStorage.getItem("user_id");
  if (userId) console.log("[AUTH RN] User ID recovered");
  return userId;
};

export const deleteUserId = async () => {
  await AsyncStorage.removeItem("user_id");
  console.log("[AUTH RN] User ID deleted");
};

/* ------------------------------------------------------------------ */
/* REDUX INTEGRATION                                                   */
/* ------------------------------------------------------------------ */

export const handleGuestLoginSuccess = async (
  guestId: string,
  dispatch: any
) => {
  await saveGuestId(guestId);

  dispatch({
    type: "auth/setUserInfo",
    payload: { guest_id: guestId },
  });

  console.log("[AUTH RN] Guest login successful:", guestId);
};

export const handleUserLoginSuccess = async (
  userId: string,
  userInfo: any,
  dispatch: any
) => {
  await saveUserId(userId);
  await deleteGuestId();

  dispatch({
    type: "auth/setUserInfo",
    payload: { ...userInfo, user_id: userId },
  });

  console.log("[AUTH RN] User login successful:", userId);
};

/* ------------------------------------------------------------------ */
/* LOGOUT                                                             */
/* ------------------------------------------------------------------ */

export const handleLogout = async (dispatch: any) => {
  await clearAuthTokens();
  await deleteGuestId();
  await deleteUserId();

  dispatch({
    type: "auth/clearUserInfo",
  });

  console.log("[AUTH RN] Logout complete");
};

export default {
  decodeJwt,
  isJwtValid,
  saveAuthTokens,
  clearAuthTokens,
  readAuthFromStorage,
  saveGuestId,
  getGuestId,
  deleteGuestId,
  saveUserId,
  getUserId,
  deleteUserId,
  handleGuestLoginSuccess,
  handleUserLoginSuccess,
  handleLogout,
};
