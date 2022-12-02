import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ListRecipe from "../screen/ListRecipe";
import DetailRecipe from "../screen/DetailRecipe";

const Home = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Home.Navigator initialRouteName="HomeScreen">
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen name="ListRecipe" component={ListRecipe} />
      <Home.Screen name="DetailRecipe" component={DetailRecipe} />
    </Home.Navigator>
  );
}
