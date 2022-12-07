import { StyleSheet, Text, View, Button } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import React, { useState, useEffect } from "react";

export default function Login({ navigation }) {
  const [cont, setCont] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <>
      <View className="flex-1">
        <View className="self-center mt-72">
          <View className="h-10 w-80 mx-auto">
            <Text className="text-4xl font-extrabold">Login</Text>
          </View>
          <View className="h-10 w-80 mx-auto mt-6">
            <FloatingLabelInput label="Email" value="" keyboardType="text" />
          </View>
          <View className="h-10 w-80 mt-8 mx-auto">
            <FloatingLabelInput
              label={"Password"}
              isPassword
              togglePassword={show}
              value=""
              onChangeText={(value) => setCont(value)}
              customShowPasswordComponent={<Text>Show</Text>}
              customHidePasswordComponent={<Text>Hide</Text>}
            />
          </View>
          <View className="h-10 w-80 mx-auto mt-12">
            <Button
              title="Masuk"
              onPress={() => navigation.navigate("Home")}
            ></Button>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
  },
});
