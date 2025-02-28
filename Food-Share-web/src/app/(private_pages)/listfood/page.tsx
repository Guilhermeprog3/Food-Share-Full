"use client"
import Navbar_Private from "@/components/Navbar_Private"
import { CardDemo } from "@/components/ListFood/index";

const ListFood_page = () => {
  return ( 
    <>
    <div>
      <div className="mb-10">
        <Navbar_Private />
      </div>
      <div>
        <CardDemo />
      </div>
    </div>
    </>
   );
}

export default ListFood_page;