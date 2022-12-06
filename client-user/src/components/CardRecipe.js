import { Image, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardRecipe({ navigation, dishes }) {
  return (
    <View className="h-[290] w-[165] rounded-lg bg-white-500 border-2 border-slate-100 mt-2 mx-1 mb-1">
      <Pressable
        onPress={() =>
          navigation.navigate("DetailRecipe", {
            dishName: dishes.name,
            dishId: dishes.id,
          })
        }
      >
        <Image
          className="w-full h-[180] rounded-t-lg"
          source={{
            uri: dishes?.imageUrl,
          }}
        ></Image>
        <View className="flex-col">
          <View>
            <Text className="mt-2 font-semibold text-lg ml-[10] leading-6">
              {dishes?.name}
            </Text>
          </View>
          <View className="flex-row mt-[15] ml-[10]">
            <View className="mt-[0]">
              <Icon name="heart" size={18} color="red" />
            </View>
            <Text className="font text-base ml-[4] mb-[16]">4.8k</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
