"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

const fetchDoações = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/reservas/entregues`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  return response.data;
};


export default fetchDoações;
