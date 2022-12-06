import { Image, Text, View, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { idr } from "../helpers/idrFormatter";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
// import { cartItemsVar } from "../screen/DetailRecipe";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../cache/cache";

export default function CardListAllItem({ navigation, products }) {
  const CartItems = useReactiveVar(cartItemsVar);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setIsQuantity] = useState(1);
  // console.log(CartItems, "<< dari Card list All tems");
  let isInCart = CartItems.some((item) => item.id === products.id); // check if an item in the cart matches our item
  // useEffect(() => {
  //   if (!isModalVisible) {
  //     setIsQuantity(1);
  //   }
  // },[]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const increaseQuantity = () => {
    setIsQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setIsQuantity(quantity - 1);
    if (quantity === 1) {
      return setIsQuantity(1);
    }
  };
  const submitProduct = (id, name, imageUrl, quantity, price) => {
    const payload = {
      id,
      name,
      imageUrl,
      quantity,
      price,
    };
    cartItemsVar(
      isInCart
        ? CartItems.filter((item) => item.quantity !== payload.quantity)
        : [...cartItemsVar(), payload]
    );
    console.log("item ketambah");
  };

  return (
    <View className="flex flex-row justify-between bg-white h-max mb-2 px-4 py-4 ml-5 mr-4 mt-2 rounded-lg border-2 border-gray-200 shadow-xl">
      <Image
        className="w-[80] h-[80] my-auto rounded-lg"
        source={{
          uri: products?.imageUrl,
        }}
      />
      <View className="flex-1 justify-start my-auto px-4">
        <Text className="text-lg text-[#333]">{products?.name}</Text>

        <Text className="text-base font-semibold ">
          {idr(products?.price).substring(0, idr(products?.price).length - 3)}
        </Text>
      </View>
      <View className="flex my-auto justify-between">
        <Pressable onPress={toggleModal} className="rounded-md">
          <View className=" bg-[#FF7629] w-full my-auto h-max py-2 px-4 rounded-lg">
            <Text className="my-auto mx-auto font-medium text-md text-white">
              + Keranjang
            </Text>
          </View>
        </Pressable>
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
                <Pressable onPress={() => decreaseQuantity()}>
                  <View className="mx-1">
                    <Icon name="remove" size={30} color="#FF7629" />
                  </View>
                </Pressable>
              </View>
              <Text className="text-xl font-bold mx-6 my-auto">{quantity}</Text>
              <View className="bg-white border border-[#FF7629] rounded-lg justify-center">
                <Pressable onPress={() => increaseQuantity()}>
                  <View className="mx-1">
                    <Icon name="add" size={30} color="#FF7629" />
                  </View>
                </Pressable>
              </View>
            </View>
            <Pressable onPress={toggleModal} className="w-full">
              <Pressable
                onPress={() =>
                  submitProduct(
                    products?.id,
                    products?.name,
                    products?.imageUrl,
                    quantity,
                    products?.price
                  )
                }
              >
                <View className="bg-[#FF7629] py-3 rounded-full w-full mt-8">
                  <Text className="text-xl font-bold mx-auto my-auto text-white">
                    Tambah
                  </Text>
                </View>
              </Pressable>
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
