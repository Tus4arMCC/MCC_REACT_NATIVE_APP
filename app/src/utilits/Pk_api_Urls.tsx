const PKSOFT_URLS = {
  CUSTOMER: {
    REGISTER: "api/pk/Customer/register",
    REGISTER_OTP: "api/pk/Customer/verify-otp",
    LOGIN: "api/pk/Customer/auth",
    PRODUCT: "api/pk/Customer/product",
    CATEGORY: "api/pk/Customer/load/category",
    DETAILS: "api/pk/Customer/load/details",

    COUNT: "api/pk/Customer/Count", //{count}
    CHECKLIST: "api/pk/Customer/CheckList", //{wishlist-list}
    BAG: "api/pk/Customer/Bag", //{get cart & wishlist}

    WISHLIST: "api/pk/Customer/wishlist", //{add/remove from wishlist}
    CART: "api/pk/Customer/Cart", //{add/remove from cart}
  },
  GUEST: {
    GUEST_REGISTER: "api/pk/Customer/guest/auth",
    GUEST_OTP: "api/pk/Customer/verify-guest",
    GUEST_ORDER: "api/pk/Order/GuestOrders",
  },
  ORDER: {
    PROCEED: "api/pk/Order/proceed",
    SUCCESS: "api/pk/Order/success",
    USER_ORDER: "api/pk/User/Orders",
  },
  ADDRESS: {
    CREATE: "api/pk/Customer/Address/Create",
    UPDATE: "api/pk/Customer/Address/Update",
    DELETE: "api/pk/Customer/Address/Delete",
    GET: "api/pk/Customer/Address/List",
    SET_DEFAULT: "api/pk/Customer/Address/Primary",
  },
  CANCEL: {
    ORDER: "api/pk/Order/cancel",
  },
};
export default PKSOFT_URLS;
