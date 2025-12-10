import { StyleSheet } from "react-native";

/*
  Skeleton styles
  ---------------
  ✅ Shared across component
  ✅ No global pollution
  ✅ Mobile-friendly spacing
*/

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  card: {
    width: 140,
    alignItems: "center",
    marginRight: 12,
    opacity: 0.6,
  },

  imageSkeleton: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#ff0000ff",
    marginBottom: 8,
  },

  textSkeleton: {
    width: 80,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
});
