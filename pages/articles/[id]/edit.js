import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import { useForm } from "react-hook-form";
import ArticleService from "../../../src/services/ArticleService";
import { toast } from 'react-toastify';
import CategorieService from "../../../src/services/CategorieService";
import UserService from "../../../src/services/UserService";

function EditArticle() {

   const router = useRouter()
   const { id } = router.query

   const [article, setArticle] = useState(null)
   const [categories, setCategories] = useState([])
   const [users, setUsers] = useState([])

   useEffect(() => {
      ArticleService.getById(id).then((data) => {
         setArticle(data)
      })
   }, [id])

   useEffect(() => {
      CategorieService.getAll().then((data) => { setCategories(data) })
      UserService.getAll().then((data) => { setUsers(data) })
   }, [])

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const updateArticle = (article) => {
      ArticleService.update(id, article).then((data) => {
         toast.success('Article Updated Success')
         router.push(ROUTES.articles.list)
      }).catch((e) => {
         toast.error('Error on Update Article');
      })
   }


   useEffect(() => {
      console.log("ROUTE ", router)
   }, [])

   if (!article || !categories.length || !users.length) return 'Carregando...'

   return (
      <>
         <p>Página de Edição do artigo: {id}</p>

         <p>
            <Link
               href={{
                  pathname: ROUTES.articles.list
               }}>
               <a>Cancelar</a>
            </Link>
         </p>

         <form onSubmit={handleSubmit((data) => updateArticle(data))}>
            <div className="field">
               <label>Title</label>
               <input {...register('title', { required: true })} defaultValue={article.title} />
               {errors.lastName && <p>Title is required.</p>}
            </div>

            <div className="field">
               <label>Body</label>
               <input {...register('body', { required: true })} defaultValue={article.body} />
               {errors.lastName && <p>Body is required.</p>}

            </div>


            <div className="field">
               <label>Category</label>
               <select {...register('category_id', { required: true }, { pattern: /\d/ })} defaultValue={article.category_id}>
                  <option>Select Category</option>
                  {
                     categories.map((category) => {
                        return <option value={category.id}>{category.name}</option>
                     })
                  }
               </select>
               {errors.category_id && <p>Category is required</p>}
            </div>

            <div className="field">
               <label>Author</label>
               <select {...register('author_id', { required: true }, { pattern: /\d/ })} defaultValue={article.author_id}>
                  <option>Select Author</option>
                  {
                     users.map((user) => {
                        return <option value={user.id}>{user.name}</option>
                     })
                  }
               </select>
               {errors.author_id && <p>Author is required</p>}
            </div>

            <div className="field">
               <label>Published At</label>
               <input {...register('published_at', { required: true })} defaultValue={article.published_at} />
               {errors.age && <p>Author is required</p>}
            </div>

            <label>Submit</label>
            <input type="submit" />
         </form>
      </>
   );
}

export default EditArticle;