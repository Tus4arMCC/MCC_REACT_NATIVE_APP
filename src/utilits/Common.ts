import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

/* ------------------------------------------------------------------ */
/* STRING / UI HELPERS                                                */
/* ------------------------------------------------------------------ */

export const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getMenuRightsTypes = () => [
  { key: "isCreateRights", isChecked: false, title: "Create" },
  { key: "isViewRights", isChecked: false, title: "View" },
  { key: "isEditRights", isChecked: false, title: "Edit" },
  { key: "isDeleteRights", isChecked: false, title: "Delete" },
  { key: "isUserLevelRights", isChecked: false, title: "User Level" },
];

/* ------------------------------------------------------------------ */
/* DATE HELPERS                                                       */
/* ------------------------------------------------------------------ */

export const fnGetCurrentDate = () => {
  return moment.utc(moment(new Date()).format("YYYY-MM-DD")).toISOString();
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

export const fnGetExactDate = (date: any) => date.toString();

export const __fnConvertUTCDate = (date: any) => {
  const stDate = moment(date).toDate();
  return new Date(
    Date.UTC(
      stDate.getFullYear(),
      stDate.getMonth(),
      stDate.getDate(),
      stDate.getHours(),
      stDate.getMinutes(),
      stDate.getSeconds(),
      stDate.getMilliseconds()
    )
  );
};

export const __fnGetStartDate = (day: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - day);
  return date;
};

export const __fnGetEndDate = () => new Date();
export const __fnGetCurrentDate = () => new Date();
export const __fnGetFormatedCurrentDate = () =>
  fnGetExactDate(__fnGetCurrentDate());

/* ------------------------------------------------------------------ */
/* IMAGE URL RESOLVER (NO window)                                     */
/* ------------------------------------------------------------------ */

export const resolveImageUrl = (url?: string) => {
  if (!url) return "";

  const trimmed = String(url).trim();
  if (!trimmed) return "";

  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // ✅ RN-safe base URL
  const base =
    axios.defaults.baseURL ||
    Constants.expoConfig?.extra?.BASE_URL ||
    "";

  const normalizedBase = String(base).replace(/\/$/, "");

  return trimmed.startsWith("/")
    ? normalizedBase + trimmed
    : normalizedBase + "/" + trimmed;
};

/* ------------------------------------------------------------------ */
/* ASYNC STORAGE (REPLACES localStorage)                              */
/* ------------------------------------------------------------------ */

export const fnSetLocalStorage = async (key: string, data: object) => {
  if (!key) return;
  await AsyncStorage.setItem(key, JSON.stringify(data ?? ""));
};

export const fnGetLocalStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const fnRemoveStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const fnGetLocalStorageByKey = async (
  key: string,
  property: string
) => {
  if (!key || !property) return null;

  const data = await fnGetLocalStorage(key);
  return data?.[property] ?? null;
};

/* ------------------------------------------------------------------ */
/* LAST RECORD HELPERS (NO-OP SAFE)                                   */
/* ------------------------------------------------------------------ */

export const fnSetIsLastRecord = (_data: any, _filters: any) => {};
export const fnGetIsLastRecord = () => false;
export const fnRemoveLastRecord = () => {};

/* ------------------------------------------------------------------ */
/* BUSINESS RULES                                                     */
/* ------------------------------------------------------------------ */

export const fnGetMaxOrderLimitNo = (
  availableStock: number
): number => {
  const maxLimit =
    Constants.expoConfig?.extra?.MAX_ORDER_QTY_LIMIT ??
    Number(process.env.EXPO_PUBLIC_MAX_ORDER_QTY_LIMIT) ??
    10;

  return Math.min(availableStock, Number(maxLimit));
};
