import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationScreen from "../screen/NotificationScreen";
import CartScreen from "../screen/CartScreen";
import Icon from "react-native-vector-icons/Ionicons";
import AccountNavigator from "../navigator/AccountNavigator";
import { COLORS, SIZES } from "../constants/theme";
import HomeNavigator from "./HomeNavigator";
import LoginScreen from "../screen/LoginScreen";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          color = COLORS.primary;
          if (route.name === "HomeNavigator") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "NotificationTab") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "CartTab") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "AccountNavigator") {
            iconName = focused ? "person" : "person-outline";
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
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifikasi",
        }}
      />
      <Tab.Screen name="CartTab" component={CartScreen} />

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

//styling tab bar
// const styles = StyleSheet.create({
//   tabBarStyle: {
//     borderTop: 1
//   }
// })
