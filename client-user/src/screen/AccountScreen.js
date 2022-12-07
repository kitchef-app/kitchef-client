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
  // const [users, setUsers] = useState([]);

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
    await AsyncStorage.removeItem("preferences");
    await AsyncStorage.removeItem("id");
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
    <View className="bg-white h-full">
      <View className="flex-col bg-white h-40 mt-4">
        <Image
          className="h-24 rounded-full w-24 mx-auto my-auto"
          source={{
            uri: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
          }}
        />

        <View className="flex-col mx-auto">
          <Text className=" text-xl font-bold text-center mt-2">
            {data?.getUserById?.username}
          </Text>

          <View className="flex-row px-4 gap-2 py-1">
            <View className="flex-row mr-2">
              <View className="my-auto">
                <Icon name="call-outline" size={20} color="#cbd5e1" />
              </View>
              <Text className="text-lg text-center text-slate-500 mt-0 ml-2">
                {data?.getUserById?.phoneNumber}
              </Text>
            </View>
            <View className="flex-row">
              <View className="my-auto">
                <Icon name="mail-outline" size={20} color="#cbd5e1" />
              </View>

              <Text className="text-lg ml-2 text-center text-slate-500 my-auto">
                {data?.getUserById?.email}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-col">
        <View className="ml-4 mt-12">
          <Text className="text-xl font-bold">Aktivitas Saya</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Order")}>
          <View className="bg-white h-max ml-4 mr-4 mt-4 flex-row px-4 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
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
        <View className="bg-white h-max ml-4 mr-4 mt-2 flex-row px-4 py-2 border border-slate-200 shadow-lg  shadow-neutral-100 rounded-lg">
          <View className="my-auto">
            <Icon name="pricetags-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Voucher Saya</Text>
        </View>
        <View className="bg-white h-max ml-4 mr-4 mt-2 flex-row px-4 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
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
        <View className="bg-white h-max ml-4 mr-4 mt-4 flex-row px-4 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
          <View className="my-auto">
            <Icon name="help-circle-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Pusat Bantuan</Text>
        </View>
        <View className="bg-white h-max ml-4 mr-4 mt-2  flex-row px-4 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
          <View className="my-auto">
            <Icon name="people-outline" size={18} />
          </View>
          <Text className="text-lg ml-4">Pengaturan Akun </Text>
        </View>
        <Pressable onPress={() => removeData()}>
          <View className="bg-white h-max ml-4 mr-4 mt-2 flex-row px-4 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
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
