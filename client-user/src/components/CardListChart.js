import { Image, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { idr } from "../helpers/idrFormatter";
import { InMemoryCache, useApolloClient, useReactiveVar } from "@apollo/client";
import { cartItemsVar, CustomInMemoryCache } from "../cache/cache";
import { GET_CART_ITEMS } from "../queries/cart";
import client from "../config/apollo";

export default function CardListChart({ item }) {
  const CartItems = useReactiveVar(cartItemsVar);

  const increaseQuantity = () => {
    const newArr = CartItems.map((el, i) => {
      // console.log(el);
      if (i + 1 === +item.id) {
        return {
          ...CartItems[i],
          quantity: el.quantity + 1,
        };
      } else {
        return el;
      }
    });
    cartItemsVar(newArr);
    console.log("masuk ke increased");
  };

  const deleteCartItem = () => {
    const filteredCart = CartItems.filter((inCart) => inCart.id !== item.id);
    cartItemsVar(filteredCart);
  };

  const decreaseQuantity = () => {
    const newArr = CartItems.map((el, i) => {
      if (i + 1 === +item.id) {
        return {
          ...CartItems[i],
          quantity: el.quantity - 1,
        };
      } else {
        return el;
      }
    });
    cartItemsVar(newArr);
    console.log("masuk ke decreased");
  };

  return (
    <View className="flex-row bg-white h-[120] mt-4 ml-2 mr-2 rounded-sm">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: item.imageUrl,
        }}
      />
      <View className="flex-col">
        <Text className="ml-3 mt-2 mr-3 text-xl font-semibold text-black">
          {item.name}
        </Text>
        <Text className="ml-3 mt-2 mr-3 text-xl text-black">
          {idr(item?.price).substring(0, idr(item?.price).length - 3)}
        </Text>
        <Pressable onPress={() => deleteCartItem()}>
          <View className="mt-[23] ml-3 mr-3">
            <Icon name="trash" size={18} />
          </View>
        </Pressable>
      </View>
      <View>
        <View className="flex-row mx-auto mt-[85] ml-[40]">
          <View className="bg-white border border-[#FF7629] rounded-lg justify-center">
            <Pressable onPress={() => decreaseQuantity()}>
              <View className="mx-1">
                <Icon name="remove" size={30} color="#FF7629" />
              </View>
            </Pressable>
          </View>
          <Text className="text-xl font-bold ml-2 mr-2 my-auto">
            {item.quantity}
          </Text>
          <View className="bg-white border border-[#FF7629] rounded-lg justify-center">
            <Pressable onPress={() => increaseQuantity()}>
              <View className="mx-1">
                <Icon name="add" size={30} color="#FF7629" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
