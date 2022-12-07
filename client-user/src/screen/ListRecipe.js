import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardRecipe from "../components/CardRecipe";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DISHES } from "../queries/recipe";
import Loading from "../components/Loading";

export default function ListRecipe({ navigation, route }) {
  const { categoryName, categoryId } = route.params;
  const { loading, error, data } = useQuery(GET_ALL_DISHES);
  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    navigation.setOptions({ title: categoryName });
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        animated={true}
      />
      <ScrollView className="bg-slate-50">
        <View className="flex-1 mb-2">
          <View className="flex-row flex-wrap mt-2 ml-4 flex justify-left">
            {data?.getDishes?.map((dishes, index) => {
              if (dishes.CategoryId == categoryId)
                return (
                  <CardRecipe
                    dishes={dishes}
                    navigation={navigation}
                    key={index}
                  />
                );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
