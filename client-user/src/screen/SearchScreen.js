import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import CardSearch from "../components/CardSearch";

export default function SearchScreen({ navigation }) {
  return (
    <View className="flex-1">
      <View className="bg-[#FF7629] h-40 rounded-lg">
        <Text className="font-extrabold text-xl ml-4 mt-8 text-white">
          Mau masak apa hari ini?
        </Text>

        <TextInput
          className="bg-gray-200 border border-gray-400 h-[40] text-gray-500 rounded-lg text-left mx-4 mb-2 pl-5 mt-4"
          placeholder="Cari resep makanan ..."
        />
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View className="mb-2">
          <Pressable onPress={() => navigation.navigate("DetailRecipe")}>
            <CardSearch />
            <CardSearch />
            <CardSearch />
            <CardSearch />
            <CardSearch />
            <CardSearch />
            <CardSearch />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
