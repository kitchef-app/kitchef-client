import { View, Image, Text, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Temukan Resep Keinginanmu",
    description:
      "Tersedia ribuan resep di Kitchef dan tonton video tutorial memasak resep pilihanmu",
    image: require("../assets/logo/onboarding-01.png"),
  },
  {
    id: 2,
    title: "Pesan Bahan Masakan",
    description:
      "Pilih bahan masakan yang kamu butuhkan sesuai resep masakan pilihanmu",
    image: require("../assets/logo/onboarding-02.png"),
  },
  {
    id: 3,
    title: "Lacak Pesananmu",
    description:
      "Pelacakan pesanan secara langsung akan terus mengabarimu tentang progres pesananmu",
    image: require("../assets/logo/onboarding-03.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("preferences").then((preferences) => {
      if (preferences) {
        setPreferences(preferences);
      } else {
        setPreferences([]);
      }
    });
  }, []);
  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: SIZES.h3,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <AppIntroSlider
        backgroundColor="#FFF"
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 25,
                paddingTop: 75,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 40,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.primary,
                  fontSize: 22,
                  marginTop: -15,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 12,
                  color: COLORS.black,
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                {item.description}
              </Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width: 30,
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Lanjut")}
        renderSkipButton={() => buttonLabel("Lewati")}
        renderDoneButton={() => buttonLabel("Selesai")}
        onDone={() => {
          if (preferences[0]) {
            navigation.replace("Home");
          } else {
            navigation.replace("Preferences");
          }
        }}
      />
    </>
  );
}
