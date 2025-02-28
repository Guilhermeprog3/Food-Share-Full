import React, {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title?: string;
  icon?: keyof typeof Feather.glyphMap;
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({
  title,
  icon,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], !title && styles.iconOnly]}
      {...rest}
    >
      {icon && <Feather name={icon} color={"#fff"} size={20} />}
      {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
}
