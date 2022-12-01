import { View, Image, Text, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../constants/theme";

const slides = [
  {
    id: 1,
    title: "Cari Resep Keinginanmu",
    description:
      "Kami menyediakan begitu banyak resep masakan disini. Lihat cara masaknya dan masak sekarang.",
    image: require("../../assets/favicon.png"),
  },
  {
    id: 2,
    title: "Pelajari Cara Bikinnya",
    description:
      "Kami menyediakan begitu banyak resep masakan disini. Lihat cara masaknya dan masak sekarang.",
    image: require("../../assets/favicon.png"),
  },
  {
    id: 3,
    title: "Beli Langsung Bahan Masakan",
    description:
      "Kami menyediakan begitu banyak resep masakan disini. Lihat cara masaknya dan masak sekarang.",
    image: require("../assets/logo/logo_full_vertical_32_orange.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontWeight: "600",
            fontSize: SIZES.h4,
            color: COLORS.primary,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.backgroundWhite}
      />
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 15,
                paddingTop: 100,
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
                  color: COLORS.black,
                  fontSize: SIZES.h1,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  color: COLORS.black,
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
          navigation.navigate("PreferencesScreen");
        }}
      />
    </>
  );
}
