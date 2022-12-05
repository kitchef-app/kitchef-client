import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AccountNavigator from "../navigator/AccountNavigator";
import { COLORS, SIZES } from "../constants/theme";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import ChatScreen from "../screen/ChatScreen";

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
          } else if (route.name === "ChatTab") {
            iconName = focused ? "chatbox" : "chatbox-ellipses-outline";
          } else if (route.name === "CartNavigator") {
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
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarLabel: "Pesan",
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

//styling tab bar
// const styles = StyleSheet.create({
//   tabBarStyle: {
//     borderTop: 1
//   }
// })
