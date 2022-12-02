import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";

export default function NotificationScreen({ navigation }) {
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
