import { ActivityIndicator, View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 40,
      }}
    >
      <LottieView
        source={require("../assets/animation/loader.json")}
        autoPlay
        loop
        style={{
          width: 120,
          height: 120,
        }}
      />
    </View>
  );
}
