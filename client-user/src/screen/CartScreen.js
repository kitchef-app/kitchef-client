import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CardListChart from "../components/CardListChart";
import { ScrollView } from "react-native-gesture-handler";
import { POST_PAYMENT } from "../queries/payment";
import { useMutation, useQuery } from "@apollo/client";
import { POST_INVOICE } from "../queries/payment";
import Loading from "../components/Loading";
import { idr } from "../helpers/idrFormatter";
import { GET_CART_ITEMS } from "../queries/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen({ navigation }) {
  const { loading, error, data: cart } = useQuery(GET_CART_ITEMS);
  const [id, setId] = useState([]);
  const [InvoiceId, setInvoiceId] = useState(0);
  const [addInvoice] = useMutation(POST_INVOICE);

  const [payment, { data: dataPayment }] = useMutation(POST_PAYMENT);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem("id");
    setId(+id);
  };

  const submitPayment = () => {
    const newcart = [];
    cart.cartItems.map((e) => {
      let obj = {
        ProductId: +e.id,
        total: e.price * e.quantity,
      };
      newcart.push(obj);
    });
    console.log(newcart);
    addInvoice({
      variables: {
        invoiceInput: {
          DriverId: 1,
          UserId: id,
          cart: newcart,
          shippingCost: shippingCost,
          subTotal: sumSubTotal,
          total: gross_amount,
        },
      },
    })
      .then((res) => {
        payment({
          variables: {
            paymentInput: {
              gross_amount: gross_amount,
            },
          },
        })
          .then((res2) => {
            navigation.navigate("MidtransPaymentScreen", {
              token: res2?.data?.payment?.token,
              redirect_url: res2?.data?.payment?.redirect_url,
              total: gross_amount,
              subTotal: sumSubTotal,
              shippingCost: shippingCost,
              cart: newcart,
              UserId: 1,
              DriverId: 1,
              invoiceId: res.data.addInvoice.id,
            });
          })
          .catch((err) => console.log(err, "ini err pas mau hit payment"));
      })
      .catch((err) => console.log(err, "Error hit ADD INVOICE"));
  };

  if (loading) {
    return <Loading />;
  }

  let sumSubTotal = cart.cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );

  let shippingCost = 3000;

  let gross_amount = sumSubTotal + shippingCost;

  return (
    <>
      {cart.cartItems[0] ? (
        <>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <View clasName="flex-1">
              <Text className="mx-auto text-xl font-semibold mt-4">
                Keranjang
              </Text>
              {cart.cartItems ? (
                cart.cartItems.map((item, index) => {
                  return <CardListChart item={item} key={index} />;
                })
              ) : (
                <Text>Anda belum memiliki item di keranjang</Text>
              )}
              <View className="flex bg-white h-max mt-4 ml-2 mr-2 rounded-lg py-2 border-2 border-gray-200 shadow-xl">
                <View className="px-4">
                  <Text className="text-lg font-medium">
                    Rincian Pembayaran
                  </Text>
                </View>
                <View className="flex flex-row justify-between px-4 mt-2">
                  <Text className="text-lg">Subtotal</Text>
                  <Text className="text-lg">
                    {idr(sumSubTotal).substring(0, idr(sumSubTotal).length - 3)}
                  </Text>
                </View>
                <View className="flex flex-row justify-between px-4 mt-2 mb-2">
                  <Text className="text-lg">Ongkir (2 km)</Text>
                  <Text className="text-lg">
                    {idr(shippingCost).substring(
                      0,
                      idr(shippingCost).length - 3
                    )}
                  </Text>
                </View>
                <View className="border mr-4 ml-4 mt-2 border-dashed border-gray-400"></View>
                <View className="flex flex-row justify-between px-4 mt-4">
                  <Text className="text-lg font-semibold">
                    Total Pembayaran
                  </Text>
                  <Text className="text-lg font-semibold">
                    {idr(gross_amount).substring(
                      0,
                      idr(gross_amount).length - 3
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="bg-white h-max flex flex-row justify-between mt-2 px-4 py-6">
            <View className="flex-wrap">
              <Text className="text-sm font-medium">Total Harga</Text>
              <Text className="text-xl font-semibold">
                {idr(gross_amount).substring(0, idr(gross_amount).length - 3)}
              </Text>
            </View>
            <Pressable onPress={() => submitPayment()}>
              <View className="bg-[#F05A2A] h-max rounded-lg my-auto px-6 py-2">
                <Text className="font-semibold text-xl text-white">Bayar</Text>
              </View>
            </Pressable>
          </View>
        </>
      ) : (
        <Text>Keranjang Anda kosong, ayo belanja sekarang</Text>
      )}
    </>
    //   // <>
    //   //   {cart && data.cartItems.length === 0 ? (
    //   //     <View>
    //   //       <Text>There are no data</Text>
    //   //     </View>
    //   //   ) : (
    //   //     <View>

    //   //     </View>
    //   //   )}
    //   // </>
  );
}
