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
    <ScrollView>
      <View className="flex-1 mb-4">
        <CardOrderDetail />
        <CardOrderDetail />
        <CardOrderDetail />
        <CardOrderDetail />
        <CardOrderDetail />
        <CardOrderDetail />
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
        <Pressable onPress={() => navigation.navigate("Tracking")}>
          <View className="flex-row bg-gray-300 h-[40] mt-4 ml-2 mr-2 rounded-sm">
            <View className="my-auto mx-auto">
              <Text className="text-xl font-semibold">Lacak Pesanan</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
