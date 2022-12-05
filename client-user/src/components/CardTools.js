import { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardTools({ tools }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View className="flex-row h-[56] mx-4 border mb-2 border-orange-100 bg-orange-100 rounded-lg justify-around">
      <View className="w-56 flex-row items-center">
        <Icon name="ellipse" size={8} color="#f1a375" />
        <Text className="my-auto ml-2 text-medium text-[#5c5c5c]">
          {tools?.name}
        </Text>
      </View>
      <Pressable onPress={toggleModal} className="py-2 h-full rounded-md">
        <View className=" bg-[#FF7629] w-full my-auto px-6 h-full rounded-lg">
          <Text className="my-auto mx-auto font-medium text-md text-white">
            + Keranjang
          </Text>
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
          </View>
        </View>
      </Modal>
    </View>
  );
}
