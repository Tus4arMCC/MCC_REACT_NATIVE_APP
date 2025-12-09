import { Toast, useToastController } from "@tamagui/toast";
import { Text } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
}

/* ----------------------------------------
   COLORS
---------------------------------------- */
const getBgColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "#2ecc71";
    case "error":
      return "#e74c3c";
    case "warning":
      return "#f1c40f";
    case "info":
    default:
      return "#333";
  }
};

/* ----------------------------------------
   PUBLIC TOAST API
---------------------------------------- */
export const useAppToast = () => {
  const toast = useToastController();

  const showToast = ({
    type = "info",
    message,
    duration = 2000,
  }: ToastOptions) => {
    toast.show(message, {
      duration,
      customToast: () => (
        <Toast
          animation="quick"
          enterStyle={{ opacity: 0, y: -10 }}
          exitStyle={{ opacity: 0, y: -10 }}
          backgroundColor={getBgColor(type)}
          borderRadius={14}
          paddingVertical={12}
          paddingHorizontal={18}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {message}
          </Text>
        </Toast>
      ),
    });
  };

  return {
    /* Base */
    showToast,

    /* Shortcuts */
    showSuccessToast: (message: string) =>
      showToast({ type: "success", message }),

    showErrorToast: (message: string) =>
      showToast({ type: "error", message }),

    showWarningToast: (message: string) =>
      showToast({ type: "warning", message }),

    showInfoToast: (message: string) =>
      showToast({ type: "info", message }),
  };
};
