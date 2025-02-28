import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  base: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  primary: {
    backgroundColor: theme.colors.dark.background,
  },
  secondary: {
    backgroundColor: theme.colors.light.secondary,
  },
  tertiary: {
    backgroundColor: theme.colors.light.accent,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontFamily: theme.fonts.Inter_600SemiBold,
  },
  iconOnly: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
});
