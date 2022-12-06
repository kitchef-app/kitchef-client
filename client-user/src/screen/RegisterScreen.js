import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import { useState } from "react";
import { COLORS } from "../constants/theme";
import { useMutation } from "@apollo/client";
import { POST_REGISTER } from "../queries/users";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding"

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function LoginScreen({ navigation }) {
  const [mapRegion, setmapRegion] = useState({
    latitude: -6.260826,
    longitude: 106.7815368
  });
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [registerUser, { loading, error, data }] = useMutation(POST_REGISTER);

  const locationSplit = location.split(", ");
  const latitude = locationSplit[1];
  const longitude = locationSplit[0];

  const handleSubmit = () => {
    console.log(location);
    Geocoder.init(process.env.REACT_APP_GMAPS_API_KEY, {
      language: "id",
    });
    Geocoder.from(location)
      .then((json) => {
        let address = json.results[0].geometry.location;
        setmapRegion({latitude: address.lat, longitude: address.lng});
        console.log(address);
      })
      .catch((error) => console.warn(error));
  }

  // <Text>-6.268507218164185, 106.7808981976766</Text>
  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={{ alignItems: "center", justifyContent: "center",}}>
    <Text style={styles.title}>Sign Up</Text>
    <Text>{JSON.stringify(process.env)}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name"
          placeholderTextColor="#78716c"
          onChangeText={(fullName) => setFullName(fullName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#78716c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#78716c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#78716c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

       <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone Number"
          placeholderTextColor="#78716c"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#78716c"
          onChangeText={(address) => setAddress(address)}
        />
      </View>
      <View>
      </View>
        <View style={styles.inputView}>
          <TextInput
            style={{...styles.TextInput}}
            placeholder="Location"
            placeholderTextColor="#78716c"
            // onChangeText={(location) => setLocation(location)}
            onSubmitEditing={handleSubmit}
            onChangeText={setLocation}
            value={location}
          />
        </View>
      <View style={{height: 300, width: 300, backgroundColor: "#fff"}}>
      <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          loadingEnabled={true}
          region={{
            ...mapRegion,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
        >
         <Marker
            coordinate={mapRegion}
            style={styles.marker}
          />
        </MapView>
      
      </View>
     

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() =>
          registerUser({
            variables: {
              userInput: {
                address,
                email,
                fullName,
                latitude,
                longitude,
                password,
                phoneNumber,
                username,
              },
            },
          })
        }
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
