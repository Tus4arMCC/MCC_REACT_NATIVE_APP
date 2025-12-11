import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, PortalProvider, PortalHost } from "tamagui";
import { Provider } from "react-redux";

import tamaguiConfig from "./tamagui.config";
import { store } from "./src/store/store";
import RootLayout from "./src/layouts/RootLayout";
// import AppToastProvider from "./src/components/ToastProvider";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <TamaguiProvider config={tamaguiConfig}>

          {/* 🚨 REQUIRED root portal system */}
          <PortalProvider>
            {/* 🚨 REQUIRED host for toasts, sheets, dialogs */}
            <PortalHost name="root" />

            {/* <AppToastProvider> */}
              <NavigationContainer>
                <RootLayout />
              </NavigationContainer>
            {/* </AppToastProvider> */}
          </PortalProvider>

        </TamaguiProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
