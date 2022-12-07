import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
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
    <ScrollView className="bg-slate-50">
      <View className="flex-1 mb-2">
        <View className="flex-row flex-wrap flex justify-between px-4 py-2">
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
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
