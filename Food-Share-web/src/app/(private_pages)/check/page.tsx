"use client"
import Navbar from "@/components/Navbar_public";
import Marca from "../../../assets/images/marca.png";
import { redirect } from "next/navigation";

const Check = () => {

  function handleCheck() {
    redirect("/schedules")
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="h-full justify-center flex items-center">
        <div className="flex-row justify-center items-center text-center bg-card rounded-3xl shadow-lg p-2 mt-36">
          <img src={Marca.src} alt="OK" className="h-[250px]" />
          <p className="font-medium">Alimento alterado com sucesso</p>
          <button onClick={handleCheck} className="border-2 rounded-3xl m-2 p-1 pl-2 pr-2">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check;
