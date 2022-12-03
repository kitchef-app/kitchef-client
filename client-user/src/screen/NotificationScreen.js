import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationScreen({ navigation }) {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      return navigation.replace("Login");
    }
  };
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
      <Text>Ini Notification screen</Text>
    </View>
  );
}
