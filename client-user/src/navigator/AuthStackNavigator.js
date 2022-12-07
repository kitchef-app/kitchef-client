import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SplashScreen from "../screen/SplashScreen";
import OnboardingScreen from "../screen/OnboardingScreen";
import PreferencesScreen from "../screen/PreferencesScreen";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle="dark-content"
        animated={true}
        translucent
      />
      <AuthStack.Navigator initialRouteName="SplashScreen">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />

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
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: () => (
              <HeaderBackButton
                onPress={() =>
                  navigation.navigate("Home", {
                    screen: "HomeNavigator",
                  })
                }
              />
            ),
          }}
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
    </>
  );
}
