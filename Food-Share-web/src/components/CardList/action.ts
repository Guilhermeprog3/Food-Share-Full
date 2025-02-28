"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

const fetchAliments = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/alimentos`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  return response.data;
};

const deleteAliments = async (id: string) => {
  const jwt = (await cookies()).get("JWT");
  if (!jwt) {
    console.error("JWT não encontrado");
    return null;
  }

  try {
    const response = await api.delete(`/api/alimentos/${id}`, {
      headers: { authorization: `Bearer ${jwt.value}` },
    });

    if (response.status === 200) {
      console.log("Alimento deletada com sucesso");
    } else {
      console.error("Erro ao deletar alimento:");
    }

    return response.status;
  } catch (error) {
    console.error("Erro ao deletar alimento:", error);
    return null;
  }
};

export { deleteAliments,fetchAliments };