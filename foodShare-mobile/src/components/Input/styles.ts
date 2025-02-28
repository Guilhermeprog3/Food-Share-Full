import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  control: {
    flex: 1,
    height: 56,
    width: "100%",
    paddingLeft: 16,
    fontSize: 16,
  },
  group: {
    width: "100%",
    height: 56,
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
  error: {
    fontSize: 14,
    marginTop: 7,
    color: "#DC1637",
  },
});
