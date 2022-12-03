import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";
import YoutubePlayer from "react-native-youtube-iframe";
import CardDetailRecipe from "../components/CardDetailRecipe";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailRecipe({ navigation }) {
  return (
    <ScrollView>
      <View className="flex-1">
        {/* <View>
          <YoutubePlayer height={300} videoId={"iee2TATGMyI"}></YoutubePlayer>
        </View> */}
        <View className="mt-[-46] ml-4">
          <Text className="text-2xl font-extrabold">Nasi Goreng</Text>
        </View>
        <View className="ml-4 mt-4">
          <Text className="text-base font-base">
            Nasi Goreng Nasi GorengNasi GorengNasi GorengNasi GorengNasi
            GorengNasi GorengNasi GorengNasi GorengNasi Goreng Nasi GorengNasi
            GorengNasi GorengNasi GorengNasi GorengNasi Goreng
          </Text>
        </View>
        <View className="mt-8">
          <Text className="text-xl ml-4 font-bold">Bahan Utama</Text>
        </View>
        <View className="flex-col">
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
        </View>
        <View className="mt-8">
          <Text className="text-xl ml-4 font-bold">Alat dan Perlengakapan</Text>
        </View>
        <View className="flex-col">
          <CardDetailRecipe />
          <CardDetailRecipe />
          <CardDetailRecipe />
        </View>
        <View className="mt-8">
          <Text className="text-xl ml-4 font-bold">Cara Memasak</Text>
        </View>
        <ScrollView horizontal>
          <View className="flex-row">
            <View className="bg-gray-500 h-[180] w-[160] ml-4 mt-4 rounded-lg">
              <Text className="text-xl font-medium mt-[9] ml-2"> STEP 1 </Text>
              <Text className="ml-3 mt-4 mr-3">
                Ayam digoreng dan goreng goreng ayam dan ayam ayam kampus goreng
                goreng
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="mt-8">
          <Text className="text-xl ml-4 font-bold">Cara Memasak</Text>
        </View>
      </View>
    </ScrollView>
  );
}
