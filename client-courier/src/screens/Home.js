import { Button } from "@rneui/themed";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CardInvoice } from "../components/cardInvoice";
// push notif
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function Home({ navigation }) {
  const [id, setId] = useState([]);
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  const notificationListener = useRef();
  const baseUrl = "https://kitchef-server-production.up.railway.app";

  const getID = async () => {
    const id_user = await AsyncStorage.getItem("id");
    const id = Number(id_user);
    setId(id);
    return id;
  };
  // push notif
  useEffect(() => {
    getID().then((id) => {
      registerForPushNotificationsAsync().then((token) => {
        console.log(token, "ini token ========================");
        console.log(id, "ini ID HABIS TOKEN");
        // hit endpoint utk update user utk simpen expopushnotif (token)
        axios({
          method: "patch",
          url: `${baseUrl}/drivers/${id}`,
          data: {
            token,
          },
        }).then((data) => console.log("berhasil ngepatch"));
        // setExpoPushToken(token) // kayaknya gak perlu
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

  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          // alignItems: "center",
          // marginLeft: 5,
          backgroundColor: "white",
          padding: 10,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            // alignContent: "center",
            alignItems: "center",
          }}
        ></View>

        <CardInvoice />
      </View>
      {/* <ScrollView>
        <View className="flex-1">
          <Pressable onPress={() => navigation.navigate("Tracking")}>
            <View className="mx-auto bg-gray-200 border-opacity-5 h-[200] w-[360] mt-8 rounded-xl">
              <View className="h-10 w-80 mx-auto">
                <Text className="text-xl font-semibold mt-4">
                  02 December 2022
                </Text>
              </View>
              <View className="border-t-2 mt-2"></View>
              <View className="h-10 w-80 mx-auto">
                <Text className="text-sm mt-4">No. Transaksi</Text>
              </View>
              <View className="w-80 mx-auto">
                <Text className="text-sm">021-EENCCVX-0033</Text>
              </View>
              <View className="w-80 mx-auto mt-[20]">
                <Text className="text-sm">Tujuan</Text>
              </View>
              <View className="flex flex-row">
                <View className="flex justify-start mt-[6] mb-2 ml-[20]">
                  <Text className="text-sm">Jalan Kecap Abadi Nan Jaya</Text>
                </View>

                <View className="mt-[6] ml-[60]">
                  <Text className="bg-gray-400 text-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    Sedang diantar
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
          <View className="mx-auto bg-gray-200 border-opacity-5 h-[200] w-[360] mt-8 rounded-xl">
            <View className="h-10 w-80 mx-auto">
              <Text className="text-xl font-semibold mt-4">
                02 December 2022
              </Text>
            </View>
            <View className="border-t-2 mt-2"></View>
            <View className="h-10 w-80 mx-auto">
              <Text className="text-sm mt-4">No. Transaksi</Text>
            </View>
            <View className="w-80 mx-auto">
              <Text className="text-sm">021-EENCCVX-0033</Text>
            </View>
            <View className="w-80 mx-auto mt-[20]">
              <Text className="text-sm">Tujuan</Text>
            </View>
            <View className="flex flex-row">
              <View className="flex justify-start mt-[6] mb-2 ml-[20]">
                <Text className="text-sm">Jalan Kecap Abadi Nan Jaya</Text>
              </View>

              <View className="mt-[6] ml-[60]">
                <Text className="bg-gray-400 text-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Sedang diantar
                </Text>
              </View>
            </View>
          </View>
          <View className="mx-auto bg-gray-200 border-opacity-5 h-[200] w-[360] mt-8 rounded-xl">
            <View className="h-10 w-80 mx-auto">
              <Text className="text-xl font-semibold mt-4">
                02 December 2022
              </Text>
            </View>
            <View className="border-t-2 mt-2"></View>
            <View className="h-10 w-80 mx-auto">
              <Text className="text-sm mt-4">No. Transaksi</Text>
            </View>
            <View className="w-80 mx-auto">
              <Text className="text-sm">021-EENCCVX-0033</Text>
            </View>
            <View className="w-80 mx-auto mt-[20]">
              <Text className="text-sm">Tujuan</Text>
            </View>
            <View className="flex flex-row">
              <View className="flex justify-start mt-[6] mb-2 ml-[20]">
                <Text className="text-sm">Jalan Kecap Abadi Nan Jaya</Text>
              </View>

              <View className="mt-[6] ml-[60]">
                <Text className="bg-gray-400 text-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Sedang diantar
                </Text>
              </View>
            </View>
          </View>
          <View className="mx-auto bg-gray-200 border-opacity-5 h-[200] w-[360] mt-8 rounded-xl">
            <View className="h-10 w-80 mx-auto">
              <Text className="text-xl font-semibold mt-4">
                02 December 2022
              </Text>
            </View>
            <View className="border-t-2 mt-2"></View>
            <View className="h-10 w-80 mx-auto">
              <Text className="text-sm mt-4">No. Transaksi</Text>
            </View>
            <View className="w-80 mx-auto">
              <Text className="text-sm">021-EENCCVX-0033</Text>
            </View>
            <View className="w-80 mx-auto mt-[20]">
              <Text className="text-sm">Tujuan</Text>
            </View>
            <View className="flex flex-row">
              <View className="flex justify-start mt-[6] mb-2 ml-[20]">
                <Text className="text-sm">Jalan Kecap Abadi Nan Jaya</Text>
              </View>

              <View className="mt-[6] ml-[60]">
                <Text className="bg-gray-400 text-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Sedang diantar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 10,
    backgroundColor: "orange",
  },
});
