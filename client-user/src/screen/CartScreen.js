import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import CardListChart from "../components/CardListChart";
import { ScrollView } from "react-native-gesture-handler";

import { POST_PAYMENT } from "../queries/payment";
import { useMutation } from "@apollo/client";
import { WebView } from "react-native-webview";
import { POST_INVOICE } from "../queries/payment";
export default function CartScreen({ navigation }) {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const access_token = await AsyncStorage.getItem("access_token");
  //   if (!access_token) {
  //     return navigation.replace("Login");
  //   }
  // };

  // <View
  //   style={{
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: COLORS.backgroundWhite,
  //   }}
  // >
  //   <Image
  //     source={require("../assets/logo/logo_full_vertical_32_white.png")}
  //   />
  //   <Text>Ini cart screen</Text>
  // </View>

  const dataDummy = {
    total: 600,
    subTotal: 500,
    shippingCost: 100,
    cart: [
      {
        total: 500,
        ProductId: 1,
      },
    ],
    UserId: 1,
    DriverId: 1,
  };

  const [gross_amount, setGross_Amount] = useState(0);
  const [InvoiceId, setInvoiceId] = useState(0);
  const [addInvoice] = useMutation(POST_INVOICE);

  const [payment, { loading, error, data }] = useMutation(POST_PAYMENT);

  const submitPayment = () => {
    addInvoice({
      variables: {
        invoiceInput: {
          total: dataDummy.total,
          subTotal: dataDummy.subTotal,
          shippingCost: dataDummy.shippingCost,
          cart: dataDummy.cart,
          UserId: dataDummy.UserId,
          DriverId: dataDummy.DriverId,
        },
      },
    })
      .then((res) => {
        payment({
          variables: {
            paymentInput: {
              gross_amount: 600,
            },
          },
        })
          .then((res2) => {
            console.log(
              InvoiceId,
              "invoice dari cart di then pas mau hit payment"
            );
            navigation.navigate("MidtransPaymentScreen", {
              token: res2?.data?.payment?.token,
              redirect_url: res2?.data?.payment?.redirect_url,
              total: dataDummy.total,
              subTotal: dataDummy.subTotal,
              shippingCost: dataDummy.shippingCost,
              cart: dataDummy.cart,
              UserId: dataDummy.UserId,
              DriverId: dataDummy.DriverId,
              invoiceId: res.data.addInvoice.InvoiceId,
            });
          })
          .catch((err) => console.log(err, "ini err"));
      })
      .catch((err) => console.log(err, "Error hit ADD INVOICE"));
  };

  return (
    <>
      <ScrollView>
        <View clasName="flex-1">
          <Text className="mx-auto text-xl font-semibold mt-4">Keranjang</Text>
          <CardListChart />
          <CardListChart />
          <CardListChart />
          <CardListChart />
          <CardListChart />
          <CardListChart />
          <View className="flex-row bg-white h-[150] mt-4 ml-2 mr-2 rounded-sm">
            <View className="flex-col my-auto">
              <View className="flex-row">
                <Text className="ml-4 mr-3 text-lg font-semibold text-black">
                  Subtotal
                </Text>
                <Text className="ml-[175] mr-3 text-lg font-semibold text-black">
                  Rp. 999.999
                </Text>
              </View>
              <View className="flex-row">
                <Text className="ml-4 mt-2 mr-3 text-lg font-semibold text-black">
                  Ongkos Kirim
                </Text>
                <Text className="ml-[135] mt-2 mr-3 text-lg font-semibold text-black">
                  Rp. 999.999
                </Text>
              </View>
              <View>
                <Text className="border-b-4 ml-4 mr-4"></Text>
              </View>
              <View className="flex-row">
                <Text className="ml-4 mt-4 mr-3 text-lg font-semibold text-black">
                  Total
                </Text>
                <Text className="ml-[200] mt-2 mr-3 text-lg font-semibold text-black">
                  Rp. 999.999
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
            <Text className="text-xl font-semibold">Rp. 999.999</Text>
          </View>
          <View>
            <Pressable onPress={() => submitPayment()}>
              <View className="bg-gray-200 h-[40] w-[130] rounded-sm ml-[125]">
                <View className="my-auto">
                  <Text className="mx-auto font-semibold text-xl">Bayar</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.backgroundWhite,
        }}
      >
        <Text>Ini cart screen</Text>
        <Text>Test Payment</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => submitPayment()}
        >
          <Text>Bayar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
