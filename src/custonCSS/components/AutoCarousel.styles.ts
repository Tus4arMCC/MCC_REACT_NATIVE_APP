import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/*
  AutoCarousel Styles
  -------------------
  All styles are locally scoped to avoid conflicts.
  Mobile-first design using device width.
*/

export const carouselStyles = StyleSheet.create({
  /* Outer carousel wrapper */
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: "#000",
    overflow: "hidden",
  },

  /* Individual slide wrapper */
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Slide image */
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* Caption overlay on image */
  captionBox: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 12,
    borderRadius: 8,
  },

  /* Caption title text */
  captionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  /* Caption description text */
  captionText: {
    color: "#fff",
    fontSize: 14,
  },

  /* Dots container (center bottom) */
  dotsWrapper: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },

  /* Dot */
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  /* Active dot */
  dotActive: {
    backgroundColor: "#ff3b30",
    transform: [{ scale: 1.3 }],
  },
});

export { SCREEN_WIDTH };
