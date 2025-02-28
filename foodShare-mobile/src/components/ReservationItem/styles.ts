import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  reservationItem: {
    backgroundColor: theme.colors.light.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 5,
  },
  pickupDate: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
  },
});
