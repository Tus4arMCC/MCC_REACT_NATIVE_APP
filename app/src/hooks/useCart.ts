import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  CartItem,
} from "../store/cartSlice";
import { RootState } from "../store/store";

/**
 * Custom hook for cart management using Redux
 */
export const useCart = () => {
  const dispatch = useDispatch();

  // Strongly typed selector (recommended)
  const items = useSelector(
    (state: RootState) => state.cart.items as CartItem[]
  );

  /* ---------------------------------------
   * COUNT & TOTALS
   ---------------------------------------- */

  // Total quantity in cart
  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  // Number of unique products
  const itemCount = useMemo(() => items.length, [items]);

  // Alias — same as cartCount (can remove if you want)
  const cartTotal = cartCount;

  /* ---------------------------------------
   * HELPERS
   ---------------------------------------- */

  const isInCart = useCallback(
    (productId: string) =>
      items.some((item) => item.productId === productId),
    [items]
  );

  const getQty = useCallback(
    (productId: string) =>
      items.find((item) => item.productId === productId)?.qty ?? 0,
    [items]
  );

  /* ---------------------------------------
   * ACTION DISPATCHERS
   ---------------------------------------- */

  const handleAddToCart = useCallback(
    (productId: string, qty: number = 1) => {
      dispatch(addToCart({ productId, qty }));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch]
  );

  const handleUpdateQty = useCallback(
    (productId: string, qty: number) => {
      dispatch(updateQty({ productId, qty }));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  /* ---------------------------------------
   * EXPORT API
   ---------------------------------------- */

  return {
    cart: items,
    items,
    cartCount,
    itemCount,
    cartTotal,
    isInCart,
    getQty,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQty: handleUpdateQty,
    clearCart: handleClearCart,
  };
};
