import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardListChart() {
  return (
    <View className="flex-row bg-white h-[120] mt-4 ml-2 mr-2 rounded-sm">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <View className="flex-col">
        <Text className="ml-3 mt-2 mr-3 text-xl font-semibold text-black">
          Teflon
        </Text>
        <Text className="ml-3 mt-2 mr-3 text-xl text-black">Rp. 30.000</Text>
        <View className="mt-[23] ml-3 mr-3">
          <Icon name="trash" size={18} />
        </View>
      </View>
      <View>
        <View className="flex-row mx-auto mt-[85] ml-[25]">
          <View className="bg-gray-300 h-[25] w-[25] rounded-sm">
            <Text className="text-2xl font-semibold my-auto mx-auto">-</Text>
          </View>
          <Text className="text-xl font-bold ml-2 mr-2 my-auto"> 69 </Text>
          <View className="bg-gray-300 h-[25] w-[25] rounded-sm">
            <Text className="text-2xl font-semibold my-auto mx-auto">+</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
