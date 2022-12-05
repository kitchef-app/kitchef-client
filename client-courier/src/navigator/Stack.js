import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SplashScreen from "../screens/Splash";
import Tracking from "../screens/Tracking";
import ChatComponent from "../screens/ChatComponent";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#FF7629" },
      }}
    >
    
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Tracking"
        component={Tracking}
        options={{
          title: "Lacak Pemesanan",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
