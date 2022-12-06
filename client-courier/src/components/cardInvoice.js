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
import { INVOICE_DRIVER } from "../queries/drivers";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

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
export function CardInvoice() {
  const { loading, error, data, refetch } = useQuery(INVOICE_DRIVER, {
    variables: { driverId: 1 },
    // fetchPolicy: "no-cache",
  });
  useFocusEffect(
    useCallback(() => {
      console.log("aku ter");
      refetch();
    }, [])
  );
  console.log(data);
  console.log("<<<<<<");
  const navigation = useNavigation();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;
  // console.log(error);
  const renderItem = ({ item }) => {
    return (
      <>
        <Pressable
          onPress={() =>
            navigation.navigate("Tracking", { InvoiceId: item.id })
          }
        >
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
              <Text className="text-sm">{item.isDelivered}</Text>
              <Text className="text-sm">Shipping Cost</Text>
              <Text className="text-sm">{item.shippingCost}</Text>
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
