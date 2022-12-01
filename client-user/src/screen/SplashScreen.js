import { View, Image, StatusBar } from "react-native";
import { useEffect } from "react";
import { COLORS } from "../constants/theme";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("OnboardingScreen");
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#FF7629" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        }}
      >
        <Image
          source={require("../assets/logo/logo_full_vertical_32_white.png")}
        />
      </View>
    </>
  );
}
