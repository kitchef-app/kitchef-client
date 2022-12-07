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
      if (+el.id === +item.id) {
        return {
          ...CartItems[i],
          quantity: el.quantity + 1,
        };
      } else {
        return el;
      }
    });
    cartItemsVar(newArr);
  };

  const deleteCartItem = () => {
    const filteredCart = CartItems.filter((inCart) => inCart.id !== item.id);
    cartItemsVar(filteredCart);
  };

  const decreaseQuantity = () => {
    const newArr = CartItems.map((el, i) => {
      if (+el.id === +item.id) {
        if (el.quantity === 1) {
          return {
            ...CartItems[i],
            quantity: 1,
          };
        } else {
          return {
            ...CartItems[i],
            quantity: el.quantity - 1,
          };
        }
      } else {
        return el;
      }
    });
    cartItemsVar(newArr);
  };

  return (
    <View className="flex flex-row justify-between bg-white h-max px-4 py-4 mr-4 ml-4 mt-4 rounded-lg border border-slate-200 shadow-lg  shadow-neutral-100">
      <Image
        className="w-[95] h-[100] my-auto px-6 rounded-lg"
        source={{
          uri: item.imageUrl,
        }}
      />
      <View className="flex-1 flex-col justify-between px-5">
        <Text className="text-lg text-black">{item.name}</Text>
        <Text className="text-lg text-black font-semibold mb-[6]">
          {idr(item?.price).substring(0, idr(item?.price).length - 3)}
        </Text>
        <Pressable onPress={() => deleteCartItem()}>
          <View className="">
            <Icon name="trash" size={20} />
          </View>
        </Pressable>
      </View>

      <View className="flex-row px-1 my-auto">
        <View className=" bg-[#FF7629] h-6 w-6 rounded-lg justify-center">
          <Pressable onPress={() => decreaseQuantity()}>
            <View className="mx-auto">
              <Icon name="remove" size={20} color="white" />
            </View>
          </Pressable>
        </View>
        <Text className="text-xl font-bold px-3 my-auto">{item.quantity}</Text>
        <View className=" bg-[#FF7629] h-6 w-6 rounded-lg justify-center">
          <Pressable onPress={() => increaseQuantity()}>
            <View className="mx-auto">
              <Icon name="add" size={20} color="white" />
            </View>
          </Pressable>
        </View>
      </View>
      <View></View>
    </View>
  );
}
