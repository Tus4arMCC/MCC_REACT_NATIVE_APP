import axios from "axios";
import PKSOFT_URLS from "../utilits/Pk_api_Urls";
import { resolveUid, getUserType } from "../utilits/storageUtils";
import { getEncodedTimestamp } from "../utilits/dateUtils";
import { useAppToast } from "../components/Toast";

/* --------------------------------------------------
   USER ID RESOLVER (unchanged)
-------------------------------------------------- */
export const getUserId = (userInfo: any): string | null => {
  if (!userInfo) return null;

  if (userInfo?.user_id) return String(userInfo.user_id);
  if (userInfo?.userId) return String(userInfo.userId);
  if (userInfo?.guest_id) return String(userInfo.guest_id);
  if (userInfo?.guestId) return String(userInfo.guestId);

  return null;
};

/* --------------------------------------------------
   ADD TO WISHLIST
-------------------------------------------------- */
export const addToWishlistAPI = async (
  productId: string
): Promise<{ success: boolean; count?: number }> => {
  const { showErrorToast, showSuccessToast } = useAppToast();

  try {
    const uid = await resolveUid();
    const userType = await getUserType();

    // 🟡 Random users → local-only
    if (userType === "random") {
      return { success: true };
    }

    if (!uid) {
      showErrorToast("Unable to identify user. Please log in again.");
      return { success: false };
    }

    const response = await axios.post(
      `${PKSOFT_URLS.CUSTOMER.WISHLIST}/add`,
      {
        uid,
        productCode: String(productId),
        d: getEncodedTimestamp(),
      }
    );

    if (
      response.data?.messageCode === 100 &&
      response.data?.status === 200
    ) {
      showSuccessToast(response.data.message);
      return {
        success: true,
        count: response.data?.data?.wishlistCount ?? 0,
      };
    }

    showErrorToast(response.data?.message);
    return { success: false };
  } catch (error: any) {
    //console.error("[RN] Error adding to wishlist:", error);
    showErrorToast(
      error.response?.data?.message ||
        "Failed to add to wishlist. Please try again."
    );
    return { success: false };
  }
};

/* --------------------------------------------------
   GET WISHLIST
-------------------------------------------------- */
export const getWishlistAPI = async (): Promise<{
  success: boolean;
  data?: any[];
}> => {
  const { showErrorToast } = useAppToast();

  try {
    const uid = await resolveUid();
    const userType = await getUserType();

    if (userType === "random") {
      return { success: true, data: [] };
    }

    if (!uid) {
      showErrorToast("Unable to identify user. Please log in again.");
      return { success: false, data: [] };
    }

    const response = await axios.get(
      `${PKSOFT_URLS.CUSTOMER.CHECKLIST}/${uid}/${getEncodedTimestamp()}`
    );

    if (
      response.data?.messageCode === 100 &&
      (response.data?.status === 200 ||
        typeof response.data?.status === "undefined")
    ) {
      return { success: true, data: response.data?.data ?? [] };
    }

    showErrorToast(response.data?.message || "Failed to fetch wishlist");
    return { success: false, data: [] };
  } catch (error: any) {
    //console.error("[RN] Error fetching wishlist:", error);
    showErrorToast(
      error.response?.data?.message ||
        "Failed to fetch wishlist. Please try again."
    );
    return { success: false, data: [] };
  }
};

/* --------------------------------------------------
   REMOVE FROM WISHLIST
-------------------------------------------------- */
export const removeFromWishlistAPI = async (
  productId: string
): Promise<{ success: boolean; count?: number }> => {
  const { showErrorToast, showSuccessToast } = useAppToast();

  try {
    const uid = await resolveUid();
    const userType = await getUserType();

    // 🟡 Random users → local-only
    if (userType === "random") {
      return { success: true };
    }

    if (!uid) {
      showErrorToast("Unable to identify user. Please log in again.");
      return { success: false };
    }

    const response = await axios.post(
      `${PKSOFT_URLS.CUSTOMER.WISHLIST}/remove`,
      {
        uid,
        productCode: String(productId),
        d: getEncodedTimestamp(),
      }
    );

    if (
      response.data?.messageCode === 100 &&
      response.data?.status === 200
    ) {
      showSuccessToast(response.data.message);
      return {
        success: true,
        count: response.data?.data?.wishlistCount ?? 0,
      };
    }

    showErrorToast(response.data?.message);
    return { success: false };
  } catch (error: any) {
    //console.error("[RN] Error removing from wishlist:", error);
    showErrorToast(
      error.response?.data?.message ||
        "Failed to remove from wishlist. Please try again."
    );
    return { success: false };
  }
};
