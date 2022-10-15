import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ROUTES from "../../src/config/routes";
import CategorieService from "../../src/services/CategorieService";
import { toast } from 'react-toastify';

function NewCategorie() {

   const router = useRouter()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const insertCategorie = (categorie) => {
      CategorieService.create(categorie).then((data) => {
         toast.success('Success to Insert Category')
         router.push(ROUTES.categories.list)
      }).catch((e) => {
         toast.error('Error to Insert Category')
      })
   }

   return ( 
      <>
         <p>Tela de Cadastro de Categoria</p>

         <p>
            <Link
               href={{
                  pathname: ROUTES.categories.list
               }}>
               <a>Cancelar</a>
            </Link>
         </p>

         <form onSubmit={handleSubmit((data) => insertCategorie(data))}>
            <div className="field">
               <label>Name</label>
               <input {...register('name', { required: true })} />
               {errors.name && <p>Name is required.</p>}
            </div>

            <label>Submit</label>
            <input type="submit" />
         </form>
         
      </>
   );
}

export default NewCategorie;