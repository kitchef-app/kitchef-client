import { View, Image, StatusBar } from "react-native";
import { useEffect } from "react";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      navigation.replace("Onboarding");
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        }}
      >
        <Image
          source={require("../assets/logo/logo_full_vertical_160_white.png")}
        />
      </View>
    </>
  );
}
