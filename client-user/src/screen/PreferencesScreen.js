import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Loading from "../components/Loading";
import { COLORS, SIZES } from "../constants/theme";
import { GET_CATEGORY } from "../queries/recipe";

export default function PreferencesScreen({ navigation }) {
  console.log("Ini masuk ke prefer");
  const [categories, setCategories] = useState([]);
  const { loading, error, data } = useQuery(GET_CATEGORY);

  if (loading) {
    return <Loading />;
  }

  console.log(categories, "< preferences");

  const options = data?.getCategory;

  function chooseCategory(selectedCategory) {
    console.log(+selectedCategory, "category");
    if (categories.includes(+selectedCategory)) {
      setCategories(
        categories.filter((category) => category !== +selectedCategory)
      );
      return categories;
    }
    setCategories((categories) => categories.concat(+selectedCategory));
  }

  function submitPreferences() {
    const preferences = JSON.stringify(categories);
    AsyncStorage.setItem("preferences", preferences);
    navigation.replace("Home");
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: SIZES.h1,
          fontWeight: "bold",
          paddingTop: 32,
          lineHeight: 28,
        }}
      >
        Kategori masakan apa yang kamu suka?
      </Text>
      <Text className="text-slate-400 text-md pt-4">
        Pilih kategori masakan kesukaanmu
      </Text>
      <View className="w-full pt-4">
        {options.map((option, index) => (
          <Pressable
            onPress={() => chooseCategory(+option.id)}
            key={index}
            className="h-auto w-full p-3 mt-2 border border-slate-300 rounded-xl flex-row items-center"
          >
            <View className="w-6 h-6 border border-slate-300 rounded-md mr-2">
              {categories.includes(+option.id) && (
                <View className="h-6 w-6 bg-[#F05A2A] rounded-md items-center justify-center">
                  <Icon name="checkmark" size={24} color="#fff" />
                </View>
              )}
            </View>
            <Text className="text-slate-500">{option.name}</Text>
          </Pressable>
        ))}
      </View>
      {!categories[0] ? (
        <Pressable className="w-full pt-6">
          <View className="h-auto w-full p-3 mt-2 bg-[#bbbbbb] rounded-md">
            <Text className="text-white font-medium text-base mx-auto ">
              Simpan
            </Text>
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={() => submitPreferences()} className="w-full pt-6">
          <View className="h-auto w-full p-3 mt-2 bg-[#F05A2A] rounded-md">
            <Text className="text-white font-medium text-base mx-auto ">
              Simpan
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
