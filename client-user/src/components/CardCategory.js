import { Image, Text, View, Pressable } from "react-native";

export default function CardCategory({ navigation, category }) {
  return (
    <View className="w-[120] mx-auto rounded-lg mb-6 ">
      <Pressable
        onPress={() =>
          navigation.navigate("ListRecipe", {
            categoryName: category.name,
            categoryId: category.id,
          })
        }
      >
        <Image
          className="w-full h-[100] rounded-lg"
          source={{
            uri: category.imageUrl,
          }}
        />
        <Text className="text-left mt-2 font-bold ">{category.name}</Text>
      </Pressable>
    </View>
  );
}
