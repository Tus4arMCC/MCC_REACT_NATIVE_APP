import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import {
  addToWishlist,
  removeFromWishlist,
  updateWishlistQty,
  clearWishlist,
  WishlistItem,
} from "../store/wishlistSlice";

import { setWishlistCount } from "../store/apiCountsSlice";
import { RootState } from "../store/store";

import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../api/wishlistApi";

/**
 * React Native Wishlist Hook
 *
 * ✅ Random users → local Redux only
 * ✅ Guest / User → API + Redux sync
 * ✅ No cookies
 * ✅ AsyncStorage handled by middleware
 */
export const useWishlist = () => {
  const dispatch = useDispatch();

  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */
  const userInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  const items = useSelector(
    (state: RootState) => state.wishlist.items
  ) as WishlistItem[];

  /* --------------------------------------------------
     DERIVED VALUES
  -------------------------------------------------- */
  const wishlistCount = useMemo(
    () => items.length,
    [items]
  );

  const isWishlisted = useCallback(
    (productId: string) =>
      items.some((item) => item.productId === productId),
    [items]
  );

  const getQty = useCallback(
    (productId: string) =>
      items.find((item) => item.productId === productId)?.qty ?? 0,
    [items]
  );

  /* --------------------------------------------------
     ACTIONS
  -------------------------------------------------- */
  const handleAddToWishlist = useCallback(
    async (productId: string, qty: number = 1) => {
      const result = await addToWishlistAPI(productId);

      if (result.success) {
        // ✅ Update Redux immediately (optimistic)
        dispatch(addToWishlist({ productId, qty }));

        // ✅ Update global count if API returned it
        if (result.count !== undefined) {
          dispatch(setWishlistCount(result.count));
        }
      }

      return result;
    },
    [dispatch]
  );

  const handleRemoveFromWishlist = useCallback(
    async (productId: string) => {
      const result = await removeFromWishlistAPI(productId);

      if (result.success) {
        dispatch(removeFromWishlist(productId));

        if (result.count !== undefined) {
          dispatch(setWishlistCount(result.count));
        }
      }

      return result;
    },
    [dispatch]
  );

  const handleUpdateWishlistQty = useCallback(
    (productId: string, qty: number) => {
      dispatch(updateWishlistQty({ productId, qty }));
    },
    [dispatch]
  );

  const handleClearWishlist = useCallback(() => {
    dispatch(clearWishlist());
  }, [dispatch]);

  /* --------------------------------------------------
     PUBLIC API
  -------------------------------------------------- */
  return {
    wishlist: items,
    items,
    wishlistCount,
    isWishlisted,
    getQty,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    updateWishlistQty: handleUpdateWishlistQty,
    clearWishlist: handleClearWishlist,
  };
};
