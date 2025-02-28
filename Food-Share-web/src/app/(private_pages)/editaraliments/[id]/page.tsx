
import AlimentoServer from '@/components/FormEdit/server';
import Navbar_Private from '@/components/Navbar_Private'


const EditaralimentsPage = async ({params}:{params: {id:string}}) => {
const id = await params
  return (
    <div>
        <Navbar_Private/>
      <AlimentoServer id={id.id}/>
    </div>
  );
};

export default EditaralimentsPage;
