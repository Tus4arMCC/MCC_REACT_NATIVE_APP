import * as SecureStore from "expo-secure-store";

export const readAuthFromStorage = async () => {
  const jwt = await SecureStore.getItemAsync("jwt");
  const pksoft = await SecureStore.getItemAsync("pksoft");

  return { jwt, pksoft };
};
