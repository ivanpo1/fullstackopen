import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const createBlogQ = (newBlog) => {
  const config = { headers: { Authorization: token } }
  return axios.post(baseUrl, newBlog, config).then((res) => res.data)
}

export const updateBlog = (updatedBlog) => {
  const config = { headers: { Authorization: token } }
  return axios
    .put(`/api/blogs/${updatedBlog.id}`, updatedBlog, config)
    .then((res) => res.data)
}

export const deleteBlog = (id) => {
  const config = { headers: { Authorization: token } }
  axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data)
  return id
}

export const getAllUsers = () => axios.get('/api/users').then((res) => res.data)
export const getUser = (id) =>
  axios.get(`/api/users/${id}`).then((res) => res.data)
