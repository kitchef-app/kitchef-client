import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardNotification({ notification, navigation }) {
  return (
    <View className="flex-row bg-white h-auto mt-4 ml-2 mr-2 rounded-sm">
      <View className="flex-col mb-2">
        <View className="flex-row">
          <View className="mt-[11] ml-3">
            <Icon name="information-circle-outline" size={18} color="orange" />
          </View>
          <Text className="ml-3 mt-2 mr-3 text-lg font-semibold text-black">
            Pesanan kamu dalam perjalanan
          </Text>
        </View>

        <Text className="ml-3 mt-2 mr-3 text-lg text-black">
          {notification.messageNotification}
        </Text>
      </View>
    </View>
  );
}
