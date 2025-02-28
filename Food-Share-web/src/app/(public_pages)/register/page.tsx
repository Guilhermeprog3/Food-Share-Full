import { Form_Register } from "@/components/FormRegister/form_register";
import Navbar from "@/components/Navbar_public";

const Register_Page = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-20 h-full justify-center flex items-center">
        <Form_Register />
      </div>
    </div>
  );
};

export default Register_Page;
