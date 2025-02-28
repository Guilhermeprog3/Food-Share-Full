import theme from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.background,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  backgroundImage: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: theme.fonts.Inter_700Bold,
    fontSize: 22,
  },
  subTitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: theme.fonts.Inter_500Medium,
    fontSize: 18,
  },
});
