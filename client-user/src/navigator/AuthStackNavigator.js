import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SplashScreen from "../screen/SplashScreen";
import OnboardingScreen from "../screen/OnboardingScreen";
import PreferencesScreen from "../screen/PreferencesScreen";

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  const isLogin = false;
  return (
    <AuthStack.Navigator initialRouteName="SplashScreen">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
      />
      {!isLogin ? (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Onboarding"
            component={OnboardingScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Preferences"
            component={PreferencesScreen}
          />
        </>
      ) : null}
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
