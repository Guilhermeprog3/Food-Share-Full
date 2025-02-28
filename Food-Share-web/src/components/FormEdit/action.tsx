"use server"

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

type Alimento = {
  id: string;
  name: string;
  expiration_time: Date;
  quantity: number;
  description: string; 
};

const Update_Alimento = async (id: string, data: Alimento) => {
  const jwt = (await cookies()).get("JWT");
  try {
    const response = await api.put(`api/alimentos/${id}`, data, {
      headers: { authorization: `Bearer ${jwt!.value}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar alimento:", error);
    return null;
  }
};

export default Update_Alimento;
