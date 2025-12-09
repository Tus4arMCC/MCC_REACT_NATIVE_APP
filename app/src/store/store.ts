// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { secureStorage } from "./secureStorage";
import { storageSyncMiddleware } from "./storageSyncMiddleware";

import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import apiCountsReducer from "./apiCountsSlice";

/* --------------------------------------------------
   ROOT REDUCER
-------------------------------------------------- */
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  apiCounts: apiCountsReducer,
});

/* --------------------------------------------------
   PERSIST CONFIG (RN SAFE)
-------------------------------------------------- */
const persistConfig = {
  key: "root",
  version: 1,
  storage: secureStorage, // ✅ SecureStore / AsyncStorage
  whitelist: ["auth", "cart", "wishlist", "apiCounts"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* --------------------------------------------------
   STORE
-------------------------------------------------- */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ required for redux-persist
    }).concat(storageSyncMiddleware),
});

/* --------------------------------------------------
   PERSISTOR
-------------------------------------------------- */
export const persistor = persistStore(store);

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
