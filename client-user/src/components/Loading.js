import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color="#0086FF" />
    </View>
  );
}
