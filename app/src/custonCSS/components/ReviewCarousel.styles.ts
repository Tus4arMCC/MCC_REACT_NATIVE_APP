import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },

  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  subHeading: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 18,
    padding: 16,
    height: 320,
    marginHorizontal: 8,

    // ✅ SHADOW (iOS)
    shadowColor: "#000",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // ✅ SHADOW (Android)
    elevation: 6,
  },

  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },

  descriptionBox: {
    flex: 1,
    marginTop: 6,
  },

  readMore: {
    color: "#e63946",
    fontWeight: "500",
    marginTop: 8,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e74c3c",
  },
});
