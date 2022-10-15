import axiosInstance from "../utils/axios"

const CategorieService = {

   getAll: async () => {
      let response = await axiosInstance.get('/categories')

      return response.data
   },
   getById: async (id) => {
      if (!id) return

      let response = await axiosInstance.get(`/categories/${id}`)
      return response.data
   },
   create: async (category) => {
      if (!category) return

      let response = await axiosInstance.post(`/categories`, { category: category })
      return response
   },
   destroy: async (id) => {
      if (!id) return

      let response = await axiosInstance.delete(`/categories/${id}`)
      return response

   },
   update: async (id, categorie) => {
      if (!id) return

      let response = await axiosInstance.put(`/categories/${id}`, { category: categorie })
      return response.data

   }
}

export default CategorieService