import { View, Image, Text, StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import YoutubePlayer from "react-native-youtube-iframe";
import CardDetailRecipe from "../components/CardDetailRecipe";
import { ScrollView } from "react-native-gesture-handler";
import CardCooking from "../components/CardCooking";
import CardListAllItem from "../components/CardListAllItem";
import Loading from "../components/Loading";
import { GET_DISHES_DETAIL_BY_ID } from "../queries/recipe";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import CardTools from "../components/CardTools";
import { makeVar } from "@apollo/client";
import Icon from "react-native-vector-icons/Ionicons";

// export const cartItemsVar = makeVar([]);

export default function DetailRecipe({ navigation, route }) {
  const { dishName, dishId } = route.params;
  const { loading, error, data } = useQuery(GET_DISHES_DETAIL_BY_ID, {
    variables: { dishId },
  });

  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    navigation.setOptions({ title: dishName });
  }, []);

  // console.log(cartItemsVar());

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.backgroundWhite}
        barStyle="dark-content"
        animated={true}
      />
      <ScrollView
        backgroundColor={COLORS.backgroundWhite}
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          <View className="w-full">
            <YoutubePlayer
              height={300}
              videoId={data?.getDishesDetail?.videoUrl.slice(32)}
              webViewStyle={{ opacity: 0.99 }}
            ></YoutubePlayer>
          </View>
          <View className="mt-[-40] ml-4">
            <Text className="text-2xl font-bold">
              {data?.getDishesDetail?.name}
            </Text>
          </View>
          <View className="ml-4 mt-4">
            <View>
              <Text className="text-lg font-bold ">Deskripsi</Text>
            </View>
            <Text className="text-base font-base mt-2 mr-4">
              {data?.getDishesDetail?.description}
            </Text>
          </View>
          <View className="mt-6">
            <Text className="text-lg ml-4 font-bold">Bahan Utama</Text>
          </View>
          <View className="flex-col mt-4">
            {data?.getDishesDetail?.listIngredients.map(
              (ingredients, index) => (
                <CardDetailRecipe
                  ingredients={ingredients}
                  navigation={navigation}
                  key={index}
                />
              )
            )}
          </View>
          <View className="mt-6">
            <Text className="text-lg ml-4 font-bold">
              Alat dan Perlengkapan
            </Text>
          </View>
          <View className="flex-col mt-4">
            {data?.getDishesDetail?.listTools.map((tools, index) => (
              <CardTools tools={tools} navigation={navigation} key={index} />
            ))}
          </View>
          <View className="mt-6">
            <Text className="text-lg ml-4 font-bold">Cara Memasak</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row mr-4 h-full pb-4">
              {data?.getDishesDetail?.steps.map((steps, index) => (
                <CardCooking
                  steps={steps}
                  navigation={navigation}
                  key={index}
                  index={index}
                />
              ))}
            </View>
          </ScrollView>
          <View className="flex-col mt-8">
            <Text className="text-lg ml-4 mb-2 font-bold">
              Beli Bahan dan Perlengkapan
            </Text>
            <View className=" border mx-4 py-2 rounded-lg border-orange-300 bg-orange-50 mt-2">
              <View className="flex-row">
                <View className="my-auto mx-4">
                  <Icon name="location-outline" size={20} color="orange" />
                </View>
                <Text className="text-lg font-bold">Kitchef Store</Text>
              </View>
              <View className="py-2">
                <Text className="text-sm mx-4 break-words">
                  Jl. Arteri Pd. Indah No.7, RT.5/RW.9, Kby. Lama Sel., Kec.
                  Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                  12240
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-col mb-2 mt-2">
            {data?.getDishesDetail?.Products.map((products, index) => (
              <CardListAllItem
                products={products}
                navigation={navigation}
                key={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
