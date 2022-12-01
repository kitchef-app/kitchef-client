import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigator/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    // <ApolloProvider>
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
    // </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7629",
    justifyContent: "center",
  },
});
