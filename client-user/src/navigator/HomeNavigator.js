import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ListRecipe from "../screen/ListRecipe";
import DetailRecipe from "../screen/DetailRecipe";
import SearchScreen from "../screen/SearchScreen";
import NotificationScreen from "../screen/NotificationScreen";

const Home = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Home.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ tabBarHideOnKeyboard: true, keyboardHidesTabBar: true }}
    >
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Home.Screen
        name="ListRecipe"
        component={ListRecipe}
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "semibold",
          },
        }}
      />
      <Home.Screen
        name="DetailRecipe"
        component={DetailRecipe}
        options={{ headerBackTitleVisible: false }}
      />
      <Home.Screen
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarHideOnKeyboard: true,
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Home.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerBackTitleVisible: false }}
      />
    </Home.Navigator>
  );
}
