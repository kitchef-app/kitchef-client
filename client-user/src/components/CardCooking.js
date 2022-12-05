import { Text, View } from "react-native";

export default function CardCooking({ steps, index }) {
  return (
    <View className="bg-white h-full w-[220] ml-4 mt-4 rounded-lg border-2 border-slate-100 mb-2">
      <Text className="text-xl font-medium mt-2 ml-2"> Step {index + 1} </Text>
      <Text className="ml-3 mt-1 mr-3 leading-5 text-md">{steps?.name}</Text>
    </View>
  );
}
