import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import CategorieService from "../../../src/services/CategorieService";

function ShowCategorie() {
   const router = useRouter()
   const { id } = router.query

   const [categorie, setCategorie] = useState(null)

   useEffect(() => {
      CategorieService.getById(id).then((data) => {
         setCategorie(data)
      })
   }, [id])


   if (!categorie) return 'Carregando...'

   return (
      <>
         <p>Exibindo a categoria: {id}</p>

         <p>
            <Link
               href={{
                  pathname: ROUTES.categories.list
               }}>
               <a>Voltar</a>
            </Link>
         </p>

         <dl>
            <dt>ID</dt>
            <dd>{categorie.id}</dd>
            
            <dt>Name</dt>
            <dd>{categorie.name}</dd>
            
            <dt>Created_At</dt>
            <dd>{categorie.created_at}</dd>
         </dl>
      </>
   );
}

export default ShowCategorie;