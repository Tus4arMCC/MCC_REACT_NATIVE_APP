import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
// import { AppToastProvider } from "./src/components/ToastProvider";
import tamaguiConfig from "./tamagui.config";
import RootLayout from "./src/layouts/RootLayout";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <AppToastProvider> */}
      <Provider store={store}>

      <TamaguiProvider config={tamaguiConfig}>
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </TamaguiProvider>
      {/* </AppToastProvider> */}
      </Provider>

    </SafeAreaProvider>
  );
}
