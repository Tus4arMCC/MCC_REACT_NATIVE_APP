import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
    position: "relative",
  },

  skeleton: {
    borderRadius: 6,
    backgroundColor: "#e6e6e6",
  },

  wishlist: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  image: {
    height: 220,
    width: "100%",
    borderRadius: 12,
    marginBottom: 12,
  },

  text: {
    height: 16,
    width: "80%",
    marginBottom: 8,
  },

  price: {
    height: 16,
    width: "60%",
    marginBottom: 6,
  },

  small: {
    height: 14,
    width: "40%",
    marginBottom: 12,
  },

  button: {
    height: 40,
    width: "100%",
    borderRadius: 10,
  },
});
