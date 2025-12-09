import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  productId: string;
  qty: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add to wishlist
    addToWishlist: (state, action: PayloadAction<{ productId: string; qty?: number }>) => {
      const { productId, qty = 1 } = action.payload;

      // Validate product ID
      if (!productId || typeof productId !== "string") {
        console.warn("Invalid product ID:", productId);
        return;
      }

      // Check if already in wishlist
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        return; // Already in wishlist, don't add duplicate
      }

      state.items.push({ productId, qty });
    },

    // Remove from wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      if (!productId || typeof productId !== "string") {
        console.warn("Invalid product ID:", productId);
        return;
      }

      state.items = state.items.filter((item) => item.productId !== productId);
    },

    // Update quantity in wishlist
    updateWishlistQty: (state, action: PayloadAction<{ productId: string; qty: number }>) => {
      const { productId, qty } = action.payload;

      // Validate inputs
      if (!productId || typeof productId !== "string" || qty < 0) {
        console.warn("Invalid product data:", { productId, qty });
        return;
      }

      if (qty === 0) {
        // Remove item if qty is 0
        state.items = state.items.filter((item) => item.productId !== productId);
      } else {
        const item = state.items.find((item) => item.productId === productId);
        if (item) {
          item.qty = qty;
        }
      }
    },

    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = [];
    },

    // Set entire wishlist (for hydration from storage)
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      const items = action.payload;

      // Validate and filter items
      if (Array.isArray(items)) {
        state.items = items.filter(
          (item) => item.productId && typeof item.productId === "string" && item.qty > 0
        );
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, updateWishlistQty, clearWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
