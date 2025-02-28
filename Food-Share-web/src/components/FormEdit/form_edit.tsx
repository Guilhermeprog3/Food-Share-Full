"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import Update_Alimento from "./action";

const formSchema = z.object({
  name: z.string().min(1, { message: "O campo não pode estar vazio." }),
  quantity: z.coerce.number().min(1, { message: "O campo não pode estar vazio." }),
  expiration_time: z.coerce.date(),
  description: z.string().optional(), 
});

type Alimento = {
  id: string;
  name: string;
  expiration_time: Date;
  quantity: number;
  description?: string;
};

export function Form_EditAliments({ alimento }: { alimento: Alimento }) {

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData: Alimento = {
      id: alimento.id,
      name: values.name,
      quantity: values.quantity,
      expiration_time: values.expiration_time,
      description: values.description,
    };

    await Update_Alimento(alimento.id, formData);
    redirect("/listfood");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: alimento.name,
      quantity: alimento.quantity,
      expiration_time: new Date(alimento.expiration_time),
      description: alimento.description,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-20 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Editar Alimento</h2>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="w-full p-2 border border-gray-300 rounded-lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" className="w-full p-2 border border-gray-300 rounded-lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiration_time"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Validade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Escolha a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea className="w-full p-2 border border-gray-300 rounded-lg h-24" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
