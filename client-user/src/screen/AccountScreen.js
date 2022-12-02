import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      return navigation.replace("Login");
    }
  };

  const removeData = async () => {
    await AsyncStorage.removeItem("access_token");
    navigation.replace("Home");
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
      <Text>Ini account screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Order")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Pesanan Saya</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeData()} style={styles.loginBtn}>
        <Text style={styles.loginText}>Keluar</Text>
      </TouchableOpacity>
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
