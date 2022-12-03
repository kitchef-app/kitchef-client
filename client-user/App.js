import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import AuthStackNavigator from "./src/navigator/AuthStackNavigator";
import { COLORS } from "./src/constants/theme";
import client from "./src/config/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <AuthStackNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
    justifyContent: "center",
  },
});
