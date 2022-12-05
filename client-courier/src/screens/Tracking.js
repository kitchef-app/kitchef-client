import { Button } from "@rneui/themed";
import { View, TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"


export default function Tracking ({ navigation }) {
  // const GOOGLE_MAPS_APIKEY = "AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI"
  const [region, setRegion] = useState({})

  // fetch data user location
  // ganti region di marker jadi user location
  // ganti data destination di direction jd user location

  useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        } else {
          let location = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 10000,
              distanceInterval: 10,
            },
            (update) => {
              setRegion({
                latitude: update.coords.latitude,
                longitude: update.coords.longitude,
              });
              console.log(region);
            }
          );
        }
      })();
    }, []);
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
     <Marker
        coordinate={region}
        pinColor={"black"}
        title="Customer"
      />
     <Marker
        coordinate={{latitude: -6.297441633874579, longitude: 106.71282256060646}}
        title="Your Location"
      />
      <MapViewDirections
        origin={{...region}}
        destination={{latitude: -6.297441633874579, longitude: 106.71282256060646}}
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
      onPress={() => navigation.navigate("Home")}
    >
    <Text style={styles.btnText}>Selesai</Text>
    </TouchableOpacity>
      <TouchableOpacity
      style={styles.btnReversed}
        onPress={() => navigation.navigate("Home")}
      >
      <Text style={styles.btnTextReversed}>Chat with Customer</Text>
      </TouchableOpacity>
    </View>
  </View>
)};

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
    marginBottom: 5
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
    fontWeight: "600"
  },
  btnTextReversed: {
    color: "tomato",
    fontWeight: "600"
  }
});