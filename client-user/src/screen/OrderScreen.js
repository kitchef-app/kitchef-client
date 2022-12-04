import { View, Image, Text, Pressable } from "react-native";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardOrderList from "../components/CardOrderList";

export default function OrderScreen({ navigation }) {
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
    //   <Text>Ini order screen</Text>
    // </View>
    <View className="flex-1">
      <Pressable onPress={() => navigation.navigate("OrderDetail")}>
        <CardOrderList />
      </Pressable>
      <Pressable>
        <CardOrderList />
      </Pressable>
      <Pressable>
        <CardOrderList />
      </Pressable>
      <Pressable>
        <CardOrderList />
      </Pressable>
    </View>
  );
}
