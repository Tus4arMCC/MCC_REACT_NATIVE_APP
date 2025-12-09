import axios from "axios";
import PKSOFT_URLS from "../utilits/Pk_api_Urls";
import { getEncodedTimestamp } from "../utilits/dateUtils";
import {
  getCartItems,
  getWishlistItems,
} from "../utilits/storageUtils";
// import { useAppToast } from "../components/Toast";

/**
 * In-flight deduplication map
 */
const _inFlightSyncs: Map<string, Promise<any>> = new Map();

/**
 * Sync cart & wishlist and fetch counts
 */
export const syncCartWishlistWithCounts = async (
  userId: string,
  userType: "user" | "guest" | "random",
  c_products: string[] = [],
  w_products: string[] = []
) => {
  // 🟡 Random users → local-only
  if (userType === "random" || !userId) {
    return { cartCount: 0, wishlistCount: 0, isRandom: true };
  }

  const key = `${userType}:${userId}:${c_products.length}:${w_products.length}`;
  if (_inFlightSyncs.has(key)) {
    return _inFlightSyncs.get(key);
  }

  const promise = (async () => {
    try {
      const d = getEncodedTimestamp();

      const payload = {
        c_products: c_products.length ? c_products : [],
        w_products: w_products.length ? w_products : [],
      };

      const response = await axios.post(
        `${PKSOFT_URLS.CUSTOMER.COUNT}/${userId}/${d}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        response?.data?.messageCode === 100 &&
        response?.data?.status === 200
      ) {
        return {
          cartCount: response.data?.data?.cartCount ?? 0,
          wishlistCount: response.data?.data?.wishlistCount ?? 0,
          isRandom: false,
        };
      }

      return { cartCount: 0, wishlistCount: 0, isRandom: false };
    } catch (error) {
      console.error("[SYNC RN] API failed:", error);
      return { cartCount: 0, wishlistCount: 0, isRandom: false };
    }
  })();

  _inFlightSyncs.set(key, promise);
  promise.finally(() => _inFlightSyncs.delete(key));
  return promise;
};

/**
 * Sync local cart/wishlist after login
 */
export const syncLocalDataToBackend = async (
  userId: string,
  userType: "user" | "guest"
) => {
  const cartItems = await getCartItems();
  const wishlistItems = await getWishlistItems();

  const c_products = Array.isArray(cartItems)
    ? cartItems.map((it: any) => String(it.productId))
    : [];

  const w_products = Array.isArray(wishlistItems)
    ? wishlistItems.map((it: any) => String(it.productId))
    : [];

  return syncCartWishlistWithCounts(
    userId,
    userType,
    c_products,
    w_products
  );
};

/**
 * Fetch counts only
 */
export const fetchCartWishlistCounts = async (
  userId: string,
  userType: "user" | "guest" | "random"
) => {
  return syncCartWishlistWithCounts(userId, userType, [], []);
};

/**
 * Clear local data (optional on mobile)
 */
export const clearLocalCartWishlist = async () => {
  try {
    // Optional: keep local cache for offline use
    console.log("[SYNC RN] Local cart/wishlist retained");
  } catch (error) {
    console.error("[SYNC RN] Clear failed:", error);
  }
};

export default {
  syncLocalDataToBackend,
  fetchCartWishlistCounts,
  clearLocalCartWishlist,
};
