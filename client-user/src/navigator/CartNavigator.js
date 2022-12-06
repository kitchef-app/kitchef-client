import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screen/CartScreen";
import MidtransPaymentScreen from "../screen/MidtransPaymentScreen";

const Cart = createStackNavigator();

export default function CartNavigator() {
  return (
    <Cart.Navigator initialRouteName="CartScreen">
      <Cart.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Cart.Screen
        name="MidtransPaymentScreen"
        component={MidtransPaymentScreen}
        title="Pembayaran"
      />
    </Cart.Navigator>
  );
}
