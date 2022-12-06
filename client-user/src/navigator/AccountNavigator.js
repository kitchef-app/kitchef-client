import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../screen/OrderScreen";
import AccountScreen from "../screen/AccountScreen";
import OrderDetail from "../screen/OrderDetail";
import TrackingScreen from "../screen/TrackingScreen";
import ChatScreen from "../screen/ChatScreen";

const Account = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Account.Navigator initialRouteName="Account">
      <Account.Screen name="Account" component={AccountScreen} />
      <Account.Screen name="Order" component={OrderScreen} />
      <Account.Screen name="OrderDetail" component={OrderDetail} />
      <Account.Screen name="Tracking" component={TrackingScreen} />
      <Account.Screen name="ChatScreen" component={ChatScreen} />
    </Account.Navigator>
  );
}
