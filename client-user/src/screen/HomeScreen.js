import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

import CardCategory from "../components/CardCategory";
import CardLandingRecipe from "../components/CardLandingRecipe";
import { COLORS } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import CardPromo from "../components/CardPromo";

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1">
      <View className="bg-[#FF7629] h-40">
        <Text className="font-extrabold text-xl ml-4 mt-8 text-white">
          Mau masak apa hari ini?
        </Text>
        <View className="flex-row">
          <Pressable onPress={() => navigation.navigate("SearchScreen")}>
            <View className="bg-gray-200 border border-gray-400 h-[40] text-gray-500 rounded-lg text-left mx-4 mb-2 pl-5 mt-4 w-[300]">
              <View className="my-auto">
                <Text className="font-thin">Cari resep makanan ...</Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("NotificationScreen")}>
            <View className="mt-[19] mb-2">
              <Icon name="notifications-outline" size={32} color="white" />
            </View>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text className="font-extrabold text-lg ml-4 mt-8 text-[#333333]">
            Resep masakan pilihan untukmu
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mr-4 mt-2"
          >
            <View className="flex-row">
              <Pressable onPress={() => navigation.navigate("DetailRecipe")}>
                <CardLandingRecipe />
              </Pressable>
              <CardLandingRecipe />
              <CardLandingRecipe />
              <CardLandingRecipe />
              <CardLandingRecipe />
              <CardLandingRecipe />
            </View>
          </ScrollView>
        </View>
        <View className="flex-col">
          <Text className="font-extrabold text-lg ml-4 mt-8 text-[#333333]">
            Event & Promosi
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 mr-4 ml-4"
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
        <Text className="font-extrabold text-lg ml-4 mt-8 text-[#333333]">
          Aneka Category Masakan
        </Text>

        <View className="flex-1">
          <Pressable onPress={() => navigation.navigate("ListRecipe")}>
            <View className="flex-wrap flex-row ml-[4] mr-[4] mt-4 mb-4">
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
              <CardCategory />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  category: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 4,
    marginRight: 4,
    justifyContent: "center",
  },
  image: {
    width: 360,
    height: 170,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
