import { useQuery } from "@apollo/client";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import CardOrderDetail from "../components/CardOrderDetail";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import { GET_DETAIL_INVOICE } from "../queries/invoice";
import Loading from "../components/Loading";
import { idr } from "../helpers/idrFormatter";

export default function OrderDetail({ navigation, route }) {
  const { invoiceId } = route.params;
  const { status } = route.params;
  const { userId } = route.params;
  const { driverId } = route.params;

  const { loading, error, data } = useQuery(GET_DETAIL_INVOICE, {
    variables: { invoiceId },
  });

  if (loading) {
    <Loading />;
  }

  if (error) {
    <Text>error</Text>;
  }

  let sumSubTotal = data?.getInvoiceProducts?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.Product.price * currentValue.total,
    0
  );

  let shippingCost = 2500;

  let all_total = sumSubTotal + shippingCost;

  return (
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
    //   <Text>Ini order screen</Text>
    // </View>
    <>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        className="bg-[#FCFCFC]"
      >
        <View className="flex-1 mb-2">
          {data?.getInvoiceProducts?.map((product, index) => (
            <CardOrderDetail product={product} key={index} />
          ))}
          <View className="flex bg-white h-max mt-4 ml-2 mr-2 rounded-lg py-2 border border-slate-200 shadow-lg  shadow-neutral-100 ">
            <View className="px-4">
              <Text className="text-lg font-medium">Rincian Pembayaran</Text>
            </View>
            <View className="flex flex-row justify-between px-4 mt-2">
              <Text className="text-base">Status Pembayaran</Text>
              <Text className="text-base">{status}</Text>
            </View>
            <View className="flex flex-row justify-between px-4 mt-2">
              <Text className="text-base">Subtotal</Text>
              <Text className="text-base">
                {idr(sumSubTotal).substring(0, idr(sumSubTotal).length - 3)}
              </Text>
            </View>
            <View className="flex flex-row justify-between px-4 mt-2 mb-2">
              <Text className="text-base">Ongkir Kirim</Text>
              <Text className="text-base">
                {" "}
                {idr(shippingCost).substring(0, idr(shippingCost).length - 3)}
              </Text>
            </View>
            <View className="border mr-4 ml-4 mt-2 border-dashed border-1 border-slate-300"></View>
            <View className="flex flex-row justify-between px-4 mt-4">
              <Text className="text-base font-semibold">Total Pembayaran</Text>
              <Text className="text-base font-semibold">
                {" "}
                {idr(all_total).substring(0, idr(all_total).length - 3)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex my-auto bg-white">
        <View className="flex flex-row py-3">
          <Pressable
            onPress={() =>
              navigation.navigate("ChatScreen", {
                userId: userId,
                driverId: driverId,
              })
            }
          >
            <View className="flex-row bg-white h-[40] ml-2 my-auto rounded-lg border border-slate-200 shadow-lg  shadow-neutral-100">
              <View className="my-auto mx-auto px-4">
                <Icon name="chatbubble-ellipses-outline" size={20} />
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Tracking", {
                InvoiceId: invoiceId,
                userId: userId,
                driverId: driverId,
              })
            }
          >
            <View className="flex-row bg-[#F05A2A] h-[40] my-auto ml-1 mr-2 rounded-lg w-80">
              <View className="my-auto mx-auto">
                <Text className="text-lg font-semibold text-white">
                  Lacak Pesanan
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}
