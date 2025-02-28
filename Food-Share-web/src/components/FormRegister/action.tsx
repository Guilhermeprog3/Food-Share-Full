"use server";

import { api } from '@/app/service/server';
import { redirect } from 'next/navigation';

export async function handleSubmit(formdata: FormData) {
  const name = formdata.get("name");
  const cnpj = formdata.get("cnpj");
  const responsible = formdata.get("responsible");
  const email = formdata.get("email");
  const password = formdata.get("password");

  await api.post('api/doadores', {
    name, cnpj, responsible, email, password
  });

  return redirect('/');
}
