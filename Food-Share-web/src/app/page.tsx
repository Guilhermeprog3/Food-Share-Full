import { Form_Login } from "@/components/FormLogin/form_login";
import Navbar from "@/components/Navbar_public";

const LoginPage = () => {
    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50">
             <Navbar/>   
            </div>
            
        <div className=" pt-20 h-full justify-center flex items-center">
            <Form_Login/>
        </div>
        </div>
        
     );
}
 
export default LoginPage;