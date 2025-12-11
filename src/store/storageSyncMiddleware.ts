import { Middleware, AnyAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------------------------------------------------
   Helpers (async is OK here)
--------------------------------------------------- */
const saveToStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    //console.log("[StorageSync] Save error:", error);
  }
};

const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    //console.log("[StorageSync] Remove error:", error);
  }
};

/* ---------------------------------------------------
   ✅ Middleware (MUST be synchronous)
--------------------------------------------------- */
export const storageSyncMiddleware: Middleware =
  (store) =>
  (next) =>
  (action: AnyAction) => {
    const result = next(action);

    const state = store.getState() as any;

    /* ---------------- CART ---------------- */
    if (
      action.type.startsWith("cart/") ||
      action.type === "persist/PERSIST" ||
      action.type === "persist/REHYDRATE"
    ) {
      const cartItems = state.cart?.items ?? [];

      if (cartItems.length > 0) {
        // ✅ Fire-and-forget async
        void saveToStorage("cart", cartItems);
      } else {
        void removeFromStorage("cart");
      }
    }

    /* -------------- WISHLIST -------------- */
    if (
      action.type.startsWith("wishlist/") ||
      action.type === "persist/PERSIST" ||
      action.type === "persist/REHYDRATE"
    ) {
      const wishlistItems = state.wishlist?.items ?? [];

      if (wishlistItems.length > 0) {
        void saveToStorage("wishlist", wishlistItems);
      } else {
        void removeFromStorage("wishlist");
      }
    }

    return result;
  };
