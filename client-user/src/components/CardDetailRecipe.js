import { Text, View } from "react-native";

export default function CardDetailRecipe() {
  return (
    <View className="flex-row bg-[#FF7629] h-[40] ml-4 mr-4 mt-4">
      <View>
        <Text className="my-auto ml-2 text-sm text-white">
          {`\u2022`}Apapun
        </Text>
      </View>
      <View className=" bg-slate-800 w-24 ml-[188] my-auto h-[25]">
        <View className="my-auto">
          <Text className="my-auto mx-auto text-sm text-white">
            + Keranjang
          </Text>
        </View>
      </View>
    </View>
  );
}
