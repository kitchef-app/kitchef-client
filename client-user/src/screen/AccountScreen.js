import { useEffect, useState, useRef } from "react";
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
// push notif
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

// push notif
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
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

  // push notif
  useEffect(() => {
    getData();
    getID()
    .then((id) => {
    registerForPushNotificationsAsync()
    .then((token) => {
      console.log(token, "ini token ========================");
      console.log(id, "ini ID HABIS TOKEN");
      // hit endpoint utk update user utk simpen expopushnotif (token)
      axios({
        method: 'patch',
        url: `${baseUrl}/users/${id}`,
        data: {
          token
        }
      }).then(data => console.log('berhasil ngepatch'));
      // setExpoPushToken(token) // kayaknya gak perlu
    });
    })
   

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      return navigation.replace("Login");
    }
  };

  const getID = async () => {
    const id_user = await AsyncStorage.getItem("id");
    const id = Number(id_user);
    setUser(id)
    console.log(id, "ini id dari async storage");
    return id;
  };

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
    navigation.replace("Home");
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
