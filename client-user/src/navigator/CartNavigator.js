import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import CartScreen from "../screen/CartScreen";
import MidtransPaymentScreen from "../screen/MidtransPaymentScreen";

const Cart = createStackNavigator();

export default function CartNavigator() {
  return (
    <>
      <Cart.Navigator initialRouteName="CartScreen">
        <Cart.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            unmountOnBlur: true,
            title: "Keranjang",
            headerTitleAlign: "center",
            headerStyle: {
              elevation: 100,
            },
          }}
        />
        <Cart.Screen
          name="MidtransPaymentScreen"
          component={MidtransPaymentScreen}
          options={{ title: "Pembayaran" }}
        />
      </Cart.Navigator>
    </>
  );
}
