"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

type UserUpdate = {
  latitude: number;
  longitude: number;
};

const Update_User = async (data: UserUpdate) => {
  const jwtCookie = (await cookies()).get("JWT");

  if (!jwtCookie) {
    console.error("Token não encontrado.");
    return null;
  }

  try {

    const response = await api.patch(`api/doadores/`, data, {
      headers: { authorization: `Bearer ${jwtCookie.value}` },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};

export default Update_User;
