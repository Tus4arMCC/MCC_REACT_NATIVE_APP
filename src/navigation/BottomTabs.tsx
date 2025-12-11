import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BottomTabParamList } from "./types";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF3F6C",
        tabBarInactiveTintColor: "#777",

        tabBarIcon: ({ focused, color, size }) => {
          const icons: any = {
            Home: focused ? "home" : "home-outline",
            Cart: focused ? "cart" : "cart-outline",
            Wishlist: focused ? "heart" : "heart-outline",
            Profile: focused ? "person" : "person-outline",
            Menu: focused ? "menu" : "menu-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
