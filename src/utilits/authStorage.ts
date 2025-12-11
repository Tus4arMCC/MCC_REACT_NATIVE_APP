import * as SecureStore from "expo-secure-store";

// Save login tokens
export const saveAuthToStorage = async (
  jwt: string,
  pksoft: string,
  username: string,
  userid: string,
) => {
  await SecureStore.setItemAsync("JWT", jwt);
  await SecureStore.setItemAsync("x-auth", pksoft);
  await SecureStore.setItemAsync("username", username);
  await SecureStore.setItemAsync("user_id", userid);
};

// Save only userid (guest/user)
export const saveUserId = async (userid: string) => {
  await SecureStore.setItemAsync("user_id", userid);
};

// Read all stored values
export const readAuthFromStorage = async () => {
  return {
    jwt: await SecureStore.getItemAsync("JWT"),
    pksoft: await SecureStore.getItemAsync("x-auth"),
    username: await SecureStore.getItemAsync("username"),
    userid: await SecureStore.getItemAsync("user_id"),
  };
};

// Clear auth on logout
export const clearAuthStorage = async () => {
  await SecureStore.deleteItemAsync("JWT");
  await SecureStore.deleteItemAsync("x-auth");
  await SecureStore.deleteItemAsync("username");
  await SecureStore.deleteItemAsync("user_id");
};
