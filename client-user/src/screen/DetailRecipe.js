import { View, Image, Text } from "react-native";
import { COLORS } from "../constants/theme";
import YoutubePlayer from "react-native-youtube-iframe";
import CardDetailRecipe from "../components/CardDetailRecipe";
import { ScrollView } from "react-native-gesture-handler";
import CardCooking from "../components/CardCooking";
import CardListAllItem from "../components/CardListAllItem";

export default function DetailRecipe({ navigation }) {
  
  return (
    <ScrollView>
      <View className="flex-1">
        <View className="w-full">
          <YoutubePlayer height={300} videoId={"iee2TATGMyI"}></YoutubePlayer>
        </View>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row mr-4 ">
            <CardCooking />
            <CardCooking />
            <CardCooking />
            <CardCooking />
            <CardCooking />
            <CardCooking />
          </View>
        </ScrollView>
        <View className="mt-8">
          <Text className="text-xl ml-4 font-bold">
            Beli bahan dan peralatan sekarang
          </Text>
        </View>
        <View className="flex-col mb-2">
          <CardListAllItem />
          <CardListAllItem />
          <CardListAllItem />
          <CardListAllItem />
        </View>
      </View>
    </ScrollView>
  );
}
