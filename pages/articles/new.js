import Link from "next/link";
import ROUTES from "../../src/config/routes";
import { useForm } from "react-hook-form";
import ArticleService from "../../src/services/ArticleService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorieService from "../../src/services/CategorieService";
import { toast } from 'react-toastify';
import UserService from "../../src/services/UserService";

function NewArticle() {
   const router = useRouter()
   const [categories, setCategories] = useState([])
   const [users, setUsers] = useState([])

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const insertArticle = (article) => {
      ArticleService.create(article).then((data) => {
         toast.success('Article Insert Success')
         router.push(ROUTES.articles.list)
      }).catch((e) => {
         toast.error('Error on Insert Article');
      })
   }

   useEffect(() => {
      CategorieService.getAll().then((data) => { setCategories(data) })
      UserService.getAll().then((data) => { setUsers(data) })
   }, [])

   return (
      <>
         <p>Tela de Cadastro de Artigo</p>

         <p>
            <Link
               href={{
                  pathname: ROUTES.articles.list
               }}>
               <a>Cancelar</a>
            </Link>
         </p>

         <form onSubmit={handleSubmit((data) => insertArticle(data))}>
            <div className="field">
               <label>Title</label>
               <input {...register('title', { required: true })} />
               {errors.title && <p>Title is required.</p>}
            </div>

            <div className="field">
               <label>Body</label>
               <input {...register('body', { required: true })} />
               {errors.body && <p>Body is required.</p>}

            </div>

            <div className="field">
               <label>Category</label>
               <select {...register('category_id', { required: true }, { pattern: /\d/ })}>
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
               <select {...register('author_id', { required: true }, { pattern: /\d/ })}>
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
               <input {...register('published_at', { required: true })} />
               {errors.published_at && <p>Author is required</p>}
            </div>

            <label>Submit</label>
            <input type="submit" />
         </form>

      </>
   );
}

export default NewArticle;