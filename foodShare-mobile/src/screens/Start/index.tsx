import { Text, View, Image } from "react-native";
import { styles } from "./styles";

import pratos from "@/assets/pratos.png";

import { Button } from "@/components/Button";

import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@/routes/public.routes";

export function Start() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleStart() {
    navigation.navigate("login");
  }
  return (
    <View style={styles.container}>
      <Image source={pratos} />

      <View>
        <Text style={styles.title}>Food Share</Text>
        <Text style={styles.subTitle}>
          Junte-se a maior{"\n"}comunidade de doadores de alimentos
        </Text>
      </View>

      <Button title="Começar" onPress={handleStart} />
    </View>
  );
}
