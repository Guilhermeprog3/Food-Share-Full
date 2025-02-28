import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.light.secondary,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  expiration: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  donorId: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
  },
});
