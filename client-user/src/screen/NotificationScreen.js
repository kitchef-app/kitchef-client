import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardNotification from "../components/CardNotification";
import { ScrollView } from "react-native-gesture-handler";

export default function NotificationScreen({ navigation }) {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const access_token = await AsyncStorage.getItem("access_token");
  //   if (!access_token) {
  //     return navigation.replace("Login");
  //   }
  // };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: COLORS.backgroundWhite,
    //   }}
    // >
    //   <Image
    //     source={require("../assets/logo/logo_full_vertical_32_white.png")}
    //   />
    //   <Text>Ini Notification screen</Text>
    // </View>
    <View className="flex-1">
      <View>
        <Text className="ml-3 mt-3 mr-3 text-xl font-semibold text-black">
          TERBARU
        </Text>
      </View>
      <ScrollView className="mb-2">
        <View>
          <CardNotification />
          <CardNotification />
          <CardNotification />
          <CardNotification />
          <CardNotification />
          <CardNotification />
          <CardNotification />
        </View>
      </ScrollView>
    </View>
  );
}
