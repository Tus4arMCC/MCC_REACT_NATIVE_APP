// wishlistApi.ts
import axios from "axios";
import PKSOFT_URLS from "../utilits/Pk_api_Urls";

export const fetchWishlistAPI = (uid:any,d:any) =>
  axios.get(`${PKSOFT_URLS.CUSTOMER.CHECKLIST}/${uid}/${d}`).then((r) => r.data);