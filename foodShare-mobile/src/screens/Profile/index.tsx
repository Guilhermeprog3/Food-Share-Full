import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { AppNavigatorRoutesProps } from "@/routes/protected.routes";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";

export function Profile() {
  const { logout, user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleLogout = async () => {
    Alert.alert("Confirmação", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userName}>{user.email}</Text>
          <Text style={styles.userName}>{user.cpf}</Text>
        </View>
      </View>

      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
