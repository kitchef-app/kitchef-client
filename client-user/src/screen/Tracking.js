import { Button } from "@rneui/themed";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
// import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { socket } from "../config/socket";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

AsyncStorage;
export default function Tracking({ navigation, route }) {
  const { userId } = route.params;
  const { driverId } = route.params;

  console.log("assadasdasdas");

  console.log(userId, "sssssssss");
  console.log(driverId, "ddddddd");

  const [region, setRegion] = useState({});
  // const [userId, setUserId] = useState([])
  // const getData = async () => {
  //   const id = await AsyncStorage.getItem("id")
  //   return setUserId(id)
  // }

  useEffect(() => {
    getData();
  }, []);

  // location.coordinates[0] === lat

  // fetch data user location
  // ganti region di marker jadi user location
  // ganti data destination di direction jd user location
  // const {InvoiceId} = route.params;

  useEffect(() => {
    socket.emit("join-rooms", 10);
    socket.on("send-location", (location) => {
      console.log(location);
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    });
    return () => {
      //on leave room
    };
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       return;
  //     } else {
  //       let location = await Location.watchPositionAsync(
  //         {
  //           accuracy: Location.Accuracy.High,
  //           timeInterval: 10000,
  //           distanceInterval: 10,
  //         },
  //         update => {
  //           setRegion({
  //             latitude: update.coords.latitude,
  //             longitude: update.coords.longitude,
  //           });
  //           console.log(region);
  //           socket.emit("send-location", {
  //             roomName: InvoiceId,
  //             location:
  //             {latitude: update.coords.latitude,
  //             longitude: update.coords.longitude},
  //            })
  //         },
  //       );
  //     }
  //   })();
  // }, []);

  // if (loading) return <Text>Submitting...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            // latitude: 37.78825,
            // longitude: -122.4324,
            ...region,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          followUserLocation={true}
          loadingEnabled={true}
        >
          <Marker coordinate={region} pinColor={"black"} title="Customer" />
          <Marker
            coordinate={{
              latitude: -6.297441633874579,
              longitude: 106.71282256060646,
            }}
            title="Your Location"
          />
          <MapViewDirections
            origin={{ ...region }}
            destination={{
              latitude: -6.297441633874579,
              longitude: 106.71282256060646,
            }}
            // onReady={result => {
            //       console.log(`Distance: ${result.distance} km`)
            //       console.log(`Duration: ${result.duration} min.`)
            // }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#0ea5e9"
          />
        </MapView>
      </View>
      <View className="mb-20 w-80">
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            changeStatus({
              variables: { invoiceDelId: +InvoiceId },
            });
            // navigation.navigate("Home");
            return;
          }}
        >
          <Text style={styles.btnText}>Selesai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnReversed}
          onPress={async () => {
            changeStatus({
              variables: { invoiceDelId: +InvoiceId },
            });
            // navigation.navigate("Home");
            return;
          }}
        >
          <Text style={styles.btnTextReversed}>Chat with Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 800,
    // width: 400,
    // justifyContent: "flex-end",
    padding: 20,
    alignItems: "center",
  },
  mapContainer: {
    width: "100%",
    height: 550,
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btn: {
    backgroundColor: "tomato",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 5,
  },
  btnReversed: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "tomato",
    borderWidth: 1,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  btnTextReversed: {
    color: "tomato",
    fontWeight: "600",
  },
});

// baru
// import { View, Text } from "react-native";
// import { StyleSheet } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import {
//   CHANGE_STATUS_COMPLETE_DELIVERED,
//   INVOICE_DRIVER,
// } from "../queries/drivers";
// import { gql, useMutation } from "@apollo/client";
// import { useEffect } from "react";
// // import client from "../config/apollo";
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 800,
//     width: 400,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default ({ navigation, route }) => {
//   const [changeStatus, { data, loading, error }] = useMutation(
//     CHANGE_STATUS_COMPLETE_DELIVERED
//     // {
//     //   refetchQueries: [
//     //     { query: { INVOICE_DRIVER }, variables: { driverId: 1 } },
//     //   ],
//     // }
//   );

// useEffect(() => {
//   if (data) {
//     navigation.navigate("Home");
//   }
// }, [data]);

// console.log(data);

// const { InvoiceId } = route.params;
// console.log(InvoiceId);
// if (loading) return <Text>Submitting...</Text>;

// return (
//   <View style={styles.container}>
//     <MapView
//       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={styles.map}
//       region={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     ></MapView>
//     <View className="mb-20 w-80">
//       <Button
//         onPress={async () => {
//           changeStatus({
//             variables: { invoiceDelId: +InvoiceId },
//           });
//           // navigation.navigate("Home");
//           return;
//         }}
//         title="SELESAI"
//       ></Button>
//     </View>
//   </View>
// );
// };
