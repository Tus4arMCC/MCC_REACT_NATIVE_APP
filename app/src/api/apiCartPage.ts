import axios from "axios";
import PKSOFT_URLS from "../utilits/Pk_api_Urls";

export const fetchBag = (payload: any) =>
  axios.post(PKSOFT_URLS.CUSTOMER.BAG, payload).then((r) => r.data);

export const proceedOrder = (payload: any) =>
  axios.post(PKSOFT_URLS.ORDER.PROCEED, payload).then((r) => r.data);

export const finalizeOrder = (payload: any) =>
  axios.post(PKSOFT_URLS.ORDER.SUCCESS, payload).then((r) => r.data);
debugger
export const removeFromCartApi = (productId: string ,uid:any,d:any) =>
  // keep existing wrapper to match your removeFromCartAPI
  axios
    .post(`${PKSOFT_URLS.CUSTOMER.CART}/remove`, { productId, uid, d })
    .then((r) => r.data);
