import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface ReservationItemProps {
  item: {
    title: string;
    food: {
      name: string;
    };
    food_quantity: number;
    pickup_date: string;
    status: string;
  };
}

export function ReservationItem({ item }: ReservationItemProps) {
  return (
    <View style={styles.reservationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.foodName}>{item.food.name}</Text>
      <Text style={styles.quantity}>Quantidade: {item.food_quantity}</Text>
      <Text style={styles.pickupDate}>
        Data de Retirada: {new Date(item.pickup_date).toLocaleDateString()}
      </Text>
      <Text style={styles.status}>Status: {item.status}</Text>
    </View>
  );
}

export default ReservationItem;
