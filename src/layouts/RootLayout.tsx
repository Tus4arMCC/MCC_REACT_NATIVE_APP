import React from "react";
import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import BottomTabs from "../navigation/BottomTabs";

import Login from "../screens/LoginScreen";
// import Register from "../screens/RegisterScreen";
// import ForgetPassword from "../screens/ForgetPasswordScreen";
// import ProductPage from "../screens/ProductPage";
// import AddressScreen from "../screens/AddressScreen";
// import OrderScreen from "../screens/OrderScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootTabs" component={BottomTabs} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Order" component={OrderScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
