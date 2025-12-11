// secureStorage.ts (React Native)
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

// ✅ Use Expo / RN env variable
const SECRET_KEY =
  process.env.EXPO_PUBLIC_ROOT_SECURITY_KEY || "fallback_secret_key";

/**
 * Redux-persist compatible encrypted storage
 */
export const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const encrypted = await AsyncStorage.getItem(key);
      if (!encrypted) return null;

      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      return decrypted || null;
    } catch (e) {
      //console.error("[secureStorage] decrypt error:", e);
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        value,
        SECRET_KEY
      ).toString();

      await AsyncStorage.setItem(key, encrypted);
    } catch (e) {
      //console.error("[secureStorage] encrypt error:", e);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      //console.error("[secureStorage] remove error:", e);
    }
  },
};
