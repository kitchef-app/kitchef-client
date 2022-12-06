import { Image, Pressable, ScrollView, Text, View } from "react-native";
import CardOrderDetail from "../components/CardOrderDetail";
import { COLORS } from "../constants/theme";

export default function OrderDetail({ navigation }) {
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
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View className="flex-1 mb-4">
          <CardOrderDetail />
          <CardOrderDetail />
          <CardOrderDetail />
          <CardOrderDetail />
          <CardOrderDetail />
          <CardOrderDetail />
          <View className="flex bg-white h-max mt-4 ml-2 mr-2 rounded-lg py-2 border-2 border-gray-200 shadow-xl">
            <View className="px-4">
              <Text className="text-lg font-medium">Rincian Pembayaran</Text>
            </View>
            <View className="flex flex-row justify-between px-4 mt-2">
              <Text className="text-lg">Subtotal</Text>
              <Text className="text-lg">Rp. 999.999.999</Text>
            </View>
            <View className="flex flex-row justify-between px-4 mt-2 mb-2">
              <Text className="text-lg">Ongkir Kirim</Text>
              <Text className="text-lg">Rp. 100.000.000</Text>
            </View>
            <View className="border mr-4 ml-4 mt-2 border-dashed border-gray-400"></View>
            <View className="flex flex-row justify-between px-4 mt-4">
              <Text className="text-lg font-semibold">Total Pembayaran</Text>
              <Text className="text-lg font-semibold">Rp. 100.000.000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable onPress={() => navigation.navigate("Tracking")}>
        <View className="flex-row bg-[#F05A2A] h-[40] mt-2 ml-2 mr-2 rounded-lg border-2 border-gray-200 shadow-xl">
          <View className="my-auto mx-auto">
            <Text className="text-lg font-semibold text-white">
              Lacak Pesanan
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
