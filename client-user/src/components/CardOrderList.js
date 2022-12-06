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
    <View className="bg-white h-max flex flex-row px-4 mt-2 ml-4 mr-4 justify-between rounded-lg border-2 border-gray-200 shadow-xl">
      <View className="my-auto py-2">
        {/* <View>
          <Icon name="wallet-outline" size={32} />
        </View> */}
        <Text className="text-base">Belanja</Text>
        <Text className="text-base">{orderList.createdAt}</Text>
        <View className="border-t border-dashed w-full mt-2 mb-2 "></View>
        <Text className="text-sm">No. Transaksi</Text>
        <Text className="text-base">HCK51-KTCF-ORDR-{orderList.id}</Text>
        <View className="flex mt-2">
          <Text className="text-sm font-medium text-[#F05A2A]">
            {orderList.isDelivered}
          </Text>
        </View>
      </View>
      <View className="flex-row py-2 px-4">
        <Pressable
          onPress={() =>
            navigation.navigate("OrderDetail", { invoiceId: +orderList.id })
          }
        >
          <View className="text-lg bg-[#F05A2A] my-auto rounded-lg mx-auto">
            <Text className="px-4 py-2 my-auto text-white">Detail</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
