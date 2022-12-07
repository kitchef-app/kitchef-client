import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../screen/OrderScreen";
import AccountScreen from "../screen/AccountScreen";
import OrderDetail from "../screen/OrderDetail";
import TrackingScreen from "../screen/TrackingScreen";
import ChatScreen from "../screen/ChatScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderBackButton } from "@react-navigation/elements";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";

const Account = createStackNavigator();

export default function AccountNavigator({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      return setIsLogin(true);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <Account.Navigator>
      {isLogin ? (
        <>
          <Account.Screen name="Account" component={AccountScreen} />
          <Account.Screen name="Order" component={OrderScreen} />
          <Account.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{ title: "Detail Order" }}
          />
          <Account.Screen
            name="Tracking"
            component={TrackingScreen}
            options={{ title: "Lacak Pesanan" }}
          />
          <Account.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ title: "Obrolan" }}
          />
        </>
      ) : (
        <>
          <Account.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Account.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Account.Navigator>
  );
}
