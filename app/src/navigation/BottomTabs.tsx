import RootLayout from "../layouts/RootLayout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

/* Screens */
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <RootLayout>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Home") iconName = focused ? "home" : "home-outline";
            if (route.name === "Cart") iconName = focused ? "cart" : "cart-outline";
            if (route.name === "Wishlist") iconName = focused ? "heart" : "heart-outline";
            if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
            if (route.name === "Menu") iconName = focused ? "menu" : "menu-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
      </Tab.Navigator>
    </RootLayout>
  );
}
