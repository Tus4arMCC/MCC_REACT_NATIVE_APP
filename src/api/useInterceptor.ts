import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useLoading } from "../components/LoadingContext";
import { useAppToast } from "../components/Toast";
import { clearUserInfo } from "../store/authSlice";
import { persistor } from "../store/store";
import {
  readAuthFromStorage,
  getUserId,
} from "../utilits/authUtils";

let inProcessRequests = 0;

const useInterceptor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { setLoading } = useLoading();
  const { showErrorToast } = useAppToast();

  /* ---------------------------------------------------- */
  /* Axios defaults                                      */
  /* ---------------------------------------------------- */
  axios.defaults.headers.common["Content-Type"] =
    "application/json";
  axios.defaults.headers.common.Accept = "application/json";
  axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;

  /* ---------------------------------------------------- */
  /* Request interceptor                                 */
  /* ---------------------------------------------------- */
  axios.interceptors.request.use(
    async (request) => {
      if (!request.url?.includes("api/Auth/login")) {
        inProcessRequests++;

        const userId = await getUserId();

        if (userId) {
          const auth = await readAuthFromStorage();

          if (auth?.jwt) {
            request.headers.Authorization = `Bearer ${auth.jwt}`;
          }

          if (auth?.pksoft) {
            request.headers["x-auth"] = auth.pksoft;
          }
        }
      }

      setLoading(inProcessRequests > 0);
      return request;
    },
    (error) => {
      if (inProcessRequests === 0) setLoading(false);
      return Promise.reject(error);
    }
  );

  /* ---------------------------------------------------- */
  /* Response interceptor                                */
  /* ---------------------------------------------------- */
  axios.interceptors.response.use(
    (response) => {
      inProcessRequests = Math.max(inProcessRequests - 1, 0);
      if (inProcessRequests === 0) setLoading(false);
      return response;
    },
    async (error) => {
      inProcessRequests = Math.max(inProcessRequests - 1, 0);
      if (inProcessRequests === 0) setLoading(false);

      /* 401 – session expired */
      if (error.response?.status === 401) {
        showErrorToast(
          "Your session has expired. Please log in again."
        );

        setTimeout(async () => {
          dispatch(clearUserInfo());
          await persistor.purge();

          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }, 1500);

        return Promise.reject(error);
      }

      /* Network error */
      if (error.code === "ERR_NETWORK") {
        showErrorToast(
          "Network error - please check your connection."
        );
        //console.error(error);
      }

      return Promise.reject(error);
    }
  );
};

export default useInterceptor;
//done
