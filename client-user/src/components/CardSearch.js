import { Image, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardSearch({ item, navigation }) {
  const random = Math.floor(Math.random() * 100);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("DetailRecipe", {
          dishName: item.name,
          dishId: item.id,
        })
      }
    >
      <View className="flex flex-row justify-between bg-white rounded-lg py-2 mt-4 px-4 mx-4 border border-slate-200 shadow-lg  shadow-neutral-100">
        <Image
          className="w-[95] h-[100] my-auto rounded-lg"
          source={{
            uri: item.imageUrl,
          }}
        />
        <View className="flex-1 flex-col justify-between px-8 ">
          <Text className="text-base font-semibold text-black">
            {item.name}
          </Text>

          <View className=" bg-orange-100 w-[80] rounded-lg">
            <Text className=" text-[#F05A2A] my-auto mx-auto py-1 text-xs font-semibold">
              {item.Category.name}
            </Text>
          </View>
          <View className="flex-row">
            <View className="my-auto">
              <Icon name="heart" size={18} color="red" />
            </View>
            <Text className="ml-1 font text-sm my-auto">{random} Suka</Text>
          </View>
        </View>
        <View className="bg-[#F05A2A] rounded-lg my-auto">
          <Pressable
            onPress={() =>
              navigation.navigate("DetailRecipe", {
                dishName: item.name,
                dishId: item.id,
              })
            }
          >
            <Text className="mx-auto px-4 font-bold text-base text-white">
              Detail
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
