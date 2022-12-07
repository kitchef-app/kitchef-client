import { View, Image, Text, Pressable, ScrollView } from "react-native";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardOrderList from "../components/CardOrderList";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useQuery } from "@apollo/client";
import { GET_ORDER_LIST } from "../queries/users";
import Loading from "../components/Loading";

export default function OrderScreen({ navigation }) {
  const [userId, setUser] = useState([]);

  const getData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
      return navigation.replace("Login");
    }
  };

  const getID = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = Number(id);
    return setUser(userId);
  };

  // console.log(userId, "ini id user order");
  // const userId = 2;
  const { loading, error, data } = useQuery(GET_ORDER_LIST, {
    variables: { userId },
  });

  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    getData();
    getID();
  }, []);

  console.log(data, "order");
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
    //   <Text>Ini order screen</Text>
    // </View>
    <ScrollView>
      <View className="flex-1 py-2">
        {data &&
          data?.getInvoiceUser?.map((orderList, index) => (
            <CardOrderList
              orderList={orderList}
              navigation={navigation}
              key={index}
            />
          ))}
        {/* <CardOrderList />
      <CardOrderList />
      <CardOrderList /> */}
      </View>
    </ScrollView>
  );
}
