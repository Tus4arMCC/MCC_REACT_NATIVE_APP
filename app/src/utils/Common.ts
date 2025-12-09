import axios from "axios";
import moment from "moment";
// import menuItems from "../data/menuItems.json";
// import { IS_LAST_RECORD_DELETED } from "./constants.ts";

export const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getMenuRightsTypes = () => {
  return [
    { key: "isCreateRights", isChecked: false, title: "Create" },
    { key: "isViewRights", isChecked: false, title: "View" },
    { key: "isEditRights", isChecked: false, title: "Edit" },
    { key: "isDeleteRights", isChecked: false, title: "Delete" },
    { key: "isUserLevelRights", isChecked: false, title: "User Level" },
  ];
};

// export const getDefaultMenuList = () => {
//   return menuItems.map(({ id, title, submenu }) => ({
//     id: null,
//     moduleCode: Number(id),
//     title,
//     isChecked: false,
//     rightTypes: getMenuRightsTypes(),
//     submodules: (submenu ?? []).map(({ id, title }) => ({
//       id: null,
//       subModuleCode: Number(id),
//       title,
//       isCreateRights: false,
//       isViewRights: false,
//       isEditRights: false,
//       isDeleteRights: false,
//       isUserLevelRights: false,
//     })),
//   }));
// };

export const fnGetCurrentDate = () => {
  return moment.utc(moment(new Date()).format("YYYY-MM-DD")).toISOString();
};

export const resolveImageUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  const trimmed = String(url).trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http") ||
    trimmed.startsWith("blob:")
  )
    return trimmed;
  let base =
    (axios.defaults && (axios.defaults as any).baseURL) ||
    window.location.origin;
  base = String(base).replace(/\/$/, "");
  if (trimmed.startsWith("/")) return base + trimmed;
  return base + "/" + trimmed;
};

export const formatDateWithTime = (date: any) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export const formatDateOnly = (date: any) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

export const fnGetExactDate = (date: any) => {
  return date.toString();
};

export const __fnConvertUTCDate = (date: any) => {
  let st = moment(date); // original date
  let stDate = st.toDate(); // convert moment to JS Date safely

  return new Date(
    Date.UTC(
      stDate.getFullYear(),
      stDate.getMonth(),
      stDate.getDate(),
      stDate.getHours(),
      stDate.getMinutes(),
      stDate.getSeconds(), // ✅ should be seconds, not milliseconds
      stDate.getMilliseconds()
    )
  );
};

export const __fnGetStartDate = (day?: any) => {
  if (!day && day !== 0) {
    day = 30;
  }
  var future = new Date();
  future.setDate(future.getDate() - day);
  return future;
};
export const __fnGetEndDate = () => {
  return new Date();
};
export const __fnGetCurrentDate = () => {
  return new Date();
};
export const __fnGetFormatedCurrentDate = () => {
  return fnGetExactDate(__fnGetCurrentDate());
};

export const fnSetLocalStorage = (key: string, data: object) => {
  if (key) {
    localStorage.setItem(key, data ? JSON.stringify(data) : "");
  }
};
export const fnGetLocalStorage = (key: string) => {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const fnRemoveStorage = (key: string) => {
  localStorage.removeItem(key);
  fnRemoveLastRecord();
};

export const fnGetLocalStorageByKey = (key: string, property: string) => {
  if (key && property) {
    let data = fnGetLocalStorage(key);
    if (data != null) {
      return data[property] ? data[property] : null;
    }
  }
  return null;
};

export const fnSetIsLastRecord = (data: any, filters: any) => {
  if (data && filters && data.length === 1 && filters.pageNo > 1) {
    // localStorage.setItem(IS_LAST_RECORD_DELETED, true.toString());
    return;
  }
  fnRemoveLastRecord();
};
export const fnGetIsLastRecord = () => {
//   return localStorage.getItem(IS_LAST_RECORD_DELETED) === "true";
};
export const fnRemoveLastRecord = () =>{

    //   localStorage.removeItem(IS_LAST_RECORD_DELETED);
}

export const fnGetMaxOrderLimitNo = (availableStock: number): number => {
  const maxLimitEnv = process.env.REACT_APP_MAX_ORDER_QTY_LIMIT;
  const maxLimit = maxLimitEnv ? parseInt(maxLimitEnv, 10) : 10;
  return Math.min(availableStock, maxLimit);
};