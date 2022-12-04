import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardOrderList() {
  return (
    <View className="bg-white h-[120] mt-4 ml-2 mr-2 rounded-sm">
      <View className="flex-col">
        <View className="flex-row">
          <View className="my-auto ml-4 mt-[8]">
            <Icon name="basket-outline" size={32} />
          </View>
          <View className="flex-col ml-4 mt-2">
            <Text className="text-sm font-medium">Belanja</Text>
            <Text className="text-sm font-medium">04 December 2022</Text>
          </View>
        </View>
        <View className="border-t mt-2 mb-[18]"></View>
        <View className="flex-row ml-4">
          <View className="flex-col">
            <Text className="text-base font-medium">No. Transaksi</Text>
            <Text className="text-base font-medium">021-EENCCSDC-003</Text>
          </View>
          <View className="bg-gray-200 h-[20] w-auto my-auto rounded-sm mt-[21] ml-[110]">
            <Text className="ml-2 mr-2">Sedang Dikirim</Text>
          </View>
        </View>
      </View>
    </View>
  );
}