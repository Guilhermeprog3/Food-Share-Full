import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";
import theme from "@/constants/theme";

type TabBarIconProps = {
  focused: boolean;
  color: string;
  iconName: keyof typeof Feather.glyphMap;
  label: string;
};

export function TabBarIcon({
  focused,
  color,
  iconName,
  label,
}: TabBarIconProps) {
  return (
    <View style={styles.container}>
      <Feather
        name={iconName}
        color={focused ? theme.colors.light.background : "gray"}
        style={styles.icon}
      />
      <Text
        style={[
          styles.label,
          { color: focused ? theme.colors.light.background : "gray" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default TabBarIcon;
