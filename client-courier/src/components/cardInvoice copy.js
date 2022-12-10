import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Pressable } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_ALL, INVOICE_DRIVER } from "../queries/drivers";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// import { GET_ALL_JOB } from "./src/queries/Job";
// GET_ALL_JOB;
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  bookmark: {
    width: 30,
    height: 30,
  },
  bookmark2: {
    width: 15,
    height: 15,
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    padding: 10,
    borderColor: "rgba(255,102,51,.5)",
    borderWidth: 1,
    borderRadius: 20,
  },
});
export function CardInvoice(route) {
  const [id, setId] = useState([]);
  const getID = async () => {
    const id_user = await AsyncStorage.getItem("id");
    const id = Number(id_user);
    setId(id)
    return id;
  }

  useEffect(() => {
    getID()
  }, [])

  const { loading, error, data, refetch } = useQuery(INVOICE_DRIVER, {
    variables: { driverId: 1 },
    // fetchPolicy: "no-cache",
  });
  const { data: allUser, loading: loadingUser } = useQuery(GET_USER_ALL);
  // console.log(allUser.getUserAll[0].id);
  // console.log(allUser);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  // console.log(d);
  const navigation = useNavigation();

  if (loading) return <Text>Loading...</Text>;
  if (loadingUser) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;
  // console.log(error);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <Pressable
          onPress={() =>
            navigation.navigate("Tracking", {
              InvoiceId: item.id,
              UserId: item.UserId,
              DriverId: item.DriverId,
            })
          }
        >
          <View className="mx-auto bg-orange-50 border-solid border-2 border-orange-200  w-full mt-5 rounded-md shadow-lg">
            <View className="h-10 w-80 mx-auto">
              <Text className="text-xl font-semibold mt-4 text-orange-400">
                {item.createdAt.slice(0, 10) + "-ORDER-" + item.id}
              </Text>
            </View>
            <View className="border-t-1 "></View>
            <View className="w-80 mx-auto mt-[20]">
              {allUser?.getUserAll?.map((user, index) => {
                // console.log(user.id);
                // console.log(item.UserId);
                if (String(user.id) === String(item.UserId)) {
                  // console.log("lontong");
                  // console.log(user.fullName);
                  return (
                    <Text key={index} className="text-sm font-semibold">
                      {user.fullName}
                    </Text>
                  );
                }
              })}
              {/* <Text className="text-sm">{item.shippingCost}</Text> */}
              {allUser?.getUserAll?.map((user, index) => {
                // console.log(user.id);
                // console.log(item.UserId);
                if (String(user.id) === String(item.UserId)) {
                  // console.log("lontong");
                  // console.log(user.fullName);
                  return (
                    <Text key={index} className="text-sm">
                      {user.phoneNumber}
                    </Text>
                  );
                }
              })}

              {/* <Text className="text-sm">{item.shippingCost}</Text> */}
              {/* <Text className="text-sm">{item.total}</Text> */}
            </View>
            <View className="flex flex-col mt-3">
              <Text className="text-lg font-normal text-black ml-6">
                Total Pesanan :{" "}
                <Text className="text-lg font-semibold text-orange-500 ml-6">
                  Rp {item.total}
                </Text>
              </Text>

              <View className="flex justify-start mt-[6] mb-2 ml-[20] flex-row space-x-3 items-center">
                {/* <Text className="text-sm">Dikirim Ke :</Text> */}
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/7615/7615749.png",
                  }}
                />
                <Text className="text-sm">Jalan Kecap Abadi Nan Jaya</Text>
              </View>
            </View>
          </View>
          <View className="w-full flex ">
            <Text className="bg-orange-400 pt-1 mx-auto items-center w-full text-center h-8 text-dark text-sm text-white font-medium  -translate-y-1">
              {item.isDelivered}
            </Text>
          </View>
        </Pressable>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={data.getInvoiceDriver}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Text>lop</Text> */}
    </>
  );
}
