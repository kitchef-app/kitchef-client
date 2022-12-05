import { Button } from "@rneui/themed";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  CHANGE_STATUS_COMPLETE_DELIVERED,
  INVOICE_DRIVER,
} from "../queries/drivers";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
// import client from "../config/apollo";
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ({ navigation, route }) => {
  const [changeStatus, { data, loading, error }] = useMutation(
    CHANGE_STATUS_COMPLETE_DELIVERED
    // {
    //   refetchQueries: [
    //     { query: { INVOICE_DRIVER }, variables: { driverId: 1 } },
    //   ],
    // }
  );

  useEffect(() => {
    if (data) {
      navigation.navigate("Home");
    }
  }, [data]);

  console.log(data);

  const { InvoiceId } = route.params;
  console.log(InvoiceId);
  if (loading) return <Text>Submitting...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      ></MapView>
      <View className="mb-20 w-80">
        <Button
          onPress={async () => {
            changeStatus({
              variables: { invoiceDelId: +InvoiceId },
            });
            // navigation.navigate("Home");
            return;
          }}
          title="SELESAI"
        ></Button>
      </View>
    </View>
  );
};
