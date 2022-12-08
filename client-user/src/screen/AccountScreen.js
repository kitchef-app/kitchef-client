import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { GET_USER } from "../queries/users";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
// push notif
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";

// push notif
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function AccountScreen({ navigation }) {
  const [id, setUser] = useState([]);
  // const [users, setUsers] = useState([]);
  // push notif
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  const notificationListener = useRef();
  const baseUrl = "https://kitchef-server-production.up.railway.app";

  // const getData = async () => {
  //   const access_token = await AsyncStorage.getItem("access_token");
  //   if (!access_token) {
  //     return navigation.replace("Login");
  //   }
  // };

  const getID = async () => {
    const id_user = await AsyncStorage.getItem("id");
    const id = Number(id_user);
    setUser(id);
    console.log(id, "ini id dari async storage");
    return id;
  };
  // push notif
  useEffect(() => {
    // getData();
    getID().then((id) => {
      registerForPushNotificationsAsync()
        .then(async (token) => {
          console.log(token, "ini token ========================");
          console.log(id, "ini ID HABIS TOKEN");
          // hit endpoint utk update user utk simpen expopushnotif (token)
          await axios({
            method: "patch",
            url: `${baseUrl}/users/${id}`,
            data: {
              token,
            },
          })
            .then((data) => console.log("berhasil ngepatch"))
            .catch((err) => {
              throw new Error(err);
              console.log(err, "err axios");
            });
          // setExpoPushToken(token) // kayaknya gak perlu
        })
        .catch((err) => {
          throw new Error(err);
          console.log(err);
        });
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log(id, "ini id user");
  // const id = "2";
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) {
    <Loading />;
  }

  // console.log(data, "ini dari acc");

  const removeData = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("preferences");
    await AsyncStorage.removeItem("id");
    return navigation.replace("Home");
  };

  // useEffect(() => {
  //   getData();
  //   getID();
  // }, []);

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
    <ScrollView>
      <View className="bg-white h-screen">
        <View className="flex-col bg-white h-40 mt-4">
          <Image
            className="h-24 rounded-full w-24 mx-auto my-auto"
            source={{
              uri: "https://cdn.discordapp.com/attachments/1047453282253164559/1050303731314479104/avatar-user.png",
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
    </ScrollView>
  );
}
