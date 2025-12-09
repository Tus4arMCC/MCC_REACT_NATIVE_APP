import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    backgroundColor: "#2c2c2c",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },

  title: {
    marginTop: 8,
    fontWeight: "700",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },

  desc: {
    marginTop: 4,
    color: "#ddd",
    fontSize: 12,
    textAlign: "center",
  },
});
