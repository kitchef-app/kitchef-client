import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardRecipe from "../components/CardRecipe";

export default function ListRecipe({ navigation }) {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: COLORS.backgroundWhite,
    //   }}
    // >
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate("DetailRecipe")}
    //     style={styles.loginBtn}
    //   >
    //     <Text style={styles.loginText}>Go To Detail REsep</Text>
    //   </TouchableOpacity>
    //   <Text>Ini LIST RECIPE screen</Text>
    // </View>
    <ScrollView className="mb-4">
      <View className="flex-1 bg-gray-100">
        <View className="flex-row flex-wrap gap-6 mt-2 flex justify-center">
          <Pressable onPress={() => navigation.navigate("DetailRecipe")}>
            <View>
              <CardRecipe />
            </View>
          </Pressable>

          <View>
            <CardRecipe />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
