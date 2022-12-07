import { Image, Text, View, Pressable } from "react-native";

export default function CardCategory({ navigation, category }) {
  return (
    <View className="w-28 mx-auto rounded-lg mb-6">
      <Pressable
        onPress={() =>
          navigation.navigate("ListRecipe", {
            categoryName: category.name,
            categoryId: category.id,
          })
        }
      >
        <Image
          className="w-full h-[100] rounded-md"
          source={{
            uri: category.imageUrl,
          }}
        />
        <Text className="text-left mt-1 font-medium text-md text-gray-900">
          {category.name}
        </Text>
      </Pressable>
    </View>
  );
}
