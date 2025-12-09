import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
// import { v4 as uuidv4 } from "uuid";

/* -----------------------------------------------------------
   SAFE JSON PARSER
----------------------------------------------------------- */
const safeJsonParse = <T>(str: string | null, fallback: T): T => {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

/* -----------------------------------------------------------
   STORAGE HELPERS (NO COOKIES)
----------------------------------------------------------- */
const getItem = async (key: string) => AsyncStorage.getItem(key);
const setItem = async (key: string, value: any) =>
  AsyncStorage.setItem(key, JSON.stringify(value));
const removeItem = async (key: string) => AsyncStorage.removeItem(key);

/* -----------------------------------------------------------
   PRODUCT ENTRY STRUCTURE
----------------------------------------------------------- */
export interface ProductEntry {
  productId: string;
  qty: number;
}

const normalizeProductArray = (raw: any[]): ProductEntry[] => {
  if (!raw?.length) return [];
  if (typeof raw[0] === "object" && "productId" in raw[0]) return raw;
  return raw.map((id: any) => ({ productId: String(id), qty: 1 }));
};

/* -----------------------------------------------------------
   CART HELPERS
----------------------------------------------------------- */
const CART_KEY = "cart";

export const getCartItems = async (): Promise<ProductEntry[]> => {
  const raw = await getItem(CART_KEY);
  return normalizeProductArray(safeJsonParse(raw, []));
};

export const setCartItems = async (items: ProductEntry[]) =>
  setItem(CART_KEY, items);

export const updateCartItem = async (productId: string, qty: number) => {
  const items = await getCartItems();
  const idx = items.findIndex((i) => i.productId === productId);

  if (qty <= 0) {
    if (idx >= 0) items.splice(idx, 1);
  } else {
    if (idx >= 0) items[idx].qty = qty;
    else items.push({ productId, qty });
  }

  await setCartItems(items);
  return items;
};

export const removeCartItem = async (productId: string) => {
  const updated = (await getCartItems()).filter(
    (i) => i.productId !== productId
  );
  await setCartItems(updated);
  return updated;
};

/* -----------------------------------------------------------
   WISHLIST HELPERS
----------------------------------------------------------- */
const WISHLIST_KEY = "wishlist";

export const getWishlistItems = async (): Promise<ProductEntry[]> => {
  const raw = await getItem(WISHLIST_KEY);
  return normalizeProductArray(safeJsonParse(raw, []));
};

export const setWishlistItems = async (items: ProductEntry[]) =>
  setItem(WISHLIST_KEY, items);

export const addToWishlist = async (productId: string) => {
  const items = await getWishlistItems();
  if (!items.some((i) => i.productId === productId)) {
    items.push({ productId, qty: 1 });
  }
  await setWishlistItems(items);
  return items;
};

export const removeFromWishlist = async (productId: string) => {
  const items = (await getWishlistItems()).filter(
    (i) => i.productId !== productId
  );
  await setWishlistItems(items);
  return items;
};

/* -----------------------------------------------------------
   USER / GUEST / RANDOM ID SYSTEM
----------------------------------------------------------- */
export const resolveUserId = async (): Promise<string | null> =>
  (await SecureStore.getItemAsync("user_id")) ?? null;

export const resolveGuestId = async (): Promise<string | null> =>
  (await AsyncStorage.getItem("guest_id")) ?? null;

/* -----------------------------------------------------------
   RANDOM USER ID
----------------------------------------------------------- */
export const getOrCreateRandomUserId = async (): Promise<string> => {
  const userId = await resolveUserId();
  const guestId = await resolveGuestId();

  if (userId) {
    await removeItem("random_user");
    return userId;
  }

  if (guestId) {
    await removeItem("random_user");
    return guestId;
  }

  let randomUser = await AsyncStorage.getItem("random_user");
  if (!randomUser) {
    randomUser = "some-generated-unique-id"; // Replace with your own unique ID generation logic
    await AsyncStorage.setItem("random_user", randomUser);
  }

  return randomUser;
};

/* -----------------------------------------------------------
   UNIVERSAL UID RESOLUTION (✅ RECOMMENDED)
----------------------------------------------------------- */
export const resolveUid = async (): Promise<string> => {
  const userId = await resolveUserId();
  if (userId) {
    await removeItem("guest_id");
    await removeItem("random_user");
    return userId;
  }

  const guestId = await resolveGuestId();
  if (guestId) {
    await removeItem("random_user");
    return guestId;
  }

  return getOrCreateRandomUserId();
};

/* -----------------------------------------------------------
   USER TYPE HELPER
----------------------------------------------------------- */
export const getUserType = async (): Promise<"user" | "guest" | "random"> => {
  if (await resolveUserId()) return "user";
  if (await resolveGuestId()) return "guest";
  return "random";
};
