import { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function CardDetailRecipe() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View className="flex-row bg-[#FF7629] h-[40] ml-4 mr-4 mt-4">
      <View>
        <Text className="my-auto ml-2 text-sm text-white">
          {`\u2022`}Apapun
        </Text>
      </View>
      <Pressable onPress={toggleModal}>
        <View className=" bg-slate-800 w-24 ml-[188] my-auto h-[25]">
          <View className="my-auto">
            <Text className="my-auto mx-auto text-sm text-white">
              + Keranjang
            </Text>
          </View>
        </View>
      </Pressable>
      <Modal isVisible={isModalVisible}>
        <View className="flex">
          <View className="bg-white h-[280] w-full rounded-lg">
            <View className="mx-auto">
              <Image
                className="w-[320] h-[150] mt-4 rounded-lg"
                source={{
                  uri: "https://laku.in/wp-content/uploads/2021/08/bg-3-300x295.jpg",
                }}
              />
            </View>
            <View className="flex-row mx-auto mt-4">
              <View className="bg-gray-300 h-[30] w-[30] rounded-lg">
                <Text className="text-2xl font-extrabold my-auto mx-auto">
                  -
                </Text>
              </View>
              <Text className="text-xl font-bold ml-2 mr-2 my-auto"> 69 </Text>
              <View className="bg-gray-300 h-[30] w-[30] rounded-lg">
                <Text className="text-2xl font-extrabold my-auto mx-auto">
                  +
                </Text>
              </View>
            </View>
            <Pressable onPress={toggleModal}>
              <View className="bg-[#FF7629] h-[35] ml-4 mr-4 mt-4">
                <Text className="text-xl font-bold mx-auto my-auto text-white">
                  Tambah
                </Text>
              </View>
            </Pressable>

            {/* <Button title="Hide modal" /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}
