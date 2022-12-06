import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Loading from "../components/Loading";
import { SIZES } from "../constants/theme";
import { GET_CATEGORY } from "../queries/recipe";

export default function PreferencesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const { loading, error, data } = useQuery(GET_CATEGORY);

  if (loading) {
    return <Loading />;
  }

  console.log(categories);

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
          fontSize: SIZES.h2,
          fontWeight: "bold",
        }}
      >
        Pilih preferensi kategori masakan kesukaanmu
      </Text>
      <View style={styles.options}>
        {options.map((option, index) => (
          <View key={index} style={styles.categories}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => chooseCategory(+option.id)}
            >
              {categories.includes(+option.id) && (
                <Text style={styles.check}>✓</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.categoriesName}>{option.name}</Text>
          </View>
        ))}
      </View>
      {!categories[0] ? (
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Gabisa simpan"
        />
      ) : (
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Simpan"
          onPress={() => {
            submitPreferences();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    alignSelf: "flex-start",
    marginLeft: 40,
  },
  categories: {
    flexDirection: "row",
    marginVertical: 7,
  },
  categoriesName: {
    textTransform: "capitalize",
    fontSize: SIZES.h4,
  },
  check: {
    alignSelf: "center",
  },
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "green",
    marginRight: 5,
  },
});
