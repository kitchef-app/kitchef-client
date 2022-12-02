import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Kitchef For Driver</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7629",
  },
  text: {
    justifyContent: "center",
    alignContent: "center",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
});
