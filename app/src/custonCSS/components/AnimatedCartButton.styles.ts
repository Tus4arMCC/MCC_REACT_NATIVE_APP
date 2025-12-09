import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  danger: {
    backgroundColor: "#dc3545",
  },

  secondary: {
    backgroundColor: "#6c757d",
  },

  iconWrapper: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    overflow: "hidden",
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
});
