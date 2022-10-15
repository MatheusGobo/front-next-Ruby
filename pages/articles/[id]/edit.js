import { useRouter } from "next/router";
import { useEffect } from "react";

function EditArticle() {
 
   const router = useRouter()
   const { id } = router.query

   useEffect(() => {
      console.log("ROUTE ", router)
   }, [])

   return (
      <>
         <p>Página de Edição do artigo: {id}</p>
      </>
   );
}

export default EditArticle;