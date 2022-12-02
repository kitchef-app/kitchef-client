import { Image, Text, View } from "react-native";

export default function CardCategory() {
  return (
    <View className="w-[110] mt-4 rounded-lg">
      <Image
        className="w-[110] h-[110] rounded-lg"
        // style={styles.image}
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <Text className="text-center mt-2 font-bold">Apapun</Text>
    </View>
  );
}
