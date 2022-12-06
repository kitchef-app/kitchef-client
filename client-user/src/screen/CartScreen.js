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

export default function CartScreen({ navigation }) {
  const { loading, error, data: cart } = useQuery(GET_CART_ITEMS);

  // const dataDummy = {
  //   total: gross_amount,
  //   subTotal: subTotal,
  //   shippingCost: shippingCost,
  //   cart: [
  //     {
  //       total: 500,
  //       ProductId: 1,
  //     },
  //   ],
  //   UserId: 1,
  //   DriverId: 1,
  // };

  const [InvoiceId, setInvoiceId] = useState(0);
  const [addInvoice] = useMutation(POST_INVOICE);

  const [payment, { data: dataPayment }] = useMutation(POST_PAYMENT);

  const submitPayment = () => {
    addInvoice({
      variables: {
        invoiceInput: {
          total: gross_amount,
          subTotal: sumSubTotal,
          shippingCost: shippingCost,
          cart: cart.cartItem,
          UserId: 1,
          DriverId: 1,
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
            console.log(res2);
            console.log(
              InvoiceId,
              "invoice dari cart di then pas mau hit payment"
            );
            navigation.navigate("MidtransPaymentScreen", {
              token: res2?.dataPayment?.payment?.token,
              redirect_url: res2?.dataPayment?.payment?.redirect_url,
              total: gross_amount,
              subTotal: sumSubTotal,
              shippingCost: shippingCost,
              cart: cart.cartItems,
              UserId: 1,
              DriverId: 1,
              invoiceId: res.dataPayment.addInvoice.InvoiceId,
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

  console.log(gross_amount);

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
              <View className="flex-row bg-white h-[150] mt-4 ml-2 mr-2 rounded-sm">
                <View className="flex-col my-auto">
                  <View className="flex-row">
                    <Text className="ml-4 mr-3 text-lg font-semibold text-black">
                      Subtotal
                    </Text>
                    <Text className="ml-[135] mt-2 mr-3 text-lg font-semibold text-black">
                      {idr(sumSubTotal).substring(
                        0,
                        idr(sumSubTotal).length - 3
                      )}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="ml-4 mt-2 mr-3 text-lg font-semibold text-black">
                      Ongkos Kirim
                    </Text>
                    <Text className="ml-[135] mt-2 mr-3 text-lg font-semibold text-black">
                      {idr(shippingCost).substring(
                        0,
                        idr(shippingCost).length - 3
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text className="border-b-4 ml-4 mr-4"></Text>
                  </View>
                  <View className="flex-row">
                    <Text className="ml-4 mt-4 mr-3 text-lg font-semibold text-black">
                      Total
                    </Text>
                    <Text className="ml-[135] mt-2 mr-3 text-lg font-semibold text-black">
                      {idr(gross_amount).substring(
                        0,
                        idr(gross_amount).length - 3
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="bg-white h-24 mt-4">
            <View className="flex-row my-auto ml-4">
              <View className="flex-col ">
                <Text className="text-sm font-medium">Total Harga</Text>
                <Text className="text-xl font-semibold">
                  {idr(gross_amount).substring(0, idr(gross_amount).length - 3)}
                </Text>
              </View>
              <View>
                <Pressable onPress={() => submitPayment()}>
                  <View className="bg-gray-200 h-[40] w-[130] rounded-sm ml-[125]">
                    <View className="my-auto">
                      <Text className="mx-auto font-semibold text-xl">
                        Bayar
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
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
