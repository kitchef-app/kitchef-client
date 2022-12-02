import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import AuthStackNavigator from "./src/navigator/AuthStackNavigator";
import { COLORS } from "./src/constants/theme";

export default function App() {
  return (
    // <ApolloProvider>
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AuthStackNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
    // </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
    justifyContent: "center",
  },
});
