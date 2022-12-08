import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Image,
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
import { COLORS } from "../constants/theme";
import { GET_USER } from "../queries/users";

export default function CartScreen({ navigation }) {
  const { loading, error, data: cart } = useQuery(GET_CART_ITEMS);
  const [id, setId] = useState([]);
  const [distance, setDistance] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [InvoiceId, setInvoiceId] = useState(0);
  const [addInvoice] = useMutation(POST_INVOICE);

  const [payment, { data: dataPayment }] = useMutation(POST_PAYMENT);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem("id");
    const distance = await AsyncStorage.getItem("distance");
    const ongkir = await AsyncStorage.getItem("ongkir");
    setId(+id);
    setDistance(+distance);
    setOngkir(+ongkir);
  };

  console.log(id, "sasdasdasd");

  const { data, error1, loading1 } = useQuery(GET_USER, {
    variables: {
      id: +id,
    },
  });

  if (loading1) {
    return <Text>Loading ...</Text>;
  }

  console.log(data, "dartrrrrrrrrrrrrrriiii");

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
          shippingCost: ongkir,
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
              shippingCost: ongkir,
              cart: newcart,
              UserId: id,
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

  let gross_amount = sumSubTotal + ongkir;

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.backgroundWhite}
        barStyle="dark-content"
        animated={true}
      />
      {cart.cartItems[0] ? (
        <>
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            backgroundColor={COLORS.slate100}
          >
            <View clasName="flex-1">
              {cart.cartItems ? (
                cart.cartItems.map((item, index) => {
                  return <CardListChart item={item} key={index} />;
                })
              ) : (
                <Text>Anda belum memiliki item di keranjang</Text>
              )}
              <View className=" border mx-4 py-2 rounded-lg border-orange-300 bg-orange-50 mt-4">
                <View className="flex-row">
                  <View className="my-auto mx-4">
                    <Icon name="location-outline" size={20} color="orange" />
                  </View>
                  <Text className="text-lg font-bold">Kitchef Store</Text>
                </View>
                <View className="py-2">
                  <Text className="text-sm mx-4 break-words">
                    Jl. Arteri Pd. Indah No.7, RT.5/RW.9, Kby. Lama Sel., Kec.
                    Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota
                    Jakarta 12240
                  </Text>
                </View>
              </View>
              <View className="mx-auto mt-4 mb-2">
                <Icon name="ellipsis-vertical-outline" size={20} />
              </View>
              <View className=" border mx-4 py-2 rounded-lg border-slate-200 shadow-lg  shadow-neutral-100 mt-4">
                <View className="flex-row">
                  <View className="my-auto mx-4">
                    <Icon name="location-outline" size={20} color="orange" />
                  </View>
                  <Text className="text-lg font-bold">{data?.getUserById?.fullName} Home</Text>
                </View>
                <View className="py-2">
                  <Text className="text-sm mx-4 break-words">
                  {data?.getUserById?.address}
                  </Text>
                </View>
              </View>
              <View className="flex bg-white h-max mt-4 ml-4 mr-4 mb-4 rounded-lg py-2 border border-slate-200 shadow-lg  shadow-neutral-100">
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
                  <Text className="text-base">Ongkir ({distance} km)</Text>
                  <Text className="text-base">
                    {idr(ongkir).substring(0, idr(ongkir).length - 3)}
                  </Text>
                </View>
                <View className="border mr-4 ml-4 mt-2 border-dashed border-gray-200"></View>
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
          <View className="bg-white h-max flex flex-row justify-between px-4 py-6 border border-slate-200 shadow-lg  shadow-neutral-100 ">
            <View className="flex-wrap">
              <Text className="text-sm font-medium">Total Pembayaran</Text>
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
        <View className="bg-white h-screen">
          <View className="mx-auto my-auto">
            <Image
              className="w-80 h-40 mx-auto"
              source={require("../assets/logo/Cart.png")}
            />
            <Text className="text-2xl text-center font-medium">
              Keranjang Anda kosong, ayo belanja sekarang
            </Text>
          </View>
        </View>
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
