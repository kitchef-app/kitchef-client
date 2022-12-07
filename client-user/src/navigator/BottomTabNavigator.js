import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AccountNavigator from "../navigator/AccountNavigator";
import { COLORS, SIZES } from "../constants/theme";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import ChatScreen from "../screen/ChatScreen";
import NotificationScreen from "../screen/NotificationScreen";
import { StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <View
      style={{
        width,
        height: height - 30,
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.inactiveTab,
          tabBarLabelStyle: {
            fontSize: 13,
          },

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
          navigation={navigation}
        />
      </Tab.Navigator>
    </View>
  );
}

// styling tab bar
const styles = StyleSheet.create({
  tabBarStyle: {
    borderTop: 1,
    borderTopColor: COLORS.slate100,
    borderTopWidth: 1,
    heightTop: 2,
    heightBottom: 4,
    bottom: 0,
    right: 0,
    left: 0,
    height: 64,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
