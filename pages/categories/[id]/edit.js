import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import { useForm } from "react-hook-form";
import CategorieService from "../../../src/services/CategorieService";
import { toast } from 'react-toastify';

function EditCategorie() {
 
   const router = useRouter()
   const { id } = router.query

   const [categorie, setCategorie] = useState(null)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const updateCategorie = (category) => {
      CategorieService.update(id, category).then((data) => {
         toast.success('Success to update Category')
         router.push(ROUTES.categories.list)
      }).catch((e) => {
         toast.error('Error updating Category')
      })
   }


   useEffect(() => {
      CategorieService.getById(id).then((data) =>{
         setCategorie(data)
      })
   }, [])


   if (!categorie) return 'Carregando....'

   return (
      <>
         <p>Página de Edição da Categoria: {id}</p>

         <p>
            <Link
               href={{
                  pathname: ROUTES.categories.list
               }}>
               <a>Cancelar</a>
            </Link>
         </p>

         <form onSubmit={handleSubmit((data) => updateCategorie(data))}>
            <div className="field">
               <label>Name</label>
               <input {...register('name', { required: true })} defaultValue={categorie.name}/>
               {errors.name && <p>Name is required.</p>}
            </div>

            <label>Submit</label>
            <input type="submit" />
         </form>
      </>
   );
}

export default EditCategorie;