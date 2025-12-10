import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  navBtn: {
    position: "absolute",
    top: "45%",
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 24,
    elevation: 3,
  },

  navLeft: {
    left: 8,
  },

  navRight: {
    right: 8,
  },

  disabled: {
    opacity: 0.4,
  },

  itemWrapper: {
    paddingRight: 12,
  },
});
