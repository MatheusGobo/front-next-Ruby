import Link from "next/link";
import { useEffect, useState } from "react";
import ROUTES from "../../src/config/routes";
import CategorieService from "../../src/services/CategorieService";
import { toast } from 'react-toastify';

function CategorieList() {

   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   
   const getCategories = async () => {
      let data = await CategorieService.getAll()

      setCategories(data)
   }

   useEffect(() => {
      getCategories().then(() => {
         setIsLoading(false)
      })

   }, [])

   const deleteCategorie = (categorie) => {

      var result = confirm(`Você realmente gostaria de deletar a categoria: ${categorie.name}`)

      if (!result) return


      setIsLoading(true);
      CategorieService.destroy(categorie.id).then((data) => {
         getCategories().then(() => {
            setIsLoading(false)
            toast.success('Categorie destroyled Success')
         }).catch((e) => {
            toast.error('Error delete Categorie');
         })
      })
   }



   if (isLoading) return <p>Carregando</p>

   return (
      <>
         <p>
            <Link
               href={{
                  pathname: ROUTES.articles.list
               }}>
               <a>Lista de Artigos</a>
            </Link>
         </p>
         <p>
            <Link
               href={{
                  pathname: ROUTES.categories.list
               }}>
               <a>Lista de Categorias</a>
            </Link>
         </p>


         <p>
            <Link
               href={{
                  pathname: ROUTES.categories.new
               }}>
               <a>Criar Nova Categoria</a>
            </Link>
         </p>

         <table>
            <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Created_At</th>
               <th>&nbsp;</th>
            </tr>
            {
               categories.map((categorie) => {
                  return (
                     <tr key={categorie.id}>
                        <td>{categorie.id}</td>
                        <td>{categorie.name}</td>
                        <td>{categorie.created_at}</td>
                        <td>

                           <Link
                              href={{
                                 pathname: ROUTES.categories.show,
                                 query: {
                                    id: categorie.id
                                 }
                              }}>
                              <a>Visualizar</a>
                           </Link>

                           <Link
                              href={{
                                 pathname: ROUTES.categories.edit,
                                 query: {
                                    id: categorie.id
                                 }
                              }}>
                              <a>Editar</a>
                           </Link>

                           <button onClick={() => {deleteCategorie(categorie)}}>Deletar</button>
                        </td>
                     </tr>
                  )
               })
            }
         </table>
      </>
   );
}

export default CategorieList;