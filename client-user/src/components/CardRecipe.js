import { Image, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardRecipe({ navigation, dishes }) {
  const random = Math.floor(Math.random() * 100);

  return (
    <View className="h-max bg-white w-[165] rounded-lg bg-white-500 border border-slate-200 shadow-lg  shadow-neutral-100 mt-2 mx-1 mb-1">
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
              <Icon name="heart" size={16} color="red" />
            </View>
            <Text className="font text-md ml-[4]">{random} Suka</Text>
          </View>
        </View>

        <View className=" bg-orange-100 mx-2 mt-2 mb-4 w-[80] rounded-lg">
          <Text className=" text-[#F05A2A] my-auto mx-auto py-1 text-xs font-semibold">
            {dishes?.Category?.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
