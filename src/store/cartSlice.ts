import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart or update quantity if already exists
    addToCart: (state, action: PayloadAction<{ productId: string; qty: number }>) => {
      const { productId, qty } = action.payload;

      // Validate inputs
      if (!productId || typeof productId !== "string" || qty <= 0) {
        console.warn("Invalid product data:", { productId, qty });
        return;
      }

      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.items.push({ productId, qty });
      }
    },

    // Remove from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      if (!productId || typeof productId !== "string") {
        console.warn("Invalid product ID:", productId);
        return;
      }

      state.items = state.items.filter((item) => item.productId !== productId);
    },

    // Update quantity
    updateQty: (state, action: PayloadAction<{ productId: string; qty: number }>) => {
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

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

    // Set entire cart (for hydration from storage)
    setCart: (state, action: PayloadAction<CartItem[]>) => {
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

export const { addToCart, removeFromCart, updateQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
