import theme from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 60,
  },
  inputsContainer: {
    width: "100%",
    gap: 20,
  },
  backgroundImage: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: theme.colors.dark.background,
    fontFamily: theme.fonts.Inter_700Bold,
    fontSize: 26,
  },
  subTitle: {
    textAlign: "center",
    color: theme.colors.dark.primary,
    fontFamily: theme.fonts.Inter_500Medium,
    fontSize: 18,
  },
  forgotPassword: {
    textAlign: "left",
    color: theme.colors.dark.background,
    fontFamily: theme.fonts.Inter_400Regular,
    fontSize: 18,
  },
  questionText: {
    textAlign: "center",
    color: theme.colors.dark.background,
    fontFamily: theme.fonts.Inter_400Regular,
    fontSize: 18,
  },
  createPassword: {
    textAlign: "center",
    color: theme.colors.dark.primary,
    fontFamily: theme.fonts.Inter_700Bold,
    fontSize: 18,
  },
});
