import { StyleSheet } from "react-native";

/*
  ImagePreview styles
  -------------------
  ✅ No global styles
  ✅ Scoped to component
*/

export const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  loading: {
    opacity: 0.6,
  },

  loaded: {
    opacity: 1,
  },

  deleteBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#dc3545",
    zIndex: 3,
  },

  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
