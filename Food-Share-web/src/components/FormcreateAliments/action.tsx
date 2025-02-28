"use server";

import { api } from '@/app/service/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSubmit(formdata: FormData): Promise<void> {
  const token = (await cookies()).get("JWT")?.value;

  const name = formdata.get("name");
  const quantity = formdata.get("quantity");
  const expiration_time = formdata.get("expiration_time");
  const description = formdata.get("description");

  const data = {
    name,
    quantity: parseInt(quantity as string, 10),
    expiration_time: new Date(expiration_time as string),
    description,
  };

  const response = await api.post('api/alimentos', data, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 201) {
    throw new Error(`Failed to create food: ${response.statusText}`);
  }

  return redirect('/listfood');
}
