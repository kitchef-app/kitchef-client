import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.backgroundWhite,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailRecipe")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Recipe 1 Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ListRecipe")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>List Recipe Category based</Text>
      </TouchableOpacity>
      <Text>Ini home screen</Text>
    </View>
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
