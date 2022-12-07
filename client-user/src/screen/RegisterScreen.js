import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import { COLORS } from "../constants/theme";
import { useMutation } from "@apollo/client";
import { POST_REGISTER } from "../queries/users";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { calculateOngkir } from "../helpers/ongkirCalculator";

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function LoginScreen({ navigation }) {
  const GOOGLE_MAPS_APIKEY = "AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI";
  const [mapRegion, setmapRegion] = useState({
    latitude: -6.260826,
    longitude: 106.7815368,
  });
  const hacktivReg = {
    latitude: -6.260826,
    longitude: 106.7815368,
  };
  const [distance, setDistance] = useState(0);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [registerUser, { loading, error, data }] = useMutation(POST_REGISTER);

  // const locationSplit = location.split(", ");
  // const latitude = locationSplit[1];
  // const longitude = locationSplit[0];
  // const latitude = address.lat
  // const longitude = address.lng
  // console.log(latitude, longitude, "latlongg");

  const GMAPS_API_KEY = "AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI";

  const handleSubmit = () => {
    console.log(location);
    Geocoder.init(GMAPS_API_KEY, {
      language: "id",
    });
    Geocoder.from(location)
      .then((json) => {
        let address = json.results[0].geometry.location;
        setmapRegion({ latitude: address.lat, longitude: address.lng });
        console.log(address);
        setLatitude(address.lat);
        setLongitude(address.lng);
        console.log(latitude, longitude, "latlongg");
      })
      .catch((error) => console.warn(error));
  };

  // <Text>-6.268507218164185, 106.7808981976766</Text>
  return (
    <View className="bg-white h-full">
      <View className="flex-col my-auto">
        <ScrollView>
          <Text className="text-3xl mx-auto font-extrabold">Sign Up</Text>
          <Text className="mx-auto font-extralight mt-[4] mb-6">
            Please login to continue using our app
          </Text>
          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Full Name"
              onChangeText={(fullName) => setFullName(fullName)}
            />
          </View>
          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Username"
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Phone Number"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          </View>

          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              placeholder="Address"
              onChangeText={(address) => setAddress(address)}
            />
          </View>

          <View className="bg-white h-[45] rounded-3xl text-left mx-6 mb-2 mt-3 border border-gray-400">
            <TextInput
              className="my-auto pl-4 text-base"
              // style={{ ...styles.TextInput }}
              placeholder="Location"
              // onChangeText={(location) => setLocation(location)}
              onSubmitEditing={handleSubmit}
              onChangeText={setLocation}
              value={location}
            />
          </View>
          <View className="w-[300] h-[150] mx-auto mt-3">
            <MapView
              style={styles.map}
              showsUserLocation={true}
              followUserLocation={true}
              loadingEnabled={true}
              region={{
                ...mapRegion,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <MapViewDirections
                origin={mapRegion}
                destination={hacktivReg}
                onReady={async (result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  // setDistance(result.distance)
                  await AsyncStorage.setItem(
                    "distance",
                    result.distance.toString()
                  );
                  await AsyncStorage.setItem(
                    "ongkir",
                    calculateOngkir(result.distance).toString()
                  );
                  // console.log(result.distance.toString(), calculateOngkir(result.distance).toString());
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#0ea5e9"
              />
              <Marker coordinate={mapRegion} style={styles.marker} />
            </MapView>
          </View>

          {/* <Pressable onPress={() => navigation.navigate("Register")}>
          <View className="h-auto mx-6 p-3 mt-2 bg-[#F05A2A] rounded-3xl">
            <Text className="text-white font-medium text-base mx-auto ">
              Login
            </Text>
          </View>
        </Pressable> */}

          <Pressable
            onPress={() => {
              registerUser({
                variables: {
                  userInput: {
                    address,
                    email,
                    fullName,
                    latitude: latitude.toString(),
                    longitude: longitude.toString(),
                    password,
                    phoneNumber,
                    username,
                  },
                },
              });
            }}
          >
            <View className="h-auto mx-6 p-3 mt-2 bg-[#F05A2A] rounded-3xl">
              <Text className="text-white font-medium text-base mx-auto ">
                Register
              </Text>
            </View>
            <View className="flex-row mx-auto mt-2">
              <Text className="">Have a account? </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text className="text-[#F05A2A] font-semibold">
                  Sign in here
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "500",
    color: "#78716c",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    borderColor: "#e2e8f0",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 10,
  },
  marker: {
    ...StyleSheet.absoluteFillObject,
  },
});
