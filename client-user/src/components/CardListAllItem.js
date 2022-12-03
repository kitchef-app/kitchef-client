import { Image, Text, View } from "react-native";

export default function CardListAllItem() {
  return (
    <View className="flex-row bg-[#FF7629] h-[120] mt-4 ml-4 mr-4">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
        }}
      />
      <View className="flex-col">
        <Text className="ml-3 mt-2 mr-3 text-xl font-semibold text-white">
          Teflon
        </Text>
        <Text className="mt-[55] ml-3 mr-3 text-lg text-white">Rp. 30.000</Text>
      </View>
      <View className=" bg-slate-800 w-24 ml-[40] mt-[88] h-[25]">
        <View className="my-auto">
          <Text className="my-auto mx-auto text-sm text-white">
            + Keranjang
          </Text>
        </View>
      </View>
    </View>
  );
}
