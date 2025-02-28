import theme from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.background,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    textAlign: "center",
    color: theme.colors.dark.background,
    fontFamily: theme.fonts.Inter_700Bold,
    fontSize: 26,
    marginBottom: 20,
    marginTop: 30,
  },
  searchInput: {
    marginBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: theme.colors.light.secondary,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    width: "48%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
  },
});
