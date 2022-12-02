import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../screen/OrderScreen";
import AccountScreen from "../screen/AccountScreen";

const Account = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Account.Navigator initialRouteName="Account">
      <Account.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Account.Screen name="Order" component={OrderScreen} />
    </Account.Navigator>
  );
}
