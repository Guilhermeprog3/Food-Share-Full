"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";


export const fetchReserva = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/reservas/pendentes/`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  console.log(response.data)
  return response.data;
};


export const CancelReserva = async (id: string) => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.patch(
    `api/reservas/${id}/cancel`,[],
    {
      
      headers: {
        authorization: `Bearer ${jwt!.value}`,
      },
    }
  );
  return response.data;
};

export const updateReserva = async (id: string, pickup_date: Date) => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.patch(
    `api/reservas/${id}/date`,
    { pickup_date },
    {
      headers: {
        authorization: `Bearer ${jwt!.value}`,
      },
    }
  );
  return response.data;
};