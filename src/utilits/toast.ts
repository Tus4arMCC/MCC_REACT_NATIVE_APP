// import { Toast, useToastController } from "tamagui";
// import { Text } from "react-native";

// /* =======================
//    Toast Types
//    ======================= */

// type ToastType = "success" | "error" | "warning" | "info";

// interface ToastOptions {
//   type?: ToastType;
//   message: string;
//   duration?: number;
// }

// /* =======================
//    Internal helper
//    ======================= */

// const getBgColor = (type: ToastType) => {
//   switch (type) {
//     case "success":
//       return "#2ecc71";
//     case "error":
//       return "#e74c3c";
//     case "warning":
//       return "#f1c40f";
//     case "info":
//     default:
//       return "#333";
//   }
// };

// /* =======================
//    Public API (same usage as SweetAlert)
//    ======================= */

// export const useAppToast = () => {
//   const toast = useToastController();

//   const showToast = ({
//     type = "info",
//     message,
//     duration = 2000,
//   }: ToastOptions) => {
//     toast.show(message, {
//       duration,
//       customToast: () => (
//         <Toast
//           animation="quick"
//           enterStyle={{ opacity: 0, y: -10 }}
//           exitStyle={{ opacity: 0, y: -10 }}
//           backgroundColor={getBgColor(type)}
//           borderRadius={12}
//           paddingVertical={10}
//           paddingHorizontal={16}
//         >
//           <Text style={{ color: "white", fontWeight: "600" }}>
//             {message}
//           </Text>
//         </Toast>
//       ),
//     });
//   };

//   return {
//     showToast,
//     showSuccessToast: (message: string) =>
//       showToast({ type: "success", message }),

//     showErrorToast: (message: string) =>
//       showToast({ type: "error", message }),

//     showWarningToast: (message: string) =>
//       showToast({ type: "warning", message }),
//   };
// };
