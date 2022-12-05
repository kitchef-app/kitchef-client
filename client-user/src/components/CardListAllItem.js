import { Image, Text, View, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { idr } from "../helpers/idrFormatter";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardListAllItem({ navigation, products }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View className="flex-row bg-white border border-slate-100 h-[120] mb-2 mx-4 rounded-lg">
      <Image
        className="w-[80] h-[80] my-auto ml-5 rounded-lg"
        source={{
          uri: products?.imageUrl,
        }}
      />
      <View className="flex flex-col justify-between py-4">
        <Text className="px-4 text-lg font-base text-[#333]">
          {products?.name}
        </Text>
        <View className="mx-4 w-[260] flex-row justify-between items-end">
          <Text className="ml-1 text-xl text-slate-800 font-semibold ">
            {idr(products?.price).substring(0, idr(products?.price).length - 3)}
          </Text>
          <Pressable onPress={toggleModal} className="rounded-md">
            <View className=" bg-[#FF7629] w-full my-auto h-10 px-4 rounded-lg">
              <Text className="my-auto mx-auto font-medium text-md text-white">
                + Keranjang
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={900}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon}></View>
            <View className="mx-2 mt-2">
              <Image
                className="w-[300] h-[180] mt-4 rounded-lg"
                source={{
                  uri: products?.imageUrl,
                }}
              />
            </View>
            <Text className="text-xl font-bold mt-6 text-[#333]">
              {products?.name}
            </Text>
            <View className="flex-row mx-auto mt-6">
              <View className="bg-white border border-[#FF7629] rounded-lg justify-center">
                <View className="mx-1">
                  <Icon name="remove" size={30} color="#FF7629" />
                </View>
              </View>
              <Text className="text-xl font-bold ml-2 mr-2 my-auto"> 69 </Text>
              <View className="bg-white border border-[#FF7629] rounded-lg justify-center">
                <View className="mx-1">
                  <Icon name="add" size={30} color="#FF7629" />
                </View>
              </View>
            </View>
            <Pressable onPress={toggleModal} className="w-full">
              <View className="bg-[#FF7629] py-3 rounded-full w-full mt-8">
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

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});
