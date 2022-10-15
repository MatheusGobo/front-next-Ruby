import axiosInstance from "../utils/axios"

const UserService = {

   getAll: async () => {
      let response = await axiosInstance.get('/users')

      return response.data
   },
   getById: async (id) => {
      if (!id) return

      let response = await axiosInstance.get(`/users/${id}`)
      return response.data
   },
   create: async (user) => {
      if (!user) return

      let response = await axiosInstance.post(`/users`, { user: user })
      return response
   },
   destroy: async (id) => {
      if (!id) return

      let response = await axiosInstance.delete(`/users/${id}`)
      return response

   },
   update: async (id, user) => {
      if (!id) return

      let response = await axiosInstance.put(`/users/${id}`, { user: user })
      return response.data

   }
}

export default UserService