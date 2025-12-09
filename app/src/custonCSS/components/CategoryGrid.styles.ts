import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 24,
    paddingHorizontal: 16,
  },

  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  leftGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },

  card: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    backgroundColor: "#000",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  overlayTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  shopBtn: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#dc3545",
    borderRadius: 16,
  },

  shopText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
