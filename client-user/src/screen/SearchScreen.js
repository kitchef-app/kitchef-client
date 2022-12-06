import { useRef, useState, useEffect } from "react";
import { GET_ALL_DISHES, GET_CATEGORY } from "../queries/recipe";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useQuery } from "@apollo/client";
import CardSearch from "../components/CardSearch";
import Loading from "../components/Loading";

export default function SearchScreen({ navigation }) {
  const [isSearching, setIsSearching] = useState(true);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const { loading, error, data: dish } = useQuery(GET_ALL_DISHES);

  useEffect(() => {
    if (isSearching) {
      inputRef?.current.focus();
    }
  }, [isSearching]);

  if (loading) {
    return <Loading />;
  }

  const submitSearch = () => {
    setIsSearching(false);
  };

  const renderItem = ({ item }) => {
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return (
        <View className="mb-2">
          <CardSearch item={item} navigation={navigation} />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View className="flex-1">
      <View className="bg-[#FF7629] h-[110]">
        <Text className="font-bold text-xl ml-4 mt-2 text-white">
          Mau masak apa hari ini?
        </Text>
        <View className="w-full">
          <Pressable onPress={() => setIsSearching(true)}>
            <View className="bg-white h-[40] rounded-lg text-left mx-4 mb-2 pl-3 mt-3">
              <View className="my-auto">
                <TextInput
                  autoFocus={true}
                  ref={inputRef}
                  className="font-regular text-gray-500"
                  onChangeText={(search) => setSearch(search)}
                  onSubmitEditing={() => submitSearch()}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={dish?.getDishes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
