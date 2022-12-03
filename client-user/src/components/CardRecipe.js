import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardRecipe() {
  return (
    <View className="bg-white h-[290] w-[160] rounded-lg drop-shadow-2xl">
      <Image
        className="w-[160] h-[180] rounded-t-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      ></Image>
      <View className="flex-col">
        <View>
          <Text className="mt-2 font-semibold text-lg ml-[10] leading-6">
            Babi Bakar Enak dan Bergizi
          </Text>
        </View>
        <View className="flex-row mt-[15] ml-[10]">
          <View className="mt-[0]">
            <Icon name="heart" size={18} color="red" />
          </View>
          <Text className="font text-base ml-[4] mb-[16]">4.8k</Text>
        </View>
      </View>
    </View>
  );
}
