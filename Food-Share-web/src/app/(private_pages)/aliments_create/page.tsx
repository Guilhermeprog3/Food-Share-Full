import { Form_CreateAliments } from "@/components/FormcreateAliments";
import Navbar_Private from "@/components/Navbar_Private";

const Aliments_cad_Page = () => {
  return ( 
    <div>
      <div className="mb-3">
        <Navbar_Private/>
      </div>
      
      <div className="h-full justify-center flex items-center">
      <Form_CreateAliments/>  
      </div>
      
    </div>
   );
}
 
export default Aliments_cad_Page;