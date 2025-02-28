"use server"
import { api } from "@/app/service/server";
import { cookies } from "next/headers";


const Get_UserById = async () => {
    const jwtCookie = (await cookies()).get("JWT");
  
    if (!jwtCookie) {
      console.error("Token não encontrado.");
      return null;
    }
  
    try {
  
      const response = await api.get(`api/doadores/location`, {
        headers: { authorization: `Bearer ${jwtCookie.value}` },
      });
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return null;
    }
  };

  export default Get_UserById;