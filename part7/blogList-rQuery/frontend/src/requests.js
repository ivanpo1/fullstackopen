import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllBlogs = () => axios.get(baseUrl).then((res) => res.data)
export const getBlog = (id) =>
  axios.get(`/api/blogs/${id}`).then((res) => res.data)

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

export const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export const getAllUsers = () => axios.get('/api/users').then((res) => res.data)
export const getUser = (id) =>
  axios.get(`/api/users/${id}`).then((res) => res.data)

export const addComment = (blogId, comment) => {
  return axios
    .post(`/api/blogs/${blogId}/comments`, { comment })
    .then((res) => res.data)
}
