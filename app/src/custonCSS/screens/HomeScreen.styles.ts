import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  promoWrapper: {
    marginVertical: 16,
    width: "100%",
  },

  promoImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },

  sectionWrapper: {
    marginTop: 16,
  },

  skeletonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 12,
  },

  skeletonItem: {
    width: "48%",
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 24,
  },
});
