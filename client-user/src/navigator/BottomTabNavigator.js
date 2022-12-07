import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AccountNavigator from "../navigator/AccountNavigator";
import { COLORS, SIZES } from "../constants/theme";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import ChatScreen from "../screen/ChatScreen";
import NotificationScreen from "../screen/NotificationScreen";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          color = COLORS.primary;
          if (route.name === "HomeNavigator") {
            iconName = "home";
            color = focused ? COLORS.primary : COLORS.inactiveTab;
          } else if (route.name === "Notification") {
            iconName = "notifications";
            color = focused ? COLORS.primary : COLORS.inactiveTab;
          } else if (route.name === "CartNavigator") {
            iconName = "cart";
            color = focused ? COLORS.primary : COLORS.inactiveTab;
          } else if (route.name === "AccountNavigator") {
            iconName = "person";
            color = focused ? COLORS.primary : COLORS.inactiveTab;
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Beranda",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifikasi",
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarLabel: "Keranjang",
        }}
      />

      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Akun",
        }}
      />
    </Tab.Navigator>
  );
}

// styling tab bar
const styles = StyleSheet.create({
  tabBarStyle: {
    borderTop: 1,
  },
});
