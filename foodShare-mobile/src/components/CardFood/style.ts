import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.light.secondary,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: "48%",
    alignItems: "flex-start",
    marginHorizontal: "1%",
  },
  selectedCard: {
    borderColor: theme.colors.light.primary,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    textAlign: "justify",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    textAlign: "justify",
    marginBottom: 5,
  },
  expiration: {
    fontSize: 12,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    textAlign: "justify",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 12,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    textAlign: "justify",
    marginBottom: 5,
  },
  donorId: {
    fontSize: 12,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    textAlign: "justify",
  },
});
