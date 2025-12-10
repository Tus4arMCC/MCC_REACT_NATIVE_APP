import axios from "axios";
import { resolveUid, getUserType } from "../utilits/storageUtils";
import { getEncodedTimestamp } from "../utilits/dateUtils";
import PKSOFT_URLS from "../utilits/Pk_api_Urls";

export const addToCartAPI = async (
  productId: string
): Promise<{ success: boolean; count?: number }> => {
  try {
    const uid = await resolveUid();
    const userType = await getUserType();

    // 🟡 Random users → local cart only
    if (userType === "random") {
      return { success: true };
    }

    if (!uid) {
      return { success: false };
    }

    const response = await axios.post(
      `${PKSOFT_URLS.CUSTOMER.CART}/add`,
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
      return {
        success: true,
        count: response.data?.data?.cartCount ?? 0,
      };
    }

    return { success: false };
  } catch (error: any) {
    console.error("[RN] Error adding to cart:", error);
    return { success: false };
  }
};

export const removeFromCartAPI = async (
  productId: string
): Promise<{ success: boolean; count?: number }> => {
  try {
    const uid = await resolveUid();
    const userType = await getUserType();

    // 🟡 Random users → local cart only
    if (userType === "random") {
      return { success: true };
    }

    if (!uid) {
      return { success: false };
    }

    const response = await axios.post(
      `${PKSOFT_URLS.CUSTOMER.CART}/remove`,
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
      return {
        success: true,
        count: response.data?.data?.cartCount ?? 0,
      };
    }

    return { success: false };
  } catch (error: any) {
    console.error("[RN] Error removing from cart:", error);
    return { success: false };
  }
};
//done