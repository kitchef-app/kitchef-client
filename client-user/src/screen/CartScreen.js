import { View, Image, Text, FlatList, Pressable } from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import CardListChart from "../components/CardListChart";
import { ScrollView } from "react-native-gesture-handler";

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
    //   <Text>Ini cart screen</Text>
    // </View>
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
          <View className="flex-row bg-white h-[150] mt-4 ml-4 mr-4 rounded-sm">
            <View className="flex-col my-auto">
              <View className="flex-row">
                <Text className="ml-4 mr-3 text-lg font-semibold text-black">
                  Subtotal
                </Text>
                <Text className="ml-[160] mr-3 text-lg font-semibold text-black">
                  Rp. 999.999
                </Text>
              </View>
              <View className="flex-row">
                <Text className="ml-4 mt-2 mr-3 text-lg font-semibold text-black">
                  Ongkos Kirim
                </Text>
                <Text className="ml-[120] mt-2 mr-3 text-lg font-semibold text-black">
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
                <Text className="ml-[186] mt-2 mr-3 text-lg font-semibold text-black">
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
            <Pressable>
              <View className="bg-gray-200 h-[40] w-[130] rounded-sm ml-[125]">
                <View className="my-auto">
                  <Text className="mx-auto font-semibold text-xl">Bayar</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
