import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  imageContainer: {
    height: 220,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
  },

  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },

  placeholder: {
    position: "absolute",
    opacity: 0.5,
  },

  wishlistIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
  },

  body: {
    padding: 12,
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
  },

  mrp: {
    fontSize: 12,
    color: "#777",
    textDecorationLine: "line-through",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  cartWrapper: {
    marginTop: "auto",
  },

  ribbon: {
    position: "absolute",
    top: 16,
    left: -40,
    width: 150,
    height: 28,
    backgroundColor: "#ff5454",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    zIndex: 5,
  },

  ribbonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
