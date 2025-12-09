/**
 * Auth Dialog Integration Utility (React Native)
 */

import { Alert } from "react-native";
import { handleGuestLoginSuccess, handleUserLoginSuccess } from "./authUtils";
import { readAuthFromStorage } from "./authStorage";

/**
 * Show auth dialog and handle the selected option
 * @param dispatch - Redux dispatch
 * @param navigation - React Navigation navigation object
 */
export const handleAuthDialog = (dispatch: any, navigation: any) => {
  Alert.alert(
    "Authentication Required",
    "Please choose how you want to continue",
    [
      {
        text: "Continue as Guest",
        onPress: async () => {
          try {
            const auth = await readAuthFromStorage();

            const headers: any = {
              "Content-Type": "application/json",
            };

            if (auth?.jwt) {
              headers.Authorization = `Bearer ${auth.jwt}`;
            }
            if (auth?.pksoft) {
              headers["x-auth"] = auth.pksoft;
            }

            const response = await fetch(
              `${process.env.EXPO_PUBLIC_BASE_URL}/api/pk/Customer/guest/auth`,
              {
                method: "POST",
                headers,
                body: JSON.stringify({}),
              }
            );

            const data = await response.json();

            if (data?.uid) {
              handleGuestLoginSuccess(data.uid, dispatch);
              console.log("[RN DIALOG] Guest login successful ✅");
            } else {
              console.error("[RN DIALOG] No uid in response");
            }
          } catch (error) {
            console.error("[RN DIALOG] Guest login error:", error);
          }
        },
      },
      {
        text: "Create Account",
        onPress: () => navigation.navigate("Register"),
      },
      {
        text: "Sign In",
        onPress: () => navigation.navigate("Login"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
};

/**
 * After user registers successfully
 */
export const handleRegistrationSuccess = (
  userId: string,
  userInfo: any,
  dispatch: any
) => {
  handleUserLoginSuccess(userId, userInfo, dispatch);
  console.log("[RN AUTH] User registration successful ✅");
};

/**
 * After user logs in successfully
 */
export const handleLoginSuccess = (
  userId: string,
  userInfo: any,
  dispatch: any
) => {
  handleUserLoginSuccess(userId, userInfo, dispatch);
  console.log("[RN AUTH] User login successful ✅");
};

export default {
  handleAuthDialog,
  handleRegistrationSuccess,
  handleLoginSuccess,
};
