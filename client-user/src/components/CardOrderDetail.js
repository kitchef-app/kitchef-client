import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { idr } from "../helpers/idrFormatter";

export default function CardOrderDetail({ product }) {
  let subtotal_product = product.Product.price * product.total;
  return (
    <View className="flex flex-row justify-start bg-white h-max mt-4 ml-2 mr-2 border border-slate-200 shadow-lg  shadow-neutral-100 py-2 rounded-lg">
      <Image
        className="w-[95] h-[100] my-auto ml-4 rounded-lg"
        source={{
          uri: product?.Product?.imageUrl,
        }}
      />
      <View className="px-12 py-2 justify-between">
        <Text className="text-lg font-semibold text-black">
          {product?.Product?.name}
        </Text>
        <Text className="text-base text-black">
          Harga:{" "}
          {idr(product?.Product?.price).substring(
            0,
            idr(product?.Product?.price).length - 3
          )}
        </Text>
        <Text className="text-base text-black">Jumlah : {product?.total}</Text>
        <Text className="text-base font-bold text-black">
          Subtotal :{" "}
          {idr(subtotal_product).substring(0, idr(subtotal_product).length - 3)}
        </Text>
      </View>
    </View>
  );
}
