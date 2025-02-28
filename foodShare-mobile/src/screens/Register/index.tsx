import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { styles } from "./style";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { AuthNavigatorRoutesProps } from "@/routes/public.routes";

import { useNavigation } from "@react-navigation/native";

import { useFormContext } from "react-hook-form";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

export function Register() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterDataProps>();

  const emailRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);

  function handleCreateAccount() {
    navigation.navigate("register");
  }

  async function onSubmitEditing() {
    try {
      setLoading(true);
      const { nome, email, password, cpf } = getValues();

      await api.post("vulneraveis", {
        name: nome,
        email,
        password,
        cpf,
      });
      Alert.alert("Conta criada com sucesso!");
      if (email && password) {
        await login(email, password);
      }
    } catch (error) {
      Alert.alert(
        "Erro ao fazer login! Tente novamente mais tarde",
        error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "As senhas devem ser iguais.";
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Seja bem vindo!</Text>
        <Text style={styles.subTitle}>Por favor crie sua conta aqui</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Input
          icon={"user"}
          error={errors.nome?.message}
          formProps={{
            name: "nome",
            control,
            rules: {
              required: "Nome é obrigatório",
            },
          }}
          inputProps={{
            placeholder: "Nome",
            onSubmitEditing: () => cpfRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={cpfRef}
          icon={"user"}
          error={errors.cpf?.message}
          formProps={{
            name: "cpf",
            control,
            rules: {
              required: "CPF é obrigatório",
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                message: "CPF inválido",
              },
            },
          }}
          inputProps={{
            type: "custom",
            options: { mask: "999.999.999-99" },
            placeholder: "Digite seu CPF",
            keyboardType: "numeric",
            autoComplete: "off",
            autoCorrect: false,
            maxLength: 14,
            onSubmitEditing: () => emailRef.current?.focus(),
            returnKeyType: "next",
          }}
        />

        <Input
          ref={emailRef}
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
            returnKeyType: "next",
          }}
        />

        <Input
          ref={passwordRef}
          icon={"key"}
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
            onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
            returnKeyType: "next",
            secureTextEntry: true,
          }}
        />

        <Input
          ref={passwordConfirmationRef}
          icon={"key"}
          error={errors.passwordConfirmation?.message}
          formProps={{
            name: "passwordConfirmation",
            control,
            rules: {
              required: "Confirme a senha.",
              validate: validationPasswordConfirmation,
            },
          }}
          inputProps={{
            placeholder: "Digite novamente sua senha",
            onSubmitEditing: onSubmitEditing,
            secureTextEntry: true,
          }}
        />

        <Button title="Criar contar" onPress={handleSubmit(onSubmitEditing)} />
      </View>
    </View>
  );
}
