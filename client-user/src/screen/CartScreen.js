import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <TouchableOpacity style={styles.loginBtn} onPress={() => submitPayment()}>
        <Text>Bayar</Text>
      </TouchableOpacity>
    </View>
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
