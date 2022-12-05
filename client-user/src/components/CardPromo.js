import { Image, Text, View } from "react-native";

export default function CardPromo() {
  return (
    <View className="mr-2">
      <Image
        className="w-[300] h-32 rounded-lg"
        // style={styles.image}
        source={{
          uri: "https://static.linebank.co.id/cms/2022/09/27/271cbd82-c985-4ee2-ae3d-6ad37d7db547.jpg",
        }}
      />
    </View>
  );
}
