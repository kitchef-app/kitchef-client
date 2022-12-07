import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardNotification({ notification, navigation }) {
  let message = "";
  let title = "";

  if (notification?.messageNotification.includes("on going")) {
    title = "Pesanan kamu dalam perjalan";
    message =
      "Terima kasih telah berbelanja di Kitchef. Saat ini pesanan kamu sedang dalam perjalanan. Lihat detail transaksi kamu dan lacak pesananmu saat ini.";
  } else if (
    notification?.messageNotification.includes("waiting for payment")
  ) {
    title = "Segera lakukan pembayaran";
    message =
      "Pesanan kamu telah masuk ke sistem kami. Segera lakukan pembayaran agar kami dapat langsung memproses pesanan kamu!";
  }
  return (
    <View className="flex-row bg-white h-auto mt-4 ml-2 mr-2 rounded-sm">
      <View className="flex-col mb-2">
        <View className="flex-row">
          <View className="mt-[11] ml-3">
            <Icon name="information-circle-outline" size={18} color="orange" />
          </View>
          <Text className="ml-3 mt-2 mr-3 text-lg font-semibold text-black">
            {title}
          </Text>
        </View>

        <Text className="ml-3 mt-2 mr-3 text-lg text-black">{message}</Text>
      </View>
    </View>
  );
}
