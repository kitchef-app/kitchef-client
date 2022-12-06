import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardOrderDetail() {
  return (
    <View className="flex-row bg-white h-[120] mt-4 ml-2 mr-2 rounded-sm">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <View className="flex-col">
        <Text className="ml-3 mt-2 mr-3 text-lg font-semibold text-black">
          Teflon
        </Text>
        <Text className="ml-3 mt-[1] mr-3 text-base text-black">
          Harga Rp. 30.000
        </Text>
        <Text className="ml-3 mt-[1] mr-3 text-base text-black">
          Jumlah : 69
        </Text>
        <Text className="ml-3 mt-[12] mr-3 text-lg font-bold text-black">
          Subtotal : Rp. 690.000
        </Text>
      </View>
    </View>
  );
}
