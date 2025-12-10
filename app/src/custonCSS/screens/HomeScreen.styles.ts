import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    paddingBottom: 16,
  },

  /* ✅ Tight spacing sections (hero → categories) */
  sectionTight: {
    marginBottom: 8,
  },

  /* ✅ Normal content spacing */
  sectionNormal: {
    marginTop: 16,
  },

  promoImage: {
    width: "100%",
    height: 200,
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
