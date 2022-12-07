import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
// import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";
// import {GOOGLE_MAPS_APIKEY} from '@env';
import { socket } from "../config/socket";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_USER } from "../queries/users";

export default function Tracking({navigation, route}) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI"
  const [region, setRegion] = useState({
    latitude: -6.2608,
    longitude: 106.7815
  });
  const [userLoc, setUserLoc] = useState({});
  const {InvoiceId, userId, driverId} = route.params;
  console.log(InvoiceId, userId, driverId, "dari route params");
  // const [userId, setUserId] = useState([])
  // const getData = async () => {
  //   const id = await AsyncStorage.getItem("id");
  //   return setUserId(id);
  // };
  const { data, error, loading } = useQuery(GET_USER, {
    variables: {
      id: +userId
    },
  });
  console.log(userId, "=========================");
  // console.log(data, "ini data user detail");
  
  // useEffect(() => {
    //   getData();
    // }, []);
    
  console.log(data, "ini data");

  useEffect(() => {
    if (data) {
      setUserLoc({
        latitude: +data?.getUserById?.location?.coordinates[0],
        longitude: +data?.getUserById?.location?.coordinates[1],
        // latitude: 37.78825,
        // longitude: -122.4324
      });
    }
    // console.log(data?.getUserById, "ini data user detail");
  }, [data]);

  // location.coordinates[0] === lat

  // fetch data user location
  // ganti region di marker jadi user location
  // ganti data destination di direction jd user location
  // const InvoiceId = 1;
  // console.log(userId, InvoiceId, "userId + invoiceId");
  // console.log(region, "ini regionnn");

  useEffect(() => {
    socket.emit("join-rooms", +InvoiceId);
    socket.on("send-location", (location) => {
      console.log(location, "location");
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    });

    // return () => {
    //   //on leave room
    // }
  }, []);

  useEffect(() => {
    return () => {
      socket.emit("leave-rooms", InvoiceId);
    };
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
          loadingEnabled={true}
        >
          {Object.keys(region).length !== 0 && (
            <MapViewDirections
              origin={{ ...region }}
              destination={{
                latitude: userLoc.latitude,
                longitude: userLoc.longitude,
              }}
              // onReady={result => {
              //       console.log(`Distance: ${result.distance} km`)
              //       console.log(`Duration: ${result.duration} min.`)
              // }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#0ea5e9"
            />
          )}
          {Object.keys(userLoc).length !== 0 && (
            <Marker
              coordinate={userLoc}
              pinColor={"#474744"}
              title="Customer"
            />
          )}
        
          {Object.keys(region).length !== 0 && (
            <Marker coordinate={region} title="Driver" pinColor={"tomato"} />
          )}
        </MapView>
      </View>
      {/*<View className="mb-20 w-80">
        <TouchableOpacity
          style={styles.btnReversed}
          onPress={async () => {
            navigation.navigate("ChatScreen", {
              // UserId: ,
              // DriverId: ,
            });
            return;
          }}
        >
          <Text style={styles.btnTextReversed}>Chat with Driver</Text>
        </TouchableOpacity>
      </View>
        */}
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
