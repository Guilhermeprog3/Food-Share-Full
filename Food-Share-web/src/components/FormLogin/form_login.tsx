"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bg from "@/assets/images/Background.png";
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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  Email: z
    .string()
    .min(2, { message: "O e-mail deve ter pelo menos 2 caracteres." })
    .email({ message: "Digite um e-mail válido." }),
  Password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

async function onSubmit(values: z.infer<typeof formSchema>) {
  const email = values.Email;
  const password = values.Password;

  await signIn("credentials", {
    email,
    password,
    callbackUrl: "/dashboard",
  });
}

function HandleRegister() {
  redirect("/register");
}

export function Form_Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <img className="fixed h-[1390px] pr-96 pt-[590px]" src={bg.src} alt="" />
      <div className="ml-80">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 space-y-6 p-20 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground"
          style={{ position: "absolute", zIndex: 10 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">LOGIN</h2>
          </div>
          <FormField
            control={form.control}
            name="Email"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Password"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200"
            type="submit"
          >
            Entrar
          </Button>

          <div className="flex justify-center items-center mt-4">
            <p className="mr-2">Não tem conta? Cadastre-se </p>
            <button
              type="button"
              onClick={HandleRegister}
              className="text-blue-500 hover:underline"
            >
              aqui
            </button>
          </div>
        </form>
      </div>
    </Form>
  );
}