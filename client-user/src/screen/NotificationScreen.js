import { View, Image, Text, StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardNotification from "../components/CardNotification";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_BY_USER_ID } from "../queries/notification";
import Loading from "../components/Loading";

export default function NotificationScreen({ navigation }) {
  const [id, setId] = useState([]);
  console.log(id);
  const { loading, error, data } = useQuery(GET_NOTIFICATION_BY_USER_ID, {
    variables: { logsUserId: id },
  });

  console.log(data);

  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem("id");
    setId(+id);
  };

  if (loading) {
    <Loading />;
  }
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.backgroundWhite}
        barStyle="dark-content"
        animated={true}
      />
      <View className="flex-1">
        <View>
          <Text className="ml-3 mt-3 mr-3 text-xl font-semibold text-black">
            TERBARU
          </Text>
        </View>
        <ScrollView className="mb-2">
          <View>
            {data?.getLogsByUserId ? (
              data?.getLogsByUserId?.map((notification, index) => (
                <CardNotification
                  notification={notification}
                  navigation={navigation}
                  key={index}
                />
              ))
            ) : (
              <Text>Tidak ada notif</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
