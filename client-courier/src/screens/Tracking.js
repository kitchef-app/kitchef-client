import {Button} from '@rneui/themed';
import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useQuery } from "@apollo/client";
import {
  CHANGE_STATUS_COMPLETE_DELIVERED,
  INVOICE_DRIVER,
  GET_USER_DETAIL
} from '../queries/drivers';
import {gql, useMutation} from '@apollo/client';
// import { useEffect } from "react";
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { socket } from "../config/socket"

export default function Tracking({navigation, route}) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0
  });

  // fetch data user location
  // ganti region di marker jadi user location
  // ganti data destination di direction jd user location

  const [changeStatus, {data, loading, error}] = useMutation(
    CHANGE_STATUS_COMPLETE_DELIVERED,
    // {
    //   refetchQueries: [
    //     { query: { INVOICE_DRIVER }, variables: { driverId: 1 } },
    //   ],
    // }
  );

  const { InvoiceId, UserId } = route.params;
  // const InvoiceId = 1
  // const UserId = 2

  // console.log(InvoiceId, UserId);

  const { data: user, error: userError, loading: userLoading } = useQuery(GET_USER_DETAIL, { variables: { id: UserId}})
  // console.log(user?.getUserById?.location?.coordinates[0], "userdetail")

  useEffect(() => {
    socket.emit("join-rooms", InvoiceId) 
    console.log(InvoiceId, "invoiceId");
    return () => {

    }
  }, [])

  useEffect(() => {
    if (data) {
      navigation.navigate('Home');
    }
  }, [data]);


  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      } else {
        let location = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          update => {
            setRegion({
              latitude: +update.coords.latitude,
              longitude: +update.coords.longitude,
            });
            console.log(region);
            socket.emit("send-location", {
              roomName: InvoiceId,
              location: 
              {latitude: +update.coords.latitude,
              longitude: +update.coords.longitude},
             })
          },
        );
      }
    })();
  }, []);

  if (loading) return <Text>Submitting...</Text>;

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
          loadingEnabled={true}>
          <Marker coordinate={{...region}} pinColor={'black'} title="Customer" />
          <Marker
            coordinate={{
              latitude: user?.getUserById?.location?.coordinates[0],
              longitude: user?.getUserById?.location?.coordinates[1]
            }}
            title="Your Location"
          />
          <MapViewDirections
            origin={{...region}}
            destination={{
              latitude: +user?.getUserById?.location?.coordinates[0],
              longitude: +user?.getUserById?.location?.coordinates[1],
            }}
            // onReady={result => {
            //       console.log(`Distance: ${result.distance} km`)
            //       console.log(`Duration: ${result.duration} min.`)
            // }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#F05A2A"
          />
        </MapView>
      </View>
      <View className="mb-20 w-80">
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            changeStatus({
              variables: {invoiceDelId: +InvoiceId},
            });
            // navigation.navigate("Home");
            return;
          }}>
          <Text style={styles.btnText}>Selesai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnReversed}
          onPress={async () => {
            changeStatus({
              variables: {invoiceDelId: +InvoiceId},
            });
            // navigation.navigate("Home");
            return;
          }}>
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
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 550,
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btn: {
    backgroundColor: 'tomato',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  btnReversed: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    borderColor: 'tomato',
    borderWidth: 1,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  btnTextReversed: {
    color: 'tomato',
    fontWeight: '600',
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
