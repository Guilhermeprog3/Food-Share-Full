import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { styles } from "./style";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { AuthNavigatorRoutesProps } from "@/routes/public.routes";

import { useNavigation } from "@react-navigation/native";

import { useFormContext } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export function Login() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleCreateAccount() {
    navigation.navigate("register");
  }

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterDataProps>();

  const passwordRef = useRef<TextInput>(null);

  async function onSubmitEditing() {
    try {
      setLoading(true);
      const { email, password } = getValues();

      if (email && password) {
        await login(email, password);
      }
    } catch (error) {
      Alert.alert("Erro ao fazer login! Tente novamente mais tarde!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bem vindo de volta</Text>
        <Text style={styles.subTitle}>Por favor entre na sua conta aqui</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Input
          icon={"mail"}
          error={errors.email?.message}
          formProps={{
            name: "email",
            control,
            rules: {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            },
          }}
          inputProps={{
            placeholder: "Digite seu email",
            onSubmitEditing: () => passwordRef.current?.focus(),
          }}
        />

        <Input
          ref={passwordRef}
          icon={"lock"}
          error={errors.password?.message}
          formProps={{
            name: "password",
            control,
            rules: {
              required: "Senha é obrigatório",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 dígitos.",
              },
            },
          }}
          inputProps={{
            placeholder: "Digite sua senha",
            secureTextEntry: true,
            onSubmitEditing: onSubmitEditing,
          }}
        />

        <Button title="Entrar" onPress={handleSubmit(onSubmitEditing)} />

        <View>
          <Text style={styles.questionText}>Ainda não tem conta?</Text>
          <Text style={styles.createPassword} onPress={handleCreateAccount}>
            Criar minha conta
          </Text>
        </View>
      </View>
    </View>
  );
}
