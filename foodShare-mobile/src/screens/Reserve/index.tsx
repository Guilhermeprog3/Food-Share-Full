import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "@/components/Button";
import { styles } from "./style";
import { CardReservation } from "@/components/CardReservation";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { api } from "@/services/api";
import { useRoute } from "@react-navigation/native";
import { Input } from "@/components/Input";
import { Feather } from "@expo/vector-icons";

const ReservaScreen = () => {
  const route = useRoute();
  const { selectedFood } = route.params;
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateError, setDateError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const handleReserve = async () => {
    if (!selectedFood) {
      Alert.alert("Erro", "Selecione um alimento.");
      return;
    }

    if (!title) {
      Alert.alert("Erro", "O título é obrigatório.");
      return;
    }

    if (!pickupDate) {
      setDateError("Por favor, informe a data de retirada.");
      return;
    }

    const isValidDate = Date.parse(pickupDate.toString());
    if (isNaN(isValidDate)) {
      setDateError("Formato de data inválido. Use o formato YYYY-MM-DD.");
      return;
    }

    if (pickupDate > new Date(selectedFood.expiration_time)) {
      setDateError("A data de retirada deve ser antes da data de expiração.");
      return;
    }

    if (parseInt(quantity) > selectedFood.quantity) {
      setQuantityError("Não pode reservar acima da quantidade máxima.");
      return;
    }

    try {
      const { token } = await storageAuthTokenGet();
      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
        return;
      }

      const response = await api.post(
        "/reservas",
        {
          title,
          food_id: selectedFood.id,
          pickup_date: pickupDate.toISOString(),
          food_quantity: parseInt(quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Sucesso", "Reserva realizada com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível realizar a reserva."
      );
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPickupDate(date);
    hideDatePicker();
    setDateError("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve seu alimento:</Text>

      <CardReservation item={selectedFood} />

      <View style={styles.form}>
        <Text style={styles.dataPicker}>
          Escreva um título para sua retirada:{" "}
        </Text>
        <Input
          icon="edit"
          formProps={{ name: "title" }}
          inputProps={{
            placeholder: "Título da Reserva",
            onChangeText: (text) => setTitle(text),
            value: title,
          }}
        />

        <Text style={styles.dataPicker}>Selecione a data de retirada: </Text>
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <View style={styles.icon}>
            <Feather name="calendar" size={24} color="#999" />
          </View>
          <Text style={{ fontSize: 16 }}>
            {pickupDate.toLocaleDateString() || "Selecionar Data de Retirada"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
          maximumDate={new Date(selectedFood.expiration_time)}
        />

        <Text style={styles.dataPicker}>
          Selecione a quantidade a ser retirada:{" "}
        </Text>
        <Input
          icon="shopping-cart"
          formProps={{ name: "quantity" }}
          inputProps={{
            placeholder: "Quantidade",
            onChangeText: (text) => {
              setQuantity(text);
              setQuantityError("");
            },
            value: quantity,
            keyboardType: "numeric",
          }}
        />

        {quantityError ? (
          <Text style={styles.errorText}>{quantityError}</Text>
        ) : null}
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

        <Button title="Confirmar Reserva" onPress={handleReserve} />
      </View>
    </View>
  );
};

export default ReservaScreen;
