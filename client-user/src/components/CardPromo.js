import { Image, Text, View } from "react-native";

export default function CardPromo() {
  return (
    <View className="mr-2">
      <Image
        className="w-[300] h-32 rounded-lg"
        // style={styles.image}
        source={require("../assets/logo/kitchef-banner-01.png")}
      />
    </View>
  );
}
