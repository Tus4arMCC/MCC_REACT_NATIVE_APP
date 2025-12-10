import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiCountsState {
  cartCount: number;
  wishlistCount: number;
}

const initialState: ApiCountsState = {
  cartCount: 0,
  wishlistCount: 0,
};

const apiCountsSlice = createSlice({
  name: "apiCounts",
  initialState,
  reducers: {
    // Set cart count from API
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },

    // Set wishlist count from API
    setWishlistCount: (state, action: PayloadAction<number>) => {
      state.wishlistCount = action.payload;
    },

    // Set both counts at once
    setCounts: (state, action: PayloadAction<{ cartCount: number; wishlistCount: number }>) => {
      state.cartCount = action.payload.cartCount;
      state.wishlistCount = action.payload.wishlistCount;
    },

    // Clear counts on logout
    clearCounts: (state) => {
      state.cartCount = 0;
      state.wishlistCount = 0;
    },
  },
});

export const { setCartCount, setWishlistCount, setCounts, clearCounts } = apiCountsSlice.actions;
export default apiCountsSlice.reducer;
