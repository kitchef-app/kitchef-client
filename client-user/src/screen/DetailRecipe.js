import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";

export default function DetailRecipe({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.backgroundWhite,
      }}
    >
      <Text>Ini DETAIL RECIPE screen</Text>
    </View>
  );
}
