import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";

import { useState } from "react";
import { COLORS } from "../constants/theme";
import { POST_LOGIN } from "../queries/users";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading, error, data }] = useMutation(POST_LOGIN);

  const submitLogin = () => {
    loginUser({
      variables: {
        userLogin: {
          email,
          password,
        },
      },
    })
      .then(async (res) => {
        console.log(res);
        if (res?.data?.loginUser?.access_token) {
          const access_token = res?.data?.loginUser?.access_token;
          const id_user = String(res?.data?.loginUser?.id);
          const distance = res?.data?.loginUser?.distance;
          const ongkir = distance ? calculateOngkir(distance):20000
          await AsyncStorage.setItem("access_token", access_token);
          await AsyncStorage.setItem("id", id_user);
          await AsyncStorage.setItem("distance", distance.toString());
          await AsyncStorage.setItem("ongkir", ongkir.toString());
          return navigation.replace("Home");
        } else {
        }
      })
      .catch((err) => console.log(err, "ini err"));
  };

  return (
    <View className="bg-white h-full">
      <View className="flex-col my-auto">
        {/* <Image
          className="mx-auto mb-4"
          source={require("../assets/logo/Logo_72.png")}
        ></Image> */}
        <Text className="text-4xl mx-auto font-extrabold">Log In</Text>
        <Text className="mx-auto font-extralight mt-[4] mb-6">
          Please login to continue using our app
        </Text>
        <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
          <TextInput
            className="my-auto pl-4 text-base"
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
          <TextInput
            className="my-auto pl-4 text-base"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <Pressable onPress={() => submitLogin()}>
          <View className="h-auto mx-6 p-3 mt-2 bg-[#F05A2A] rounded-3xl">
            <Text className="text-white font-medium text-base mx-auto ">
              Login
            </Text>
          </View>
        </Pressable>
        <View className="flex-row mx-auto mt-2">
          <Text className="">Don't have account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text className="text-[#F05A2A] font-semibold">Register here</Text>
          </Pressable>
        </View>
      </View>
      {/* <Pressable onPress={() => navigation.navigate("Register")}>
        <View className="mx-auto h-auto p-3 w-40 bg-[#F05A2A] rounded-lg mt-8">
          <Text className="text-white font-medium text-base mx-auto ">
            Register
          </Text>
        </View>
      </Pressable> */}
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
    backgroundColor: "#F05A2A",
  },
});
