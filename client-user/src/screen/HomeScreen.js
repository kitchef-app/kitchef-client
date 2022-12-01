import { View, Image, Text } from "react-native";
import { useEffect } from "react";
import { COLORS } from "../constants/theme";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("OnboardingScreen");
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.backgroundWhite,
      }}
    >
      <Image
        source={require("../assets/logo/logo_full_vertical_32_white.png")}
      />
      <Text>Ini home screen</Text>
    </View>
  );
}
