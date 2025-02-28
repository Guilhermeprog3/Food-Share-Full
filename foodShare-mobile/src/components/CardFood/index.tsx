import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { CardItem } from "@/@types/cardItem";

interface CardFoodProps {
  item: CardItem;
  onPress: () => void;
  selected: boolean;
}

export function CardFood({ item, onPress, selected }: CardFoodProps) {
  const expirationDate = new Date(item.expiration_time).toLocaleDateString();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.expiration}>Expira em: {expirationDate}</Text>
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
    </TouchableOpacity>
  );
}
