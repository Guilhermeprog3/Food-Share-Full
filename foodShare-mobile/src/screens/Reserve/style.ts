import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.light.background,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    marginBottom: 20,
  },
  foodInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: theme.colors.light.secondary,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 20,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    marginBottom: 10,
  },
  foodDescription: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  foodExpiration: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  foodQuantity: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
    marginBottom: 10,
  },
  foodDonorId: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondary,
  },
  form: {
    marginTop: 20,
    gap: 20,
  },
  selectedDate: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.primary,
    marginBottom: 10,
  },
  errorText: {
    color: theme.colors.dark.destructive,
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 56,
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  dataPicker: {
    fontFamily: theme.fonts.Inter_400Regular,
    fontSize: 16,
    color: theme.colors.dark.background,
  },
});
