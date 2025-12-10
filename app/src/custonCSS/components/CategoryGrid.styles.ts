import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 12;

// Left + right split
const LEFT_WIDTH = (SCREEN_WIDTH - 16 * 2 - GAP) / 2;

// Small cards (2 in a row)
const SMALL_WIDTH = (LEFT_WIDTH - GAP) / 2;
const SMALL_HEIGHT = SMALL_WIDTH * 1.35;

// Big card height = exactly 2 small + gap
const BIG_HEIGHT = SMALL_HEIGHT * 2 + GAP;

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",

  },

  row: {
    flexDirection: "row",
  },

  /* LEFT SIDE */
  leftColumn: {
    width: LEFT_WIDTH,
    marginRight: GAP,
  },

  leftRow: {
    flexDirection: "row",
    marginBottom: GAP,
  },

  smallCard: {
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
  },

  smallRightGap: {
    marginRight: GAP,
  },

  /* RIGHT SIDE */
  bigCard: {
    width: LEFT_WIDTH,
    height: BIG_HEIGHT, // ✅ EXACT MATCH
    borderRadius: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },

  overlayTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
