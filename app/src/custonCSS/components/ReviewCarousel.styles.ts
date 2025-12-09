import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    paddingHorizontal: 16,
  },

  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },

  subHeading: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    minHeight: 300,
  },

  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e74c3c",
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },

  readMore: {
    color: "#e63946",
    fontWeight: "500",
    marginTop: 8,
  },

  arrows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  arrowBtn: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#333",
  },

  disabledArrow: {
    opacity: 0.4,
  },
});
