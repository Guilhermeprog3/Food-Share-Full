import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { CardItem } from "@/@types/cardItem";

type CardReservationProps = {
  item: CardItem;
};

export function CardReservation({ item }: CardReservationProps) {
  const expirationDate = new Date(item.expiration_time).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.expiration}>Expira em: {expirationDate}</Text>
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
      <Text style={styles.donorId}>Doador ID: {item.donor_id}</Text>
    </View>
  );
}
