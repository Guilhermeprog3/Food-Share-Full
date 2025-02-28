import { notFound } from "next/navigation";
import { api } from "@/app/service/server";
import { cookies } from "next/headers";
import { Form_EditAliments } from "./form_edit";

type Alimento = {
  id: string;
  name: string;
  expiration_time: Date;
  quantity: number;
  description: string;
};

const fetchAlimentoById = async (id: string): Promise<Alimento | null> => {
  console.log(id)
  const jwt = (await cookies()).get("JWT");
  try {
    const response = await api.get(`api/alimentos/${id}`, {
      headers: { authorization: `Bearer ${jwt!.value}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Alimento:", error);
    return null;
  }
};

async function AlimentoServer({ id }: { id: string }) {
  const alimento = await fetchAlimentoById(id);
  if (!alimento) return notFound();
  return <Form_EditAliments alimento={alimento} />;
}

export default AlimentoServer;
