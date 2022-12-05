import { Button } from "@rneui/themed";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CardInvoice } from "../components/cardInvoice";
export default function Home({ navigation }) {
  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          // alignItems: "center",
          // marginLeft: 5,
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 10,
    backgroundColor: "orange",
  },
});
