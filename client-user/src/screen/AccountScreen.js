import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { GET_USER } from "../queries/users";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";

export default function AccountScreen({ navigation }) {
  const [id, setUser] = useState([]);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      return navigation.replace("Login");
    }
  };

  const getID = async () => {
    const id_user = await AsyncStorage.getItem("id");
    const id = Number(id_user);
    return setUser(id);
  };

  console.log(id, "ini id user");
  // const id = "2";
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) {
    <Loading />;
  }

  console.log(data, "ini dari acc");

  const removeData = async () => {
    await AsyncStorage.removeItem("access_token");
    navigation.replace("Home");
  };

  useEffect(() => {
    getData();
    getID();
  }, []);

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
    //   <Text>Ini account screen</Text>
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate("Order")}
    //     style={styles.loginBtn}
    //   >
    //     <Text style={styles.loginText}>Pesanan Saya</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => removeData()} style={styles.loginBtn}>
    //     <Text style={styles.loginText}>Keluar</Text>
    //   </TouchableOpacity>
    // </View>
    <View className="flex-1">
      <View className="flex-row bg-white h-40">
        <Image
          className="h-24 rounded-full w-24 mt-6 ml-4 mr-4 my-auto"
          source={{
            uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
          }}
        />

        <View className="flex-col mt-6 my-auto">
          <Text className=" text-lg mt-2">{data?.getUserById?.username}</Text>
          <Text className="text-lg mt-0">{data?.getUserById?.phoneNumber}</Text>
          <Text className="text-lg mt-0">{data?.getUserById?.email}</Text>
        </View>
      </View>
      <View className="flex-col">
        <View className="ml-4 mt-6">
          <Text className="text-xl font-bold">Aktivitas Saya</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Order")}>
          <View className="bg-white h-max ml-2 mr-2 mt-4 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
            <View className="my-auto">
              <Icon name="cart-outline" size={18} />
            </View>
            <Text className="text-lg ml-4">Pesanan Saya</Text>
          </View>
        </Pressable>
        {/* <View className="bg-white h-[40] ml-2 mr-2 mt-[1] rounded-sm">
          <View className="flex-row my-auto ml-4">
            <Icon name="pricetags-outline" size={18} />
            <Text className="ml-4 text-lg my-auto">Voucher Saya</Text>
          </View>
        </View>
        <View className="bg-white h-[40] ml-2 mr-2 mt-[1] rounded-sm">
          <View className="flex-row my-auto ml-4">
            <Icon name="star-outline" size={18} />
            <Text className="ml-4 text-lg my-auto">Penilaian Saya</Text>
          </View>
        </View> */}
        <View className="bg-white h-max ml-2 mr-2 mt-0 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
          <View className="my-auto">
            <Icon name="pricetags-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Voucher Saya</Text>
        </View>
        <View className="bg-white h-max ml-2 mr-2 mt-0 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
          <View className="my-auto">
            <Icon name="star-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Penilaian Saya</Text>
        </View>
      </View>
      <View className="flex-col">
        <View className="ml-4 mt-6">
          <Text className="text-xl font-bold">Pengaturan Lainnya</Text>
        </View>
        {/* <View className="bg-white h-[40] ml-2 mr-2 mt-4 rounded-sm">
          <View className="flex-row my-auto ml-4">
            <Icon name="help-circle-outline" size={18} />
            <Text className="ml-4 text-lg my-auto">Pusat Bantuan</Text>
          </View>
        </View>
        <View className="bg-white h-[40] ml-2 mr-2 mt-[1] rounded-sm">
          <View className="flex-row my-auto ml-4">
            <Icon name="people-outline" size={18} />
            <Text className="ml-4 text-lg my-auto">Pengaturan Akun</Text>
          </View>
        </View>
        <View className="bg-white h-[40] ml-2 mr-2 mt-[1] rounded-sm">
          <TouchableOpacity
            className="flex-row my-auto ml-4"
            onPress={() => removeData()}
          >
            <Icon name="log-out-outline" size={18} />
            <Text className="ml-4 text-lg my-auto">Keluar</Text>
          </TouchableOpacity>
        </View> */}
        <View className="bg-white h-max ml-2 mr-2 mt-4 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
          <View className="my-auto">
            <Icon name="help-circle-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Pusat Bantuan</Text>
        </View>
        <View className="bg-white h-max ml-2 mr-2 mt-0 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
          <View className="my-auto">
            <Icon name="people-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Pengaturan Akun </Text>
        </View>
        <Pressable onPress={() => removeData()}>
          <View className="bg-white h-max ml-2 mr-2 mt-0 rounded-lg flex-row px-4 py-2 border-2 border-gray-200 shadow-xl">
            <View className="my-auto">
              <Icon name="log-out-outline" size={18} />
            </View>
            <Text className="text-lg ml-4">Keluar</Text>
          </View>
        </Pressable>
      </View>
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
