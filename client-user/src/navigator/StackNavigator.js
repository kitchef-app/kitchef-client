import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screen/SplashScreen";
import OnboardingScreen from "../screen/OnboardingScreen";
import PreferencesScreen from "../screen/PreferencesScreen";
import HomeScreen from "../screen/HomeScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PreferencesScreen"
        component={PreferencesScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
