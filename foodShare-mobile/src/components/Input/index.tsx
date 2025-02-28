import React, { forwardRef, useEffect, useState } from "react";
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text"; // Importe o TextInputMask e seus tipos
import { Feather } from "@expo/vector-icons";
import {
  Controller,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import clsx from "clsx";
import { styles } from "./styles";

// Defina as propriedades do componente
type Props = {
  icon: keyof typeof Feather.glyphMap;
  error?: string;
  formProps: UseControllerProps;
  inputProps: TextInputProps & Partial<TextInputMaskProps>; // Estenda as propriedades para incluir TextInputMaskProps
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps, error = "" }, ref) => {
    const { reset } = useFormContext();
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

    useEffect(() => {
      reset();
    }, []);

    return (
      <Controller
        render={({ field }) => (
          <View style={styles.container}>
            <View style={styles.group}>
              <View style={styles.icon}>
                <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    ["#DC1637"]: error.length > 0,
                    ["#1FCC79"]: error.length === 0 && field.value,
                    ["#999"]: !field.value && error.length === 0,
                  })}
                />
              </View>

              {/* Verifique se o tipo é 'custom' e se há uma máscara definida em options */}
              {inputProps.type === "custom" && inputProps.options?.mask ? (
                <TextInputMask
                  type={inputProps.type}
                  ref={ref as React.RefObject<TextInputMask>} // Ajuste o tipo da ref
                  value={field.value}
                  onChangeText={field.onChange}
                  style={styles.control}
                  {...inputProps} // Passe todas as propriedades
                />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextInput
                    ref={ref}
                    value={field.value}
                    onChangeText={field.onChange}
                    style={[styles.control, { flex: 1 }]} // Ocupa o espaço restante
                    {...inputProps}
                    secureTextEntry={
                      inputProps.secureTextEntry && !showPassword
                    } // Mostra/esconde a senha
                  />
                  {/* Ícone de olho para mostrar/esconder a senha */}
                  {inputProps.secureTextEntry && (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
                      style={{ padding: 8 }}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {error.length > 0 ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}
          </View>
        )}
        {...formProps}
      />
    );
  }
);

export { Input };
