import { useState, useCallback } from "react";
import { Text, View, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { styles } from "./style";
import { Input } from "@/components/Input";
import { CardFood } from "@/components/CardFood";
import { CardItem } from "@/@types/cardItem";
import { AppNavigatorRoutesProps } from "@/routes/protected.routes";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [foodsData, setFoodsData] = useState<CardItem[]>([]);
  const [filteredData, setFilteredData] = useState<CardItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const fetchFoodsData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://food-share-api.onrender.com/api/alimentos/disponiveis"
      );
      setFoodsData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching foods data:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFoodsData();
    }, [fetchFoodsData])
  );

  function handleSearch(text: string) {
    setSearch(text);
    const filtered = foodsData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  }

  function handleCardPress(item: CardItem) {
    navigation.navigate("reservaScreen", { selectedFood: item });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOOD SHARE</Text>

      <View style={styles.searchInput}>
        <Input
          icon={"search"}
          formProps={{
            name: "search",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: "Buscar",
            onChangeText: handleSearch,
            value: search,
          }}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CardFood
            item={item}
            onPress={() => handleCardPress(item)}
            selected={false}
          />
        )}
      />
    </View>
  );
}
