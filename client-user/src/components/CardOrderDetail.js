import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardOrderDetail() {
  return (
    <View className="flex flex-row justify-start bg-white h-max mt-2 ml-2 mr-2 rounded-lg border-2 border-gray-200 shadow-xl">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <View className="px-6 my-auto py-4">
        <Text className="text-lg font-semibold text-black">Teflon</Text>
        <Text className="text-base text-black">Harga Rp. 30.000</Text>
        <Text className="text-base text-black">Jumlah : 69</Text>
        <Text className="text-base font-bold text-black">
          Subtotal : Rp. 690.000
        </Text>
      </View>
    </View>
  );
}
