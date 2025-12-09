import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import BottomTabs from "../navigation/BottomTabs";

/*
  RootLayout
  ----------
  ✅ Global Safe Area wrapper
  ✅ Applied once
  ✅ All screens protected
*/

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
