import { View, Image, StatusBar } from "react-native";
import { useEffect } from "react";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";

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
      <StatusBar style="light" backgroundColor="#ED4009" />
      <LinearGradient
        colors={["#ED4009", COLORS.primary]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/logo/logo-splash-4.png")} />
      </LinearGradient>
    </>
  );
}
