import { Image, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardRecipe({ navigation, dishes }) {
  const random = Math.floor(Math.random() * 100);

  return (
    <View className="h-max w-[165] rounded-lg bg-white-500 border border-slate-200 shadow-lg  shadow-neutral-100 mt-2 mx-1 mb-1">
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
            <Text className="mt-2 font-semibold text-base px-2 py-2 leading-6 truncate">
              {dishes?.name}
            </Text>
          </View>
          <View className="flex-row px-2">
            <View className="mt-[0]">
              <Icon name="heart" size={18} color="red" />
            </View>
            <Text className="font text-base ml-[4]">{random}</Text>
          </View>
        </View>
        <View className="px-2 py-2">
          <Text className=" text-gray-400">by Yummy</Text>
        </View>
      </Pressable>
    </View>
  );
}
