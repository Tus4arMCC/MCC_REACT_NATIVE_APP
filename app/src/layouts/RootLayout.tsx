import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/*
  RootLayout
  ----------
  ✅ Acts as a global SafeArea wrapper
  ✅ Prevents repeating SafeAreaView on every screen
  ✅ Mobile-safe for notch & status bar
*/

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
