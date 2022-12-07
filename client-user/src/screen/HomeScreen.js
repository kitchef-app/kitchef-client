import {
  View,
  Text,
  Pressable,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import CardCategory from "../components/CardCategory";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardPromo from "../components/CardPromo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardRecipe from "../components/CardRecipe";
import { useQuery } from "@apollo/client";
import { GET_ALL_DISHES, GET_CATEGORY } from "../queries/recipe";
import Loading from "../components/Loading";
import * as Animatable from "react-native-animatable";

export default function HomeScreen({ navigation }) {
  const [mainAnimation, setMainAnimation] = useState("slideInDown");
  const [preferences, setPreferences] = useState([]);
  const { loading, error, data: category } = useQuery(GET_CATEGORY);
  const { data: dishes } = useQuery(GET_ALL_DISHES);

  console.log(category);

  const getData = async () => {
    const preferences = await AsyncStorage.getItem("preferences");
    if (!preferences) {
      return setPreferences([]);
    } else {
      return setPreferences(preferences);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor="#F05A2A"
        barStyle="light-content"
        animated={true}
      />
      <View className="flex-1" backgroundColor={COLORS.backgroundWhite}>
        <View className="bg-[#F05A2A] h-[130]">
          <Text className="font-bold text-2xl ml-4 mt-2 pt-4 text-white">
            Mau masak apa hari ini?
          </Text>
          <View className="w-full">
            <Pressable onPress={() => navigation.navigate("SearchScreen")}>
              <View className="bg-white h-[40] rounded-lg text-left mx-4 mb-2 pl-3 mt-3">
                <View className="my-auto">
                  <Text className="font-regular text-slate-400">
                    Cari resep masakan
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
        {loading && <Loading />}
        {!loading && (
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <View>
              <Text className="font-bold text-xl ml-4 mt-6 text-[#333333]">
                Resep Masakan Pilihan Untukmu
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
              >
                <View className="flex-row ml-3">
                  {!loading &&
                    dishes?.getDishes
                      ?.filter((dish, index) => {
                        if (preferences && preferences.length > 0) {
                          if (preferences.includes(dish.id)) {
                            return dish;
                          }
                        } else {
                          return dish;
                        }
                      })
                      .map((dish, index) => (
                        <CardRecipe
                          dishes={dish}
                          navigation={navigation}
                          key={index}
                        />
                      ))}
                </View>
              </ScrollView>
            </View>
            <View className="flex-col">
              <Text className="font-bold text-xl ml-4 mt-8 text-[#333333]">
                Promo
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4 ml-4"
              >
                <View className="flex-1">
                  <View className="flex-row">
                    <CardPromo />
                    <CardPromo />
                    <CardPromo />
                  </View>
                </View>
              </ScrollView>
            </View>
            <Text className="font-bold text-xl ml-4 mt-8 text-[#333333]">
              Aneka Kategori Masakan
            </Text>

            <View className="flex-1 mx-4">
              <View className="flex-wrap flex-row mt-2 mb-4 mx-auto">
                {category?.getCategory?.map((category, index) => (
                  <CardCategory
                    category={category}
                    navigation={navigation}
                    key={index}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}
