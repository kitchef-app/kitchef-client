import { Image, Text, View } from "react-native";

export default function CardCategory() {
  return (
    <View className="w-[110] mt-2 mx-auto rounded-lg">
      <Image
        className="w-[110] h-[110] rounded-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <Text className="text-center mt-2 font-bold">Apapun</Text>
    </View>
  );
}
