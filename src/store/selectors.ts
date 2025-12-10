// /**
//  * ✅ OPTIMIZATION: Memoized Redux Selectors
//  * 
//  * Purpose: Prevent unnecessary re-renders by using stable selector references
//  * Benefits:
//  * - Consistent selector instances across renders
//  * - Easy to reuse across components
//  * - Single place to maintain selector logic
//  * 
//  * Usage:
//  * const userInfo = useSelector(selectUserInfo);
//  * const counts = useSelector(selectApiCounts);
//  * const combinedState = useSelector(selectAuthWithCounts);
//  */

// import type { RootState } from './store';

// // Auth selectors
// export const selectAuth = (state: any) => state.auth;
// export const selectUserInfo = (state: any) => state.auth?.userInfo;
// export const selectUserId = (state: any) => state.auth?.userInfo?.user_id;
// export const selectGuestId = (state: any) => state.auth?.userInfo?.guest_id;
// export const selectAuthToken = (state: any) => state.auth?.token;

// // API Counts selectors
// export const selectApiCounts = (state: any) => state.apiCounts;
// export const selectCartCount = (state: any) => state.apiCounts?.cartCount ?? 0;
// export const selectWishlistCount = (state: any) => state.apiCounts?.wishlistCount ?? 0;

// // Cart selectors
// export const selectCart = (state: any) => state.cart;
// export const selectCartItems = (state: any) => state.cart?.items ?? [];

// // Wishlist selectors
// export const selectWishlist = (state: any) => state.wishlist;
// export const selectWishlistItems = (state: any) => state.wishlist?.items ?? [];

// // Combined selectors (for components using multiple slices)
// export const selectAuthAndCounts = (state: any) => ({
//   auth: state.auth,
//   apiCounts: state.apiCounts,
// });

// export const selectUserIdentity = (state: any) => ({
//   userId: state.auth?.userInfo?.user_id,
//   guestId: state.auth?.userInfo?.guest_id,
//   username: state.auth?.userInfo?.username,
// });

// export const selectCartAndWishlistInfo = (state: any) => ({
//   cartCount: state.apiCounts?.cartCount ?? 0,
//   wishlistCount: state.apiCounts?.wishlistCount ?? 0,
//   cartItems: state.cart?.items ?? [],
//   wishlistItems: state.wishlist?.items ?? [],
// });
