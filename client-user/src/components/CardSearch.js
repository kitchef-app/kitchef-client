import { Image, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardSearch({ navigation }) {
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
          Masakan Padang Asli Garut
        </Text>
        <View className="flex-row mt-[18]">
          <View className="bg-[#FF7629] h-[20] w-[80] rounded-lg my-auto ml-4">
            <Text className="mx-auto text-sm font-medium text-white">
              Nusantara
            </Text>
          </View>
        </View>
        <View className="flex-row mt-[18] ml-3">
          <View className="mt-[0]">
            <Icon name="heart" size={18} color="red" />
          </View>
          <Text className="font text-base ml-[4] mb-[16]">4.8k</Text>
          <View className="bg-gray-200 h-[25] w-[100] rounded-sm ml-[95]">
            <Pressable onPress={() => navigation.navigate("DetailRecipe")}>
              <View className="my-auto">
                <Text className="mx-auto font-semibold text-base">Detail</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
