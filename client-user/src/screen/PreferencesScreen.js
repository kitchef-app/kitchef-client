import { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SIZES } from "../constants/theme";

export default function PreferencesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  const options = ["Kategori 1", "Kategori 2", "Kategori 3"];

  function chooseCategory(selectedCategory) {
    if (categories.includes(selectedCategory)) {
      setCategories(
        categories.filter((category) => category !== selectedCategory)
      );
      return categories;
    }
    setCategories((categories) => categories.concat(selectedCategory));
  }

  console.log(categories);

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
        {options.map((option) => (
          <View key={option} style={styles.categories}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => chooseCategory(option)}
            >
              {categories.includes(option) && (
                <Text style={styles.check}>✓</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.categoriesName}>{option}</Text>
          </View>
        ))}
      </View>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Simpan"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
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
