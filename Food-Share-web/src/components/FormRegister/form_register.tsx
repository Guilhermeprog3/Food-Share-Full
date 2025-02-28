"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bg from "@/assets/images/background2.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { handleSubmit } from "./action";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  cnpj: z.string().min(14, { message: "O CNPJ deve ter pelo menos 14 caracteres." }),
  responsible: z.string().min(2, { message: "O nome do responsável deve ter pelo menos 2 caracteres." }),
  email: z.string()
    .min(2, { message: "O e-mail deve ter pelo menos 2 caracteres." })
    .email({ message: "Digite um e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres." }),
});

function HandleLogin() {
  redirect("/");
}

export function Form_Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      responsible: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("cnpj", values.cnpj);
    formData.append("responsible", values.responsible);
    formData.append("email", values.email);
    formData.append("password", values.password);

    await handleSubmit(formData);
  }

  return (
    <Form {...form}>
      <img className="fixed h-auto fixed h-auto z-0" src={bg.src} alt="" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-20 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground mt-5"
        style={{ zIndex: 10 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">CADASTRO</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Digite seu nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Digite seu CNPJ"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Digite o nome do responsável"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Digite seu e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200"
          type="submit"
        >
          Cadastrar
        </Button>

        <div className="flex justify-center items-center mt-4">
          <p className="mr-2">Já tem conta? Entre </p>
          <button
            onClick={HandleLogin}
            className="text-blue-500 hover:underline"
            type="button"
          >
            aqui
          </button>
        </div>
      </form>
    </Form>
  );
}
