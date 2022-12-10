import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const StyledView = styled(View);
const StyledText = styled(Text);

export default function CardOrderList({ navigation, orderList }) {
  return (
    // <Pressable onPress={() => navigation.navigate("OrderDetail")}>
    //   <View className="bg-white h-[120] mt-4 ml-2 mr-2 rounded-sm">
    //     <View className="flex-col">
    //       <View className="flex flex-row">
    //         <View className="my-auto ml-4 mt-[8]">
    //           <Icon name="basket-outline" size={32} />
    //         </View>
    //         <View className="flex-col ml-4 mt-2">
    //           <Text className="text-sm font-medium">Belanja</Text>
    //           <Text className="text-sm font-medium">{orderList.createdAt}</Text>
    //         </View>
    //       </View>
    //       <View className="border-t mt-2 mb-[18]"></View>
    //       <View className="mt-4 mb-2 flex justify-between pl-4 pr-2">
    //         <View className="flex-col">
    //           <Text className="text-base font-medium">No. Transaksi</Text>
    //           <Text className="text-base font-medium">
    //             KTCF-ORDR-0{orderList.id}
    //           </Text>
    //         </View>
    //         <View className="bg-gray-200 h-[20]">
    //           <Text className="ml-2 mr-2">{orderList.isDelivered}</Text>
    //         </View>
    //       </View>

    //     </View>
    //   </View>

    // </Pressable>
    // <StyledView className="bg-white flex-1 flex-row px-4 py-4 justify-between">
    //   <StyledText>Apap</StyledText>
    //   <StyledText>BBBB</StyledText>
    // </StyledView>
    <Pressable
      onPress={() =>
        navigation.navigate("OrderDetail", {
          invoiceId: +orderList.id,
          status: orderList.isPaid,
          userId: +orderList.UserId,
          driverId: +orderList.DriverId,
        })
      }
    >
      <View className="bg-white h-max px-4 mt-2 ml-4 mr-4 rounded-lg border border-slate-200 shadow-lg  shadow-neutral-100 py-2 ">
        <View className="flex-col">
          <View className="flex flex-row justify-between py-1">
            <Text className="text-base">Belanja</Text>
            <View className="bg-orange-100 rounded-sm h-max px-3 py-1 my-auto">
              <Text className="text-sm text-[#F05A2A] font-semibold">
                {orderList.isDelivered}
              </Text>
            </View>
            {/* <Text className="text-base">{orderList.createdAt}</Text> */}
          </View>
          <View className="border mt-2 border-dashed border-gray-200"></View>
          <View className="flex flex-row justify-between mt-4 py-1">
            <Text className="text-sm">Status</Text>
            <Text className="text-sm">{orderList.isPaid}</Text>
          </View>
          <View className="flex flex-row justify-between py-1">
            <Text className="text-sm">No. Transaksi</Text>
            <Text className="text-sm">HCK51-KTCF-ORDR-{orderList.id}</Text>
          </View>
          <View className="flex flex-row justify-between py-1">
            <Text className="text-sm">Tanggal Pembelian</Text>
            <Text className="text-sm">{orderList.createdAt.slice(0, 10)}</Text>
          </View>
        </View>
        {/* <View className="border-t border-dashed w-full mt-2 mb-2 "></View> */}

        {/* <View className="flex-row py-2 px-4">
        <Pressable
          onPress={() =>
            navigation.navigate("OrderDetail", { invoiceId: +orderList.id })
          }
        >
        </Pressable>
      </View> */}
      </View>
    </Pressable>
  );
}
